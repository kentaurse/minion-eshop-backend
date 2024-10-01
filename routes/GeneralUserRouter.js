const router = require("express").Router();
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const GeneralUserController = require("../controllers/generalUserCtr");

// router.post("/register", GeneralUserController.register);
// router.post("/login", GeneralUserController.login);
// router.post("/logout", GeneralUserController.logout);
// router.get("/get", GeneralUserController.getAll)
// router.get("/tokenlogin/", requireAuth, GeneralUserController.tokenlogin);
// router.get("/get",requireAuth, UserController.getAll);
// router.delete("/delete/:id", UserController.delete);
// router.put("/update/:id", UserController.update);

module.exports = router;

