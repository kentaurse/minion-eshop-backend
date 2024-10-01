const router = require("express").Router();
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const UserController = require("../controllers/userCtr");

router.get("/getallcategories", requireAuth, UserController.getAllCategories);
router.get("/getcategory/:id", requireAuth, UserController.getACategory);
router.post("/createcategory", requireAuth, UserController.createCategory);
router.post("/userAccount", requireAuth, UserController.getUserAccountInfo);
router.put("/editcategory/:id", requireAuth, UserController.editCategory);
router.put("/deletecategory/:id", requireAuth, UserController.deleteCategory);
router.put(
  "/multideletecategory",
  requireAuth,
  UserController.multiDeleteCategory
);

module.exports = router;
