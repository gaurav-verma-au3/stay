const express = require("express");
const router = express.Router();

router.get("/Payments/:email", (req, res) => {
  if (req.headers.credentials) {
    db.collection("payments")
      .find({ owner: req.params.email })
      .toArray(function(err, data) {
        if (err) {
          throw err;
        }

        res.send(data);
      });
  } else res.send({ message: "UnAuthorize Access" });
});

router.post("/payments/add", (req, res) => {
  if (req.headers.credentials) {
    console.log(req.body);
    let obj = {
      tenantName: req.body.tenantName,
      roomName: req.body.roomName,
      amount: req.body.amount,
      paymentDate: req.body.paymentDate,
      targetMonth: req.body.targetMonth,
      owner: req.body.owner
    };
    db.collection("payments").insertOne(obj),
      function(err, data) {
        if (err) {
          throw err;
        }
      };
    res.send({ message: "Payment Added Successfully" });
  } else res.send({ message: "UnAuthorize Access" });
});

router.put("/payments/update/:id", (req, res) => {
  if (req.headers.credentials) {
    db.collection("payments").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          tenantName: req.body.tenantName,
          roomName: req.body.roomName,
          amount: req.body.amount,
          paymentDate: req.body.paymentDate,
          targetMonth: req.body.targetMonth,
          owner: req.body.owner
        }
      },
      function(err, data) {
        if (err) {
          throw err;
        }
        res.send({ message: "Payment Updated Successfully" });
      }
    );
  } else res.send({ message: "UnAuthorized Access" });
});

router.delete("/payments/delete/:id", (req, res) => {
  if (req.headers.credentials) {
    db.collection("payments").deleteOne({ _id: ObjectId(req.params.id) });
    res.send({ message: " Payment Deleted Successfully" });
  } else res.send({ message: "UnAuthorized Access" });
});
module.exports = router;
