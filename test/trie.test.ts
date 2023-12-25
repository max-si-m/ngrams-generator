import Trie from '../src/trie'

test('Trie#addWord', () => {
  const trie = new Trie()
  trie.addWord('hello')
  const hNode = trie.root.children[0]

  expect(hNode.val).toBe('h')
  expect(hNode.freq).toBe(1)
  expect(hNode.children.length).toBe(1)
})
