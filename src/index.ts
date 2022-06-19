import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/RootController'
import './controllers/LoginController'
import './controllers/LogoutController'
import './controllers/ProtectedController'

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['blubber'] }))
app.use(AppRouter.getInstance())

app.listen(port, (): void => {
  console.log(`port: ${port}`)
})
