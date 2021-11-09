import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:#set-age': this.onSetAgeClick,
      'click:#set-name': this.onSetNameClick,
      'click:#save-model': this.onSaveClick,
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

  onSaveClick = (): void => {
    const data = this.model.save();
    console.log(data);
  };

  template = (): string => {
    return `
      <div>
        <input id="name-input" placeholder="${this.model.get('name')}"/>
        <button id="set-name">Change Name</button>
        <button id="set-age">Set Random Age</button>
        <button id='save-model'>Save User</button>
      </div>
    `;
  };
}
