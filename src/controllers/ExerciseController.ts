import { RequestWithBody } from "../types/extensions/ReqBody";
import { Response } from "express";
import { post, controller, use } from "../decorators";
import { Paths } from "../types/routes/Paths";
// import { pool } from "../database/pg";
import { createIfNew } from "../middleware/createIfNew";

@controller(Paths.placeholder)
class ExerciseController {
  @post(Paths.exercise)
  @use(createIfNew)
  postExercise(_: RequestWithBody, res: Response): void {
    try {
      res.send("rawr");
    } catch (err) {
      // send error msg
      res.send(`bad juju ${err}`);
    }
  }

}
