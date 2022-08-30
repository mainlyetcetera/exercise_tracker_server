import { RequestWithBody } from '../types/extensions/ReqBody'
import { Response } from 'express'
import { post, controller } from '../decorators'
import { Paths } from '../types/routes/Paths'

@controller(Paths.placeholder)
class ExerciseController {
  @post(Paths.exercise)
  postExercise(req: RequestWithBody, res: Response): void {
    try {
      res.send(req.body)
    } catch (err) {
      res.send(`bad juju ${err}`)
    }
  }
}
