---
layout: post
category : programming
tagline: "when good enough is good enough"
tags : [java, osx]
---

Me and another team member took our most recent lab week to do something incredibly un-sexy.  Our resumes have no new libraries, buzz-words or languages that we can add.  We decided to use some old-school tools to create a very tactical set of smoke tests for our system and for the back-end systems that we depend on.

[![smoke_test_console](https://farm9.staticflickr.com/8378/8546486548_66de3d31dc.jpg)](http://www.flickr.com/photos/neidetcher/8546486548/)

Our system is used by many clients.  When we get requests we then turn around and talk to about 20 different back-end systems.  Many times we are caught in the middle when there are anomalies found by our clients.  When this happens we have to turn to the logs to see if there's a problem with a system we depend on.  We also didn't have much visibility when our systems were not acting as they should. The principle is this.  Create a shell script that will run a bunch of other shell scripts in a directory.  If the script sends back an exit status that is bad (other than 1) we will consider that test failed.  The runner has a simple check for that and will echo PASS/ FAIL based on what we get back.  We also color the text green or red based on the results.  3/4 of my career has been about making red things green. 

[![smoke_test_html](https://farm9.staticflickr.com/8531/8546486586_752877ecc9.jpg)](http://www.flickr.com/photos/neidetcher/8546486586/)

The output is so simple that my wife looked at a screen with a bunch of red and said, "that doesn't look good."  I'm not sure if we'll opensource it, there isn't much intellectual property to speak of.  We decided to set up the scripts to run in a cron job once an hour and generate an HTML report showing the same type of data.

We set a low bar on the smoke tests, sometimes they use cURL to POST a SOAP request and we just look at the response to see a specific piece of information is present.  Sometimes we just use NMAP to convince us that the port is warm on the far end and NMAP at least thinks it's the right type of application.  The idea is that these tests should be written in 5 minutes.

We're not sure how these will be used.  We hope that folks that support operations (including developers) will see new problems that come up not only as an opportunity to diagnose the matter at hand but to also add another smoke test that will give us a more clear indication of the problem the next time around. 

This was an incredibly tactical bit of software that won't win us any design awards but it has already paid off a handful of times.  I regret that we didn't put something together like this sooner.  
