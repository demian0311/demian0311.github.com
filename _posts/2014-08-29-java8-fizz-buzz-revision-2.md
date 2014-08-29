---
layout: post
category : programming
tagline: ""
tags : [programming, java8]
---

This is my second attempt at [FizzBuzz](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html) 
in [Java8](https://jdk8.java.net/download.html) with [Lambdas](http://openjdk.java.net/projects/lambda/).  

The first incarnation I did [can be found here](/programming/2014/01/17/java8-fizz-buzz.html).  It's more enterprisey.

- This [StackOverflow page](https://stackoverflow.com/questions/23674624/how-do-i-convert-a-java-8-intstream-to-a-list) is where I found out about `IntStream.boxed()`.
- This thing is kind of a one liner.  Reminds me of how in Scala land a lot of things surprisingly end up being a single expression.
- I wasn't a big fan of the ternary operator before getting into FP.  As you strive for more stateless coding you'll find it's your friend.

``` java
package com.neidetcher.java8;

import java.util.stream.IntStream;

public class FizzBuzz {
    public static void main(String[] args){
        IntStream.range(1, 100)
                .boxed()
                .map(x -> x+": " + (x%3==0? "Fizz": "") + (x%5==0? "Buzz": ""))
                .forEach(System.out::println);
    }
}
```
