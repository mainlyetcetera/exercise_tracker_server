import { Request, Response, NextFunction } from 'express'
import { get, post, controller, bodyValidator } from '../decorators'
import { Paths } from '../types/routes/Paths'
import { AuthD } from '../types/enums/AuthD'

@controller(Paths.auth)
class LoginController {
  @get('/login')
  getLogin(_: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email">
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post(Paths.login)
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body

    if (email === AuthD.email && password === AuthD.password) {
      req.session = { loggedIn: true }
      res.redirect(Paths.root)
    } else {
      res.status(422).send('Please enter correct login information')
    }
  }
}
