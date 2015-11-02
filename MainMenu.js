
BasicGame.MainMenu = function (game) {

	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		score = 0;
		clicks = 0;

		this.titleimage = this.add.sprite(this.world.centerX,150, 'title');
		this.titleimage.anchor.setTo(0.5,0.5);
		this.titleimage.scale.setTo(0.5,0.5);

		this.playButton = this.add.button(this.world.centerX, this.world.height - 150, 'play', this.startGame, this, 1,0,2);
		this.playButton.scale.setTo(0.5,0.5);
		this.playButton.anchor.setTo(0.5,0.5);

		this.shapes1 = this.add.sprite(this.world.centerX,this.world.centerY+10,'spriteset');
		this.shapes1.frameName = 'shape1.png';
		this.shapes1.anchor.setTo(0.5,0.5);
		this.shapes1.alpha = 0;

		// this.shapes2 = this.add.sprite(this.world.centerX+80,this.world.centerY+10,'spriteset');
		// this.shapes2.frameName = 'shape2.png';
		// this.shapes2.anchor.setTo(0.5,0.5);

		this.frameNo = 1;
		this.shapetween = this.add.tween(this.shapes1).to({ alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);
		// this.frameSwitch = this.time.events.loop(150, this.updateFrame, this);

	},

	updateFrame : function(){
		this.frameNo = this.rnd.integerInRange(1,6);
		this.shapes1.frameName = 'shape'+this.frameNo+'.png';
		// this.frameNo = this.rnd.integerInRange(1,6);
		// this.shapes2.frameName = 'shape'+this.frameNo+'.png';

	},

	update: function () {

		if(this.shapes1.alpha==0){
			this.updateFrame();
		}
		// this.shapes1.angle++;		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		this.state.start('Game');

	}

};

BasicGame.EndScreen = function (game) {


};

BasicGame.EndScreen.prototype = {

	create: function () {

		this.scoretext = this.add.bitmapText(this.world.centerX,40,'font','Y O U   T O O K',30);
		this.scoretext.x = this.world.centerX - this.scoretext.textWidth/2;
		this.timetext = this.add.bitmapText(this.world.centerX,100,'font',score+'  S E C O N D S',30);
		this.timetext.x = this.world.centerX - this.timetext.textWidth/2;

		this.clicktext = this.add.bitmapText(this.world.centerX,160,'font','A N D  C L I C K E D',30);
		this.clicktext.x = this.world.centerX - this.clicktext.textWidth/2;
		this.totalclickstext = this.add.bitmapText(this.world.centerX,220,'font',clicks+'  T I M E S',30);
		this.totalclickstext.x = this.world.centerX - this.totalclickstext.textWidth/2;

		this.backButton = this.add.button(10, this.world.height - 5, 'back', this.startGame, this, 1,0,2);
        this.backButton.scale.setTo(0.4,0.4);
        this.backButton.anchor.setTo(-1.3,1.5);

	},

    startGame: function (pointer) {

        this.state.start('MainMenu');

    }
}