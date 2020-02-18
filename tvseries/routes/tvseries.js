const router = require("express").Router();
const tvseriesController = require("../controller/TvSeries");

router.post("/", tvseriesController.create);
router.get("/", tvseriesController.read);
router.put("/:id", tvseriesController.update);
router.delete("/:id", tvseriesController.delete);

module.exports = router;