import express, { json } from "express";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_UNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected.\n");
});

app.use(express.json());

app.get("/api/getResumeById", (req, res) => {
  let read_query = `SELECT * FROM Resumes WHERE id = ${req.query.id};`;

  connection.query(read_query, (err, result: any) => {
    if (err) throw err;
    return res.json(result[0]);
  });
});

app.post("/api/uploadResumeDetails", (req, res) => {
  let insert_query = `INSERT INTO Resumes (name, job_title, job_description, company) VALUES ("${req.body.name}", "${req.body.job_title}", "${req.body.job_description}", "${req.body.company}");`;

  connection.query(insert_query, (err, result: any) => {
    if (err) {
      res.statusCode = 400;
      res.send();
    } else {
      res.statusCode = 200;
      return res.json({ id: result["insertId"] });
    }
  });
});

app.listen(process.env.PORT || 10000, () => {
  console.log(`Listening on Port ${process.env.PORT}.\n`);
});
