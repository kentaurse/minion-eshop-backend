const router = require("express").Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const ProductController = require("../controllers/productCtr");

router
  .post("/create", ProductController.createProduct)
  .put("/addreview/:id", requireAuth, ProductController.addReview)
  .post("/get", ProductController.getAllProducts)
  .get("/get/:id", ProductController.getProduct)
  .get("/cart", requireAuth, ProductController.getCart)
  .get("/getAllCart", requireAuth, ProductController.getAllCart)
  .put("/update/:id", ProductController.updateProduct)
  .delete("/delete/:id", ProductController.deleteProduct)
  .post("/addAProduct", requireAuth, ProductController.addAProduct);
// 

module.exports = router;
