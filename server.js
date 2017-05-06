const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const path = require('path');

var http = require('http');
var socketio = require('socket.io');
var port = process.env.PORT || 5000; // set our port
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/db_chat";
var db1 = '';
MongoClient.connect(url,function(err, db) { 
  app.locals.db = db;
  db1= db;
});
var server = http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
var usersForSocket = {};
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
console.log('client connected');
var chatobj = require('./controllers/chatController.js');
socket.on('setUsername', function(data) {
      socket.username = data.userid;
      usersForSocket[socket.username]=socket;
      console.log( socket.username);
   });
   
   socket.on('getChannelId', function(data) {
       data.db= db1;
     chatobj.createChannelSocket(data).then(function(channelId){
         console.log(channelId);
      usersForSocket[data.userid_one].emit('getChannelId',JSON.stringify(channelId));
     }).catch(function(){
         
     });
     
   });
   
    socket.on('sendMessage', function(data) {
//       data.db= db1;
//     chatobj.createChannelSocket(data).then(function(channelId){
//         console.log(channelId);
      usersForSocket[data.userid_two].emit('recv',data);
  //   }).catch(function(){
         
   //  });
     
   });
   
});




app.get('/login', function (req, res) {
    res.sendFile(path.resolve('./public/views/login.html'));
});

app.get('/chatting/:uid', function (req, res) {
    res.sendFile(path.resolve('./public/views/chatting.html'));
});




app.use('/',require('./routes/index.js'));



// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
//app.listen(port);
console.log('Magic happens on port, which is ' + port); 
//exports = module.exports = app;
