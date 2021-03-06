---
layout: post
category : programming
tagline: ""
tags : [scala, play2]
---

# Neidetcher: Another Look at Play2

[![][2]][2][Matt Raible has some good writeups on Play2][3].  We switched to Scala about a year ago.  For lab week, a few of us evaluated Play earlier this year.  At the time I mostly worked with the persistence layer, [anorm][4].  Our conclusion was that it wasn't quite ready for what we wanted to do. 
Just recently I finished a lab week and decided to take another look at Play.  Here are some conclusions.

**Overall**  
The big question is, compared to what.  At work we use Grails on the web side and Scala on the back-end.  The reality is that we leverage front-end engineers to help us make Time Warner Cable web sites look and behave well.  In our situation I don't think I can recommend it.  But if you're in a hardcore Scala shop and your Scala engineers can do enough of the front-end work then Play might be a good option.

Working with routes and templates felt a lot like Android development.  You work in a non-code DSL to create your routes and that turns into code that you write against.  Same for templates, they just turn into functions.  sbt run fires up their own netty server, it's solid.  It does a great job picking up changes. I didn't restart the play development server for a few days and it didn't miss anything.  Play also gives you helpful error messages in the browser when there are problems.

**Routes**  
They're handled in a text file.  I guess it's good because there's no cruft surrounding the definition of your routes.  It's bad because I think Scala is the perfect language for defining an internal DSL to handle routes.  It'd be great to have IDE support while working with routes.

**Controllers**  
Everything feels very idiomatic to Scala.  For example optional parameters are (drum-roll) Options.  Play doesn't have you use servlet filters, you just wrap functions.  The controllers themselves are not easy to test but there are workarounds such that you can do good unit tests.

**Templating**  
It's familiar to someone used to Scala.  Templates are just functions and have input parameters with types.  This gets statically checked and your IDE will bark at you if you send the wrong data type into a template.  I think that's awesome.  The templating is not as rich as Groovy Server Pages.  For the actual templating work there is no good IDE support.  It'd be great if TypeSafe took this on.  The templating that Play gives you would be painful for front-end engineers that are only familiar with HTML, CSS and JavaScript.

**Testing**  
They have utilities to help with testing.  All the examples use Specs, I haven't got the Specs memo yet, still using jUnit (get off my porch).  The biggest problem is that the controllers are objects so it's hard to do good unit testing.  I found a workaround that someone suggested.  Basically your controller is a class, in this case taking a dependency via the constructor.  Then the object that you tell Play about in the routes extends that class.  This seems to work in my toy example.

    
    object MockUp extends controllers.MockUp(new ProductionGuidCryptoServiceProvider()) {}

 []: http://www.playframework.org/assets/images/logos/normal.png
 [2]: http://www.playframework.org/assets/images/logos/normal.png
 [3]: http://raibledesigns.com/rd/search?q=play
 [4]: https://github.com/playframework/Play20/wiki/ScalaAnorm  
