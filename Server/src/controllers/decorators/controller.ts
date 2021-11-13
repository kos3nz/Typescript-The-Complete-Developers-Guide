import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

function bodyValidators(keys: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export const controller = (routePrefix: string) => {
  return (target: Function) => {
    console.log('controller decorator is executed');

    const router = AppRouter.instance;

    for (const key of Object.keys(target.prototype)) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
};
