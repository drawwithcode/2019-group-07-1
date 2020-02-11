//// images
var backgroundImage;
//var dante;
var danteImage;

// buttons
var tutorialButton;
var galleryButton;
var poetryButton;
var tutorialBox;
var backTutorialButton;

var tutorialString = 'This is the site with the biggest online Comedy of all times!<br>  It has been designed in honor of Dante Alighieri, but to match<br>  such a great genius we need to join forces and write poems together! Don\’t worry,  of course you can also just read them. Since this project is dedicated to Dante, the poem has to be written in terza rima, which  is a rhyming verse stanza form that consists of an interlocking <br> three-line rhyme scheme that is the following: ABA BCB CDC.<br><br>  To write a poem there must be at least two people with a maximum of three and the number of lines to be written is 9. The person who begins must choose a title and every person before publishing his verse needs to sign himself. Once you published it you have to wait your next turn. When the poem is finished, that is when it has nine lines, it gets automatically published in the gallery.<br> <br>  Have fun!';



//var socket;


function preload() {
  backgroundImage = loadImage("./assets/menù_image.png");
  //dante = loadImage("./assets/Dante.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //socket = io();

  menùBackground = createImg('./assets/menù_image.png');
  menùBackground.id('menùBackground');
  menùBackground.class('responsive');
  menùBackground.parent(backgroundContainer);

  galleryButton = createButton('Go to the Gallery');
  galleryButton.id('galleryButton');
  galleryButton.class('brownColor');
  galleryButton.mouseOver(changeTextColor);
  galleryButton.mouseOut(recoverColor);
  //galleryButton.position(width/4.6, height/1.5);
  galleryButton.mouseClicked(openGalleryPage);

  poetryButton = createButton('Write a Poetry');
  poetryButton.id('poemButton');
  poetryButton.class('brownColor');
  poetryButton.mouseOver(changeTextColor);
  poetryButton.mouseOut(recoverColor);
  //poemButton.position(width - width/4.6, height/1.5);
  poetryButton.mouseClicked(openWritePoetryPage);

  tutorialButton = createButton('Tutorial');
  tutorialButton.id('tutorialButton');
  tutorialButton.class('brownColor');
  tutorialButton.mouseOver(changeTextColor);
  tutorialButton.mouseOut(recoverColor);
  tutorialButton.mouseClicked(openTutorial);
  //tutorialButton.position(width/2, height/2.12);

  tutorialBox = createDiv();
  tutorialBox.id('tutorialBox');
  tutorialBox.hide();
  tutorialBox.class('responsive');


  tutorialSentence = createP(tutorialString);
  tutorialSentence.parent(tutorialBox);
  tutorialSentence.id('tutorialSentence');

  danteImage = createImg("assets/Dante.png");
  danteImage.parent(tutorialBox);
  danteImage.id('danteImage');
  danteImage.class('responsive');
  // danteImage = select("#danteImage");
  // danteImage.parent(tutorialBox);
  // danteImage.id('danteImage');

  backTutorialButton = createButton('Back');
  backTutorialButton.parent(tutorialBox);
  backTutorialButton.id('backTutorialButton');
  backTutorialButton.class('brownColor');
  backTutorialButton.mouseOver(changeTextColor);
  backTutorialButton.mouseOut(recoverColor);
  backTutorialButton.mouseClicked(backFromTutorial);

  console.log(Array.from(tutorialString));

} //// end of setup

function changeTextColor() {
  this.removeClass('brownColor');
  this.addClass('redColor');
}

function recoverColor() {
  this.removeClass('redColor');
  this.addClass('brownColor');
}

function openWritePoetryPage() {
  window.open("index2.html", "_self");
}

function openGalleryPage() {
  window.open("poetries_home_links.html", "_self");
}

function openTutorial() {
  tutorialBox.show();
}

function backFromTutorial() {
  tutorialBox.hide();
}

function draw() {
  imageMode(CENTER);
  var scalefactor = 1930000;
  image(backgroundImage, width / 2, height / 2, backgroundImage.width / scalefactor * (width * height), backgroundImage.height / scalefactor * (width * height));

  // image(dante, width / 2, height / 2, dante.width / 2000000 * (width * height), dante.height / 2000000 * (width * height));

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
