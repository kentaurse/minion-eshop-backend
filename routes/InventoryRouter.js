const router = require("express").Router();
const passport = require("passport");
const InventoryController = require("../controllers/inventoryCtr");
const ProductController = require("../controllers/productCtr");
const requireAuth = passport.authenticate("jwt", { session: false });

router
  .post(
    "/inventory/transaction/addition",
    requireAuth,
    InventoryController.addTransaction
  )
  .get("/inventory", requireAuth, ProductController.getAllInventories)
  .post(
    "/inventory/transactions",
    requireAuth,
    InventoryController.getAllTransaction
  );
  router.put(
    "/multideletetransactions",
    requireAuth,
    InventoryController.multiDeleteTransactions
  );

module.exports = router;
