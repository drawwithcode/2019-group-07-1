# The Online Comedy
By Luca Bernardi, Gianluca Locatelli, Lucia Mazzanti

[Creative Coding 2019/2020](https://drawwithcode.github.io/2019/)

Politecnico di Milano - Scuola del Design

Faculty: Michele Mauri, Andrea Benedetti

![](https://i.imgur.com/ZSphSNn.png)

# Project idea
At the beginning, inspired by the game of the cigarette, we wanted to develop a site where people could write fun sentences together just to pass time. Then, we thought of Dantedì, a day of the year dedicated to the great figure of Dante Alighieri, so we decided to design a site in honor of him to remember this important figure, to spread the Italian literature of 1200 and to make people interested in it. To do that we designed a site where people could write poems together in "terza rima" and also read other people’s poems. 

Together with this, what we do is to help people get creative with this activity. [The research](https://www.bbc.com/news/entertainment-arts-48188508) by BBC Arts and the University College London reveals that even a small amount of creativity each day can boost well-being, as creative acts help us to feel less stressed, think clearly and grow as people.

The name of the project, The Online Comedy, is an assonance of the great poem of Dante, The Divine Comedy, because we wanted to refer to it for the reasons above and because our aim is to collect all these poems to create a huge poem in honor of Dante.

<img width=100% src="https://github.com/drawwithcode/2019-group-07-1/blob/master/public/assets/rhyme.gif">

Considering that the site have been made in honor of Dante, the poems have to be written in "terza rima" (ABA BCB CDC…), which  is a rhyming verse stanza form that consists of an interlocking three-line rhyme scheme. We decided to let the users write only 9 lines and the maximum of writers for a poem is three. The writing system uses turns: the first to arrive is the first to write (and decides also the title of the poem), the second is the second, and so on; after every writer has sent a line, the turns will restart from the first person, and so on. Once the writers reach nine published lines, the poem will be automatically published on the gallery.

The site is designed for computer because writings serious poems takes time and we imagine the users writing while sitting on chairs in their houses with a cup of tea.

# Design challenges

![](https://i.imgur.com/v79oQAq.png)

In the first page we have the main menu with three buttons: they have been designed differently from the title, to allow users to understand that they are of a different category: with one category you can interact (the one with red borders), while with the other one you can't (brown borders). In the “Write a poem” section, on the center you have a big parchment with nine empty lines with on the left a scheme of the "terza rima" which is clearly a sign for the user to type something, following the scheme. In the gallery section instead you have all the poems, one for parchment, ordered in chronological time, to show a list of all the poems. There's also a tutorial to explain the user how the app works.
To follow the style of La Divina Commedia we decided to use a handmade design with brown colors, as those used on 1200’s books.  So all the drawings were made by hand using photoshop.
The elements are clearly not innovative, because we were inspired by 1200s style, so we used a simple style for this reason, and also to facilitate the users on understanding the functioning of the site.

# Code challenges

![](https://i.imgur.com/56M4Dgs.png)

One of the most difficult challenge to face was to build the rhyme section; to check that two verses are in rhyme we used datamuse.api, which allows us (among the many features that the service has) to obtain a JSON containing an array of the words which rhyme with a certain word. In the english language there are the perfect rhymes, but also the homophones, that are words with the same sound but different spelling. For this reason we ask to the api both for an array of the words in perfect rhyme and an array with the homophones words. After that we make a text comparison between the last word of the current verse with the the arrays of the last word of the corresponding previous verse.
``` javascript
function checkRhyme(currentVerse) {
  // get the text inside the previous corrisponding verse (e.g. ABA) with input.value(), then split it in its single words with split() function
  previousOne = textInput[currentVerse - 2].value().split(" "); // previous A verse
  // get the text inside the current verse with input.value(), then split it in its single words with split() function
  currentOne = textInput[currentVerse].value().split(" "); // current A verse
  // call a function with the last word of the previous corrisponding verse as a parameter
  getRhymes(previousOne[previousOne.length - 1]);
  //console.log('previous verse: \n' + previousOne + '\nlast word_0: ' + previousOne[previousOne.length - 1] + '\nlast word_1: ' + currentOne[currentOne.length - 1] + '\nrhymeMatch: ' + rhymeMatch); //'\nperfect rhymes: \n' + perfectArray[ + '\nhomophones rhymes: \n' + homophonesArray +
}

function getRhymes(word) {
  // this function request the arrays of perfect rhymes (rel_rhy) and homophones rhymes (rel_hom)
  var urlPerfect = 'https://api.datamuse.com/words?rel_rhy=' + word;
  var urlHomophones = 'https://api.datamuse.com/words?rel_hom=' + word;

  loadJSON(urlPerfect, perfectData);
  loadJSON(urlHomophones, homophonesData);
}

function perfectData(data) {
  // push all the perfect rhymes in an array
  for (var i = 0; i < data.length; i++) {
    perfectArray[i] = data[i].word.toLowerCase();
    //console.log(data[i].word);
  }
}

function homophonesData(data) {
  // push all the homophones rhymes in an array
  for (var i = 0; i < data.length; i++) {
    homophonesArray[i] = data[i].word.toLowerCase();
    //console.log(data[i].word.toLowerCase());
  }
}
```
The other thing that we found difficult to program was the turns system. To avoid overlappings in the text input we had to implement a turn system with the socket.io library. Every time that a client connects, he is identificated automatically with his own socket.id, that we used to associate every client with to the various turn, in order of arrival in the room (the first user to connect is associated to the first turn, the second user to the second turn and the third user to the third turn). At the fourth turn the first user will start over, than the second and so on. To make all this possible to every client is sent his own socket.id and the list of all the socket.id to allow a comparison and recognise which client is associated to every turn. The first user is recognised and it sends a message with the current turn to all the other clients. When a user sends his verse to the system, after it has been accepted, another message is sent with the change of turn to all the clients. Based on the value of this message all the interactions are managed on the client-side (i.e. “disabled input” and “and” etc.)

``` javascript
function draw() {

  // the client asks its socket.id to the server
  var mySocketid = {
    msg: 'tell me my socket.id'
  }

  socket.emit('mySocketid', mySocketid);

  ////this piece of code kicks off all the turn system: when the first client connects to the server,
  ////a message with the current turn is sent to the server to allow the first user to type a title.
  ////The message is sent back to all the users in the setup() function to let them know what is the current turn
  if (numberOfClients == 1) {
    ///// message to allow the first user to type a title
    socket.emit('startFirstRound', {
      msg: -1
    });
  }
}

function setup() {
  socket = io();

  ///////////////////////////// sending to each client its socket.id

  socket.on("hereIsYourID", getMyID);

  function getMyID(receivedData) {
    myId = receivedData.id;
  }

  ////////////////////////////// sending to each client the list of socket.id
  socket.on("clientsUpdate", getMyUpdate);

  function getMyUpdate(receivedData) {
    clientsId = receivedData.clients;
    numberOfClients = receivedData.n_clients;
  }

  /////////////////each client receives the value of the current turn, on the base of which the clients manage the interactions

  socket.on("nextRound", nextTurn);

  function nextTurn(receivedData) {
    /// these variables show, disable or hide the correct text inputs in the draw() function
    var turn = receivedData.msg;
    if (turn == -1) {
      title = true;
    } else if (turn == 0) {
      title = false;
      verse_0 = true;
      verse_8 = false;
    } else if (turn == 1) {
      verse_0 = false;
      verse_1 = true;
    } else if (turn == 2) {
}

//////////////////////// get the list of clients and the number of clients, then send the data to all the sockets
  io.of('/').clients((error, clients) => {
    if (error) throw error;
        io.emit('clientsUpdate', {
          clients: clients,
          n_clients: io.engine.clientsCount
        });
}
```

## Retrieving and sending data from and to a database
Since we want people to be able to look at others’ poems, we had to use a database to store and retrieve data. We found out that firebase, a database service provided by google, is quite handy to do that. 

## Sending the data
After initialising firebase in the code, we made so that each time the 9th line is submitted, thus when the poem is completed, each of the lines is joined together with the others and then sent to our database as value of a property of an object with a unique id as name. Also the title of the poem is sent as value of another property.
``` javascript
////////////////////////////// when the last verse it's submitted, all the values of the text inputs are sent to the firebase database
function sendAll() {
  var ref = database.ref("lines"); //setting up the lines path

  // setting the properties of the javascript objects which will compose the data
  var data = {

    title: titleTextInput.value(),
    line: textInput[0].value() + '<br>' + textInput[1].value() + '<br>' + textInput[2].value() + '<br>' + '<br>' + textInput[3].value() + '<br>' + textInput[4].value() + '<br>' + textInput[5].value() + '<br>' + '<br>' + textInput[6].value() + '<br>' + textInput[7].value() + '<br>' + textInput[8].value()

  };

  var sentLine = ref.push(data, dataSent); //sends the data to database
  //console.log(sentLine.key); //shows the key created for the sent data

  function dataSent(err, status) {
    //console.log(status);
  }
  console.log(data.line);
  window.open("poetries_home_links.html", "_self");  /// after submitting the last verse, the user is directed to the gallery pages
}
```
## Retrieving the data
After sending the new poem to the database, we want it to send it back, so that the gallery of our app is kept up to date. So each time a change is detected in the path that leads to our poems in the database, some callback functions are triggered, in particular “gotData”, which extracts all the unique IDs in our database and creates a link for them. When clicked on, they will open a document with a unique link.

``` javascript
var ref = database.ref("lines"); //setting up the lines path
  //the reference in the database is checked from here onwards,
  //whenever the value changes, the callbacks are called
  ref.on("value", gotData, errData);

} // end of setup

function gotData(data) { //data is what is being retrieved from the database

  var lines = data.val(); //extracts as javascript object and selects the data content = an object which contains all the unique ids
  //console.log(lines);
  var keys = Object.values(lines); //selects all the values of the properties in the extracted object and puts them in "keys" array
  var ids = Object.keys(lines); //selects all the properties in the extracted object and puts them in "ids" array

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
// to get the unique id in the link and be able to use it I had to resort to the console.dir() method and find it
  var singleId = this.elt.attributes.href.value;


  window.open("singlePoem.html?id=" + singleId);

}
```
In the new document the user will find the poem corresponding to the unique id passed through the URL as its id. It is through this id that our app accesses the database and retrieves that poem in particular together with its title to then display it.
``` javascript
// in setup
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

```




# Inspirations/References
The most important obvious inspiration is The Divine Comedy of Dante Alighieri and indeed we used “terza rima” for the poems. The idea of the project is taken from the cigarette game, where one person has to write a sentence on a paper, cover it and then gave the paper to another person and so on.
Instead, the visual inspiration, has been books of 1200s, written by hand and with brown ink. So we used a font a little bit irregular, to remind the hand written books, and a font similar to those used in the firsts printed books, so we were inspired by the firsts editions of The Divine Comedy.
 
# Credits

- [Datamuse API](https://www.datamuse.com/api/), to check for the correctness of rhymes also using homophones
- [Firebase](https://firebase.google.com/?hl=it), to set up a database for our poems
- Fonts used:
  * IM FELL DW Pica regular, to simulate old writings
  * Donegal One regular, for the main titles and buttons
