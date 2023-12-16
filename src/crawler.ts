import { open, opendir } from 'node:fs/promises'
import { resolve } from 'node:path'

export async function readDirectory(name: string, callback: Function) {
  try {
    const dir = await opendir(name);
    for await (const dirent of dir){
      callback(dirent)
    }
  } catch (err) {
    console.error(err);
  }
}

export async function readFile(fileName: string, callback: Function) {
  try {
    const file = await open(fileName);
    for await (const line of file.readLines()) {
      callback(line)
    }
  } catch (err){
    console.log(err)
  }
}

export function parseLineByWord(line?: string): string[] {
  let words: string[] = []
  let word: string[] = []

  if (!line) {
    return words
  }

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

function isLetter(character: string): boolean {
  const charCode = character.charCodeAt(0);
  return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
}

function isUpperCaseLetter(character: string): boolean {
  return character !== character.toLowerCase()
}

// async function test(){
//   //await readFile('./package.json', (line: string) => {
//   //  console.log(line)
//   //  console.log('------')
//   //});
//
//   await readDirectory('./', (dirent: any) => {
//     console.log(dirent,dirent.isDirectory())
//     console.log('-----')
//
//     // if (dirent.isDirectory()){
//     //   readDirectory(resolve('./', dirent.name), (dirent: any) => {
//     //     console.log(dirent,'is directory', dirent.isDirectory())
//     //     console.log('-----')
//     //   })
//     // }
//
//     if (dirent.isFile()){
//       readFile(resolve('./', dirent.name), (line: string) => {
//         console.log(line)
//         console.log('read file------')
//       });
//     }
//   })
// }
//
// test()
