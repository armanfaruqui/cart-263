class Boot extends Phaser.Scene {
  /**
  Just sets the scene's key name
  */
  constructor() {
    super({
      key: `boot`
    });
  }

  /**
  Loads the image assets then switches to the play scene on completion.
  */
  preload() {
    // Load images
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
    this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);
    this.load.image(`house1`, `assets/images/house1.png`);
    this.load.image(`house2`, `assets/images/house2.png`);
    this.load.audio(`ting`, `assets/sounds/ting.wav`);
    // Switch to the play scene on complete
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  /**
  Nothing here, but could add a loading message for example
  */
  create() {

  }

  update() {

  }

}
