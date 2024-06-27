const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/auth", authRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const port = process.env.PORT || 3000;

console.log("sh8aal");
mongoose
  .connect(
    "mongodb+srv://kashakesho:kashakesho@atlascluster.kxdb0dz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster/project?retryWrites=true"
  )
  .then(() => {
    app.listen(port, "0.0.0.0");
  })
  .catch((err) => {
    console.log(err);
  });
