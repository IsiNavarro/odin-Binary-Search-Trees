class Node {
  constructor(value = null, left = null, right = null) {
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
  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    node.value < value
      ? (node.right = this.insert(value, node.right))
      : (node.left = this.insert(value, node.left));
    return node;
  }
  #minValue(node) {
    let minv = node.value;
    while (node.left != null) {
      minv = node.left.value;
      node = node.left;
    }
    return minv;
  }
  delete(value, node = this.root) {
    if (node === null) return node;
    if (node.value < value) node.right = this.delete(value, node.right);
    else if (node.value > value) node.left = this.delete(value, node.left);
    else {
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      node.value = this.#minValue(node.right);
      node.right = this.delete(value, node.right);
    }
    return node;
  }
  find(value, node = this.root) {
    if (!node) return 'Not found';
    if (node.value === value) return node;
    return value < node.value
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
}

//SPACE
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
