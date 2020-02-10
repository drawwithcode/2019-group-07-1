var tutorialButton;
var galleryButton;
var poemlButton;
var socket;

function preload() {
  img = loadImage("./assets/menù_image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  socket = io();

  tutorialButton = createButton('Tutorial');
  tutorialButton.id('tutorialButton');
  tutorialButton.position(width/2, height/2.12);

  galleryButton = createButton('Go to the Gallery');
  galleryButton.id('button');
  galleryButton.position(+ width/5, height/1.5);

  poemButton = createButton('Write a Poetry');
  poemButton.id('button');
  poemButton.position(width - width/5, height/1.5);
  poemButton.mouseClicked(openWritePoetryPage);

} //// end of setup

function (openWritePoetryPage) {

}

function draw() {
  imageMode(CENTER);
  var scalefactor = 1930000;
  image(img, width / 2, height / 2, img.width / scalefactor * (width * height), img.height / scalefactor * (width * height))

}
