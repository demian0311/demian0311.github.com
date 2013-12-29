---
layout: post
category : programming
tagline: "great book on FP in Java8"
tags : [fitness, exercise]
---

Venkat is working on [Functional Programming in Java](http://pragprog.com/book/vsjava8/functional-programming-in-java).  The book is still in Beta right now but it's 
firming up and I've finished it over Christmas
break.  This is a great book.  Venkhat really shows you how the new 
features in Java8 will make your code more awesome and how you can play 
with FP concepts.  

Earlier this I [reviewed FP for Java Developers](/programming/2013/05/14/book-review-functional-programming-for-java-developers.html).  That was good but it pre-dated the 
finalization of the lambda syntax.  If you can't switch to Java8 and you
want to do FP then look into [FP for Java Developers](http://www.amazon.com/Functional-Programming-Java-Developers-Concurrency/dp/1449311032).

Venkat's new book lays out the mechanics of lambda expressions and then goes through how to use
them with the collections APIs and high order functions.  Not much else to say about
the book other than if you're doing Java8 then this book should be required reading.

## I'm a Simple Man
Chapter 7 deals with optimizing recursion.  Chapter 8 is on composing lambda expressions.
Honestly I skimmed those chapters.  After doing the Coursera class on FP in Scala I 
was a recursion monster but at work I still never ended up writing recursive code.
Maybe I'm a knuckle dragger, maybe the problems I solve are work are too simple.
Either way it's stuff I haven't had to get good at for my day job.

## Mini Rant: Of Imperative vs Declarative
I know I'm being a bit of a jack-ass here but I don't get the distinction.  Sure, 
it's telling the computer *how* to do something as opposed to *what* you want it
to do.  But I see this as more of a difference in degree and not as much a difference
in kind.  It just seems like what we are calling declarative programming is just 
further up the API design continuum away from bad and cumbersome APIs.   

So, in Java8 we say that the collection APIs and the ability to use lambdas
creates more declarative code.  I just kind of see it as having more awesome APIs.
