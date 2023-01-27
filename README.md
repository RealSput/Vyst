# Vyst
NLP made easier and size-efficient.

# Info
Vyst is a tool that lets you write grammar for NLP (Natural Language Processing) and run it.

Its goal is to make AI training much easier by making a format that a human can easily read and edit, and sizing down the size of files.

# Tutorial
You can use the Vyst CLI, or the Vyst API. The choice does not matter but the CLI is preferred.

First, you will have to write your Vyst grammar. It is quite simple and easy to learn.

The way that it works is: you make a category using the `CRCAT` command, then provide arguments.

The first argument is the category, but then the rest are your strings which will be added to your category (please DO NOT separate this WITHOUT a comma and a space afterwards, it is required for your code to be read).

`CRCAT greetings.bye "Goodbye", "I'm out, peace!", "Bye", "Good night"`

You can now write your responses for your category (using `RESCAT`). It works the same way, except there are only two arguments:

`RESCAT greetings.bye "Goodbye."`

Now every time your AI detects that you are saying goodbye, it will respond with "Bye, user!".
Congrats! Now you have a simple AI that detects when you are saying goodbye.

(To see the full example, go to [examples/greetings.vstt](examples/greetings.vstt)).

Now you can use your grammar to run AI.

## CLI
First, download the tool using NPM (link: comig soom)
To compile a Vyst text program to a Vyst program, you will need to use the `compile` subcommand.

For example:
```
vyst compile my_data.vstt the_output.vstf
```

Now you are able to run your Vyst program.

You will need to input the file to use, and the input to test it on.

Run:
```
vyst execute the_output.vstf "Hello, World!"
```
It should output with "Hello." if you downloaded the greetings example.

You can then use `vyst decompile the_output.vstf decompiled.vstt` to decompile your compiled grammar.
## Programmatical API
You can also use the programmatical API to make NLP in code simpler.
Here is an example:
```js
import * as fs from 'fs';
import vyst from 'vyst';

const grammar = await vyst.quickRead('greeting.vstt'); // Use vyst.quickRead to load huge grammar quickly
const compiled = vyst.compile(grammar); // Compiles Vyst text to Vyst format
let res = await vyst.execute(compiled, "Hello!"); // executes grammar
console.log(res); // Logs the result of executed grammar
```kj