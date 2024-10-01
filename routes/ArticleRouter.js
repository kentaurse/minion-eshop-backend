const router = require("express").Router();
const passport = require("passport");
require("../config/passport");
const ArticleCtr = require("../controllers/articleCtr");

const requireAuth = passport.authenticate("jwt", { session: false });
router.get("/get/:id", requireAuth, ArticleCtr.getSelectedArticles);
router.get("/:id", requireAuth, ArticleCtr.getSelectedArticle);
router.post("/addLike/:id", requireAuth, ArticleCtr.addlike);
router.post("/unlike/:id", requireAuth, ArticleCtr.addUnlike);
router.post("/review/:id", requireAuth, ArticleCtr.createReview);
router.put("/:id", requireAuth, ArticleCtr.update);
router.delete("/:id", requireAuth, ArticleCtr.delete);
router.get("/", requireAuth, ArticleCtr.getAll);
router.post("/", requireAuth, ArticleCtr.create);
router.get("/popular", ArticleCtr.popularArticles);

module.exports = router;
