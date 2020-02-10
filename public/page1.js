//// images
var backgroundImage;
var dante;

// buttons
var tutorialButton;
var galleryButton;
var poetryButton;
var tutorialBox;
var backTutorialButton;


var socket;

var tutorialString = 'hello world!';

function preload() {
  backgroundImage = loadImage("./assets/menù_image.png");
  dante = loadImage("./assets/dante.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  socket = io();

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

  dante = createImg("./assets/dante.png");
  dante.parent(tutorialBox);
  dante.id('danteImage');

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
  window.open("poetries_home.html", "_self");
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

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
