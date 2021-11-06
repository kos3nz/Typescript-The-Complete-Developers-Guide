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
  public attributes: Attributes<UserProps>;

  constructor(
    data: UserProps,
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl),
    public events: Eventing = new Eventing()
  ) {
    this.attributes = new Attributes<UserProps>(data);
  }
}
