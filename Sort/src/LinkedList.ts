import { Sortable } from './Sorter';

class LinkedNode {
  next: LinkedNode | null = null;

  constructor(public data: number) {}
}

export class LinkedList implements Sortable {
  head: LinkedNode | null = null;

  add(data: number): void {
    const node = new LinkedNode(data);

    if (!this.head) {
      this.head = node;
      return;
    }

    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }
    tail.next = node;
  }

  get length(): number {
    if (!this.head) return 0;

    let length = 1,
      node = this.head;

    while (node.next) {
      length++;
      node = node.next;
    }

    return length;
  }

  at(index: number): LinkedNode {
    if (!this.head) {
      throw new Error('Index out of bounds');
    }

    let counter = 0,
      node: LinkedNode | null = this.head;

    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }

    throw new Error('Index out of bounds');
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    if (!this.head) throw new Error('List is empty');

    return this.at(leftIndex).data > this.at(rightIndex).data;
  }

  swap(leftIndex: number, rightIndex: number): void {
    if (!this.head) throw new Error('List is empty');

    const leftNode = this.at(leftIndex);
    const rightNode = this.at(rightIndex);
    [leftNode.data, rightNode.data] = [rightNode.data, leftNode.data];
  }

  print(): void {
    if (!this.head) return;

    let node: LinkedNode | null = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}
