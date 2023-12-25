import Trie from '../src/trie'

test('Trie#addWord', () => {
  const trie = new Trie()
  trie.addWord('hello')
  const hNode = trie.root.children[0]

  expect(hNode.val).toBe('h')
  expect(hNode.freq).toBe(1)
  expect(hNode.children.length).toBe(1)
})


test('Trie#', () => {
  const trie = new Trie()
  trie.addWord('cat')
  trie.addWord('cats')
  trie.addWord('car')
  trie.addWord('care')
  trie.addWord('cool')

  const resultMap: Map<string, number> = new Map()
  trie.generateCombinations(2, resultMap)

  expect(Array.from(resultMap.keys())).toEqual(['ca', 'co', 'at', 'ar', 'ts', 're', 'oo', 'ol'])
})
