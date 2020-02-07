var textInput = [];
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
    textInput[i].position(poemContainer.width / 2, i * 80);
  }

  // textInput = createInput();
  // textInput.id('textInput');
  // textInput.input(myInputEvent);
  // textInput.parent(poemContainer);


  submitButton = createButton('submit');
  submitButton.id('submitButton');
  submitButton.parent(poemContainer);
  submitButton.mouseClicked(submitVerse);

  socket = io(); // nuova funzione che carcica la libreria scritta in index

  socket.on("verseBroadcast", newDrawing);

  function newDrawing(receivedData) {

    // fill('yellow');
    // ellipse(receivedData.x, receivedData.y, 20)
    //textInput[0].html(receivedData);
    textInput[0].value(receivedData.msg);
    console.log(receivedData);

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





function getRhymes(word) {
  var urlPerfect = 'http://api.datamuse.com/words?rel_rhy=' + word;
  var urlHomophones = 'http://api.datamuse.com/words?rel_hom=' + word;

  loadJSON(urlPerfect, perfectData);
  loadJSON(urlHomophones, homophonesData);
}

function countSyllables(wordSyllable) {
  commaCheck = 0;
  var urlSyllables = 'https://api.datamuse.com/words?sp=' + wordSyllable + '&max=1&md=s';

  loadJSON(urlSyllables, syllablesData);
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
  textInput[number].html("");
}

function draw() {
  //background(255);
  //text(data.data[0].word, 0, 500);
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