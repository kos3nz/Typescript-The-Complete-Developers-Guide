import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};
  abstract template: () => string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  // ------------ These method is optional for a child class ------------ //
  // Rather than an abstract function, eventsMap can be defined as a normal function
  // so that just a plain empty object is always returned as a default value
  // and a child class is not going to have to be implemented this function.
  // This function can easily be overwritten by adding this method in a child class
  eventsMap = (): { [key: string]: () => void } => {
    return {};
  };

  regionsMap = (): { [key: string]: string } => {
    return {};
  };

  onRender(): void {}

  // ------------------------------------------------------------------ //

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();
    for (let key of Object.keys(eventsMap)) {
      const [eventName, selector] = key.split(':'); // ['click', 'button']

      // selector can be 'button', '.class', '#id' because querySelectorAll method is used.
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  };

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();

    for (let key of Object.keys(regionsMap)) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  };

  render = (): void => {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  };
}
