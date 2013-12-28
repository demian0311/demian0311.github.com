---
layout: post
category : programming 
tagline: "in which our hero spends 3 hours to come up with 1 line of code that works"
---

## A Hystrix Grails Plugin
I am trying my hand at [creating a Grails plugin](https://github.com/demian0311/hystrix-circuit-breaker)
that will pull in the 
[Netflix Hystrix circuit breaker](https://github.com/Netflix/Hystrix) 
capability in your [Grails](http://grails.org/) application.
I have never written Grails plugins before.  Holy cow writing Grails 
plugins is surprisingly straightforward.  It's awesome. 

Part of the reason I'm doing this is because we finally stumbled onto
the fact that using Grails plugins to manage your common code in an
enterprise is a good idea.  So we're doing that at work.

I'm doing this with Netflix Hystrix because we use circuit breakers
at work in our Scala services.  Also, I am working on a talk to give in 2014 about
how to harden your application with respect to outgoing calls and the
concerns you should have with that.  Yes, I think [circuit breakers](https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern)
are one of those concerns you should have.

Integrating the Hystrix into a Grails plugin has been fun and surprisingly easy.
The hooks that Grails gives you for hacking at the web.xml file are nice.  My 
problems began when I wanted to configure my newly created circuit breaker.

## The Problem
Groovy has a [known problem (Cannot call Java static method with same name as inner class (LinkageError))](https://jira.codehaus.org/browse/GROOVY-6286).
It's amusing that the author of that issue was attempting to do the
same thing I am; configure the Netflix Hystrix API.  I'm not sure how common 
it is to have a static method with the same name as an inner class.

The offending class is [HystrixCommandProperties](http://netflix.github.io/Hystrix/javadoc/com/netflix/hystrix/HystrixCommandProperties.html).
If you search that page for _Setter_ you'll see the inner class and 
the static factory method they want you to use to create a new one.

      LinkageError occurred when processing request: [GET] /hystrix-circuit-breaker/test
      loader constraint violation: when resolving method "com.netflix.hystrix.HystrixCommandProperties.Setter()Lcom/netflix/hystrix/HystrixCommandProperties$Setter;" the class loader (instance of org/codehaus/groovy/runtime/callsite/CallSiteClassLoader) of the current class, com/netflix/hystrix/HystrixCommandProperties$Setter, and the class loader (instance of groovy/lang/GroovyClassLoader) for resolved class, com/netflix/hystrix/HystrixCommandProperties, have different Class objects for the type com/netflix/hystrix/HystrixCommandProperties$Setter used in the signature. Stacktrace follows:
      org.codehaus.groovy.grails.web.servlet.mvc.exceptions.ControllerExecutionException: Executing action [index] of controller [hystrix.circuit.breaker.TestController] in plugin [hystrix-circuit-breaker] caused exception: Runtime error executing action
         at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:895)
         at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:918)
         at java.lang.Thread.run(Thread.java:680)
      Caused by: org.codehaus.groovy.grails.web.servlet.mvc.exceptions.ControllerExecutionException: Runtime error executing action
      	... 3 more
      Caused by: java.lang.reflect.InvocationTargetException
      	... 3 more
      Caused by: java.lang.LinkageError: loader constraint violation: when resolving method "com.netflix.hystrix.HystrixCommandProperties.Setter()Lcom/netflix/hystrix/HystrixCommandProperties$Setter;" the class loader (instance of org/codehaus/groovy/runtime/callsite/CallSiteClassLoader) of the current class, com/netflix/hystrix/HystrixCommandProperties$Setter, and the class loader (instance of groovy/lang/GroovyClassLoader) for resolved class, com/netflix/hystrix/HystrixCommandProperties, have different Class objects for the type com/netflix/hystrix/HystrixCommandProperties$Setter used in the signature
      	at hystrix.circuit.breaker.DodgyStringReverser.createSetter(TestController.groovy:31)
      	at hystrix.circuit.breaker.DodgyStringReverser.<init>(TestController.groovy:36)
      	at hystrix.circuit.breaker.TestController.index(TestController.groovy:18)
      	... 3 more

## The Solution
Groovy is the king of wild-ass options to call stuff so I thought 
I would try a bunch of different possibilities to see if they get me
around this issue.  I won't show all the ways that didn't work. 
Here's the way that seems to work.

      static HystrixCommandProperties.Setter createHystrixCommandPropertiesSetter(){
          HystrixCommandProperties.invokeMethod("Setter", null)
      }

And [here's a link to my silly example that proves the concept](https://github.com/demian0311/hystrix-circuit-breaker/blob/master/grails-app/controllers/hystrix/circuit/breaker/TestController.groovy).


