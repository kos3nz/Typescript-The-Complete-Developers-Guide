import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbers = new NumbersCollection([10, 3, -5, 0, 2]);
numbers.sort();
console.log(numbers.data);

const chars = new CharactersCollection('blue');
chars.sort();
console.log(chars.data);

const list = new LinkedList();
list.add(9);
list.add(39);
list.add(100);
list.add(1);
list.add(-5);
list.sort();
list.print();
