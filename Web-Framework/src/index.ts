import { User } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';

const user = User.buildUser({ id: 4, name: 'NAME', age: 20 });
const users = User.buildUserCollection();

const rootEl = document.getElementById('root1');

if (rootEl) {
  const userEdit = new UserEdit(rootEl, user);
  userEdit.render();
} else throw new Error('Root element not found');

users.on('change', () => {
  const rootEl = document.getElementById('root2');

  if (rootEl) {
    const userList = new UserList(rootEl, users);
    userList.render();
  } else throw new Error('Root element not found');
});

users.fetch();
