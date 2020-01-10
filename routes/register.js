const express = require("express");
const router = express.Router();
const md5 = require("md5");

router.post("/register", (req, res) => {
  var obj = {
    name: req.body.name,
    email: req.body.email,
    pgName: req.body.pgName,
    password: req.body.password
  };
  db.collection("users").findOne({ email: req.body.email }, function(
    err,
    data
  ) {
    if (data == null) {
      db.collection("users").insertOne(obj),
        function(err, data) {
          if (err) {
            throw err;
          }
        };
      res.send({ error: false, message: "Registered Successfully" });
    } else res.send({ error: true, message: "Already Registered" });
  });
});

module.exports = router;
