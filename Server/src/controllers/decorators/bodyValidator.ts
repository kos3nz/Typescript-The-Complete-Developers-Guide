import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export const bodyValidator = (...keys: string[]) => {
  console.log('bodyValidator is executed');

  return (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
};
