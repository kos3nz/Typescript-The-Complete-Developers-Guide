import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

const rootUrl = 'http://localhost:3000/users';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private attributes: Attributes<UserProps>;
  private sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  private events: Eventing = new Eventing();

  constructor(data: UserProps) {
    this.attributes = new Attributes<UserProps>(data);
  }

  // just getting back a reference to the method on the Eventing class
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') throw new Error('Cannot fetch without an id');

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
