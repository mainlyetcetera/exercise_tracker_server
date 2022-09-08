import { RequestWithBody } from "../types/extensions/ReqBody";
import { Response } from "express";
import { post, controller, use } from "../decorators";
import { Paths } from "../types/routes/Paths";
import { pool } from "../database/pg";
import { createIfNew } from "../middleware/createIfNew";

@controller(Paths.placeholder)
class ExerciseController {
  @post(Paths.exercise)
  @use(createIfNew)
  postExercise(req: RequestWithBody, res: Response): void {
    try {
      console.log('body', req.body);
      const { name, date, set, weight } = req.body;
      pool.query(`INSERT INTO exercises (name) VALUES ('${name}')`);
      pool.query(`INSERT INTO dates (date) VALUES ('${date}')`);
      // this needs logic to parse date and exercise id's
      // pool.query(`INSERT INTO sets (weight, reps, date_id, exercise_id) VALUES (${set})`);
      res.send(`${name} inserted`);
    } catch (err) {
      // send error msg
      res.send(`bad juju ${err}`);
    }
  }

}
