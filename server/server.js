const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
const userName = "m7md51177",
  pass = "%40m7md51177%40";
const PORT = 3005;

const Users = require("./models/Users");

//add  //..//
app.post("/users", async (req, res) => {
  await Users.create(req.body)
    .then((resu) => res.json(resu))
    .catch((err) => res.json(err));
});

//ubdate
app.put("/users:id", async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobileNumber: req.body.mobileNumber,
  })

    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});
// get
app.get("/users", async (req, res) => {
  await Users.find()
    .then((resu) => res.json(resu))
    .catch((err) => res.json(err));
});

//Delete //...//
app.delete("/users:id", async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndDelete(id)

    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
const start = async () => {
  console.log("loading....");
  await mongoose
    .connect(
      `mongodb+srv://${userName}:${pass}@cluster01.4t7qrmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`
    )
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:\n", error);
    });
};

start();
