# Adding Testing Bootstrap

Here's a look at how you can add a testing bootstrap for your tests in various
popular testing frameworks.


## Mocha

The [Mocha](http://mochajs.org/#mochaopts) test framework does not feature a "standard"
location for a bootstrap script, so we'll need to tell it to require one using
either a config file or explicit cli args.

Assuming your project uses the Mocha-standard `./test` directory to keep all of
its test scripts, start by creating the script at `./test/bootstrap.js`.

You can get Mocha to load this file before executing its test scripts by using
the `--require` options (aliased as `-r`), as follows:

```sh
$ mocha -r ./test/bootstrap.js ./test/*.spec.js
```

[You can also](http://mochajs.org/#mochaopts) create a `./test/mocha.opts` file
that includes the following line:

```
# ./test/mocha.opts
--require ./test/bootstrap.js
```


## Jasmine

The [Jasmine](https://jasmine.github.io/) test framework [has a native concept
of a bootstrap file](https://jasmine.github.io/2.5/boot.html).
