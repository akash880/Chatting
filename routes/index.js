var express = require('express');
var router = express.Router();
var path = require('path');

var loginControllerObj = require('../controllers/loginController.js');

router.post('/loginapi', loginControllerObj.login);//version
router.get('/getalluser',loginControllerObj.getalluser);

var chatControllerObj = require('../controllers/chatController.js');
router.post('/getChannelId/:useridone/:useridTwo', chatControllerObj.createChannel);
router.post('/storemsg', chatControllerObj.storemsg);


module.exports = router;

