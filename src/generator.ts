import { parseLineByWord, readFile, readDirectory } from './crawler';
import { resolve } from 'node:path';
import MaxHeap from './heap';
import Trie from './trie';
import Output from './output';

let start
let stop

const trie: Trie = new Trie();
const heap: MaxHeap = new MaxHeap();
const mapHeap: Map<number, string[]> = new Map();

export class Generator {
  path: string
  debug: boolean
  file?: string
  length: number
  top: number
  private output: Output

  constructor(path: string, length: number, top: number, debug: boolean, output: Output, file?: string) {
    this.path = path
    this.debug = debug
    this.file = file
    this.length = length
    this.top = top
    this.output = output
  }

  run = async (): Promise<void> => {
    if (this.length < 2) {
      throw new Error('Length must be greater than 1')
    }

    if (this.top < 1) {
      throw new Error('Top must be greater than 0')
    }

    this.consoleLogger("Read files and build trie");
    start = performance.now();
    const _ = await readFile(this.path, this.readFileCallback)

    const tmpMap: Map<string, number> = new Map()
    stop = performance.now();
    this.consoleLogger("Read files and build trie finished", true, stop - start);

    this.consoleLogger("Generate combinations");
    start = performance.now();
    trie.generateCombinations(this.length, tmpMap)
    stop = performance.now();
    this.consoleLogger("Generate combinations finished", true, stop - start);

    // get this working first, later we can optimize
    tmpMap.forEach((value: number, key: string) => { if (mapHeap.has(value)) { const words = mapHeap.get(value)
      words?.push(key)
    } else {
        mapHeap.set(value, [key])
      }
    })

    this.consoleLogger("Building Heap");
    start = performance.now();
    for (const [freq, _] of mapHeap) {
      heap.insert(freq)
    }
    stop = performance.now()
    this.consoleLogger("Building Heap finished", true, stop - start);

    this.consoleLogger("Retrive results");
    while (this.top > 0 && heap.length > 0) {
      const freq = heap.top()
      const words = mapHeap.get(freq)
      words?.forEach(word => {
        if (this.top === 0) {
          return
        }

        this.top -= 1
        this.output.write(`${word} `)
      })
    }
    this.output.write('\n')
  }

  readFileCallback(line: string): void {
    let words: string[] = parseLineByWord(line);
    words.forEach(word => { trie.addWord(word) });
  }

  readDirectoryCallback(dirent: any): void {
    if (dirent.isFile()) {
      readFile(resolve('./', dirent.name), this.readFileCallback);
    }

    if (dirent.isDirectory()) {
      readDirectory(resolve('./', dirent.name), this.readDirectoryCallback); // TODO: path building should be more complex it doesn't work for nested directories
    }
  }

  consoleLogger(text: string, end: boolean = false, time?: number): void {
    if (!this.debug) {
      return
    }

    if (end) {
      process.stderr.write('[END] ')
    } else {
      process.stderr.write('[START] ')
    }

    process.stderr.write(text)

    if(time) {
      process.stderr.write(` ${time} ms`)
    }

    process.stderr.write('\n')

    if (end) {
      process.stderr.write('---------------------------------------\n\n')
    }
  }
}
