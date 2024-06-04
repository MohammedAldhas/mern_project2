const express = require("express");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const routeJson = require("./route.json");
router.use(cors());

router.all("/:api", (req, res) => {
  axios
    .get(routeJson.services[req.params.api].url + req.params.api)
    .then((respn) => {
      res.send(respn.data);
    });
});

module.exports = router;
