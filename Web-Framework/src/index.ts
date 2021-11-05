import { User } from './models/User';

const user = new User({ name: 'Bob', age: 24 });

user.save();

// user.on('change', () => {
//   console.log('change 1');
// });
// user.on('change', () => {
//   console.log('change 2');
// });
// user.on('save', () => {
//   user.set({ age: 40 });
// });

// user.trigger('change');
// user.trigger('click');
// user.trigger('save');
// console.log(user.get('age'));
