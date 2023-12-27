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

- Debug info is going to STDOUT so it won't interrupt piping

## Installation

I do not publish the package, so have to install package:

~~~bash
pnpm link-build
~~~

## Usage

~~~bash
➜  ngramgenerator  master ngrams-generator -t 10 -l 3 ./README.md
thi ngr tha the top too gra ram ing typ

➜  ngramgenerator  master ngrams-generator -t 10 -l 4 -d  ./README.md
[START] Read files and build Trie
[END] Read files and build trie finished | ⌛️: 3.118833065032959 ms
---------------------------------------

[START] Generate combinations
[END] Generate combinations finished | ⌛️: 0.25254106521606445 ms
---------------------------------------

[START] Building Heap
[END] Building Heap finished, combinations: 32 | ⌛️: 0.057084083557128906 ms
---------------------------------------

[START] Retrive results
ngra that gram rams this tool numb file path typi
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

