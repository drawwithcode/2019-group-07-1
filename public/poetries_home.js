var textInput1;
var textInputsArray = [];
var textInput;
var inputContainersArray = [];
var inputContainer;

var singleSave;
var saveButtonAll;


function setup() {


   canvas = createCanvas(200, 200);
  //
  // canvas.mousePressed(startPath);
   canvas.parent('canvascontainer');



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
  ref.on("value", gotData, errData); // 2 callback functions

}// end of setup



function gotData(data) { //data is what is being retrieved from the database

var lines = data.val() //extracts as javascript object and selects the data content = an object which contains all the keys
//console.log(lines);
var keys = Object.values(lines) //selects all the values of the properties in the extracted object and puts them in var "keys" array
/////

// selects all the elements with class listing, which will be the links generated

var elts = selectAll(".listing");

// removes the previous list before loading the updated one avoiding carrying over the previous links each time
for (var i = 0; i < elts.length; i++) {

elts[i].remove();

}

/////
for (var i = 0; i < keys.length; i++) {

var key = keys[i].line; //selects each key

var poemsList = createElement("li", "");
poemsList.class("listing");
var poem = createP(key);
poem.parent(poemsList);

poemsList.parent("lineslist");

}

}

function errData(err) {

//console.log(err);

}

function draw() {


}//end of draw
