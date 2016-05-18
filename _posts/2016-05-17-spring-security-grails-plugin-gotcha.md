---
layout: post
category : programming 
tags : [programming, grails, spring]
---

## Spring Security Grails Plugin 

Alright, our hero is doing a Grails application and wants some security in a brand new Grails 3.1.6 
application.  Good thing there's a plugin for that and I can move onto the next thing right away.  Oh
 you sweet summer child.

Add the dependency in `build.gradle`:

``` groovy
dependencies {
    compile 'org.grails.plugins:spring-security-core:3.1.1'
    ...
}
```

Then I run the associated script to create the domain objects that are going to manage the
security like this:

```
grails s2-quickstart com.yourapp User Role --groupClassName=RoleGroup
```

Blissfully ignorant and following along with the documentation I charged forward.  Next up 
you quick data for development to associate the user to the role in `BootStrap.groovy`:

``` groovy
User dneidetcher = new User(
        username: 'dneidetcher',
        firstName: 'Demian',
        lastName: 'Neidetcher',
        emailAddress: "demian0311@gmail.com",
        password: "foo").save(flush: true)

UserRole.create(dneidetcher, adminRole)

UserRole.withSession {
    it.flush()
    it.clear()
}
```

Then I apply my annotation on a controller so that I can allow access to it based on role:

``` groovy 
package foo

import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_ADMIN')
class UserController {
    static scaffold = User
}
```

## Identifying the Problem 

Then you navigate to [http://localhost:8080/user](http://localhost:8080/user) and you 
get _Sorry, you're not authorized to view this page_ and nothing really more helpful than that.

Turns out that our sad story really began when we added this `--groupClassName=RoleGroup` to 
the `s2-quickstart` command we used to generate the code.  The net of it is that my `BootStrap.groovy` code
that associated `User` to `Role` was insufficient.  The group stuff wants you to associate a `Group` with
a `Role` and then a `User` with that `Group` to get anything done.  That's all fine but it's a layer of
indirection I don't think I need.  It took me over 3 hours to figure this out.

## The Fix

Well in the first place I should have done this for my `s2-quickstart` command.  That would have avoided the headache. 

```
grails s2-quickstart com.yourapp User Role 
```

But in my case I wanted to attempt to back out of the mess so this is what I did.

In `User` you need to change this function to this implementation:

``` groovy
Set<Role> getAuthorities() {
    UserRole.findAllByUser(this)*.role
}
```

In `application.groovy` you need to change this attribute to be false:

``` groovy
grails.plugin.springsecurity.useRoleGroups = false
```

And you need to remove all of the Spring Security Plugin generated domain objects that have the word `Group` 
in them.  After that things worked as expected, Spring Security worked with my annotations.  So yeah, maybe 
not so much a _gotcha_ but me not knowing Spring Security well enough.  Regardless, onward and upward.
