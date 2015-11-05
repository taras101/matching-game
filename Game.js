
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

	create: function () {
        
        this.toggle = true;
        this.level = 4;

        this.shapes = [];
        this.solution = [];
        this.shapeindex = 0;

        this.shape1 = null;
        this.shape2 = null;
        //set time for card flash on start
        this.flash = 700;
        this.placeBoxes('2X4');

        this.totaltime = 0;
        this.totalclicks = 0;

        


        this.timetext = this.add.bitmapText(this.world.centerX,25,'font','0',30);
        this.timetext.x = this.world.centerX - this.timetext.textWidth/2;
        this.time.events.loop(Phaser.Timer.SECOND, this.updateScore, this);

        this.backButton = this.add.button(10, this.world.height - 5, 'back', this.startGame, this, 1,0,2);
        this.backButton.scale.setTo(0.4,0.4);
        this.backButton.anchor.setTo(-1.3,1.5);
	},

    startGame: function (pointer) {

        this.state.start('MainMenu');

        
        // for(var i=0;i<this.shapes.length;i++){
        //         this.openShape(i);
        //     }

    },

    updateScore : function(){
        this.totaltime++;
        this.timetext.setText(this.totaltime.toString());
        this.timetext.x = this.world.centerX - this.timetext.textWidth/2;
    },

    nextLevel : function(){
        this.time.events.add(Phaser.Timer.SECOND, function(){
            this.str = (this.level+1)+'x2';
            if(this.level==6){
                score = this.totaltime;
                clicks = this.totalclicks;
                this.state.start('EndScreen');
            }
            this.toggle = true;
            this.flash= this.flash-200;
            this.shapeindex = 0;

            for(var i=0;i<this.shapes.length;i++){
                this.shapes[i].destroy();
            }

            this.shape1 = null;
            this.shape2 = null;
            

            this.placeBoxes(this.str);

            this.level +=1;
        }, this);
        
    },

	update: function () {


	},

    openShape : function(a){
        // console.log(a.no);
        this.totalclicks++;
        var win = false;
        var out_tween = this.add.tween(a).to({alpha:1}, 100, Phaser.Easing.Sinusoidal.Out, true);
        var in_tween = function(){
            a.frameName = 'shape'+this.solution[a.no]+'.png';
            this.add.tween(a).to({alpha:1}, 10, Phaser.Easing.Sinusoidal.In, true);
            if(this.toggle){
                this.shape1 = a;
                this.toggle = false;
                this.shape1.inputEnabled = false;
            }
            else{
                this.shape2 = a;
                // if(this.shape1==this.shape2){
                //     this.shape1.frameName = 'covershape.png';
                //     this.shape1.inputEnabled = true;
                // }
                // else{
                    if(this.shape1.frameName!=this.shape2.frameName){
                        var temp_tween1 = this.add.tween(this.shape1).to({alpha:0}, 100, Phaser.Easing.Sinusoidal.Out, true);
                        var temp_tween2 = this.add.tween(this.shape2).to({alpha:0}, 100, Phaser.Easing.Sinusoidal.Out, true);
                        temp_tween2.onComplete.add(function(){
                            this.shape1.frameName = 'covershape.png';
                            this.shape2.frameName = 'covershape.png';
                            this.add.tween(this.shape1).to({alpha:1}, 100, Phaser.Easing.Sinusoidal.Out, true);
                            this.add.tween(this.shape2).to({alpha:1}, 100, Phaser.Easing.Sinusoidal.Out, true);
                            this.shape1.inputEnabled = true;
                        },this);
                    }
                    else{
                        win = true;
                        this.shape1.inputEnabled = false;
                        this.shape2.inputEnabled = false;
                        this.solution[this.shape1.no] = -1;
                        this.solution[this.shape2.no] = -1;
                        for(var i=0;i<this.solution.length;i++){
                            if(this.solution[i]!=-1){
                                win = false;
                                break;
                            }
                        }
                        if(win==true){
                            this.nextLevel();
                        }
                    }
                // }
                this.toggle = true;
            }

        }
        out_tween.onComplete.add(in_tween,this);
        
    },

    placeBoxes : function(type){
        this.shapes.length = 0;
        this.shapeindex = 0;
        this.solution.length = 0;

        switch(type){
            case '2x2'  :   for(var i=0;i<2;i++){
                                for(var j=0;j<2;j++){
                                    this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX-60+120*j,this.world.centerY-60+120*i,'spriteset');
                                    this.shapes[this.shapeindex].frameName = 'covershape.png';
                                    this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                                    this.shapeindex++;
                                }
                            }
                            break;
            case '3x2'  :   for(var i=0;i<2;i++){
                                for(var j=0;j<3;j++){
                                    this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX-120+120*j,this.world.centerY-60+120*i,'spriteset');
                                    this.shapes[this.shapeindex].frameName = 'covershape.png';
                                    this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                                    this.shapeindex++;
                                }
                            }
                            break;
            case '2X4'  :   for(var i=0;i<4;i++){
                                for(var j=0;j<2;j++){
                                    this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX-190+120*i,this.world.centerY-60+120*j,'spriteset');
                                    this.shapes[this.shapeindex].frameName = 'covershape.png';
                                    this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                                    this.shapeindex++;
                                }
                            }
                            break;
            case '5x2'  :   for(var i=0;i<3;i++){
                                for(var j=0;j<3;j++){
                                    this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX-120+120*j,this.world.centerY-190+120*i,'spriteset');
                                    this.shapes[this.shapeindex].frameName = 'covershape.png';
                                    this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                                    this.shapeindex++;
                                }
                            }
                            this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX,this.world.centerY+170,'spriteset');
                            this.shapes[this.shapeindex].frameName = 'covershape.png';
                            this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                            this.shapeindex++;
                            break;
            case '6x2'  :   for(var i=0;i<3;i++){
                                for(var j=0;j<4;j++){
                                    this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX-190+120*j,this.world.centerY-120+120*i,'spriteset');
                                    this.shapes[this.shapeindex].frameName = 'covershape.png';
                                    this.shapes[this.shapeindex].anchor.setTo(0.5,0.5);
                                    this.shapeindex++;
                                }
                            }
                            break;
            default     :   break;
        }
        for(var i=0;i<this.shapes.length;i++){
            this.shapes[i].anchor.setTo(0.5,0.5);
            this.shapes[i].no = i;
            this.shapes[i].inputEnabled = true;
            this.shapes[i].events.onInputDown.add(this.openShape, this);
            // this.shapes[i].events.onEnterBounds.add(this.openShape, this);
            this.shapes[i].input.game.input.activePointer.isDown = true;
            
            // this.shapes[i].events.add(this.openShape, this);

            
        }
        for(var i=0;i<this.shapes.length;i=i+2){
            this.solution[i] = i/2+1;
            this.solution[i+1] = i/2+1;
        }

        this.math.shuffleArray(this.solution);
        for(var i=0;i<this.solution.length;i++){
            this.shapes[i].frameName = 'shape'+this.solution[i]+'.png';
            this.shapes[i].alpha = 0;
            this.add.tween(this.shapes[i]).to({alpha:1}, 700, Phaser.Easing.Sinusoidal.Out, true);
            
            }
        this.time.events.add(this.flash, function(){
          console.log(this.flash);
          for(var i=0;i<this.solution.length;i++){
            this.shapes[i].frameName = 'covershape.png'}},this);
          
     
        console.log(this.solution);

        // this.shapes[1].events.input.activePointer.isDown = true
        // game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
    }

  };
