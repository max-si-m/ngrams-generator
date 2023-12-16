### Ngram generator

Study project that I use to learn:
- JS & TS
- Node CLI building
- DSA: trees maybe something more like Min/Max Heap
- 10 fingers typing

I want to have a cli tool, which accept directory looks every file and builds Ngram that I can later use for https://github.com/ranelpadon/ngram-type
I see as this suppose to work the next way:

~~~bash
ngrams-generator path [length] [top] [debug] [file]
~~~

When I run next command I will receive all ngrams from app/models folder length of 3 saved in the file.

~~~bash
ngrams-generator app/models --length 3 -t 100 -f ngrams_3.txt # or pipe that into something else
~~~

~~~bash
Arguments:
  path                   Path to directory of file that should be used for generating ngrams

Options:
  -V, --version          output the version number
  -d, --debug            Output debug information
  -f, --file <path>      Output file path, if not provided output will be written into STDOUT
  -l, --length <number>  Length of generated ngrams (default: "3")
  -t, --top <number>     Number of top ngrams that should be generated (default: "10")
  -h, --help             display help for command
~~~

