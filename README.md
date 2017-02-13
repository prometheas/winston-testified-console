# winston-testified-logging

Configures Winston’s Console transport to send all log messages to stderr to
keep test output clean.

<img src="https://travis-ci.org/prometheas/winston-testified-console.svg?branch=master"/>


## Introduction

Good logging is an invaluable mechanism for many software projects, especially
those intended to run as local or network services.  And increasingly, as
technologies like Docker gain in popularity, those messages are commonly sent
to the console, rather than to some file.

Automated testing suites are another invaluable mechanism of modern software
projects.

But when your software logs to the console, the "noise" from its messages can
make your test output difficult to read—particularly if you develop with a watch
set up that automatically runs your tests each time you modify one of your
source files.

But if you could get all your logging messages to write to stderr, you'd be
able to enjoy clean test output by running the tests with a command like this:

```sh
# capture log messages to a file
$ npm test 2>./messages.log

# discard log messages entirely
$ npm test 2>/dev/null
```

And that's what I've designed this package to do for your project's tests.
(That is, assuming your project uses [Winston](https://www.npmjs.com/package/winston)
for its logging. 😉)


## Getting Started

First off, this is , you'll naturally want to add the package to your project:

```sh
$ npm i --save-dev winston-testified-console
```

Assuming your project's test suite already has a "bootstrap" script (if not,
and you don't know how to set this up, see [here](./docs/AddTestingBootrap.md)),
add the following line amongst its require statements:

```js
require('winston-testified-console')();
```

And run your tests, sending stderr to `/dev/null`:

```sh
$ env NODE_ENV=testing npm test 2>/dev/null
```

That was easy, right?  At least in theory; your project will likely require a
bit more work to get set up, so let's take it from the top.


### Configuring Testify

The more complex your project is, the likelier you'll need to do a bit of
configuring, by passing a config object, like so:

```js
require('winston-testified-console')(opts);
```
