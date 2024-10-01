const router = require("express").Router();
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const StoreContoller = require("../controllers/storeCtr");

router.post("/create", StoreContoller.createStore);
router.get("/get", StoreContoller.getAllStores);
router.get("/get/:id", StoreContoller.getAStore);
router.put("/update/:id", StoreContoller.updateStore);
router.put("/delete/:id", StoreContoller.deleteAStore);
router.put("/delete", StoreContoller.deleteStores);

module.exports = router;
