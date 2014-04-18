---
layout: post
category : programming
tagline: "me, slowly catching up"
tags : [programming, scala, reactive programming]
---

I took another lab week to stumble around with the [Play Framework](http://www.playframework.com/).  I really 
like the way routing works, the controllers 
are nice and simple.  It has all come a long way
and I wish I could use it for my day job.  If I were
doing a green-field web-app with some APIs I'd likely 
reach for Play.

I wanted to learn a little bit more about [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming).  I'm not bought in enough to go sign the 
[reactive manifesto](http://www.reactivemanifesto.org/) quite yet.  But a lot of smart people seem to be into it so again I thought I'd look into it.  I put 
[this project up on GitHub](https://github.com/demian0311/ricochet).

## Actor

Here's [my actor](https://github.com/demian0311/ricochet/blob/master/app/actors/PersistorActor.scala).  It uses a Scala object singleton to sort of simulate some 
back-end persistence.  

``` scala
package actors

import akka.actor.Actor
import utils._
import play.api.mvc.Results

class PersistorActor extends Actor with Results {

  def receive = {
    case TimerEventPost(path, TimerEvent(duration, dateTime)) => {
      GaugePersistence.persist(TimerEventPost(path, TimerEvent(duration, dateTime)))
    }
    case TimerEventRequest(path) => {
      sender.forward(GaugePersistence.report(TimerEventRequest(path)))
    }
  }
}
```

## Controller/ Actor Client 

Below is my Play Framework controller ([full source](https://github.com/demian0311/ricochet/blob/master/app/controllers/ReactiveGauge.scala)) that creates a pool of actors.
I'm thankful that [Evil Monkey Labs](http://blog.evilmonkeylabs.com/2013/01/17/Distributing_Akka_Workloads_And_Shutting_Down_After/)
posted some code on how to easily create a pool of Actors.
The Akka documentation wasn't very straight-forward to me.  I have to admit I didn't
read it end to end, I was doing more random access.

``` scala
implicit val timeout = Timeout(10000)

val system = ActorSystem("SimpleSystem")
val persistorActor: ActorRef = system.actorOf(Props[PersistorActor].withRouter(
    RoundRobinRouter(nrOfInstances = 100)
), name = "simpleRoutedActor")
```

This is the actor usage example that you always see.  This is async, fire and
forget.  This goes right on a different thread so the actor can do it's work.

``` scala
persistorActor ! TimerEventPost(path, TimerEvent(durationOpt.get))
```

This is the less than typical way of using actors.  We actually want to get 
a response here.  This uses the implicit timeout from above. 

``` scala
persistorActor.ask(TimerEventRequest(path)).mapTo[SimpleResult]
```

## More stuff to learn

Here are some things that I think I need to learn with respect to Akka and actors.

- dependency injection with actors [scaldi](http://scaldi.org/Scaldi.html) seems to be a good solution
- creating a hierarchy of actors
- configuring actor pools and dispatching
- remoting Actors
- handling dead letter situations
