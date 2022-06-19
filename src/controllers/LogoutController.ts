import { Request, Response } from 'express'
import { get, controller } from '../decorators'
import { Paths } from '../types/routes/Paths'

@controller(Paths.auth)
class LogoutController {
  @get(Paths.logout)
  getLogout(req: Request, res: Response): void {
    req.session = undefined
    res.redirect(Paths.root)
  }
}
