import { User } from './models/User';

const user = new User({ id: 1, name: 'Steven', age: 21 });

// Because "on" method on the Eventing class is returned by getter, it can be called without another parentheses.
user.on('change', () => console.log(user));
user.on('save', () => console.log(user));
user.on('error', () => console.log('Something is wrong!'));

user.save();
