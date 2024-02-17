const { MongoClient } = require("mongodb");
var jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const client = new MongoClient(
  "mongodb+srv://sainathr:1Xu38QhJ8NVG0aCy@contest-app.6wtwx9x.mongodb.net/?retryWrites=true&w=majority"
);

const db = client.db("authentication");
const credentials = db.collection("credentials");
const problem = client.db("Problems");

const problems = problem.collection("problem-statements");

app.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const cred = await credentials.findOne({ username: username });
  if (!cred) {
    res.send({ result: "ude" });
    return;
  }
  if (cred.password === password) {
    var token = jwt.sign({ role: "user", username: username }, "secret");
    res.send({ result: "success", token: token });
  } else {
    res.send({ result: "wp" });
  }
});

app.get("/login", (req, res) => {
  res.send("Done");
});

app.post("/add-problem", async (req, res) => {
  const problemst = req.body.problem;
  problems.insertOne(problemst);

  res.send("Done insertion");
});

app.get("/is-authenticated", (req, res) => {
  const token = req.query.token;
  jwt.verify(token, "secret", function (err, decoded) {
    if (!err) {
      res.send(decoded);
    } else {
      res.send(err.name);
    }
  });
});

app.get("/get-problem", async (req, res) => {
  const pid = req.query.id;
  const prob = await problems.findOne({ pid: pid });
  res.send(prob);
});

app.get("/get-problems", async (req, res) => {
  let arr = [];
  const prob = await problems.find({});

  while (await prob.hasNext()) {
    arr.push(await prob.next());
  }
  res.json(arr);
});

app.listen(3000, () => {
  console.log("Server up !");
});
