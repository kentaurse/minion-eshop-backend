const router = require("express").Router();
const chattingControll = require("../controllers/chattingCtr");

router.get("/getAllChatMsgs", chattingControll.getAllChatMsgs);
router.get("/getAllChatUser", chattingControll.getAllChatUser);
module.exports = router;
