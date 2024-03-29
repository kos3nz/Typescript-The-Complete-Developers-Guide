import { Events } from './Model';

type Callback = () => void;

export class Eventing implements Events {
  events: { [key: string]: Callback[] } = {};

  // Registering event handlers
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  // Invoking event handlers
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName] || [];
    handlers.forEach((callback) => {
      callback();
    });
  };
}
