import 'reflect-metadata';

const plane = {
  color: 'red',
  // pilot: 'Steven'
};

// metadata is an invisible property.
Reflect.defineMetadata('pilot', 'Steven', plane);
Reflect.defineMetadata('weight', 10, plane, 'color'); // adding metadata to the color property, not plane object

console.log(plane); // { color: 'red'}

const pilot = Reflect.getMetadata('pilot', plane);
const weight = Reflect.getMetadata('weight', plane, 'color');
console.log(pilot); // Steven
console.log(weight); // 10

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('this is secret')
  fly(): void {
    console.log("I'm flying");
  }
}

function markFunction(secretInfo: string) {
  return (target: Plane, key: string) => {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret);

// typeof Plane = referencing to the constructor function of the Plane class
function printMetadata(target: typeof Plane) {
  for (let key of Object.keys(target.prototype)) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}
