@classDecorator
class Boat {
  // @testDecorator
  color: string = 'red';

  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @logError('Oops, boat was sunk in ocean')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    throw new Error();
    console.log('swish');
  }
}

// Decorators are being executed before an instance is created
function testDecorator(
  target: any,
  key: string,
  desc: PropertyDescriptor
): void {
  // console.log(desc.value); // @testDecorator color:string... => Cannot read properties of undefined
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index); // pilot 1, pilot 0
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor); // [Function: Boat]
}

function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    // console.log(target) // Boat {pilot: Function}
    // console.log(key) // pilot
    // console.log(desc); // { value: Function, writable: true, enumerable: true, configurable: true}
    // desc.value = {
    // throw new Error();
    // console.log('swish');
    // }

    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}

// new Boat().pilot();
