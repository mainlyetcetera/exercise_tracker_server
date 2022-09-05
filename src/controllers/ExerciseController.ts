import { RequestWithBody } from "../types/extensions/ReqBody";
import { Response } from "express";
import { post, controller } from "../decorators";
import { Paths } from "../types/routes/Paths";
// import { pool } from "../database/pg";

@controller(Paths.placeholder)
class ExerciseController {

  @post(Paths.exercise)
  postExercise(req: RequestWithBody, res: Response): void {
    try {
      res.send("rawr");
    } catch (err) {
      // send error msg
      res.send(`bad juju ${err}`);
    }
  }

}
