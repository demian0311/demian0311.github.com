---
layout: post
category : programming 
tags : [programming, java8]
---

It'll continue to be interesting to see what happens with Java8.  Sure the version is
out there, you can write all the lambdas you want.  But it's going to get more fun
to see how every day coders use it and how library authors use it.

During the day I use Groovy, enjoy it's closures.  I still do a bit of Scala but not as
much as I'd like.  But at night I've been working with Java8.  

## Generic Hystrix Circuit Breaker 

From what I understand you should encapsulate the code that talks to remote systems 
inside of a class that implements a HystrixCommand.  I had a situation where there 
were a lot of little calls to a back-end system.  Creating new classes for each call 
was getting tedious.  So I endeavored to create a generic circuit breaker 
(implementation of HystrixCommand) for each dependent system.  

You just give it 2 suppliers, one for the actual thing you're trying to do and another 
as a fallback if what you're trying to do fails.  The suppliers have to adhere to the 
normal contract with circuit breakers.  If an exception bubbles up from one of your 
lambdas then the circuit breaker trips.


``` java
public class DatabaseCommand<Out> extends HystrixCommand<Out> {

    private Supplier<Out> runSupplier;
    private Supplier<Out> fallbackSupplier;

    public DatabaseCommand(
            Supplier<Out> runSupplierIn,
            Supplier<Out> fallbackSupplierIn) {
        super(CommandProvider.getSetter(CommandProvider.DB_COMMAND_KEY));

        runSupplier = runSupplierIn;
        fallbackSupplier = fallbackSupplierIn;
    }

    @Override protected Out run() throws Exception {
        return runSupplier.get();
    }

    @Override protected Out getFallback() {
        return fallbackSupplier.get();
    }
}
```

There's some hand waving with the `CommandProvider.getSetter()`, that's the 
monster set of calls where you configure your circuit breaker. 

## Using it

Then when you want to use the circuit breaker it looks something like this.

``` java
DatabaseCommand<Customer> databaseCommand = new DatabaseCommand<>(
         () -> databaseClient.findCustomer(customerId),
         () -> databaseClient.findCustomerFromCache(findCustomerId);

return databaseCommand.execute();
```

This isn't so bad.  Sure it's convenient that I have those suppliers wrapped inside
of functions already so I don't have nasty multi-line lambdas.
