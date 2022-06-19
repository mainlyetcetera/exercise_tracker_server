import { Request, Response } from 'express'
import { get, controller } from '../decorators'
import { Paths } from '../types/routes/Paths'

@controller(Paths.placeholder)
class RootController {
  @get(Paths.root)
  getRoot(req: Request, res: Response): void {
    req.session && req.session.loggedIn
    ? res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Logout</a>
      </div>
    `)
    : res.send(`
      <div>
        <div>Please log in</div>
        <a href="/auth/login">Login</a>
      </div>
    `)
  }
}
