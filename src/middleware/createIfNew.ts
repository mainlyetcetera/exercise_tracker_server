import { Request, Response, NextFunction, RequestHandler } from "express";
import { pool } from "../database/pg";

export function createIfNew(): RequestHandler {
  return function (_: Request, res: Response, next?: NextFunction): void {
    pool.query(
      `CREATE TABLE IF NOT EXISTS exercises(name varchar(50))`,
      (e, _): void => {
        if (e) throw e;
        res.status(200);
        console.log("exercises ok");
      }
    );

    pool.query(
      `CREATE TABLE IF NOT EXISTS dates(id SERIAL PRIMARY KEY, date DATE)`,
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
  };
}
