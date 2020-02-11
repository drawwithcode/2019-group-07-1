var writePoemBackground;

var titleTextInput;
var textInput = [];
var submitVerseButton = [];
var rhymeScheme = [];
var previousOne;
var currentOne;

//var textInput2;
var submitButton;
var verse = [];
var homophonesArray = [];
var perfectArray = [];
var rhymeMatch = false;
var dataReceived = 0;
var syllablesArray = [];
var fields = [];
var lastSplitArrayLength = 0;
var syllableRequest;
var commaCheck = 0;
var verse, verse3;
var submitClicked = false;
var ok = false;


var socket;

var blockUsers;
var myId = [];
var clientsId = [];
var numberOfClients = 20;

var verse_0 = false;
var verse_1 = false;
var verse_2 = false;
var verse_3 = false;
var verse_4 = false;
var verse_5 = false;
var verse_6 = false;
var verse_7 = false;
var verse_8 = false;

var turn_0_id;

var id_0, id_1;

var currentTurn = 50;

var start = true;

//https://api.datamuse.com/words?sp=intelligent&max=1&md=s  // conteggio sillabe

function preload() {
  //writePoemBackground = loadImage("./assets/writePoemBackground.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);




  var poemContainer = select('#poemContainer');
  var submitContainer = select('#submitContainer');
  submitContainer.addClass('responsive');
  var lettersContainer = select('#lettersContainer');


  writePoemBackground = createImg('./assets/writePoemBackground.png');
  writePoemBackground.id('writePoemBackground');
  writePoemBackground.class('responsive');
  writePoemBackground.parent(backgroundContainer);

  // titleTextInput = createInput();
  // titleTextInput.addClass('textInput');
  // titleTextInput.parent(poemContainer);

  for (var i = 0; i < 9; i++) {
    textInput[i] = createInput();
    textInput[i].parent(poemContainer);
    textInput[i].addClass('textInput');
    //textInput[i].style('margin-bottom: 3vh; margin-left: 23vw');
    textInput[i].addClass('responsive');
    textInput[i].input(myInputEvent);
    textInput[i].attribute('disabled', true);
    //textInput[i].hide();

    submitVerseButton[i] = createButton('Send');
    submitVerseButton[i].addClass('submitVerseButton');
    submitVerseButton[i].addClass('responsive');
    submitVerseButton[i].parent(submitContainer);
    //submitVerseButton[i].position(poemContainer.width + width / 19.2, i * height / 13.5);

    rhymeScheme[i] = createDiv();
    rhymeScheme[i].parent(lettersContainer);
    rhymeScheme[i].addClass('rhymeScheme');
    rhymeScheme[i].addClass('responsive');
    //rhymeScheme[i].style('margin-bottom: 4vh');

  }
  for (var i = 0; i < 3; i++) {
    textInput[i].style('margin-bottom: 1.5vh; margin-left: 23vw');
    submitVerseButton[i].style('margin-bottom: 0.5vh');
    rhymeScheme[i].style('margin-bottom: 2.5vh');
  }
  textInput[3].style('margin-top: 2vh');
  submitVerseButton[3].style('margin-top: 1.7vh');
  rhymeScheme[3].style('margin-top: 4.7vh');
  for (var i = 3; i < 6; i++) {
    textInput[i].style('margin-bottom: 1.5vh; margin-left: 23vw');
    submitVerseButton[i].style('margin-bottom: 0.5vh');
    rhymeScheme[i].style('margin-bottom: 2.5vh');
  }
  textInput[6].style('margin-top: 2vh;');
  submitVerseButton[6].style('margin-top: 1.7vh');
  rhymeScheme[6].style('margin-top: 4.4vh');
  for (var i = 6; i < 9; i++) {
    textInput[i].style('margin-bottom: 1.5vh; margin-left: 23vw');
    submitVerseButton[i].style('margin-bottom: 0.5vh');
    rhymeScheme[i].style('margin-bottom: 2.5vh');
  }

  submitVerseButton[0].mouseClicked(submitVerse_0);
  submitVerseButton[1].mouseClicked(submitVerse_1);
  submitVerseButton[2].mouseClicked(submitVerse_2);
  submitVerseButton[3].mouseClicked(submitVerse_3);
  submitVerseButton[4].mouseClicked(submitVerse_4);
  submitVerseButton[5].mouseClicked(submitVerse_5);
  submitVerseButton[6].mouseClicked(submitVerse_6);
  submitVerseButton[7].mouseClicked(submitVerse_7);
  submitVerseButton[8].mouseClicked(submitVerse_8);

  rhymeScheme[0].html('A');
  rhymeScheme[1].html('B');
  rhymeScheme[2].html('A');
  rhymeScheme[3].html('B');
  rhymeScheme[4].html('C');
  rhymeScheme[5].html('B');
  rhymeScheme[6].html('C');
  rhymeScheme[7].html('D');
  rhymeScheme[8].html('C');

  submitButton = createButton('submit');
  submitButton.id('submitButton');
  submitButton.parent(poemContainer);
  //submitButton.mouseClicked(submitVerse);


  socket = io();

  ///////////////////////////// sending to each client its socket.id for debug

  socket.on("hereIsYourID", getMyID);

  function getMyID(receivedData) {
    myId = receivedData.id;
    //console.log('myId: ' + receivedData.id);
    //console.log(myId);
  }

  socket.on("clientsUpdate", getMyUpdate);

  function getMyUpdate(receivedData) {
    //receivedData.clients.push(clientsId);
    clientsId = receivedData.clients;
    numberOfClients = receivedData.n_clients;
    // console.log(receivedData.clients);
    // console.log("clients: \n" + receivedData.clients);
    // console.log(clientsId);
    // console.log(clientsId[0]);
    //console.log(receivedData.n_clients);
  }

  socket.on("turnIds", function(receivedData) {
    id_0 = receivedData.t_0;
    id_1 = receivedData.t_1;
  });

  ///////////////////////////// the user ONE send a message that blocks the others users from writing
  // socket.on("currentCounter", function (receivedData) {
  //       counter = receivedData.count;
  // });


  // socket.on("currentTurn", currentTurn);
  //
  // function currentTurn(receivedData) {
  //   turn = receivedData.msg;
  // }
  socket.on("nextRound", nextTurn);

  function nextTurn(receivedData) {

    //console.log(receivedData.msg);
    var turn = receivedData.msg;
    if (turn == 0) {
      verse_0 = true;
      verse_8 = false;
    } else if (turn == 1) {
      verse_0 = false;
      verse_1 = true;
    } else if (turn == 2) {
      verse_1 = false;
      verse_2 = true;
    } else if (turn == 3) {
      verse_2 = false;
      verse_3 = true;
    } else if (turn == 4) {
      verse_3 = false;
      verse_4 = true;
    } else if (turn == 5) {
      verse_4 = false;
      verse_5 = true;
    } else if (turn == 6) {
      verse_5 = false;
      verse_6 = true;
    } else if (turn == 7) {
      verse_6 = false;
      verse_7 = true;
    } else if (turn == 8) {
      verse_7 = false;
      verse_8 = true;
    }
    currentTurn = turn;
    //console.log('turn: ' + turn);

  }

  socket.on("verseBroadcast", showVerse);

  function showVerse(receivedData) {

    if (currentTurn == 0) {
      textInput[0].value(receivedData.msg);
    } else if (currentTurn == 1) {
      textInput[1].value(receivedData.msg);
    } else if (currentTurn == 2) {
      textInput[2].value(receivedData.msg);
    } else if (currentTurn == 3) {
      textInput[3].value(receivedData.msg);
    } else if (currentTurn == 4) {
      textInput[4].value(receivedData.msg);
    } else if (currentTurn == 5) {
      textInput[5].value(receivedData.msg);
    } else if (currentTurn == 6) {
      textInput[6].value(receivedData.msg);
    } else if (currentTurn == 7) {
      textInput[7].value(receivedData.msg);
    } else if (currentTurn == 8) {
      textInput[8].value(receivedData.msg);
    }

  }

  socket.on("err", connectionError);

  function connectionError(receivedData) {

    alert(receivedData.message);

  }

  socket.on("dddBroadcast", prova1);

  function prova1(receivedData) {

    console.log(receivedData.msg);
    textInput[0].value(receivedData.msg);

  }

  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCfh_QHd5Gsccp_ZSJkK2eg7mzV6SBioic",
    authDomain: "online-comedy-poems.firebaseapp.com",
    databaseURL: "https://online-comedy-poems.firebaseio.com",
    projectId: "online-comedy-poems",
    storageBucket: "online-comedy-poems.appspot.com",
    messagingSenderId: "762689873283",
    appId: "1:762689873283:web:17b63d304362fa722102b6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var ref = database.ref("lines"); //setting up the lines path

} //// end of setup





function turnOneId() {
  turn_0_id = clientsId[0];
}


function checkRhyme(currentVerse) {
  previousOne = textInput[currentVerse - 2].value().split(" ");
  currentOne = textInput[currentVerse].value().split(" ");
  getRhymes(previousOne[previousOne.length - 1]);
  //console.log(previousOne[previousOne.length - 1]);
  // if (perfectArray.some(keyword => currentOne[currentOne.length - 1].includes(keyword)) || homophonesArray.some(keyword => currentOne[currentOne.length - 1].includes(keyword))) {
  //   console.log('rhymeMatch');
  //   textInput[currentVerse].removeClass('inputBackground');
  //   rhymeMatch = true;
  // }
  // else if (perfectArray.some(keyword => !currentOne[currentOne.length - 1].includes(keyword)) || homophonesArray.some(keyword => !currentOne[currentOne.length - 1].includes(keyword))) {
  //
  //   console.log('no rhymeMatch');
  //   rhymeMatch = false;
  // }
  console.log('previous verse: \n' + previousOne + '\nlast word_0: ' + previousOne[previousOne.length - 1] + '\nlast word_1: ' + currentOne[currentOne.length - 1] + '\nrhymeMatch: ' + rhymeMatch); //'\nperfect rhymes: \n' + perfectArray[ + '\nhomophones rhymes: \n' + homophonesArray +
}

function getRhymes(word) {
  var urlPerfect = 'https://api.datamuse.com/words?rel_rhy=' + word;
  var urlHomophones = 'https://api.datamuse.com/words?rel_hom=' + word;

  loadJSON(urlPerfect, perfectData);
  loadJSON(urlHomophones, homophonesData);
}

function perfectData(data) {
  perfectWords = data;
  //console.log(data[0].word);
  //console.log("PERFECT RHYME :");
  for (var i = 0; i < data.length; i++) {
    perfectArray[i] = data[i].word.toLowerCase();
    //_data.push(perfectArray);
    //console.log(data[i].word);
  }
}

function homophonesData(data) {
  homophonesWords = data;
  //console.log(data[0].word);
  for (var i = 0; i < data.length; i++) {
    homophonesArray[i] = data[i].word.toLowerCase();
    //_data.push(homophonesArray);
    //console.log(data[i].word.toLowerCase());
  }
}


////////////////////////////// 'A'
function startTurn_0() {
  verse_0 = true;

  socket.emit('startNextRound', {
    msg: 0
  });
}

function submitVerse_0() {
  if (textInput[0].value() != 0) {
    verse_0 = false;
    verse_1 = true;

    socket.emit('startNextRound', {
      msg: 1
    });
  }
}
/////////////////////////////////////////////// 'B'
function submitVerse_1() {
  if (textInput[1].value() != 0) {
    verse_1 = false;
    verse_2 = true;

    socket.emit('startNextRound', {
      msg: 2
    });
  }
}
/////////////////////////////////////////////////// 'A'
function submitVerse_2() {
  submitClicked = true;
  ok = false;
  checkRhyme(2);
}

function activeVerse_3() {
  textInput[2].removeClass('inputBackground');
  verse_2 = false;
  verse_3 = true;

  socket.emit('startNextRound', {
    msg: 3
  });
}
/////////////////////////////////////////// 'B'
function submitVerse_3() {
  submitClicked = true;
  ok = false;
  checkRhyme(3);
}

function activeVerse_4() {
  textInput[3].removeClass('inputBackground');
  verse_3 = false;
  verse_4 = true;

  socket.emit('startNextRound', {
    msg: 4
  });
}
//////////////////////////////////////// 'C'
function submitVerse_4() {
  if (textInput[4].value() != 0) {
    verse_4 = false;
    verse_5 = true;

    socket.emit('startNextRound', {
      msg: 5
    });
  }
}
////////////////////////////////////// 'B'
function submitVerse_5() {
  submitClicked = true;
  ok = false;
  checkRhyme(5);
}

function activeVerse_6() {
  textInput[5].removeClass('inputBackground');
  verse_5 = false;
  verse_6 = true;

  socket.emit('startNextRound', {
    msg: 6
  });
}
////////////////////////////////////// 'C'
function submitVerse_6() {
  submitClicked = true;
  ok = false;
  checkRhyme(6);
}

function activeVerse_7() {
  textInput[6].removeClass('inputBackground');
  verse_6 = false;
  verse_7 = true;

  socket.emit('startNextRound', {
    msg: 7
  });
}
///////////////////////////////////// 'D'
function submitVerse_7() {
  verse_7 = false;
  verse_8 = true;

  socket.emit('startNextRound', {
    msg: 8
  });
}
////////////////////////////////////// 'C'
function submitVerse_8() {
  submitClicked = true;
  ok = false;
  checkRhyme(8);
}

function activeVerse_9() {
  textInput[8].removeClass('inputBackground');
  verse_8 = false;
  //verse_7 = true;

  // socket.emit('startNextRound', {
  //   msg: 7
  // });
  console.log('fine');
  sendAll();
}
/////////////////////////////////////

function sendAll() {
  var ref = database.ref("lines"); //setting up the lines path

  // setting the properties of the javascript objects which will compose the data
  var data = {

    position: "line1",
    line: textInput[0].value() + '<br>' + textInput[1].value() + '<br>' + textInput[2].value() + '<br>' + '<br>' + textInput[3].value() + '<br>' + textInput[4].value() + '<br>' + textInput[5].value() + '<br>' + '<br>' + textInput[6].value() + '<br>' + textInput[7].value() + '<br>' + textInput[8].value()

  };

  var sentLine = ref.push(data, dataSent); //sends the data to database
  //console.log(sentLine.key); //shows the key created for the sent data

  function dataSent(err, status) {
    //console.log(status);
  }
  console.log(data.line);
}

function syllablesData(data) {
  dataReceived++;
  var xx = [];
  // for(var i = 0; i < dataReceived; i++) {
  //   console.log(data[i].numSyllables);
  // }
  //syllablesArray.length = syllablesArray.length - (syllablesArray.length - syllableRequest.length);
  // for (var i = 0; i < dataReceived; i++) {
  //
  //         xx[i] = data[0].numSyllables;
  //         xx.push(syllablesArray);
  // }
  // data[0].numSyllables.push(syllablesArray);
  // console.log(syllablesArray);
  // console.log(
  //   syllablesArray.reduce((a, b) => a + b, 0)
  // );
}

function countSyllables(wordSyllable) {
  commaCheck = 0;
  var urlSyllables = 'https://api.datamuse.com/words?sp=' + wordSyllable + '&max=1&md=s';

  loadJSON(urlSyllables, syllablesData);
}

// function submitVerse() {
//   submitClicked = true;
//
//   var verseToSplit = textInput[0].value();
//   var verseToSplit3 = textInput[2].value();
//
//
//   verse = verseToSplit.split(" ");
//   verse3 = verseToSplit3.split(" ");
//   console.log(verse);
//   console.log(verse3);
//   getRhymes(verse[verse.length - 1]);
//   console.log(perfectArray);
//   console.log(homophonesArray);
//   //getRhymes(verse3[verse3.length -1]);
//   //getRhymes(textInput.value());
//
//
//   for (var i = 0; i < verse.length; i++) {
//     countSyllables(verse[i]);
//   }
//
//
// }




function myInputEvent() {

  var sendData = {
    msg: this.value()
  }

  socket.emit('verse', sendData);

  // var sendProva = {
  //    msg: this.value()
  // }
  //
  // socket.emit('ddd', sendProva);

  //console.log('you are typing: ', this.value());

  //   var arraySplit = this.value().split(" ");
  //   splitArrayLength = this.value().length;
  //
  //   var x = arraySplit.toString();
  //
  //
  //
  //   console.log(x);
  //   console.log('fields: '+ fields.length);
  //   console.log('comma: '+ commaCheck);
  //   var y = true;
  //   if (x.includes(',') && y == true){
  //     y == false;
  //     commaCheck++;
  //     countSyllables(arraySplit[commaCheck]);
  //     fields = x.split(',');
  //   }
  //   if (fields[commaCheck+1].includes(',')) {
  //
  //      countSyllables(arraySplit[commaCheck]);
  //     commaCheck++;
  //     fields = fields[commaCheck+1].split(',');
  //   }
  // console.log(arraySplit.length);
  // console.log(arraySplit);

}

function hideTextInput() {
  for (var i = 0; i < 9; i++) {
    textInput[i].hide();
    submitVerseButton[i].hide();
  }
}

function showTextInput() {
  for (var i = 0; i < 9; i++) {
    textInput[i].show();
  }
}

function myTurn(verseToShow) {
  // show the right textInput based on the turn, hide the rest

  for (var i = verseToShow - 1; i >= 0; i--) {
    textInput[i].attribute('disabled');
    submitVerseButton[i].hide();
  }
  for (var i = verseToShow + 1; i < 9; i++) {
    textInput[i].hide();
    submitVerseButton[i].hide();
  }
  textInput[verseToShow].show();
  textInput[verseToShow].removeAttribute('disabled');
  submitVerseButton[verseToShow].show();
}

function notMyTurn(inputToBlock) {
  // block the current text input to the others users, hide the rest

  for (var i = inputToBlock - 1; i >= 0; i--) {
    textInput[i].attribute('disabled', true);
    submitVerseButton[i].hide();
  }
  for (var i = inputToBlock + 1; i < 9; i++) {
    textInput[i].hide();
    submitVerseButton[i].hide();
  }
  textInput[inputToBlock].show();
  textInput[inputToBlock].attribute('disabled');
}

function draw() {
  //background(255);
  //text(data.data[0].word, 0, 500);

  // imageMode(CENTER);
  // var scalefactor = 1930000;
  // image(backgroundImage, width / 2, height / 2, backgroundImage.width / scalefactor * (width * height), backgroundImage.height / scalefactor * (width * height));

  var mySocketid = {
    msg: 'tell me my socket.id'
  }

  socket.emit('mySocketid', mySocketid);


  if (numberOfClients == 1) {
    socket.emit('startFirstRound', {
      msg: 0
    });
  }

  if (start == true) {
    turnOneId();
    start = false;
  }

  // if (turn == 0) {
  //   if (start == true) {
  //     startTurn_0();
  //     start = false;
  //   }
  // }

  // socket.emit('counter', {
  //   count: counter
  // });

  //console.log('n° clients: \n' + numberOfClients + '\nlist of clients: \n' + clientsId + '\nmyId: \n' + myId + '\ncurrentTurn: ' + currentTurn, '\nturn_0_id = \n' + turn_0_id); // + '\nid_0: \n' + id_0 + '\nid_1: \n' + id_1
  var a, b, c, d, e, f, g, h, i;

  // adjust the turn based on the number of connected clients
  if (numberOfClients == 2) {
    a = 0;
    b = 1;
    c = 0;
    d = 1;
    e = 0;
    f = 1;
    g = 0;
    h = 1;
    i = 0;
  } else if (numberOfClients == 3) {
    a = 0;
    b = 1;
    c = 2;
    d = 0;
    e = 1;
    f = 2;
    g = 0;
    h = 1;
    i = 2;
  } else if (numberOfClients == 4) {
    a = 0;
    b = 1;
    c = 2;
    d = 3;
    e = 0;
    f = 1;
    g = 2;
    h = 3;
    i = 0;
  } else if (numberOfClients == 5) {
    a = 2;
    b = 3;
    c = 4;
    d = 0;
    e = 1;
    f = 2;
    g = 3;
    h = 3;
    i = 0;
  } else if (numberOfClients == 6) {
    a = 2;
    b = 3;
    c = 4;
    d = 5;
    e = 0;
    f = 1;
    g = 2;
    h = 3;
    i = 0;
  } else if (numberOfClients == 7) {
    a = 2;
    b = 3;
    c = 4;
    d = 5;
    e = 6;
    f = 0;
    g = 1;
    h = 3;
    i = 0;
  } else if (numberOfClients == 8) {
    a = 2;
    b = 3;
    c = 4;
    d = 5;
    e = 6;
    f = 7;
    g = 0;
    h = 3;
    i = 0;
  } else if (numberOfClients == 9) {
    a = 2;
    b = 3;
    c = 4;
    d = 5;
    e = 6;
    f = 7;
    g = 8;
    h = 3;
    i = 0;
  }
  //block other users conparing the socket.id of each client
  //with the socket.id of the active client in a given turn
  if (verse_0 == true) {
    if (myId != clientsId[a]) {
      notMyTurn(0);
      submitVerseButton[0].hide();
      // abbe console.log('not my turn');
    } else if (myId == clientsId[a]) {
      myTurn(0);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 0');
    }
  } else if (verse_1 == true) {
    if (myId != clientsId[b]) {
      notMyTurn(1);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[b]) {
      myTurn(1);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 1');
    }
  } else if (verse_2 == true) {
    if (myId != clientsId[c]) {
      notMyTurn(2);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[c]) {
      myTurn(2);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 2');
    }
  } else if (verse_3 == true) {
    if (myId != clientsId[d]) {
      notMyTurn(3);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[d]) {
      myTurn(3);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 3');
    }
  } else if (verse_4 == true) {
    if (myId != clientsId[e]) {
      notMyTurn(4);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[e]) {
      myTurn(4);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 4');
    }
  } else if (verse_5 == true) {
    if (myId != clientsId[f]) {
      notMyTurn(5);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[f]) {
      myTurn(5);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 5');
    }
  } else if (verse_6 == true) {
    if (myId != clientsId[g]) {
      notMyTurn(6);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[g]) {
      myTurn(6);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 6');
    }
  } else if (verse_7 == true) {
    if (myId != clientsId[h]) {
      notMyTurn(7);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[h]) {
      myTurn(7);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 7');
    }
  } else if (verse_8 == true) {
    if (myId != clientsId[i]) {
      notMyTurn(8);
      // abbe console.log('not my turn');
    } else if (myId == clientsId[i]) {
      myTurn(8);
      socket.emit('sendCurrentTurn', {
        msg: currentTurn
      });
      // abbe console.log('verse 8');
    }
  }



  // if (myId == clientsId[a] && verse_0 == true) {
  //   myTurn(0);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 0');
  // } else if (myId == clientsId[b] && verse_1 == true) {
  //   myTurn(1);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 1');
  // } else if (myId == clientsId[c] && verse_2 == true) {
  //   myTurn(2);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 2');
  // } else if (myId == clientsId[d] && verse_3 == true) {
  //   myTurn(3);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 3');
  // } else if (myId == clientsId[e] && verse_4 == true) {
  //   myTurn(4);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 4');
  // } else if (myId == clientsId[f] && verse_5 == true) {
  //   myTurn(5);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 5');
  // } else if (myId == clientsId[g] && verse_6 == true) {
  //   myTurn(6);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 6');
  // } else if (myId == clientsId[h] && verse_7 == true) {
  //   myTurn(7);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 7');
  // } else if (myId == clientsId[i] && verse_8 == true) {
  //   myTurn(8);
  //   socket.emit('sendCurrentTurn', {
  //     msg: currentTurn
  //   });
  //   // console.log('verse 8');
  // } else {
  //   //showTextInput();
  //   // console.log('dd');
  //
  // };

  if (submitClicked == true) {
    if (ok == false) {
      if (perfectArray.some(keyword => currentOne[currentOne.length - 1].includes(keyword)) || homophonesArray.some(keyword => currentOne[currentOne.length - 1].includes(keyword))) {
        ok = true;
        if (currentTurn == 2) {
          activeVerse_3();
        } else if (currentTurn == 3) {
          activeVerse_4();
        }
        // else if (currentTurn == 4){
        //    activeVerse_5();
        // }
        else if (currentTurn == 5) {
          activeVerse_6();
        } else if (currentTurn == 6) {
          activeVerse_7();
        }
        // else if (currentTurn == 7){
        //    activeVerse_8();
        // }
        else if (currentTurn == 8) {
          activeVerse_9();
          console.log('ciao');
        }

        console.log('rhymeMatch');
      } else if (perfectArray.some(keyword => !currentOne[currentOne.length - 1].includes(keyword)) || homophonesArray.some(keyword => !currentOne[currentOne.length - 1].includes(keyword))) {
        ok = true;
        textInput[currentTurn].addClass('inputBackground');
        console.log('no rhymeMatch');
      }
    }

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
