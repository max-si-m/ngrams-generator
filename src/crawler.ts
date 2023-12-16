import { open, opendir } from 'node:fs/promises'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'

export default class Crawler {
  run(path: string, readFileCallback: Function): Promise<void> {
    if (!path) {
      throw new Error('Path is required')
    }

    if (statSync(path).isDirectory()){
      return this.readDirectory(path, readFileCallback)
    } else {
      return this.readFile(path, readFileCallback)
    }
  }

  async readDirectory(directoryPath: string, callback: Function) {
    try {
      const dir = await opendir(directoryPath);
      for await (const dirent of dir){
        await this.run(resolve(directoryPath, dirent.name), callback)
      }
    } catch (err) {
      console.error(err);
    }
  }

  async readFile(fileName: string, callback: Function) {
    try {
      const file = await open(fileName);
      for await (const line of file.readLines()) {
        callback(line)
      }
    } catch (err){
      console.log(err)
    }
  }

  parseLineByWord(line?: string): string[] {
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
      if (this.isLetter(letter)) {
        if (this.isUpperCaseLetter(letter)) { // when we have camelCase that should count as two words
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

  isLetter(character: string): boolean {
    const charCode = character.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  }

  isUpperCaseLetter(character: string): boolean {
    return character !== character.toLowerCase()
  }
}

