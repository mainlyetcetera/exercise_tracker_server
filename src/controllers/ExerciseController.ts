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

      const handler = ((n: { name: string }): boolean => {
        console.log({ name })
        console.log('n name', n.name)
        return name === n.name
      })

      pool.query('SELECT name FROM exercises', (_, r) => {
        r.rows.findIndex(handler) === -1
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

      // this needs logic to parse date and exercise id's
      // pool.query(`INSERT INTO sets (weight, reps, date_id, exercise_id) VALUES (${set})`);
      res.send(`${name} inserted`);
    } catch (err) {
      // send error msg
      res.send(`bad juju ${err}`);
    }
  }

}
