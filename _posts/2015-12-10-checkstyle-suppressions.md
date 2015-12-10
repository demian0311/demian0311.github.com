---
layout: post
category : programming 
tags : [programming, java8]
---

I have recently focused on build tools that help keep code clean.  In [gradle](http://gradle.org/) I use
[PMD](https://pmd.github.io/), [findbugs](http://findbugs.sourceforge.net/) and [checkstyle](http://checkstyle.sourceforge.net/).  Probably about 50% of the time I check in code these
tools catch something bad I was attempting to do.  They have proven their worth.

I run into a problem though with beans where the equals that IntelliJ generates trips 
complexity warnings in checkstyle.  Running a `./gradlew check` gives me an error 
that looks like this.

```
:checkstyleMain
[ant:checkstyle] ./bar/src/main/java/com/example/foo/model/Thing.java:33:5: NPath Complexity is 48 (max allowed is 20).
:checkstyleMain FAILED
```
In the past I have refactored and teased apart this generated code but I finally came
to the conclusion that I wasn't adding any value in that effort.

What I want is an unintrusive way to ignore that check for everything in a given path.
I stick my beans in a `model` package so this isn't too hard to suppress.

## Create a Suppressions File
In my project I have `./config/checkstyle/checkstyle.xml` already.  I'm going to 
create a file in the same directory called `checkstyle-suppressions.xml`.

``` xml
<?xml version="1.0"?>
<!DOCTYPE suppressions PUBLIC
        "-//Puppy Crawl//DTD Suppressions 1.0//EN"
        "http://www.puppycrawl.com/dtds/suppressions_1_0.dtd">
<suppressions>
    <suppress checks="NPathComplexity" files=".*\/model\/.*"/>
</suppressions>
```

## Reference the Suppressions File 
In my `./config/checkstyle/checkstyle.xml` I have this.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE module PUBLIC
        "-//Puppy Crawl//DTD Check Configuration 1.3//EN"
        "http://www.puppycrawl.com/dtds/configuration_1_3.dtd">
<module name="Checker">

    <module name="SuppressionFilter">
        <property name="file" value="./config/checkstyle/checkstyle-suppressions.xml" />
    </module>
    ...
```


