console.log("server is running");

var express = require("express");

var app = express();

// var port = process.env.PORT || 3000;
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

var turn_0_id;
var first = true;
var turn_1_id;
var second = true;

var currentTurn = -1;

io.sockets.on('connection', function(socket) {
  //console.log(socket);
  //var allClients = [];
  var connectionsLimit = 4;

 if (first == true) {
    turn_0_id = socket.id;
    first = false;
 }
if (io.engine.clientsCount > 1 && second == true) {
    turn_1_id = socket.id;
    second = false;
 }


io.sockets.emit('turnIds', {
  t_0: turn_0_id,
  t_1: turn_1_id
});

  // limit to the connections number
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

        //console.log(receivedData);
        // if (socket >= clients[receiveData.msg]) {
        //   var i = clients.indexOf(socket);
        //   clients.splice(i, 1);
        // } else if (socket < clients[receiveData.msg]) {
        //   clients.splice(i, 1, "ciao");
        // }
        // console.log('boh: ' + clients[receiveData.msg]);


        io.emit('clientsUpdate', {
          clients: clients,
          n_clients: io.engine.clientsCount
        });
        //io.sockets.emit("newArrayOfClients", receivedData);


      // var i = clients.indexOf(socket);
      // clients.splice(i, 1);
      //
      //
      // io.emit('clientsUpdate', {
      //   clients: clients,
      //   n_clients: io.engine.clientsCount
      // });

    });


    // socket.on('terminate', function() {
    //   socket.disconnect(0);
    // });

    io.emit('clientsUpdate', {
      clients: clients,
      n_clients: io.engine.clientsCount
    });

    socket.on('mySocketid', function(something) {
      socket.emit('hereIsYourID', {
        id: socket.id
      });
    });

    socket.on('startFirstRound', firstRound);

    function firstRound(receivedData) {
      io.sockets.emit("nextRound", receivedData);
    }

    socket.on('sendCurrentTurn', nextRound);
    socket.on('startNextRound', nextRound);

    function nextRound(receivedData) {
      io.sockets.emit("nextRound", receivedData);
      currentTurn = receivedData.msg;
      console.log(currentTurn);
    }

    console.log('clients[0]: ' + clients[0]);
    console.log('socketid: ' + socket.id);
    console.log('clients: ' + clients);
    console.log('number of clients: ' + io.engine.clientsCount);
    console.log('turn_0_id: ' + turn_0_id + '\nturn_1_id: ' + turn_1_id);
  });

  // for (var i = 0; i < allClients.length; i++) {
  //   console.log("allClients: " + allClients[i].id);
  // }

  // socket.on('counter', function (receivedData) {
  //   io.sockets.emit("currentCounter", receivedData);
  // });






  // socket.on("ddd", dddMessage);
  //
  // function dddMessage(receivedData) {
  //   console.log(receivedData);
  //   console.log('id sending: ' + socket.id);
  //   //socket.broadcast.emit("dddBroadcast", receivedData);
  //   socket.broadcast.to(allClients[0].id).emit("dddBroadcast", receivedData);
  // }
  // socket.on('startRound', roundOne);
  //
  // function roundOne(receivedData) {
  //   socket.broadcast.emit("roundOneBroadcast", receivedData);
  // }

  socket.on("verse", verseMessage);

  function verseMessage(receivedData) {
    console.log(receivedData);
    console.log('id sending: ' + socket.id);
    socket.broadcast.emit("verseBroadcast", receivedData);
  }
});
