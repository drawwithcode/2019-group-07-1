var textInput = [];
var submitVerseButton = [];
//var textInput2;
var submitButton;
var verse = [];
var homophonesArray = [];
var perfectArray = [];
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
var numberOfClients = 0;

var verse_0 = true;
var verse_1 = false;
var verse_2 = false;
var verse_3 = false;
var verse_4 = false;
var verse_5 = false;
var verse_6 = false;
var verse_7 = false;
var verse_8 = false;

var turn = 0;



//https://api.datamuse.com/words?sp=intelligent&max=1&md=s  // conteggio sillabe

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  poemContainer = select('#poemContainer');


  for (var i = 0; i < 9; i++) {
    textInput[i] = createInput();
    textInput[i].addClass('textInput');
    textInput[i].input(myInputEvent);
    textInput[i].parent(poemContainer);
    textInput[i].position(poemContainer.width / 2, i * height / 13.5);

    submitVerseButton[i] = createButton('submit');
    submitVerseButton[i].addClass('submitVerseButton');
    submitVerseButton[i].parent(poemContainer);
    submitVerseButton[i].position(poemContainer.width + 100, i * height / 13.5);
  }

  submitVerseButton[0].mouseClicked(submitVerse_0);
  submitVerseButton[1].mouseClicked(submitVerse_1);
  submitVerseButton[2].mouseClicked(submitVerse_2);
  submitVerseButton[3].mouseClicked(submitVerse_3);
  submitVerseButton[4].mouseClicked(submitVerse_4);
  submitVerseButton[5].mouseClicked(submitVerse_5);
  submitVerseButton[6].mouseClicked(submitVerse_6);
  submitVerseButton[7].mouseClicked(submitVerse_7);

  submitButton = createButton('submit');
  submitButton.id('submitButton');
  submitButton.parent(poemContainer);
  submitButton.mouseClicked(submitVerse);

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
  ///////////////////////////// the user ONE send a message that blocks the others users from writing

  socket.on("nextRound", nextTurn);

  function nextTurn(receivedData) {

    //console.log(receivedData.msg);
    turn = receivedData.msg;
    if (turn == 1) {
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

  }

  socket.on("verseBroadcast", newDrawing);

  function newDrawing(receivedData) {

    // fill('yellow');
    // ellipse(receivedData.x, receivedData.y, 20)
    //textInput[0].html(receivedData);
    textInput[0].value(receivedData.msg);
    //console.log(receivedData);

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

}

// function mouseDragged() {
//     fill("yellow");
//     ellipse(mouseX,mouseY, 20);
//
//     var sendData = {
//       x:mouseX,
//       y:mouseY
//     }
//
//     socket.emit('mouse', sendData);
// }

function submitVerse() {
  submitClicked = true;

  var verseToSplit = textInput[0].value();
  var verseToSplit3 = textInput[2].value();


  verse = verseToSplit.split(" ");
  verse3 = verseToSplit3.split(" ");
  console.log(verse);
  console.log(verse3);
  getRhymes(verse[verse.length - 1]);
  console.log(perfectArray);
  console.log(homophonesArray);
  //getRhymes(verse3[verse3.length -1]);
  //getRhymes(textInput.value());


  for (var i = 0; i < verse.length; i++) {
    countSyllables(verse[i]);
  }


}

function submitVerse_0() {
  verse_0 = false;
  verse_1 = true;

  socket.emit('startNextRound', {
    msg: 1
  });
}

function submitVerse_1() {
  verse_1 = false;
  verse_2 = true;

  socket.emit('startNextRound', {
    msg: 2
  });
}

function submitVerse_2() {
  verse_2 = false;
  verse_3 = true;

  socket.emit('startNextRound', {
    msg: 3
  });
}

function submitVerse_3() {
  verse_3 = false;
  verse_4 = true;

  socket.emit('startNextRound', {
    msg: 4
  });
}

function submitVerse_4() {
  verse_4 = false;
  verse_5 = true;

  socket.emit('startNextRound', {
    msg: 5
  });
}

function submitVerse_5() {
  verse_5 = false;
  verse_6 = true;

  socket.emit('startNextRound', {
    msg: 6
  });
}

function submitVerse_6() {
  verse_6 = false;
  verse_7 = true;

  socket.emit('startNextRound', {
    msg: 7
  });
}

function submitVerse_7() {
  verse_7 = false;
  verse_8 = true;

  socket.emit('startNextRound', {
    msg: 8
  });
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


function checkRhyme() {

}



function getRhymes(word) {
  var urlPerfect = 'http://api.datamuse.com/words?rel_rhy=' + word;
  var urlHomophones = 'http://api.datamuse.com/words?rel_hom=' + word;

  loadJSON(urlPerfect, perfectData);
  loadJSON(urlHomophones, homophonesData);
}

function homophonesData(data) {
  homophonesWords = data;
  //console.log(data[0].word);
  console.log("HOMOPHONES RHYME :");
  for (var i = 0; i < data.length; i++) {
    homophonesArray[i] = data[i].word.toLowerCase();
    //_data.push(homophonesArray);
    //console.log(data[i].word.toLowerCase());
  }
}

function perfectData(data) {
  perfectWords = data;
  //console.log(data[0].word);
  console.log("PERFECT RHYME :");
  for (var i = 0; i < data.length; i++) {
    perfectArray[i] = data[i].word.toLowerCase();
    //_data.push(perfectArray);
    //console.log(data[i].word);
  }
}



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

function cleanInputText(number) {
  textInput[number].value("");
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

function showCurrentTextInput(verseToShow) {
  // show the right textInput based on the turn, hide the rest
  textInput[verseToShow].show();
  submitVerseButton[verseToShow].show();
  for (var i = verseToShow - 1; i >= 0; i--) {
    textInput[i].hide();
    submitVerseButton[i].hide();
  }
  for (var i = verseToShow + 1; i < 9; i++) {
    textInput[i].hide();
    submitVerseButton[i].hide();
  }
}

function draw() {
  //background(255);
  //text(data.data[0].word, 0, 500);

  var mySocketid = {
    msg: 'tell me my socket.id'
  }

  socket.emit('mySocketid', mySocketid);

  // if (turn == 1) {
  //   verse_0 = false;
  //   verse_1 = true;
  // }
  // else if (turn == 2) {
  //   verse_1 = false;
  //   verse_2 = true;
  // }
  // else if (turn == 3) {
  //   verse_2 = false;
  //   verse_3 = true;
  // }
  // else if (turn == 4) {
  //   verse_3 = false;
  //   verse_4 = true;
  // }
  // else if (turn == 5) {
  //   verse_4 = false;
  //   verse_5 = true;
  // }
  // else if (turn == 6) {
  //   verse_5 = false;
  //   verse_6 = true;
  // }
  // else if (turn == 7) {
  //   verse_6 = false;
  //   verse_7 = true;
  // }
  // else if (turn == 8) {
  //   verse_7 = false;
  //   verse_8 = true;
  // }
  //
  // if (verse_1 == true) {
  //   socket.emit('startNextRound', {
  //     msg: 1
  //   });
  // }



  if (myId != clientsId[0]) {
    hideTextInput();
    console.log('not my turn');
  } else if (myId == clientsId[0] && verse_0 == true) {
    showCurrentTextInput(0);

    console.log('verse 0');
  } else if (myId == clientsId[0] && verse_1 == true) {
    showCurrentTextInput(1);

    console.log('verse 1');
  } else if (myId == clientsId[0] && verse_2 == true) {
    showCurrentTextInput(2);

    console.log('verse 2');
  } else if (myId == clientsId[0] && verse_3 == true) {
    showCurrentTextInput(3);

    console.log('verse 3');
  } else if (myId == clientsId[0] && verse_4 == true) {
    showCurrentTextInput(4);

    console.log('verse 4');
  } else if (myId == clientsId[0] && verse_5 == true) {
    showCurrentTextInput(5);

    console.log('verse 5');
  } else if (myId == clientsId[0] && verse_6 == true) {
    showCurrentTextInput(6);

    console.log('verse 6');
  } else if (myId == clientsId[0] && verse_7 == true) {
    showCurrentTextInput(7);

    console.log('verse 7');
  } else if (myId == clientsId[0] && verse_8 == true) {
    showCurrentTextInput(8);

    console.log('verse 8');
  } else {
    //showTextInput();
    console.log('dd');
  };



  if (submitClicked == true) {
    if (ok == false) {
      if (perfectArray.some(keyword => verse3[verse3.length - 1].includes(keyword)) || homophonesArray.some(keyword => verse3[verse3.length - 1].includes(keyword))) {
        ok = true;
        console.log('match');
      } else if (perfectArray.some(keyword => !verse3[verse3.length - 1].includes(keyword)) || homophonesArray.some(keyword => !verse3[verse3.length - 1].includes(keyword))) {
        ok = true;
        textInput[2].addClass('inputBackground');
        console.log('no match');
      }
    }

  }



}
