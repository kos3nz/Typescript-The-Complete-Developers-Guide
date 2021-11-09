import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  abstract eventsMap: () => { [key: string]: () => void };
  abstract template: () => string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

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

  render = (): void => {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  };
}
