const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
const usersRoute = require("./routes/Users");

app.use("/user", usersRoute);

/* Connection to MongoDB */
const dbConfig = "mongodb://127.0.0.1:27017";
const dbName = "mern-stack-db";

mongoose.connect(`${dbConfig}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 3001;

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
