---
layout: default
title: Home 
tagline: Software Engineer 
---
<img align="left" style="padding-right:15px;" src="/assets/images/demian_color.png"> 

I'm a software engineer.  Almost all of my programming experience has been with [JVM](http://java.com/en/download/index.jsp) languages
like [Java](http://java.com/en/), [Groovy](http://groovy.codehaus.org/) and more recently [Scala](http://scala-lang.org/).  Most of my career I have been in the
telecommunications business.  Work is in Denver, Colorado but I'm remote in 
Lafayette, Louisiana.


I currently work on a great team at [Time Warner Cable](http://www.timewarnercable.com/).  We work on 
back-end services using [Scala](http://www.scala-lang.org/).  We also work on a handful of 
portals that our customers use.  These portals are written with [Groovy](http://groovy.codehaus.org/) and [Grails](http://grails.org/).

## Stand back, I'm a professional
- Here's my [Resume](/resume.html).
- I have a profile on [LinkedIn](http://www.linkedin.com/in/demian0311).
- Some of my software is at [GitHub](https://github.com/demian0311).
- I have been known to [tweet](https://twitter.com/demian0311).
- This year I'm going to do more shows on the [NFJS Tour](http://www.nofluffjuststuff.com).

## Pearls of Wisdom 
<table class="posts">
  {% for post in site.posts offset: 0 limit: 5 %}
   <tr>
      <td>{{ post.date | date_to_string }}</td>
      <td><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></td>
   </tr>
  {% endfor %}
</table>
older posts are in the <a href="/archive.html">archive</a>
