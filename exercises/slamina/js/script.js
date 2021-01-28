"use strict"

const JOKES =
    [
      "I invented a new word.  Plagiarism!",
      "Did you hear about the mathematician who ia s afraid of negative numbers? He will  stop at nothing to avoid them.",
      "Why do we tell actors to break a leg? Because every play has a cast.",
      "Did you hear about the claustrophobic astronaut? He just needed a little space",
      "Never trust an atom, they make up everything",
      "Where are average things manufactured. The satisfactory",
      "How do you drown a hipster? You throw them in the mainstream",
      "What sits at the bottom of the sea and twitches? A nervous wreck",
      "What rhymes with orange? No it does not",
      "What do you call a fake noodle? An impasta",
      "What did zero say to eight? Nice belt",
      "What do you call a pony with a sore throat? A little horse",
      "What did one hat say to the other? You wait here. I will go on a head",
      "What do you get from a pampered cow? Spoiled milk",
      "I poured root beer in a square glass. Now I just have beer",
      "Rest in peace boiling water. You will be mist",
      "How do you throw a space party? You planet",
      "Nineteen and twenty got in a fight. Twenty one",
      "I hate russian dolls. They are so full of themselves",
      "Two fish are sitting in a tank. One looks over at the other and says: Hey, do you know how to drive this thing?",
      "Atheism is a non-prophet organization.",
      "What do you call it when Batman skips church? Christian Bale.",
      "How do you keep an idiot in suspense?",
      "I went on a once in a lifetime holiday. Never again.",
      "I used to be addicted to soap, but I'm clean now.",
      "I was wondering, why does a frisbee appear larger the closer it gets. then it hit me.",
      "I told my friend 10 jokes to get him to laugh. No pun in 10 did.",
      "Today was a terrible day. My ex got hit by a bus, and I lost my job as a bus driver",
      "Why are priests called father? because its too suspicious to call them daddy.",
      "I wasn’t planning on going for a run today, but those cops came out of nowhere",
      "“I’m sorry” and “I apologise” mean the same thing. Except at a funeral.",
      "My family is like a cactus; A bunch of pricks.",
      "I once ate a watch. It was time consuming.",
      "I have a fear of speed bumps, but i am slowly getting over it",
      "Why do cows have hooves instead of feet? Because they lactose.",
      "What is the best thing about living in Switzerland? Well, the flag is a big plus.",
      "Communist jokes aren’t funny unless everyone gets them.",
      "I was very lonely so I bought some shares. It’s nice to have a bit of company.",
      "Why doesn’t the Sun go to college? – Because it has a million degrees.",
      "roses are dead. violets are dead. I am a bad gardener.",

    ];

  const ACCENTS = [
    "UK English Male",
    "UK English Female",
    "US English Male",
    "US English Female",
    "Spanish Female",
    "French Female",
    "French Male",
    "Italian Female",
    "Russian Female",
    "Hindi Male",
    "Hindi Female",
    "Japanese Female"
  ]

let currentJoke = ``;
let currentAccent = ``;
let currentAnswer = ``;

function setup() {
createCanvas(windowWidth, windowHeight);

if (annyang){
    let commands = {
      'They are a *accent': guessAccent
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textAlign(CENTER, CENTER);
  }
}


function draw() {
background(0)

displayAnswer()
displayTips()
}

function mousePressed(){
  currentJoke = random(JOKES);
  currentAccent = random(ACCENTS)
  console.log(currentAccent);
  responsiveVoice.speak(currentJoke, currentAccent, {rate:0.8});

}

function guessAccent(accent){
  currentAnswer = accent
}

function displayAnswer(){
  if (currentAnswer.toLowerCase() === currentAccent.toLowerCase()) {
    fill (0, 255, 0)
  }
  else {
    fill(255, 0, 0)
  }
  text(currentAnswer, width/2, height/2);
}

function displayTips(){
  push()
  fill(255)
  textAlign(LEFT)
  textSize(30)
  text("INSTRUCTIONS", 50, 50)
  textSize(24)
  text("Say 'They are a' followed by your guess of their nationality and sex", 50, 100)
  text(" Instead of 'British' say 'UK English'", 50, 130)
  text(" Instead of 'American' say 'US English'", 50, 160)
  text(" Instead of 'Indian' say 'Hindi'", 50, 190)
  pop()
}
