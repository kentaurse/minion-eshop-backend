const router = require("express").Router();
const passport = require("passport");
const HomeProductController = require("../controllers/homeProductController");

router
  .get("/newProducts", HomeProductController.getNewHomeProducts)
  .get("/popularProducts", HomeProductController.popularHomeProducts);

module.exports = router;
