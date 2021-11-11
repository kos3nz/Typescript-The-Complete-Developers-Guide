class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @testDecorator
  pilot(): void {
    console.log('swish');
  }
}

// First argument is the prototype of the object
// Second argument is the key of the property/method/accessor on the object
// Third argument is the property descriptor
// Decorators are applied when the code for this class is ran (not when an instance is created)
function testDecorator(
  target: any,
  key: string,
  desc: PropertyDescriptor
): void {
  console.log('Target:', target); // Target: Boat { pilot: [Function (anonymous)]}
  console.log('Key:', key); // Key: pilot
}

// in this code, @testDecorator is just doing this ↓
// testDecorator(Boat.prototype, 'pilot')
