---
layout: post
category : programming 
tags : [programming, java8]
---

Alright this isn't much but I'm satisfied with myself and it surprisingly took me a
little bit to push the right buttons to make it work.

I use EasyMock in my unit tests in Java8.  Mocking frameworks will typically have a
recording phase and then a phase where your expectations should be ready to play back.
With EasyMock your unit test can extend `EasyMockSupport`.  That class gives you access
to methods like `replayAll()` and `verifyAll()`.  

## Before 

``` java
@Test public void test() {
   // a bunch of expects

   replayAll();
   Inter actual = ageFinder.findAge(user);
   verifyAll();

   assertEquals(30, actual);
}
```

## After

This isn't as smooth as you'd see in Scala or Groovy but in Java8 you can do something like this.  

``` java
public class MySupport extends EasyMockSupport {

    protected void withMocks(Runnable runnableIn) {
        replayAll();
        runnableIn.run();
        verifyAll();
    }

    protected <T>T withMocks(Supplier<T> supplierIn) {
        replayAll();
        T actual = supplierIn.get();
        verifyAll();

        return actual;
    }
}
```
I think I need both versions of `withMocks`.  The first one handles when you are testing a method that doesn't
return anything and the second one handles when your method does return something.  One of the 
things that gave me trouble was figuring out what interface in `java.util.function` would not 
return any value.  Of course the answer is our old friend `Runnable`.  I also struggled with 
what Java wanted for the generics, that stuff isn't obvious to me.

Then your test extends `MySupport`.  And within your tests you can have code that looks like this.

``` java
@Test public void test() {
   // a bunch of expects
   Integer actual = withMocks(() -> ageFinder.findAge(user);
   assertEquals(30, actual);
}
```

## Caveat 

This tightens up unit tests but I did run into a caveat that I should mention.  If the constructor for
your _class under test_ uses mocks that would need to be between the `replayAll()` and `verifyAll()` 
methods then you might want to create a method in your test that instantiates your _class under test_.
It might look something like this.


``` java
private AgeFinder createAgeFinder() {
   return new AgeFinder(mockDatabase);
}

@Test public void test() {
   // a bunch of expects
   Integer actual = withMocks(() -> createAgeFinder().findAge(user);
   assertEquals(30, actual);
}
```
