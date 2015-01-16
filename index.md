---
layout: default
title: Home 
tagline: Software Engineer 
---
<img align="left" style="padding-right:15px;" src="/assets/images/demian_color.png"> 

I'm a software engineer.  Almost all of my programming experience has been with [JVM](http://java.com/en/download/index.jsp) languages
like [Java](http://java.com/en/), [Groovy](http://groovy.codehaus.org/) and more recently [Scala](http://scala-lang.org/).  Most of my career I have been in the
telecommunications business.  Work is in Denver, Colorado but I'm a remote worker in Lafayette, Louisiana.


I currently work on a great team at [Time Warner Cable](http://www.timewarnercable.com/).  We work on 
back-end services using [Scala](http://www.scala-lang.org/).  We also work on a handful of 
portals that our customers use.  These portals are written with [Groovy](http://groovy.codehaus.org/) and [Grails](http://grails.org/).

- I resistance train.  Some [videos are up on YouTube](https://www.youtube.com/watch?v=WXsc1GjSrmc&list=PLrt6A30KJdWrS53Z6y_GIcmyV-wJtN2jU) and I made a [5/3/1 Workout Calculator](/531.html).
- I have been known to [tweet](https://twitter.com/demian0311).

## Stand back, I'm a professional
- Here's my [Resume](/resume.html) and I have a profile on [LinkedIn](http://www.linkedin.com/in/demian0311).
- Some of my software is at [GitHub](https://github.com/demian0311).

## Pearls of Wisdom 
<table class="posts">
  {% for post in site.posts offset: 0 limit: 5 %}
   <tr>
      <td>{{ post.date | date_to_string }}</td>
      <td><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></td>
   </tr>
  {% endfor %}
</table>
Older posts are in the <a href="/archive.html">archive</a> and 
I have an <a href="http://neidetcher.com/atom.xml">atom feed</a>.
