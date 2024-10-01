const router = require("express").Router();
const DashboardControll = require("../controllers/dashboardCtr");

router.post("/adminGetAllInfo", DashboardControll.getAllInfo);
module.exports = router;
