const express = require('express');
const router = express.Router();
const tvseriesRouter = require("./tvseries");

router.use("/api/v1/tvseries", tvseriesRouter);

module.exports = router;
