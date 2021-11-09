import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.buildUser({ name: 'NAME', age: 20 });

const rootEl = document.getElementById('root');

if (rootEl) {
  const userForm = new UserForm(rootEl, user);
  userForm.render();
} else throw new Error('Root element not found');
