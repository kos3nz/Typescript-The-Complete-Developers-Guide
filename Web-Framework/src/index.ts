import { User } from './models/User';

const user = User.buildUser({ id: 1 });

// Because "on" method on the Eventing class is returned by getter, it can be called without another parentheses.
user.on('change', () => console.log(user));
user.on('save', () => console.log(user));
user.on('error', () => console.log('Something is wrong!'));

user.fetch();
