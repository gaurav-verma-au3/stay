const express = require("express");
const router = express.Router();

router.get("/tenants/:email", (req, res) => {
  if (req.headers.credentials) {
    db.collection("tenants")
      .find({ owner: req.params.email })
      .toArray(function(err, data) {
        if (err) throw err;
        res.send(data);
      });
  } else res.send("UnAuthorized Access OR data is null !!!");
});

router.post("/tenants/add", (req, res) => {
  console.log("hit");
  if (req.headers.credentials) {
    let obj = {
      name: req.body.name,
      contact: req.body.contact,
      fatherName: req.body.fatherName,
      address: req.body.address,
      documents: {
        id: req.body.documents.id,
        address:req.body.documents.address
      },
      emergencyContactPerson: req.body.emergencyContactPerson,
      emergencyContact: req.body.emergencyContact,
      roomAlloted: req.body.roomAlloted,
      allotmentDate: req.body.allotmentDate,
      owner: req.body.owner
    };
    console.log(obj);
    db.collection("tenants").insertOne(obj),
      function(err, data) {
        if (err) throw err;
      };
    res.send({ message: "Tenant Added Successully" });
  } else res.send({ message: "UnAuthorize Access" });
});

router.put("/tenants/update/:id", (req, res) => {
  if (req.headers.credentials) {
    console.log(req.body)
    db.collection("tenants").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          contact: req.body.contact,
          fatherName: req.body.fatherName,
          address: req.body.address,
          documents: {
            id: req.body.documents.id,
            address:req.body.documents.address
          },
          emergencyContactPerson: req.body.emergencyContactPerson,
          emergencyContact: req.body.emergencyContact,
          roomAlloted: req.body.roomAlloted,
          allotmentDate: req.body.allotmentDate,
          owner: req.body.owner
        }
      },
      function(err, data) {
        if (err) {
          throw err;
        }
        res.send({ message: "Tenant Updated Successfully" });
      }
    );
  } else res.send({ message: "UnAuthorized Access" });
});

router.delete("/tenants/delete/:id", (req, res) => {
  console.log("hit");

  if (req.headers.credentials) {
    db.collection("tenants").deleteOne({ _id: ObjectId(req.params.id) });
    res.send({ message: "Deleted Successfully" });
  } else res.send({ message: "UnAuthorized Access" });
});



module.exports = router;
