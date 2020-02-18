const router = require("express").Router();
const movieController = require("../controller/Movie");

router.post("/", movieController.create);
router.get("/", movieController.read);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.delete);

module.exports = router;