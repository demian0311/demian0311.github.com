---
layout: post
category : programming
tags : [programming, devops]
---

## DevOps
If you get into devops at a lower level you will continually run into RRDB.  RRDB stands
for Round Robin DataBase.  It's a file that you set up with a predictable size based on 
what you tell it you want to store and how long you want to retain that information.  The
consistent file size is important because even if the system you're tracking runs out of
disk space, your RRDB won't ask for more room.  The tooling around it doesn't use temp 
files or anything so your monitoring will all continue to work.  Initially I looked into 
RRDB but got a little scared I'm ashamed to say.  

At work some of my more motivated co-workers have spun up an instance of [Graphite](http://graphite.wikidot.com/).  Graphite
leverages RRDB to accept monitoring information and turn it into data and graphs that you can
render based on what you want to see.  Awesome stuff.

Recently I've been working on a talk that I've been giving that touches on devops.  In the talk I 
have some live demos for [Circuit Breakers](https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern) (using the [Hystrix](https://github.com/Netflix/Hystrix) project from [Netflix](http://www.netflix.com/)).  But
I didn't have a compelling demonstration on how to turn data, logs or metrics into graphs.  Graphite 
and other tooling seemed too heavy for a little demo during a talk.  That and I 
thought it'd be too heavy-weight for someone to play with right away.  So I decided to use
simple RRDtool to work with RRDB files in a shell script.

I'll refine my use of RRDB later to do something live on a local system.  But I wanted something
that was gathering real data from a running system to show off.  That way I didn't have to 
think about how to create synthetic data.

## My Example
My site is running on a [RackSpace](http://www.rackspace.com/) virtual machine.  My web server is [NGINX](http://wiki.nginx.org/Main).  I'm going to show
how to get some rough information out of my NGINX logs and turn that into some pictures.

You can go to the [full script in a gist](https://gist.github.com/demian0311/fc5b45cc901d36889b5e) but we'll walk through each section of a shell script.  It seemed
to make sense to me to put all these things together in one
script.  

Here we just define some variables.
```
name=neidetcher_access
rrdfile="/var/local/${name}.rrd"
imageDir="/home/demian/code/demian0311.github.com/_site"
```

### Create an RRDB

Before you get going you need to set up an RRDB.  The `--step 60` says 
we want to store things in 60 second increments.  We also tell it about
a data source that's a GAUGE.  If anything comes in after 120 seconds then
we want to discard it.  And good values will be between 0 and 1000000.  We
also say that we want to keep around an average of the last hour and an
average of the last 24 hours.  rrdtool will take care of averaging all the
updates it gets into nice averages that we can later graph.

```
   rrdtool create $rrdfile --step 60 \
      "DS:${name}:GAUGE:120:0:1000000" \
      "RRA:AVERAGE:0:1:60" \
      "RRA:AVERAGE:0:60:24"
```

So, to do this step in my script I would run this one time to set things up:

```
root@raven:~/bin# ./neidetcher_access_log.sh create
```

### Logtail & rrdtool update
Here we use logtail.  I have to admit up until 6 months ago I didn't even 
know logtail was a thing but it's pretty cool.  It reads a log file and 
keeps track of how far it got last time.  Then the next time you run it,
it'll start from that position.  It has some smarts like knowing what the 
inode is of the file.  So if the file has been replaced it'll start over
at the top.

Here we just get a line count wich roughly correlates to the number of 
requests that came into NGINx.  We get that for two log files, add them
together and shove that value into our RRDB using rrdtool.

```
   http_value=`/usr/sbin/logtail -f /var/log/nginx/neidetcher.access.log \
      -o /var/log/nginx/.neidetcher.access.log.offset | wc -l`
   https_value=`/usr/sbin/logtail -f /var/log/nginx/ssl_neidetcher.access.log \
      -o /var/log/nginx/.ssl_neidetcher.access.log.offset| wc -l`
   value=$(($http_value + $https_value))

   rrdtool update $rrdfile N:${value}
```

That capability runs once a minute from cron.

```
* * * * * /root/bin/neidetcher_access_log.sh update
```

### rrdtool graph
Now the fun part where we graph the data that we've been tracking.  The
first time we get 1 hour worth, the second time we get 24 hours worth.
We move that file into where all my static HTML is for my site and that's it.

```
		rrdtool graph ./${name}_hour.png \
		        --start end-1h \
		        DEF:${name}=${rrdfile}:${name}:AVERAGE \
		        AREA:${name}#aa5555:${name}
		mv -f ./${name}_hour.png ${imageDir}/${name}_hour.png

		rrdtool graph ./${name}_day.png \
		        --start end-24h \
		        DEF:${name}=${rrdfile}:${name}:AVERAGE \
		        AREA:${name}#aa5555:${name}
		mv -f ./${name}_day.png ${imageDir}/${name}_day.png
```

The graphing runs once a minute as well from cron.

```
* * * * * /root/bin/neidetcher_access_log.sh graph
```

## What that gets you
Okay, lots of stuff there but now we have some pretty graphs showing how 
often my site is visited.  As you can see I don't need to investigate CDN
options just yet..  My [metrics](http://neidetcher.com/metrics.html) page shows the
graphs in action.  


