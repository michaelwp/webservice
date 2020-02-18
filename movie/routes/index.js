const express = require('express');
const router = express.Router();
const movieRouter = require("./movie");

router.use("/api/v1/movies", movieRouter);

module.exports = router;
