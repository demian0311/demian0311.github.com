---
layout: post
category : programming 
tags : [programming, java8, spring]
---

This is probably so obvious that it doesn't deserve a blog post by anyone
but I'll admit that I struggled with this for a few hours.  I have an API 
that I am putting together for a [microservice](http://martinfowler.com/articles/microservices.html).

This is a little JSON API and SpringMVC makes it very easy.  But when there
are exceptions most of the guides I found send you towards a [Thymeleaf](http://www.thymeleaf.org/) solution
that outputs HTML.  That's not what I want, I want a good HTTP response code
and a JSON response that the client can parse to help them figure out what
went wrong.  There's a great write-up on [exception handling in Spring](https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc) but that, I believe, takes you in the Thymeleaf direction as well.

## My Custom Exception

Maybe this has my code too tied to HTTP but I like the explicit nature.  Notice
the `ResponseStatus` annotation that provides what `HttpStatus` we want associated
with this exception.

```
package foo.bar;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String messageIn) {
        super(messageIn);
    }
}
```

## Using the Exception
Nothing shocking here.

```
throw new BadRequestException("something descriptive goes here");
```

## ExceptionHandler 

Spring lets you just annotate a method on a controller that you have designated to 
handle exceptions.  So yeah, this is the part that wasn't obvious to me.  Sending 
back a `Map` tells Spring to just turn it into good JSON.

``` java
    @ExceptionHandler
    public Map<String, String> exceptionHandler(
            Exception e,
            HttpServletRequest httpServletRequestIn,
            HttpServletResponse httpServletResponseIn) {
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        // if not production then show stack trace?

        StringBuffer url = httpServletRequestIn.getRequestURL();
        String queryString = httpServletRequestIn.getQueryString();
        if (queryString != null) {
            url.append('?');
            url.append(queryString);
        }
        map.put("requestUrl", url.toString());

        if (e.getClass().isAnnotationPresent(ResponseStatus.class)) {
            ResponseStatus responseStatus = e.getClass().getAnnotation(ResponseStatus.class);
            HttpStatus httpStatus = responseStatus.value();
            map.put("httpStatus",  httpStatus.getReasonPhrase());

            httpServletResponseIn.setStatus(httpStatus.value());
        }

        return map;
    }
```

This all produces JSON that looks like this along with an HTTP response code of 400.

``` javascript
{
    "requestUrl": "http://localhost:8080/controller",
    "httpStatus": "Bad Request",
    "message": "something descriptive goes here"
}
```

