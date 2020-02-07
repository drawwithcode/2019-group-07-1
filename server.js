console.log("server is running");

var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

var server = app.listen(port);

console.log("http://localhost:" + port);

var socket = require('socket.io');

var io = socket(server);

// io.on("connection", newConnection);
//
// function newConnection(socket) {
//   console.log(socket.id);
//
//   socket.on("mouse", mouseMessage);
//
//   function mouseMessage(receivedData) {
//     console.log(receivedData);
//
//     socket.broadcast.emit("mouseBroadcast", receivedData);
//   }
// }

var allClients = [];
var connectionsLimit = 9;

io.sockets.on('connection', function(socket) {

   // limit to the connections numnber
  if (io.engine.clientsCount > connectionsLimit) {
   socket.emit('err', { message: 'reach the limit of connections' })
   socket.disconnect()
   console.log('Disconnected...')
   return
 }

  console.log("socket.id: " + socket.id);
  allClients.push(socket);
  // for(var i = 0; i < allClients.length; i++) {
  //   console.log("allClients: " + allClients[i]);
  // }
  console.log("allClients: " + allClients.length);

  socket.on("verse", verseMessage);

  function verseMessage(receivedData) {
    console.log(receivedData);
    console.log('id sending: ' + socket.id);
    socket.broadcast.emit("verseBroadcast", receivedData);
  }

  socket.on('disconnect', function() {
    console.log(socket.id + ' Got disconnect!');

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);


  });
});
