export default class MaxHeap {
  public length: number;
  public data: number[];

  constructor() {
    this.length = 0
    this.data = []
  }

  insert(val: number) {
    this.data[this.length] = val
    this.heapifyUp(this.length)
    this.length += 1 
  }
   
  delete(): number {
    if (this.length === 0)
      return -1;
    
    const out = this.data[0]
    this.length -= 1
    if (this.length === 0) {
      this.data = []
      return out;
    }
    
    this.data[0] = this.data[this.length]
    this.data.pop() // we set last leaf as root so we have to remove last node
    this.heapifyDown(0)
    return out;
  }

  drawHeap(): void {
    const levels = Math.ceil(Math.log2(this.length + 1));
    const lastLevelWidth = Math.pow(2, levels - 1);

    let currentIndex = 0;
    for (let i = 0; i < levels; i++) {
      const levelWidth = Math.pow(2, i);
      const padding = lastLevelWidth / levelWidth;
      const row = this.data.slice(currentIndex, currentIndex + levelWidth);

      console.log(" ".repeat(padding / 2), row.join(" ".repeat(padding)), " ".repeat(padding / 2));
      currentIndex += levelWidth;
    }
  }
  
  private heapifyDown(idx: number): void {
    const leftChildIndex = this.leftChild(idx);
    const rightChildIndex = this.rightChild(idx);
    let largest = idx;

    if (leftChildIndex < this.length && this.data[leftChildIndex] > this.data[largest]) {
      largest = leftChildIndex;
    }

    if (rightChildIndex < this.length && this.data[rightChildIndex] > this.data[largest]) {
      largest = rightChildIndex;
    }

    if (largest !== idx) {
      this.swap(largest, idx);
      this.heapifyDown(largest);
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const pIdx = this.parentIdx(idx)
    const pVal = this.data[pIdx]
    const cVal = this.data[idx]

    if (cVal > pVal) {
      this.swap(pIdx, idx)
      this.heapifyUp(pIdx) 
    }
  }

  private parentIdx(idx: number): number {
    return Math.floor((idx - 1) / 2)
  }
  
  private leftChild(idx: number): number {
    return 2*idx + 1;
  }

  private rightChild(idx: number): number {
    return 2*idx + 2;
  }
}

//// 2,7,26,25,19,17,1,90,3,36
//const maxHeap = new MaxHeap()
//const data = [2,7,26,25,19,17,1,90,3,36]
//
//for(const n of data) {
//  maxHeap.insert(n)
//}
//maxHeap.drawHeap()
//maxHeap.delete()
//maxHeap.drawHeap()
