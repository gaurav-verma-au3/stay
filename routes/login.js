const express = require("express");
const md5 = require("md5");
const router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
require("dotenv").config();
let cloudinary = require("cloudinary").v2;

router.post("/login", (req, res) => {
  console.log(req.body);
  db.collection("users").findOne({ email: req.body.email }, function(
    err,
    data
  ) {
    console.log(data.email, data.password, req.body.email, req.body.password);
    if (data == null || data.password != req.body.password) {
      console.log("failed");
      res.send({ error: true, message: "Email or Password Mismatch !!!" });
    } else {
      if (data.password == req.body.password) req.session.loggedIn = true;
      req.session.email = data.email;
      req.session.user = data.name;
      const { _id, name, email, pgName } = data;
      res.send({
        loggedIn: true,
        user: { id: _id, name: name, email: email, pgName: pgName },
        error: false,
        message: "Log in Successful"
      });
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/upload", multipartMiddleware, (req, res) => {
  // Upload image
  console.log(
    req.body.public_id,
    req.files.public_id,
    req.files.image.public_id
  );
  cloudinary.uploader.upload(
    req.files.image.path,
    {
      folder: "pg-control/",
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    },
    function(error, result) {
      if (error) {
        return res.status(500).send(error);
      }
      // Save image to database
      res.send(result);
    }
  );
});

router.post("/upload/:public_id", multipartMiddleware, (req, res) => {
  // Upload image
  console.log(req.params.public_id);
  cloudinary.uploader.destroy(
    `pg-control/${req.params.public_id}`,
    {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    },
    function(error, result) {
      if (error) {
        return res.status(500).send(error);
      }
      console.log(result)
      cloudinary.uploader.upload(
        req.files.image.path,
        {
          folder: "pg-control/",
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        },
        function(error, result) {
          if (error) {
            return res.status(500).send(error);
          }
          // Save image to database
          res.send(result);
        }
      );
    }
  );
});
module.exports = router;
