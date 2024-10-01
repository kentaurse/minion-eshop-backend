const router = require("express").Router();
const NotificationCtrl = require('../controllers/notificationCtr');

router.get('/getAllNotification/:id', NotificationCtrl.getAllNotification)
router.delete('/deleteOneNotification/:id', NotificationCtrl.deleteOneNotification)

module.exports = router;