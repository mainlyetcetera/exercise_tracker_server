import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pg";

export function createIfNew(
  _: Request,
  res: Response,
  next?: NextFunction
): void {

  pool.query(
    `CREATE TABLE IF NOT EXISTS exercises(
      name varchar(50) NOT NULL UNIQUE,
      exercise_id char(1) NOT NULL UNIQUE
    )`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS sets(
      set int,
      weight int,
      reps int,
      date char(10),
      exercise_id char(1)
    )`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS sets(id SERIAL PRIMARY KEY, weight INT, reps INT)`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
    }
  );

  next && next();
}
