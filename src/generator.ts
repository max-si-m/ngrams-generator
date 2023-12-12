import { readDirectory, readFile } from './crawler';
import MaxHeap from './heap';
import Trie from './trie';
import { resolve } from 'node:path'
import { Output } from './output';

const trie = new Trie();
const heap = new MaxHeap();
const map: Map<number, string[]> = new Map();
const output = new Output(); // TODO: configuration would be passed from args

let start
let stop

async function run(trie: Trie): Promise<void> {

  process.stderr.write("[START] Read files and build trie \n");

  start = performance.now();
  const _ = await readFile('./README.md', ReadFileCallback)
  const tmpMap: Map<string, number> = new Map()
  stop = performance.now();

  process.stderr.write(`[END] Read files and build trie ${stop - start} ms\n`);

  process.stderr.write('--------------------------------------\n')

  process.stderr.write("[START] Generate combinations \n");
  start = performance.now();
  trie.generateCombinations(2, tmpMap)
  stop = performance.now();
  process.stderr.write(`[END] Generate combinations ${stop - start} ms \n`);

  process.stderr.write('--------------------------------------\n')

  // get this working first, later we can optimize
  tmpMap.forEach((value: number, key: string) => {
    if (map.has(value)) {
      const words = map.get(value)
      words?.push(key)
    } else {
      map.set(value, [key])
    }
  })

  process.stderr.write("[START] building Heap \n");
  start = performance.now();
  for (const [freq, _] of map) {
    heap.insert(freq)
  }
  stop = performance.now()
  process.stderr.write(`[END] building Heap ${stop - start} ms\n`);

  process.stderr.write('--------------------------------------\n')

  //heap.drawHeap();
  //    10
  //   5  3
  //  1

  let top = 10
  while (top > 0) {
    const freq = heap.top()
    const words = map.get(freq)
    words?.forEach(word => {
      top -= 1
      output.write(`${word} `)
    })
  }
}

run(trie)

function readDirectoryCallback(dirent: any): void {
  if (dirent.isFile()) {
    readFile(resolve('./', dirent.name), ReadFileCallback);
  }

  if (dirent.isDirectory()) {
    readDirectory(resolve('./', dirent.name), readDirectoryCallback); // TODO: path building should be more complex it doesn't work for nested directories
  }
}

function ReadFileCallback(line: string): void {
  let words: string[] = parseLineByWord(line);
  words.forEach(word => { trie.addWord(word) });
}

function parseLineByWord(line: string): string[] {
  let words: string[] = []
  let word: string[] = []

  function saveWord(word: string[]): void {
    if (word.length > 1) {
      words.push(word.join(''))
    }
  }

  for(const letter of line) {
    if (isLetter(letter)) {
      if (isUpperCaseLetter(letter)) { // when we have camelCase that should count as two words
        saveWord(word)
        word = [letter.toLowerCase()]
      } else {
        word.push(letter)
      }
    } else {
      saveWord(word)
      word = []
    }
  }

  saveWord(word)
  return words
}

// create map and build heap from trie
function isLetter(character: string): boolean {
  const charCode = character.charCodeAt(0);
  return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
}

function isUpperCaseLetter(character: string): boolean {
  return character !== character.toLowerCase()
}

