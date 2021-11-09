import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input id="name-input"/>
        <button id="set-name">Change Name</button>
        <button id="set-age">Set Random Age</button>
      </div>
    `;
  };

  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:#set-age': this.onSetAgeClick,
      'click:#set-name': this.onSetNameClick,
    };
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector<HTMLInputElement>('#name-input');
    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };
}
