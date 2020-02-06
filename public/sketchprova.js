var textInput;

var rhymingWords;

//https://api.datamuse.com/words?sp=intelligent&max=1&md=s  // conteggio sillabe
var api = 'http://api.datamuse.com/words?';
var word = 'house';
var perfectRhyme = 'rel_rhy=';
var homophones = 'rel_hom=';

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var urlPerfect = api + perfectRhyme + word;
  loadJSON(urlPerfect, gotData);
  var urlHomophones = api + homophones + word;
  loadJSON(urlHomophones, gotDataHomophones);


  textInput = createInput('Type your verse..');
  textInput.id('textInput');
  textInput.input(myInputEvent);
  textInput.parent(poemContainer);


}

function gotData(data) {
  perfectWords = data;
  //console.log(data[0].word);
  console.log("PERFECT RHYME :");
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].word);
  }
}

function gotDataHomophones(data) {
  homophonesWords = data;
  //console.log(data[0].word);
  console.log("HOMOPHONES RHYME :");
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].word);
  }
}

function myInputEvent() {
  console.log('you are typing: ', this.value());
  
}

  function draw() {
    //background(255);
    //text(data.data[0].word, 0, 500);

  }
