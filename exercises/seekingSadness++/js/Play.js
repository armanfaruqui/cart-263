class Play extends Phaser.Scene {

  /**
  Just sets the scene's key name
  */
  constructor() {
    super({
      key: `play`
    });
  }

  /**
  Does the lion's share of the work creating sprites and configuring them,
  as well as setting physics handlers and listening to the arrow keys.
  */
  create() {
    // Create the avatar and make it collide with the "walls"
    this.avatar = this.physics.add.sprite(400, 400, `avatar`);
    this.avatar.setCollideWorldBounds(true);

    // Create a sadness emoji in a random position
    this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);
    // Note how we can use RandomRectangle() here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds);

    // Create a group of hapiness emojis with some basic
    // physics configuration
    this.happiness = this.physics.add.group({
      // Image key to use
      key: `thumbs-up`,
      // How many
      quantity: 120,
      // Collide with the "walls"
      collideWorldBounds: true,
      // How much to they bounce when they hit something?
      bounceX: 0.5,
      bounceY: 0.5,
      // How quickly do they slow down while moving?
      dragX: 50,
      dragY: 50
    });

    //Creates an animation from the 2 frames of the dog
    this.anims.create({
           key: 'doggo',
           frames: [
               { key: 'dog1' },
               { key: 'dog2' }
           ],
           frameRate: 8,
           repeat: -1
       });


    // Position all the members of the group randomly within a rectangle the same
    // dimensions and position as the world's bounds (e.g. the canvas)
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);

    // Listen for when the avatar overlaps the thumbs up and handle it,
    // remembering to set "this" so that we can use "this" in the method it calls
    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
    // Add colliders between the avatar and the happiness, and the happiness and itself
    // so that we get lots of fun bouncy physics for free!
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Displays houses and calls an event when they are overlapped
    this.house1 = this.physics.add.sprite(200, 400, `house1`);
    this.house2 = this.physics.add.sprite(600, 200, `house2`);
    this.physics.add.overlap(this.avatar, this.house1, this.makehouse1Transparent, null, this);
    this.physics.add.overlap(this.avatar, this.house2, this.makehouse2Transparent, null, this);
  }

  /**
  Called when the avatar overlaps the sadness, moves the sadness to a new random position.
  */
  getSad(avatar, sadness) {
    // Note how we can use RandomRectangle() again here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds);
    let ting = this.sound.add(`ting`);
    ting.play(); // Plays a sound
    this.house1.alpha = 1
    this.house2.alpha = 1 // Resets house's opacity
    let dogX = Math.floor((Math.random() * 800) + 1);
    let dogY = Math.floor((Math.random() * 600) + 1);
    this.dog = this.physics.add.sprite(dogX, dogY, 'dog1').play('doggo'); // Spawns dog
    this.physics.add.overlap(this.avatar, this.dog, this.bark, null, this); // Sets up overlap listener
  }

  /**
  Listens for user input
  */
  update() {
    this.handleInput();
  }

  /**
  Moves the avatar based on the arrow keys for rotation and thrust
  */
  handleInput() {
    // If either left or right is pressed, rotate appropriately
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    }
    else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    }
    // Otherwise stop rotating
    else {
      this.avatar.setAngularVelocity(0);
    }

    // If the up key is pressed, accelerate in the current rotation direction
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
    }
    // Otherwise, zero the acceleration
    else {
      this.avatar.setAcceleration(0);
    }
  }

  makehouse1Transparent(avatar, house1){
    this.house1.alpha = 0.5
    this.house2.alpha = 1
  }

  makehouse2Transparent(avatar, house2){
    this.house2.alpha = 0.5
    this.house1.alpha = 1
  }

  bark(avatar, dog){
    this.bark = this.sound.add(`bark`);
    this.bark.play(); // Plays the bark
  }
}
