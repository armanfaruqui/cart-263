"use strict";

// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`
  ],
  sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`
  ]
};

// Our three elements on the page that contain each line of the poem
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

// images
let bush = document.getElementById(`bush`);
let flower1 = document.getElementById(`flower1`);
let flower2 = document.getElementById(`flower2`);

// Set up the starting lines
setupLines();
// Listen for clicks on each element and respond by changing them
addListeners();

fontColor();
/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  line1.addEventListener(`click`, changeLine);
  document.addEventListener(`keydown`, function(event){
    if (event.keyCode === 49){
      changeLineByKey(line1)
     }
   });
  line1.addEventListener(`click`, showImage1);
  line2.addEventListener(`click`, changeLine);
  document.addEventListener(`keydown`, function(event){
    if (event.keyCode === 50){
      changeLineByKey(line2)
     }
   });
  line2.addEventListener(`click`, showImage2);
  line3.addEventListener(`click`, changeLine);
  document.addEventListener(`keydown`, function(event){
    if (event.keyCode === 51){
      changeLineByKey(line3)
     }
   });
  line3.addEventListener(`click`, showImage3);
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  fadeOut(event.target, 1);
  fontColor()
}
// Second change line function with a different parameter to allow for keypresses to call it
function changeLineByKey(line) {
  fadeOut(line, 1);
}

function showImage1(event){
  fadeIn(bush, 0)
}

function showImage2(event){
  fadeIn(flower1, 0)
}

function showImage3(event){
  fadeIn(flower2, 0)
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
  else {
    // Do nothing - we're done!
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
  }
  else {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function fontColor(){
  if (line3.innerText === haikuLines.fiveSyllables[1] || line3.innerText === haikuLines.fiveSyllables[3] || line3.innerText === haikuLines.fiveSyllables[4]){
    line1.style[`color`] = `#750000`;
    line2.style[`color`] = `#750000`;
    line3.style[`color`] = `#750000`;
  }
  else {
    line1.style[`color`] = `#160b5e`;
    line2.style[`color`] = `#33239e`;
    line3.style[`color`] = `#33239e`;
  }
}
