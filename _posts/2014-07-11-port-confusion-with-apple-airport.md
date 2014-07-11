---
layout: post
category : programming
tags : [programming]
---

This won't add anything to the knowledge that [already exists online](http://blog.nephtaliproject.com/?p=129) but 
hopefully it's more searchable for the next poor sap that is confused by this.

## Locking Down my Server 

[This site](http://neidetcher.com) runs on a tiny [Rackspace](http://www.rackspace.com/) server.  I'm no expert but 
one of the easiest things you can do to lock down your server is to shut down as many ports as possible.  That 
means that you don't have potentially vulnerable software listening in on ports.  

You'll probably do some `nmap`.

```
demian@raven ~>nmap localhost

Starting Nmap 5.00 ( http://nmap.org ) at 2014-07-11 09:51 CDT
Interesting ports on localhost (127.0.0.1):
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 0.10 seconds
```

And maybe some `netstat`.

```
demian@raven ~>netstat -l
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 *:https                 *:*                     LISTEN     
tcp        0      0 *:www                   *:*                     LISTEN     
tcp        0      0 *:ssh                   *:*                     LISTEN     
tcp6       0      0 [::]:ssh                [::]:*                  LISTEN     
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  2      [ ACC ]     STREAM     LISTENING     83108    /var/run/acpid.socket
```

I checked it locally and noticed that `exim4` was running and had a port open.  So I made sure that service was no
longer in the startup scripts and [removed the daemon](https://wiki.debian.org/Daemon).

## Now Try from Laptop

Just to be sure I ran it from `nmap` from my laptop.  This is what I saw.
 
```
demian  ~  nmap neidetcher.com

Starting Nmap 6.40 ( http://nmap.org ) at 2014-07-11 09:30 CDT
Nmap scan report for neidetcher.com (184.106.150.226)
Host is up (0.057s latency).
rDNS record for 184.106.150.226: foo.com
Not shown: 992 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
554/tcp  open  rtsp
3128/tcp open  squid-http
7070/tcp open  realserver
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 0.87 seconds
```

Whoah, that's a lot of ports.  Obviously some hacker syndicate from Eastern Europe has replaced my version of `nmap`
such that it doesn't show the ports they have used to turn my server into a slave for 
their [botnet](https://en.wikipedia.org/wiki/Botnet).

## Apple Airport

I ran across [this blog post](http://blog.nephtaliproject.com/?p=129).  The deal is that Apple Airport will 
try to proxy protocols for you.  Apparently it doesn't bother to check with the far-end servers to see if the
port is even available.  So, to you on your computer behind an Apple router, `nmap` will think the port is hot.

