type TreeNode = {
  val?: string;
  parent?: TreeNode; // head
  children: TreeNode[];
  freq: number;
  isWord: boolean;
}

class Trie {
  root: TreeNode

  constructor() {
    this.root = {val: undefined, children: [], freq: 0, isWord: false }
    this.populateRoot()
  }

  addWord(word: string) {
    let root = this.root
    let childrenNode = null

    for (let idx = 0; idx < word.length; idx++) {
      let letter = word[idx]

      childrenNode = this.findChildrenNode(root, letter)
      let lastIndex = word.length - 1 == idx
      if (childrenNode) {
        lastIndex ? childrenNode.isWord = true : false
      } else {
        childrenNode = {
          parent: root,
          val: letter,
          isWord: lastIndex,
          children: [],
          freq: 0,
        }
        root.children.push(childrenNode)
      }

      this.updateFreq(childrenNode)
      root = childrenNode
    }
  }

  findChildrenNode(node: TreeNode, letter: string): TreeNode | undefined {
    return node.children.find(n => n.val === letter);
  }

  updateFreq(node: TreeNode): void {
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

  printNode(node: TreeNode, level: number): void {
    if (node) {
      const indent = ' '.repeat(level * 2);
      console.log(`${indent}${node.val}${node.isWord ? '*' : '' }:${node.freq}`);
      for (let child of node.children) {
        this.printNode(child, level + 1); // Recursively print child nodes
      }
    }
  }

  populateRoot(): void {
    let alphabet: any = 'abcdefghijklmnopqrstuvwxyz'
    for(const l of alphabet) {
      this.root.children.push(
        {
          val: l,
          parent: this.root,
          children: [],
          freq: 0,
          isWord: false
        } as TreeNode
      )
    }
  }
}


let trie = new Trie()
trie.addWord('cat')
trie.addWord('catok')
trie.addWord('call')
trie.printTree()
