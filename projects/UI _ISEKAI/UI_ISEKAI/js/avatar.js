// Generates a random face with a different hairstyle, face shape, complexion, eyes, and eyebrows from a bunch of different hand drawn images

let avi; // Object variable
// Arrays containing images
let hairBlack = [];
let hairBrown = [];
let hairBlonde = [];
let brow = [];
let browBlonde = [];
let eyes = [];
let head = [];
let headWithHair = [];

let addHair; // Used to check if hair should be added to the avatar

// Used to check the hair color to match with the eyebrows
let blonde;
let brunette;
let bald;

// Variables which hold the
let headImage;
let hairImage;
let browImage;
let eyesImage;
let noseImage;
let mouthImage;

class Avatar {
  constructor(){}

  createRandomAvatar(x, y) {
    // ASSIGNING PHASE
    let whichHead = random(); // Random number between 1 and 0 to decide which array the head is pulled from
    if (whichHead < 0.85) {
      // 85% chance head will not have any hair drawn on it from before
      headImage = random(head);
      addHair = true; // Since head has no hair
    } else if (whichHead > 0.85) {
      // 15% chance head will have any hair drawn on it from before
      headImage = random(headWithHair);
      bald = true; // Avi is bald
    }
    let brunetteOrBlonde = random(); // Random number between 1 and 0 to decide which array the hair is pulled from
    if (brunetteOrBlonde < 0.39 && addHair === true) {
      hairImage = random(hairBlack);
      brunette = true; // Avi's is a brunette
      blonde = false;
    }
    else if (brunetteOrBlonde > 0.39 && brunetteOrBlonde < 0.78 && addHair === true) {
      hairImage = random(hairBrown);
      brunette = true; // Avi's is a brunette
      blonde = false;
    } else if (
      brunetteOrBlonde > 0.78 &&
      brunetteOrBlonde < 0.95 &&
      addHair === true
    ) {
      hairImage = random(hairBlonde);
      blonde = true; // Avi is blonde
      brunette = false;
    }
    let haveBrows = random(); // Random number between 1 and 0 to decide if avatar should have eyebrows
    if (haveBrows < 0.93) {
      if (blonde === true) {
        browImage = random(browBlonde);
      } else if (brunette === true) {
        browImage = random(brow);
      }
    }
    eyesImage = random(eyes);

    // DISPLAYING PHASE
    imageMode(CENTER);
    image(headImage, x, y) // Displays head
    if (haveBrows < 0.93){
      image(browImage, x, y - 40) // Displays brows
    }
    image(eyesImage, x, y - 15) // Displays eyes
    if (brunetteOrBlonde < 0.95){
      image(hairImage, x, y + 100); // Displays hair
    }
    image(noseImage, x, y + 20) // Displays nose
    image(mouthImage, x, y + 60) // Displays mouth
  }
}
