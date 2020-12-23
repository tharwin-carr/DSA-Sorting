const LinkedList = require('./LinkedList');
const _Node = require('./LinkedList');
const {swap} = require('./sortfunctions');

/* Understanding Merge Sort
 Numbers = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]
 List after 3 recursions = [21, 1] [26, 45], [29, 28], [2, 9], [16, 49], [39, 27], [43, 34], [46, 40]
 List after 16 recursions = [1, 2, 9, 16, 21, 26, 27, 28, 29, 34, 39, 40, 43, 45, 46, 49]
 first 2 lists to be merged = [21, 1]
 lists merged on 7th recursion = [43, 34]
*/

/* Understanding Quick Sort 
    Number Set 1 = [3 9 1 14 17 24 22 20]
    Pivot 17, Not 14 = Incorrect, pivot could potentially be both of these numbers since all other values can be sorted higher or lower.
    Pivot 17 || 14 = True, due to the same explanation as above- all other values can be sorted above or below Pivot 17 or Pivot 14. 
    Neither 17 or 14 as Pivot = False, other values contain greater/lesser than values on either sides of them. 
    Pivot 14, Not 17 = False, pivot can be both values due to the reasons stated in the first two answers. 
    Number Set 2 = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
    Last Item as Pivot =
    Partition 1: [10, 17, 13, 15, 19, 14, 3, 16, 9, 12]
    Partition 2: [10, 3, 13, 15, 19, 14, 17, 16, 9, 12]
    First Item as Pivot = 
    Partition 1: [14, 13, 17, 15, 19, 10, 3, 16, 9, 12]
    Partition 2: [14, 13, 10, 15, 19, 17, 3, 16, 9, 12]
*/

// Implement QuickSort 
function qSort(arr, start = 0, end = arr.length) {
    if (start >= end) {
        return arr;
    }

    const middle = partition(arr, start, end);
    array = qSort(arr, start, middle);
    array = qSort(arr, middle + 1, end);

    console.log(arr);
    return arr;
}

function partition(arr, start, end) {
    const pivot = arr[end - 1];
    let j = start;

    for (let i = start; i < end - 1; i++) {
        if (arr[i] <= pivot) {
            swap(arr, i, j);
            j++;
        }
    }

    swap(arr, end - 1, j);
    return j;
}

// Merge Sort
function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);

    return merge(left, right, array);
}

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }

    return array;
}

const data = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ');
const dataSet = data.map(num => parseInt(num));

// console.log(qSort(dataSet));
// console.log(mSort(dataSet));

// Sort Linked List W/ Merge Sort
function sortedLinkedLists(head) {
    if (head === null || head.next !== null) {
        return head;
    }

    let prev = null;
    let chunk1 = head;
    let chunk2 = head; 

    while (chunk1 !== null && chunk2.next !== null) {
        chunk1 = fast.next.next;
        prev = chunk2;
        chunk2 = chunk2.next;
    }

    prev.next = null;

    const firstList = sortedLinkedLists(chunk1);
    const secondList = sortedLinkedLists(chunk2);

    return mergeLinkedLists(firstList, secondList);
}

function mergeLinkedLists(list1, list2) {
    const head = new _Node();
    let current = head; 

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        }
        else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    current.next = list1 === null ? list2 : list1;
    return head.next;
}

function main() {
    let SortedList = new LinkedList();

    SortedList.insertFirst(1);
    SortedList.insertLast(7);
    SortedList.insertLast(4);
    SortedList.insertLast(6);
    SortedList.insertLast(2);

    console.log(JSON.stringify(sortedLinkedLists(SortedList.head)));
}

main();

// Bucket Sort
function bucketSort(arr, min, max) {
    const buckets = Array((max - min) + 1).fill(0);

    let bucket; 

    for (let i = 0; i < arr.length; i++) {
        bucket = arr[i] - min;
        buckets[bucket] += 1;
    }

    const results = [];

    for (let i = 0; i < buckets.length; i++) {
        let total = buckets[i];
        let num = i + min;

        for (let j = 0; j < total; j++) {
            results.push(num);
        }
    }
    return results;
}

console.log(bucketSort([5, 19, 10, 20, 4, 7, 25, 30, 25, 6, 3, 2, 1], 1, 30));

// Sort in Place
function sortInPlace(arr) {
    let randomOrder; 

    for (let i = 0; i < arr.length; i++) {
        randomOrder = Math.floor(Math.random() * arr.length);
        swap(arr, i, randomOrder);
    }
    return arr;
}

console.log(sortInPlace([2,4,6,8,10,12,14]));

// Book Sort
function bookSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = bookSort(left);
    right = bookSort(right);

    return mergeBooks(left, right, array);
}

function mergeBooks(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let output = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (alphabeticalSort(left[leftIndex], right[rightIndex])) {
            array[output++] = left[leftIndex++];
        }
        else {
            array[output++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[output++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[output++] = right[i];
    }

    return array;
}

function alphabeticalSort(str1, str2, charIndex = 0) {
    let parsedStr1 = str1.toLowerCase().charCodeAt([charIndex]);
    let parsedStr2 = str2.toLowerCase().charCodeAt([charIndex]);
    
    if (str1 === str2) {
        return true;
    }

    if (parsedStr1 < parsedStr2) {
        return true;
    }
    else if (parsedStr1 > parsedStr2) {
        return false;
    }
    else {
        return alphabeticalSort(str1, str2, charIndex + 1);
    }
}

const books = [
    "The Hobbit",
    "To Kill A Mockingbird",
    "The Shining",
    "American Gods",
    "Sharp Objects",
    "Little Fires Everywhere",
    "1984",
    "1Q84",
    "The Last Wish",
    "The Grapes of Wrath",
    "Lord of the Flies",
    "Gone Girl"
];

console.log(bookSort(books));