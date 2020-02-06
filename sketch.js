var textInput = [];
//var textInput2;
var submitButton;
var verse = [];
var homophonesArray = [];
var perfectArray = [];
var verse, verse3;
var submitClicked = false;
var ok = false;


//https://api.datamuse.com/words?sp=intelligent&max=1&md=s  // conteggio sillabe

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  poemContainer = select('#poemContainer');

  for (var i = 0; i < 9; i++) {
    textInput[i] = createInput();
    textInput[i].id('textInput');
    textInput[i].input(myInputEvent);
    textInput[i].parent(poemContainer);
    textInput[i].position(poemContainer.width/2, i*80);
  }
  // textInput = createInput();
  // textInput.id('textInput');
  // textInput.input(myInputEvent);
  // textInput.parent(poemContainer);

  submitButton = createButton('submit');
  submitButton.id('submitButton');
  submitButton.parent(poemContainer);
  submitButton.mouseClicked(submitVerse);


}

function submitVerse() {
  submitClicked = true;

  var verseToSplit = textInput[0].value();
  var verseToSplit3 = textInput[2].value();


  verse = verseToSplit.split(" ");
  verse3 = verseToSplit3.split(" ");
  console.log(verse);
  console.log(verse3);
  getRhymes(verse[verse.length -1]);
  console.log(perfectArray);
    console.log(homophonesArray);
  //getRhymes(verse3[verse3.length -1]);
  //getRhymes(textInput.value());


 // else {
 //    console.log('no match');
 //      //cleanInputText(2);
 //      //textInput[2].html('hi');
 //      //console.log(textInput[2].html())
 //      textInput[2].addClass('inputBackground');
 //  }



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
  //console.log('you are typing: ', this.value());

}

function cleanInputText(number) {
  textInput[number].html("");
}

  function draw() {
    //background(255);
    //text(data.data[0].word, 0, 500);
    if (submitClicked == true) {
      if(ok == false) {
        if (perfectArray.some(keyword => verse3[verse3.length-1].includes(keyword)) || homophonesArray.some(keyword => verse3[verse3.length - 1].includes(keyword))) {
         ok = true;
         console.log('match');
       }
       else if (perfectArray.some(keyword => !verse3[verse3.length-1].includes(keyword)) || homophonesArray.some(keyword => !verse3[verse3.length - 1].includes(keyword))){
         ok = true;
         textInput[2].addClass('inputBackground');
         console.log('no match');
       }
      }

    }




  }
