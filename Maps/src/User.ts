import faker from 'faker';
import { Mappable } from './Map';

interface Interactive {
  graphic: boolean;
}

// When implementing multiple interfaces, use comma
export class User implements Mappable, Interactive {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  graphic: boolean = false;

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}
