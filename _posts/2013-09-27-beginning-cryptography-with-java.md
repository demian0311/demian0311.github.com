---
layout: post
category : programming 
tagline: "Let's Learn Me Some Security"
---

## Getting my Ass Handed to Me 
At work our PCI compliant Grails application needs to make 2-way SSL calls to
another PCI compliant SOAP service.  Well you know this is gonna kind of suck
for a little bit, you have to assume it'll take a few days to get everything
set up right.  It turned out that it took me a few weeks to get all this done.

I had some legit distractions in that time but it took me much longer than it
should have.  What hurts even more is that the main issue I had was nothing to
do with SSL.  However, the lack of knowledge and confidence in SSL kind of 
prevented me from seeing my problems clearly.

The recent [NSA/ PRISM](https://en.wikipedia.org/wiki/PRISM_(surveillance_program))
scandal has me a bit more interested in privacy and security.  Digging into
the security APIs and the pieces involved gave me a greater appreciation for
current events.

## Let's Learn Me Some Security
So I resolved to learn more about security and SSL as it applies to the JVM 
platform.  Honestly I initially thought I would take the Coursera class
[Cryptography I](https://www.coursera.org/course/crypto).  But the math 
notation scared me and I was concerned that after investing 6 weeks of my
time I still wouldn't know the Java APIs very well or have a solid 
practical understanding.  

I decided to just crack a book on my own and learn some Java security.  It's
a weird space in that there hasn't been a lot of advancement in the APIs.  I 
guess that means that they created the initial APIs for Java well enough
such that there isn't any serious churn.

That lead me to a 2005 dead-tree book [Beginning Cryptography with Java](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Cryptography-with-Java.productCd-0764596330.html).
As far as I know you can't even get it in an electronic version but that was
alright because I had some trips ahead of me and it was something I could read
to keep my mind off of the impending doom from airplane take-offs and landings.

## Affirmation that Scala is Cool 
The book is in Java, 2005.  At my day job I do Scala and Groovy.  I decided to
do the examples.  The process of implementing the Java examples in Scala was
surprisingly fun and re-affirmed how flippin awesome Scala is.  Code shrunk
and became more expressive, got to the core of what we were doing.

If you want to look at a few of the examples I did they're [up on GitHub](https://github.com/demian0311/security).
