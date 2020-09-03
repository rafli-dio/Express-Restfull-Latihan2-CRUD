const mysql = require("mysql");
const express = require("express");
const app = express();
// midlewer
app.use(express.json());
//
const conect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql",
});

conect.connect((err) => {
  if (err) throw err;
  console.log("Koneksi Berhasil");
});

app.listen(6000, () => {
  console.log("Server berada di port 6000");
});

// get all data
app.get("/api/v2/todo", (req, res) => {
  conect.query("SELECT * FROM todo", (err, result) => {
    if (err) {
      res.send({ status: "gagal", result: err.message });
    } else {
      res.send({ status: "succes", result });
    }
  });
});

// get  data
app.get("/api/v2/todo/:id", (req, res) => {
  conect.query(
    `SELECT * FROM todo WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        res.send({ status: "gagal", result: err.message });
      } else {
        res.send({ status: "succes", result });
      }
    }
  );
});

// post data
app.post("/api/v2/todo", (req, res) => {
  let data = {
    tujuan: req.body.tujuan,
    status: req.body.status,
  };
  conect.query("INSERT INTO todo SET ?", data, (err, result) => {
    if (err) {
      res.send({ status: "gagal", result: err.message });
    } else {
      res.send({ status: "Succes", result });
    }
  });
});

// update data
app.put("/api/v2/todo", (req, res) => {
  let kepo = `UPDATE todo SET tujuan="${req.body.tujuan}" , status="${req.body.status}" ;`;
  conect.query(kepo, (err, result) => {
    if (err) {
      res.send({ status: "gagal", result: err.message });
    } else {
      res.send({ status: "Succes", result });
    }
  });
});
// delete data
app.delete("/api/v2/todo/:id", (req, res) => {
  conect.query(`DELETE FROM todo WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      res.send({ status: "gagal", result: err.message });
    } else {
      res.send({ status: "Succes", result });
    }
  });
});
