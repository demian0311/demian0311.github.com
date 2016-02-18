---
layout: post
category : programming 
tags : [programming, java]
---

Sometimes a method is executed and you're just not sure how you got there.  You could bump up logging or
set a breakpoint but just logging the contents of the call stack is another good option.

``` java
public static void logStack() {
   long currTime = System.currentTimeMillis();
   log.info("logging stack at [{}]", currTime);
   Arrays.stream(Thread.currentThread().getStackTrace())
            .skip(2)
            .filter(ste -> ste.getClassName().startsWith("com.exmple"))
            .forEach(ste -> log.info("{} - ste: {}", currTime, ste));
}
```

We skip the first 2 elements of the stack because that contains where we called logStack from and
the current location.  It's optional but I like to filter to just include classes that start with
our package name.

