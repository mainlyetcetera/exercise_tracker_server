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
      const { name, date, set, weight, reps, exercise_id } = req.body;

      pool.query('SELECT name FROM exercises', (_, r) => {
        r.rows.findIndex((n: { name: string }): boolean => name === n.name) === -1
          ? pool.query(`INSERT INTO exercises (name, exercise_id) VALUES ('${name}', '${exercise_id}')`)
          : console.log('name already exists');
      });

      pool.query(`INSERT INTO sets (
        set, 
        weight, 
        reps, 
        date, 
        exercise_id
      ) VALUES (
        '${set}', 
        '${weight}', 
        '${reps}', 
        '${date}', 
        '${exercise_id}'
      )`);

      res.send(`${name} inserted`);
    } catch (err) {
      res.send(`bad juju ${err}`);
    }
  }

}
