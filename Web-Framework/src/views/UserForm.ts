import { User } from '../models/User';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

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

  render = (): void => {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  };

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();
    for (let eventKey of Object.keys(eventsMap)) {
      const [eventName, selector] = eventKey.split(':'); // ['click', 'button']

      // selector can be 'button', '.class', '#id' because querySelectorAll method is used.
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
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
    const name = input.value;

    this.model.set({ name });
  };
}
