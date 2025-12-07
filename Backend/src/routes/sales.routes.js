const router = require("express").Router();
const controller = require("../controllers/sales.controller");

router.get("/", controller.getSales);

module.exports = router;
