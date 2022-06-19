import 'reflect-metadata'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function routeBinder(method: string): Function {
  return function(path: string): Function {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key)
      Reflect.defineMetadata(MetadataKeys.method, method, target, key)
    }
  }
}

export const get = routeBinder(Methods.get)
export const put = routeBinder(Methods.put)
export const patch = routeBinder(Methods.patch)
export const post = routeBinder(Methods.post)
export const del = routeBinder(Methods.del)
