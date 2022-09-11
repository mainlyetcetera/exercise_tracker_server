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
      const { name, date, set, weight, reps } = req.body;

      pool.query('SELECT name FROM exercises', (_, r) => {
        r.rows.findIndex(n => name === n.name) === -1
          ? pool.query(`INSERT INTO exercises (name) VALUES ('${name}')`)
          : console.log('name already exists');
      });

      // pool.query('SELECT date FROM dates', (_, r) => {
      //   r.rows.findIndex(d => date === d.date) === -1
      //     ? pool.query(`INSERT INTO dates (date) VALUES ('${date}')`)
      //     : console.log('date already exists');
      // });

      pool.query('SELECT name FROM exercises', (_, r) => {
        const blah = r.rows.find(n => name === n.name);
        console.log({ blah });
        // const { exercise_id } = r.rows.find(n => name === n.name);
        // pool.query(`INSERT INTO sets (
        //   set, 
        //   weight, 
        //   reps, 
        //   date, 
        //   exercise_id
        // ) VALUES (
        //   '${set}', 
        //   '${weight}', 
        //   '${reps}', 
        //   '${date}', 
        //   '${exercise_id}'
        // )`);
      });

      console.log('name already exists');

      // this needs logic to parse date and exercise id's
      // pool.query(`INSERT INTO sets (weight, reps, date_id, exercise_id) VALUES (${set})`);
      res.send(`${name} inserted`);
    } catch (err) {
      // send error msg
      res.send(`bad juju ${err}`);
    }
  }

}
