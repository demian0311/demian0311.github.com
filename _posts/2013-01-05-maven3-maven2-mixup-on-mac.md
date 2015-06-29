---
layout: post
category : programming
tagline: "resolving some confusion"
tags : [maven, osx]
---

At first my Mac was all:

      ~/opt/maven/bin>mvn --version  
      Exception in thread "main" java.lang.NoClassDefFoundError: org/codehaus/plexus/classworlds/launcher/Launcher  
      Caused by: java.lang.ClassNotFoundException: org.codehaus.plexus.classworlds.launcher.Launcher  
      at java.net.URLClassLoader$1.run(URLClassLoader.java:202)  
      at java.security.AccessController.doPrivileged(Native Method)  
      at java.net.URLClassLoader.findClass(URLClassLoader.java:190)  
      at java.lang.ClassLoader.loadClass(ClassLoader.java:306)  
      at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:301)  
      at java.lang.ClassLoader.loadClass(ClassLoader.java:247)

And then I'm like (in my ~/.bashrc)

      export M3_HOME=$OPT/maven  
      export M2\_HOME=$M3\_HOME  
      export PATH=$M3_HOME/bin:$PATH

So now it's all:

      ~/opt/maven/bin>./mvn --version  
      Apache Maven 3.0.4 (r1232337; 2012-01-17 02:44:56-0600)  
      Maven home: /Users/demian/opt/maven  
      Java version: 1.6.0_37, vendor: Apple Inc.  
      Java home: /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home  
      Default locale: en_US, platform encoding: MacRoman  
      OS name: "mac os x", version: "10.8.2", arch: "x86_64", family: "mac"  
