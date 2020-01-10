const express = require("express");
const router = express.Router();

router.get("/rooms/:email", (req, res) => {
  if (req.headers.credentials) {
    db.collection("rooms")
      .find({ owner: req.params.email })
      .toArray(function(err, data) {
        if (err) throw err;
        res.send(data);
      });
  } else res.send("UnAuthorized Access");
});

router.post("/rooms/add", (req, res) => {
  if (req.headers.credentials) {
    let obj = {
      name: req.body.name,
      bedCount: req.body.bedCount,
      rent: req.body.rent,
      owner: req.body.owner
    };
    db.collection("rooms").insertOne(obj),
      function(err, data) {
        if (err) {
          throw err;
        }
      };
    res.send({ message: "Room Added Successfully" });
  } else res.send({ message: "UnAuthorized Access" });
});

router.put("/rooms/update/:id", (req, res) => {
  if (req.headers.credentials) {
    db.collection("rooms").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          bedCount: req.body.bedCount,
          rent: req.body.rent,
          owner: req.body.owner
        }
      },
      function(err, data) {
        if (err) {
          throw err;
        }
        res.send({ message: "Room Updated Successfully" });
      }
    );
  } else res.send({ message: "UnAuthorized Access" });
});

router.delete("/rooms/delete/:id", (req, res) => {
  if (req.headers.credentials) {
    db.collection("rooms").deleteOne({ _id: ObjectId(req.params.id) });
    res.send({ message: "Deleted Successfully" });
  } else res.send({ message: "UnAuthorized Access" });
});
module.exports = router;
