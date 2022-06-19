import { Request, Response } from 'express'
import { get, use, controller } from '../decorators'
import { Paths } from '../types/routes/Paths'
import { requireAuth } from '../middleware/requireAuth'

@controller(Paths.placeholder)
class ProtectedController {
  @get(Paths.protected)
  @use(requireAuth)
  getProtected(_: Request, res: Response): void {
    res.send('Welcome to protected route, logged in user!')
  }
}
