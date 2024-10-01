const router = require("express").Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const ArticleCatController = require("../controllers/articlecatCtr");

router.post("/first", ArticleCatController.FirstCat);
router.get("/getcategories", ArticleCatController.GetAllCat);
router.post("/actionArticleCategory", ArticleCatController.ActionArticleCat);
router.delete(  "/deleteArticleCategory/:id",  ArticleCatController.DeleteArticleCat);

module.exports = router;
