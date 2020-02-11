function setup() {


  /* canvas = createCanvas(200, 200);
  background(0);

   canvas.parent('canvascontainer');*/

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

  var ref = database.ref("lines"); //setting up the lines path in the database
  //the reference in the database is checked from here onwards,
  //whenever the value changes, the callbacks are called
  ref.on("value", gotData, errData);

} // end of setup



function gotData(data) { //"data" argument is what is being retrieved from the database

  // selects all the elements with class listing, which will be the links generated
  var elts = selectAll(".listing");

  // removes the previous poem before loading the updated one avoiding carrying over the previous text each time
/*  for (var i = 0; i < elts.length; i++) {

    elts[i].remove();

  }*/

 // retrieving the unique id of a piece of data from the database passed as variable in the id of the URL
  var singleKey = getURLParams();
  var refSingleKey = database.ref("lines/" + singleKey.id);

  // reads, just when called without keep reading and listening for changes from that moment on (->once),
  // the value of the given key and then executes callback functions. It is a check of existence which triggers callbacks
  refSingleKey.once("value", oneLine, errData);

  function oneLine(data) {

    var singlePoemData = data.val(); //extracting the database reference as a javascript object
    var singlePoem = singlePoemData.line; //accessing the line property
    var poemTitle = singlePoemData.title; //accessing the title property

//creating a container for the whole poem, with title and lines
// the class "listing" is used just to identify the elements
    var poemsList = createElement("div", "");
    poemsList.class("listing");

    var title = createElement("h1", poemTitle)
    var poem = createP(singlePoem);
    poem.class("listing");

    title.class("listing");
    title.parent(poemsList);
    poem.parent(poemsList);
    poemsList.parent("lineslist");
  }
}

function errData(err) {

  console.log(err);

}

function draw() {


} //end of draw
