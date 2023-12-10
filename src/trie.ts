type TrieNode = {
  val: string;
  parent?: TrieNode; // head
  children: TrieNode[];
  freq: number;
  isWord: boolean;
}

type CombinationResult = {
  combination: string,
  freq: number
}

export default class Trie {
  root: TrieNode

  constructor() {
    this.root = { val: '', children: [], freq: 0, isWord: false }
  }

  addWord(word: string) {
    let root = this.root
    let childrenNode = null

    for (let idx = 0; idx < word.length; idx++) {
      let letter = word[idx]

      childrenNode = this.findChildrenNode(root,  letter)
      if (!childrenNode) {
        childrenNode = {
          parent: root,
          val: letter,
          isWord: false,
          children: [],
          freq: 0,
        }
        root.children.push(childrenNode)
      }

      root = childrenNode
    }

    if (childrenNode)
      childrenNode.isWord = true
    this.updateFreq(root)
  }

  findChildrenNode(node: TrieNode, letter: string): TrieNode | undefined {
    // TODO: check performace if use Array(26) and get node directly by index
    return node.children.find(n => n.val === letter);
  }

  // TODO: this do not work, no sliding windown, should fix, but lets come back later to this
  generateCombinations(targetLength: number, resultMap: Map<string, number>): void {
    function dfs(node: TrieNode, currentSubstring: TrieNode[]) {
      if (!node) return;

      if (currentSubstring.length === targetLength) {
        const res = buildResultStringWithFreq(currentSubstring);
        const freq = resultMap.get(res.combination) || 0;
        resultMap.set(res.combination, freq + res.freq); // but this should in revers order Map<freq, string>

        currentSubstring.splice(0, 1);
      }

      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        if (childNode) {
          currentSubstring.push(childNode);
          dfs(childNode, currentSubstring);
        }

        currentSubstring.pop()
      }
    }

    dfs(this.root, []);

    // maybe extract to separate function
    function buildResultStringWithFreq(tmpRes: TrieNode[]): CombinationResult {
      const res: string[] = new Array(tmpRes.length)
      let freq: number = 0

      for(let i = 0; i < tmpRes.length; i++) {
        res.push(tmpRes[i].val!)
        freq += tmpRes[i].freq
      }

      return { combination: res.join(''), freq: freq }
    }
  }

  // Remove word from the trie
  // c - a - t* - s*
  //       - r*
  remove(word: string): void {
    let root = this.root
    let childrenNode = null

    for (let idx = 0; idx < word.length; idx++) {
      let letter = word[idx]

      childrenNode = this.findChildrenNode(root, letter)
      if (!childrenNode) {
        return
      }

      root = childrenNode
    }

    // if we have children we can not remove node
    let cParent = childrenNode?.parent
    while (cParent) {
      if (childrenNode?.children.length === 0 && cParent) {
        let idx = cParent.children.indexOf(childrenNode)
        cParent.children[idx] = cParent.children[cParent.children.length - 1] // set last node instead of children node instead of swapping
        cParent.children.pop() // pop duplicate letter
      }
      childrenNode = cParent
      cParent = cParent.parent
    }
  }

  search(word: string): boolean {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let childrenNode = this.findChildrenNode(node, word[i])
      if (!childrenNode)
        return false

      node = childrenNode
    }

    return node?.isWord
  }

  private updateFreq(node: TrieNode): void {
    node.freq += 1

    if (node.parent)
      this.updateFreq(node.parent)
  }

  printTree(): void {
    for (const node of this.root.children) {
      if (node.children.length) {
        this.printNode(node, 0); // Start printing from the root node
      }
    }
  }

  private printNode(node: TrieNode, level: number): void {
    if (node) {
      const indent = ' '.repeat(level * 2);
      console.log(`${indent}${node.val}${node.isWord ? '*' : '' }:${node.freq}`);
      for (let child of node.children) {
        this.printNode(child, level + 1); // Recursively print child nodes
      }
    }
  }
}

// const trie = new Trie()
//
// trie.addWord('cat')
// trie.addWord('cats')
// trie.addWord('car')
// trie.addWord('crane')
// trie.addWord('cartoon')
// trie.addWord('cool')
//
// trie.printTree()
// // lets do this in simple way
// let resMap: Map<string, number> = new Map()
// trie.generateCombinations(2, resMap)
//
// console.log(resMap)
