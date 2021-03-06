function setup() {

  // canvas = createCanvas(200, 200);
  //background(0);
  // canvas.parent('canvascontainer');

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
  //the reference in the database is checked from here onwards,
  //whenever the value changes, the callbacks are called
  ref.on("value", gotData, errData);

} // end of setup



function gotData(data) { //data is what is being retrieved from the database

  var lines = data.val(); //extracts as javascript object and selects the data content = an object which contains all the unique ids
  //console.log(lines);
  var keys = Object.values(lines); //selects all the values of the properties in the extracted object and puts them in var "keys" array
  var ids = Object.keys(lines); //selects all the properties in the extracted object and puts them in var "ids" array

  // selects all the elements with class listing, which will be the links generated
  var elts = selectAll(".listing");
  // removes the previous list before loading the updated one avoiding carrying over the previous list each time
  for (var i = 0; i < elts.length; i++) {

    elts[i].remove();

  }

//creating an updated flows of links to the poems
//the array "keys" has an element for each unique id
  for (var i = 0; i < keys.length; i++) {

    var key = keys[i].line; //selects each poem
    var id = ids[i]; //selects each unique id of the data
    var poemTitle = keys[i].title; //selects each title

    var poemsList = createElement("div", "");
    poemsList.class("listing");
    var poemLink = createA(id, poemTitle); // for each unique id a link is created
    poemLink.class("listingLink");
    poemLink.parent(poemsList);

    poemsList.parent("linkParent");

    poemLink.mousePressed(goToPoem);



  }

}

function goToPoem() {

  var singleId = this.elt.attributes.href.value;
  console.log(singleId);

  window.open("singlePoem.html?id=" + singleId);

}

function errData(err) {

  //console.log(err);

}

function draw() {


} //end of draw
