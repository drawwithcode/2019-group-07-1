function setup() {


   canvas = createCanvas(200, 200);
  background(0);

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



function gotData(data) { //"data" argument is what is being retrieved from the database


/////

// selects all the elements with class listing, which will be the links generated

var elts = selectAll(".listing");

// removes the previous list before loading the updated one avoiding carrying over the previous links each time
for (var i = 0; i < elts.length; i++) {

elts[i].remove();

}

var singleKey = getURLParams();

var refSingleKey = database.ref("lines/" + singleKey.id );

// reads, just when called without keep reading and listening for changes from that moment on (->once),
// the value of the given key and then executes callback functions. It is a check of existence which triggers callbacks
refSingleKey.once("value", oneLine, errData);

function oneLine(data) {

var singlePoemData = data.val();
var singlePoem = singlePoemData.line;

var poemsList = createElement("div", "");
poemsList.class("listing");
var poem = createP(singlePoem);
poem.parent(poemsList);

poemsList.parent("lineslist");
console.log(singlePoemData);
}







console.log(key);
}

function errData(err) {

console.log(err);

}

function draw() {


}//end of draw
