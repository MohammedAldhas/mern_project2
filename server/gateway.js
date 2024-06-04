const express = require("express");

const app = express();
const routes = require("./routers");
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Gateway is listening on ${port}`);
});
