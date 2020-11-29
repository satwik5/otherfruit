const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();


var corsOptions = {
  origin: ["http://localhost:4200"], 
  credentials:true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true
}));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Satwik mongodb application." });
});

require("./app/routes/userinformation.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");
db.url = "mongodb://localhost:27017/notes_db";
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });