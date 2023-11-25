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
    this.root = { val: undefined, children: [], freq: 0, isWord: false }
    this.populateRoot()
  }

  addWord(word: string) {
    let root = this.root
    let childrenNode = null

    for (let idx = 0; idx < word.length; idx++) {
      let letter = word[idx]

      childrenNode = this.findChildrenNode(root,  letter)
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

      root = childrenNode
    }

    this.updateFreq(root)
  }

  findChildrenNode(node: TreeNode, letter: string): TreeNode | undefined {
    // TODO: check performace if use Array(26) and get node directly by index
    return node.children.find(n => n.val === letter);
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
