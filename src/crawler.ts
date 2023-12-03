import {open, opendir} from 'node:fs/promises'

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
