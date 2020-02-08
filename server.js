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



io.sockets.on('connection', function(socket) {
  //console.log(socket);
  //var allClients = [];
  var connectionsLimit = 4;



    //allClients.push(socket);

  // limit to the connections numnber
  if (io.engine.clientsCount > connectionsLimit) {
    socket.emit('err', {
      message: 'reach the limit of connections'
    })
    socket.disconnect()
    console.log('Disconnected...')
    return
  }

  console.log("socket connected: " + socket.id);
  // console.log("allClients: " + allClients.length);
  // console.log('0 = ' + allClients[0].id);


  io.of('/').clients((error, clients) => {
    if (error) throw error;


    socket.on('disconnect', function() {
      console.log(socket.id + ' Got disconnect!');
      // var i = allClients.indexOf(socket);
      // allClients.splice(i, 1);
      var i = clients.indexOf(socket);
      clients.splice(i, 1);
    });


    socket.on('mySocketid', function(something){
          // we just received a message
          // let's respond to *that* client :
          socket.emit('hereIsYourID', { id: socket.id, id_zero: clients[0]});
      });
    console.log(clients);
  });


  // for (var i = 0; i < allClients.length; i++) {
  //   console.log("allClients: " + allClients[i].id);
  // }


  socket.on('startRound', roundOne);


  function roundOne(receivedData) {
    socket.broadcast.emit("roundOneBroadcast", receivedData);
  }


    // allClients[0].on('startRound', roundOne);
    //
    //
    // function roundOne(receivedData) {
    //   allClients[0].broadcast.emit("roundOneBroadcast", receivedData);
    // }


  // socket.on("ddd", dddMessage);
  //
  // function dddMessage(receivedData) {
  //   console.log(receivedData);
  //   console.log('id sending: ' + socket.id);
  //   //socket.broadcast.emit("dddBroadcast", receivedData);
  //   socket.broadcast.to(allClients[0].id).emit("dddBroadcast", receivedData);
  // }

  socket.on("verse", verseMessage);

  function verseMessage(receivedData) {
    console.log(receivedData);
    console.log('id sending: ' + socket.id);
    socket.broadcast.emit("verseBroadcast", receivedData);
  }
});
