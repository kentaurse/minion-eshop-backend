const router = require("express").Router();
const passport = require("passport");
require("../config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const AuthCtr = require("../controllers/authCtr");

router.post("/register", AuthCtr.register);
router.post("/login", AuthCtr.login);
router.get("/tokenlogin", requireAuth, AuthCtr.tokenlogin);
router.post("/getAllUser", requireAuth, AuthCtr.getAll);
router.get("/getUser/:id", AuthCtr.getUser);
router.post("/allowUser", AuthCtr.allowUser);
router.post("/updateUserProfile", requireAuth, AuthCtr.updateUserProfile);
router.post("/deleteUser", AuthCtr.deleteUser);
router.post("/changeUserStore", AuthCtr.changeUserStore);
router.post("/changeUserRole", AuthCtr.changeUserRole);
router.post("/charge/:id", AuthCtr.charge);
router.post("/coin/", AuthCtr.coin);
router.put("/favourite", requireAuth, AuthCtr.favourite);

// router.delete("/delete/:id", AuthCtr.delete);
// router.put("/update/:id", AuthCtr.update);

module.exports = router;
