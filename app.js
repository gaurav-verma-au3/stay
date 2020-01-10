const express = require("express");
const md5 = require("md5");
var cors = require("cors");
const app = express();



const session = require("express-session");
app.use(
  session({
    secret: "thissecretishere",
    resave: true,
    saveUninitialized: true
  })
);
require('dotenv').config()

//CORS
app.use(cors());

//Static Asset Declaration
app.use(express.static(__dirname + "/public"));

//bodyParser Setup
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//Database
let MongoClient = require("mongodb").MongoClient;
let url =process.env.MONGO_STRING
const DbName = "pg-admin";

app.locals.db;

//connecting to DataBase
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  function(err, client) {
    if (err) throw err;
    console.log("DB connected");
    db = client.db(DbName);
  }
);

//importing ObjectId
app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;


const  cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
},()=>console.log("CLOUD CONNECTED"));



//port
const port = process.env.PORT || 3001;

//starting Server
app.listen(port);
console.log("play it on port : " + port);

//static routes
app.get("/", (req, res) => {
  res.send("What you are upto....");
});

//routes
let dashboard = require("./routes/dashboard")
let rooms = require("./routes/rooms");
let tenants = require("./routes/tenants");
let login = require("./routes/login");
let register = require("./routes/register");
let payments = require("./routes/payment");
app.use("/", dashboard);
app.use("/", rooms);
app.use("/", login);
app.use("/", tenants);
app.use("/", register);
app.use("/", payments);
