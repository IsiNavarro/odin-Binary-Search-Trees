class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  #removeDuplicates(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }
  #mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(this.#mergeSort(left), this.#mergeSort(right));

    function merge(l, r) {
      let result = [];
      let lIndex = 0;
      let rIndex = 0;

      while (lIndex < l.length && rIndex < r.length) {
        if (l[lIndex] < r[rIndex]) {
          result.push(l[lIndex]);
          lIndex++;
        } else {
          result.push(r[rIndex]);
          rIndex++;
        }
      }
      return result.concat(l.slice(lIndex), r.slice(rIndex));
    }
  }

  buildTree(array) {
    array = this.#removeDuplicates(array);
    array = this.#mergeSort(array);

    const start = 0;
    const end = array.length;
    if (start === end) return null;

    const mid = Math.floor((start + end) / 2);

    const leftArray = array.slice(start, mid);
    const rightArray = array.slice(mid + 1);
    const root = new Node(array[mid]);

    root.left = this.buildTree(leftArray);
    root.right = this.buildTree(rightArray);

    return root;
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(array);
prettyPrint(myTree.root);
