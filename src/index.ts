import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/ExerciseController'

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cookieSession({ keys: ['blubber'] }))
app.use(AppRouter.getInstance())

app.listen(port, (): void => {
  console.log(`port: ${port}`)
})
