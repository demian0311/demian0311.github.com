---
layout: post
category : programming
tags : [programming]
---

At Time Warner Cable we're in the midst of an acquisition.  There is a possibility 
that many of us will be changing jobs in the coming years.  Since we've been at 
our current gig we have switched from using Java to Groovy and Scala.  A while ago, 
some fellow co-workers and I were talking about languages and where we think we'll
end up and where we'd like to end up.  I thought this was an interesting conversation.
This sums up a lot of what was said, you can assume anything insightful wasn't said
by me.

## Groovy

Grails is great for bootstrapping a new project.  The architectural decisions have
been made for you and you just need to fill in the blanks with your  implementation.  

Grails is great for working with web designers and UI people.  They can understand
how Grails works and it's easy for them to work with the views.  

It's difficult to boldly refactor Groovy code though.  There's a lot of magic going
on and the compiler or tests won't always tell you when you've done something bad.
This is especially true when you inherit code with bad tests.  Often when attempting
a bold refactor I'll need to lean on commandline searching to make sure there broken 
references that my IDE and compiler aren't warning me about.

All in all, because Grails is so great Groovy or Grails are not going away any time 
soon.  I could see doing more Grails applications in the future.  

### Greenfield
But what if I were starting up a new team, would I pick it?  If we outsourced or had
a different team of UI/ UX web designers then having Grails on the front end is 
compelling at least for the web application.  But the looseness and lack of tooling
support would otherwise make me want to pick something with a more strict type 
system.

## Scala

### Deep Water

I'm mixed on Scala.  I'd like to throw away 30% of the features.  There are some 
features that make the code incredibly hard for me to understand.  I'm sure some
would say that those are the features that also make for very easy to use APIs.
Maybe the answer is something like CheckStyle that would bark at you if introduce 
new code to your project that is too hairy.

### Fun

But Scala has really re-invigorated my enjoyment while programming.  It's so powerful 
and functional programming let's you do awesome code that just feels _tight_.  We
just write some clean, awesome code that generally doesn't have problems.

### Asshole Magnet

Scala seems like it could be a language for pedantic assholes to apply  esoteric 
features that make their code un-intelligible.  Whenever I code I try to imagine
me looking at this code a year from now, with a VP screaming on a conference call
at 3AM.  Would I be able to understand what I'm writing?  Could I safely change it?
If I need to bring to bear my entire intellect to write code I have no
hope of understanding it in the future.  

This will be a big challenge for Scala going forward.  With Scala on my 
resume I'd like to somehow advertise to potential teams that I swing toward the 
more pragmatic side even though I'm using a language that attracts engineers
very interested in pushing Scala to the limit.

### Greenfield

I'd happily do more work in Scala.  But on a new team doing Scala I would 
really want to influence people to stay in the shallow end of the pool.  I'd 
also caution against throwing out all the great frameworks that the Java 
community has in place.

## Java

I bet we'll see a renaissance in Java.  The language has amazing staying power. Relative 
to Groovy the tooling is so great for Java, you just totally know what
the code is doing.  It might be verbose and littered with semi-colons but you
get it.  It's hard to hide your intentions in Java.  Maybe that's just because
even though I haven't done it much the last two years I've used the language for
a very long time.

Lambdas, streams and the collections API are great.  They've done a great
job given the restrictions that they're working under.

Most Java coders aren't going to get excited about lambdas for a while.  When 
popular libraries leverage these features then we'll start to see lambdas embraced. 

### Greenfield
If I found myself doing Java8 I'd embrace the new features and try to be as 
functional and immutable as possible.  The latest version of Spring leverages 
lambdas and it'd be fun to see where they (and other Java libraries) take it.  

It'd also be interesting to loop back and see how you'd solve problems with the
new features.  For example with functional programming I bet annotations and aspect
oriented programming aren't needed anymore.
