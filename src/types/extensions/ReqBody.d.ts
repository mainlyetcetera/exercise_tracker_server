import { Request } from 'express'

export type BodyValue = string | undefined

export interface RequestWithBody extends Request {
  body: { [key: string]: BodyValue }
}
