import 'reflect-metadata'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { AppRouter } from '../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import { createIfNew } from '../middleware/createIfNew'

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send('Missing body')
      return
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`)
        return
      }
    }

    next()
  }
}

export function controller(prefix: string) {
  return function(target: Function): void {
    const router = AppRouter.getInstance()

    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key]
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      )
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        []
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        []

      const validator = bodyValidators(requiredBodyProps)

      const makeNew = createIfNew()
        
      console.log({ middlewares })

      if (path) {
        router[method](
          `${prefix}${path}`,
          ...middlewares,
          validator,
          makeNew,
          routeHandler
        )
      }
    })
  }
}
