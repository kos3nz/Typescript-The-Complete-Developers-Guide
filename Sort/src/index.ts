import { Sorter } from './Sorter';
import { CharactersCollection } from './CharactersCollection';
import { NumbersCollection } from './NumbersCollection';
import { LinkedList } from './LinkedList';

// const numbers = new NumbersCollection([10, 3, -5, 0, 2]);
// const numbersSorter = new Sorter(numbers);
// numbersSorter.sort();
// console.log(numbers.data);

// const chars = new CharactersCollection('blue');
// const charsSorter = new Sorter(chars);
// charsSorter.sort();
// console.log(chars.data);

const list = new LinkedList();
list.add(9);
list.add(39);
list.add(100);
list.add(1);
list.add(-5);
const listSorter = new Sorter(list);
listSorter.sort();
list.print();
