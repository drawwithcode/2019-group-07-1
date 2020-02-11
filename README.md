# The Online Comedy
By Luca Bernardi, Gianluca Locatelli, Lucia Mazzanti

Creative Coding 2019/2020 (https://drawwithcode.github.io/2019/)
Politecnico di Milano - Scuola del Design
Faculty: Michele Mauri, Andrea Benedetti

# Project idea
At the beginning, inspired by the game of the cigarette, we wanted to develop a site where people could write fun sentences together just to pass time. Then, we discovered of the existence of Dantedì, a day of the year dedicated to the great figure of Dante Alighieri, so we decided to design a site in honor of him to remember this important figure, to diffuse the Italian literature of 1200 and to make people interested in it. To do that we designed a site where people could write poems together in terza rima and also read other people’s poems. 

We designed the site also to make people feel better and have fun because research (https://www.bbc.com/news/entertainment-arts-48188508 o https://www.madebytamalia.co.uk/the-impact-of-creativity-on-wellbeing/) shows that even a little bit of creativity each day can boost well-being, as creative acts help us to feel less stressed, think clearly and grow as people. There's power in saying a lot with little!

The name of the project, The Online Comedy, is an assonance of the great poem of Dante, The Divine Comedy, because we wanted to refer to it for the reasons above and because our aim is to collect all these poems to create a huge poem in honor of Dante.

Considering that the site have been made in honor of Dante, the poems have to be written in terza rima (ABA BCB CDC…), which  is a rhyming verse stanza form that consists of an interlocking three-line rhyme scheme. We decided to let the users write only 9 lines and the maximum of writers for a poem is three. The writing system uses turns: the first to arrive is the first to write (and decides also the title of the poem), the second is the second, and so on; after every writer has sent a line, the turns will restart from the first person, and so on. Once the writers reach nine published lines, the poem will be automatically published on the gallery.

The site is designed for computer because writings serious poems takes time and we imagine the users writing while sitting on chairs in their houses with a cup of tea.

# Design challenges
In the first page we have the principal menu with three buttons: they have been designed differently from the title, to allow users to understand that they are of a different category: with one category you can interact (the one with red borders) with the other one not (brown borders). In the “Write a poem” section, on the center you have a big parchment with nine empty lines with on the left a scheme of the terza rima which is clearly a sign for the user to type something, following the scheme. Then there’s a column of feathers that are as much as the number of the writers (maximum three for poem) and one of them is pointed out with at the bottom a written, “YOU”,  to show the user when is his turn. On the gallery section instead you have all the poems, one for parchment, ordered in chronological time, to show that is the list of all the poems.
To follow the style of La Divina Commedia we decided to use a handmade design with brown colors, as those used on 1200’s books.  So all the drawings were made by hand using photoshop.
The elements are clearly not innovative, because we were inspired by 1200s style, so we used a simple style for this reason, and also to facilitate the users on understanding the functioning of the site.

# Code challenges
One of the most difficult challenge to face was to build the rhyme section; to check that two verses are in rhyme we used datamuse.api, which allows us (among the many features that the service has) to obtain a JSON containing an array of the words which rhyme with a certain word. In the english language there are the perfect rhymes, but also the homophones, that are words with the same sound but different spelling. For this reason we ask to the api both for an array of the words in perfect rhyme and an array with the homophones words. After that we make a text comparison between the last word of the current verse with the the arrays of the last word of the corresponding previous verse.

<addr> function checkRhyme(currentVerse) {
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
</addr>

The other thing that we found difficult to program was the turns system. To avoid overlappings in the text input we had to implement a turn system with the socket.io library. Every time that a client connects, he is identificated automatically with his own socket.id, that we used to associate every client with to the various turn, in order of arrival in the room (the first user to connect is associated to the first turn, the second user to the second turn and the third user to the third turn). At the fourth turn the first user will start over, than the second and so on. To make all this possible to every client is sent his own socket.id and the list of all the socket.id to allow a comparison and recognise which client is associated to every turn. The first user is recognised and it sends a message with the current turn to all the other clients. When a user sends his verse to the system, after it has been accepted, another message is sent with the change of turn to all the clients. Based on the value of this message all the interactions are managed on the client-side (i.e. “disabled input” and “and” etc.)

# Inspirations/References
The most important obvious inspiration is The Divine Comedy of Dante Alighieri, in fact we used terza rima for the poems. The idea of the project is taken from the cigarette game, where one person has to write a sentence on a paper, cover it and then gave the paper to another person and so on.
Instead, the visual inspiration, had been books of 1200s, written by hand and with brown ink. So we used a font a little bit irregular, to remind the hand written books, and a font similar to those used in the firsts printed books, so we were inspired by the firsts editions of The Divine Comedy.
 
# Credits (third libraries used)




This repository is the starting point of the assignments given in the elective course [Creative Coding at Politecnico di Milano](https://www11.ceda.polimi.it/schedaincarico/schedaincarico/controller/scheda_pubblica/SchedaPublic.do?&evn_default=evento&c_classe=696598&__pj0=0&__pj1=3ed8420c42c849845b5caa3de626e8fc).
Browse [this website](https://drawwithcode.github.io/) if you want to know more about it.
