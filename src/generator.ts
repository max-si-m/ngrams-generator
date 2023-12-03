import { readDirectory, readFile } from './crawler';
import MaxHeap from './heap';
import Trie from './trie';
import { resolve } from 'node:path'

const trie = new Trie();
const heap = new MaxHeap();
const map: Map<number, string[]> = new Map();

async function run(trie: Trie): Promise<void> {
  const _ = await readDirectory('./', readDirectoryCallback)
  trie.printTree();
}

run(trie)

function readDirectoryCallback(dirent: any): void {
  if (dirent.isFile()) {
    readFile(resolve('./', dirent.name), ReadFileCallback);
  }

  if (dirent.isDirectory()) {
    readDirectory(resolve('./', dirent.name), readDirectoryCallback); // path building should be more complex
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
      if (isUpperCaseLetter(letter)) {
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

