---
layout: post
category : programming
tagline: ""
tags : [programming, java8]
---

Here's my attempt at [FizzBuzz](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html) 
in [Java8](https://jdk8.java.net/download.html) with [Lambdas](http://openjdk.java.net/projects/lambda/).  This will 
not go in the Pantheon of awesome code and I'm sure I'll tweak it as I learn more.  Oh and this is a self-contained 
implementation and unit test, just messing around.

Here are some thoughts:

- Not sure if there's a nicer way to do the predicates inline with the [Stream API](http://download.java.net/jdk8/docs/api/java/util/stream/IntStream.html).
- I wish if statements were expressions, that would clean up some of the code. 
- It'd be neato if FizzBuzz was conducive to using function composition to do a divBy15 but it isn't needed for FizzBuzz. 
- [Ranges](http://download.java.net/jdk8/docs/api/java/util/stream/IntStream.html#range-int-int-) are nice to see.

``` java
package javafunctional.java8.examples;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.function.Predicate;
import java.util.stream.IntStream;

public class FunctionLiterals {
    private Predicate<Integer> divBy3() { return arg -> (arg % 3) == 0? true: false; }
    private Predicate<Integer> divBy5() { return arg -> (arg % 5) == 0? true: false; }

    @Test public void testPredicates(){
        assertEquals(true, divBy3().test(3));
        assertEquals(true, divBy5().test(5));
    }

    public String fizzBuzz(Integer intIn){
        String fizz = (divBy3().test(intIn))? "Fizz" : "";
        String buzz = (divBy5().test(intIn))? "Buzz" : "";
        return (fizz.isEmpty() && buzz.isEmpty())? intIn.toString() : fizz + buzz;
    }

    @Test public void testFizzBuzz() {
        assertEquals("Fizz", fizzBuzz(9));
        assertEquals("Buzz", fizzBuzz(10));
        assertEquals("FizzBuzz", fizzBuzz(30));
    }

    @Test public void runit(){
        IntStream.range(1, 100)
                .mapToObj(ii -> fizzBuzz(ii))
                .forEach(s -> System.out.println(s));
    }
}

```
