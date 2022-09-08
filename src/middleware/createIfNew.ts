import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pg";

export function createIfNew(
  _: Request,
  res: Response,
  next?: NextFunction
): void {

  pool.query(
    `CREATE TABLE IF NOT EXISTS exercises(
      id SERIAL PRIMARY KEY,
      name varchar(50)
    )`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
      console.log("exercises ok");
    }
  );

  console.log('in-between exercises, dates');

  pool.query(
    `CREATE TABLE IF NOT EXISTS dates(
      id SERIAL PRIMARY KEY, 
      date varchar(10)
    )`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
      console.log("dates ok");
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS sets(id SERIAL PRIMARY KEY, weight INT, reps INT)`,
    (e, _): void => {
      if (e) throw e;
      res.status(200);
      console.log("sets ok");
    }
  );

  next && next();
}
