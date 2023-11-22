### Ngram generator

Study project that I use to learn:
- JS & TS
- Node CLI building
- DSA: trees maybe something more like Min/Max Heap
- 10 fingers typing

I want to have a cli tool, which accept directory looks every file and builds Ngram that I can later use for https://github.com/ranelpadon/ngram-type
I see as this suppose to work the next way:

~~~bash
ngrams-generator [path] [length] [output]
~~~

When I run next command I will receive all ngrams from app/models folder length of 3 saved in the file.

~~~bash
ngrams-generator app/models --length 3 -o ngrams_3.txt # or pipe that into something else
~~~
