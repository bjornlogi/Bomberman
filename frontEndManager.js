"use strict";
var points_p1 = 0;
var points_p2 = 0;
var pointToggle = true;

var frontEndManager = {

 numPlayerScreen : true,
 numOpponentScreen : false,
 themeScreen : false,
 playGame : false,
 gameOver : false,
 winner : -1,
 num_players : 0,
 num_opponents : 0,
 livesboardSprite : "",
 livesDigitSprite : "",
 playerLives : {
  player0 : 3,
  player1 : 3,
  player2 : 3,
  player3 : 3,
 },
 theme : "",
 // P1_Button : {cx : 300, cy: 400, halfWidth: 70, halfHeight : 25},
 // P2_Button : {cx : 300, cy: 550, halfWidth: 70, halfHeight : 25},
 // buttons : [{cx : 300, cy: 400, halfWidth: 70, halfHeight : 25}, 
 // 			{cx : 300, cy: 480, halfWidth: 70, halfHeight : 25}],

 P1_Button : {cx : 180, cy: 460, halfWidth: 70, halfHeight : 70},
 P2_Button : {cx : 420, cy: 460, halfWidth: 70, halfHeight : 70},
 buttons : [{cx : 180, cy: 460, halfWidth: 70, halfHeight : 70}, 
 			{cx : 420, cy: 460, halfWidth: 70, halfHeight : 70}],

 updateWinner : function (winner){
  	this.gameOver = true;
  	this.playGame = false;
  	this.winner = winner;
 },

 render : function(ctx,lctx){
 	if (this.numPlayerScreen)
 		this.renderStartScreen(ctx);
  else if(this.numOpponentScreen)
    this.renderOpponentScreen(ctx);
  else if (this.themeScreen)
    this.renderThemeScreen(ctx);
 	if (this.gameOver) this.renderGameOverScreen(ctx);
  else{
    var my_gradient=ctx.createLinearGradient(150,550,450,570);
    my_gradient.addColorStop(0,"#F57100");
    my_gradient.addColorStop(0.5,"#DDDDAC");
    my_gradient.addColorStop(1,"#F57100");
    ctx.font = "bold 20px Arial";
    ctx.fillStyle=my_gradient;
    ctx.fillText("Click buttons or press 1 or 2", 150, 570);
  }

  //if (this.playGame)
    this.renderScoreBoard(lctx)
 },

 scoreBoardLocation : {
  player0 : {x:50, y:10},
  player1 : {x:146, y:10},
  player2 : {x:146, y:60},
  player3 : {x: 50, y: 60},
 },
  
 renderScoreBoard : function (ctx){
    this.livesboardSprite.drawAt(0,0, ctx);
    for (var pl in this.playerLives){
      var lives = this.playerLives[pl];
      //console.log(this.scoreBoardLocation["player"+pl].x)
      var x = this.scoreBoardLocation[pl].x;
      var y = this.scoreBoardLocation[pl].y;
      this.livesDigitSprite[lives].drawAt(x,y,ctx);
    }
 },

 renderStartScreen : function (ctx){
 	var b1 = this.P1_Button;
 	var b1_TLeft = util.getTopLeftCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);

 	//background
    var start_image = new Image();
    	start_image.src = 'https://notendur.hi.is/~pap5/bomberman/pic/newbomber.png';
    	start_image.onload = function(){
    		ctx.drawImage(start_image, 0, 0);
  	}	
  },
 
 renderOpponentScreen : function (ctx){
    //util.fillBox(ctx, 0,0,600,600,"black");
    var opponent_image = new Image();
      opponent_image.src = 'https://notendur.hi.is/~pap5/bomberman/pic/opponent.png';
      opponent_image.onload = function(){
        ctx.drawImage(opponent_image, 0, 0);
    } 
    var b1 = this.P1_Button;
    var b2 = this.P2_Button;
    var b1_TLeft = util.getTopLeftCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
    var b2_TLeft = util.getTopLeftCorner(b2.cx, b2.cy, b2.halfWidth, b2.halfHeight);
    // util.fillBox (ctx, b1_TLeft.x, b1_TLeft.y, b1.halfWidth*2, b1.halfHeight*2, "white" );
    // util.fillBox (ctx, b2_TLeft.x, b2_TLeft.y, b2.halfWidth*2, b2.halfHeight*2, "white" );

 },

 renderThemeScreen : function (ctx){
   //util.fillBox(ctx, 0,0,600,600,"black");
    var b1 = this.P1_Button;
    var b2 = this.P2_Button;
    var b1_TLeft = util.getTopLeftCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
    var b2_TLeft = util.getTopLeftCorner(b2.cx, b2.cy, b2.halfWidth, b2.halfHeight);
    //util.fillBox (ctx, b1_TLeft.x, b1_TLeft.y, b1.halfWidth*2, b1.halfHeight*2, "white" );
    //util.fillBox (ctx, b2_TLeft.x, b2_TLeft.y, b2.halfWidth*2, b2.halfHeight*2, "white" );
    var theme_forest = new Image();
        theme_forest.src = 'https://notendur.hi.is/~pap5/bomberman/pic/forest.png';
        theme_forest.onload = function(){
          ctx.drawImage(theme_forest, b1_TLeft.x, b1_TLeft.y-10);
        }
    var theme_space = new Image();
        theme_space.src = 'https://notendur.hi.is/~pap5/bomberman/pic/space.png';
        theme_space.onload = function(){
          ctx.drawImage(theme_space, b2_TLeft.x, b2_TLeft.y-10);
        }
     var my_gradient=ctx.createLinearGradient(150,550,450,570);
    my_gradient.addColorStop(0,"#F57100");
    my_gradient.addColorStop(0.5,"#DDDDAC");
    my_gradient.addColorStop(1,"#F57100");
    ctx.font = "bold 50px Arial";
    ctx.fillStyle=my_gradient;
    ctx.fillText("SELECT THEME", 100, 250);
 },


 renderGameOverScreen : function (ctx){
 	var over_image = new Image();
    	over_image.src = 'https://notendur.hi.is/~pap5/bomberman/pic/over.jpg';
    	over_image.onload = function(){
    		ctx.drawImage(over_image, 0, 0);
  	}	
 	var box = {cx:300, cy:300, halfWidth: 200, halfHeight:200};
 	var msg;
 	//util.fillBox(ctx,box.cx - box.halfWidth,box.cy - box.halfHeight,box.halfWidth*2,box.halfHeight*2,"blue");
 	//ctx.fillStyle="#FFFFFF";
 	ctx.font = "bold 20px Arial";
 	if (this.winner == -1){
 	 		msg = "You died!\n";
 	 	}
 	else{
 			var winner = this.winner + 1;
 			
 			if(pointToggle === true){
	 			if(this.winner === 1){
	 				  points_p2 += 1;
	 				  pointToggle = false;}
	 			else{
	 				points_p1 += 1;
	 				pointToggle = false;
	 			}
 			}
 	 		var winner_image = new Image();
    		winner_image.src = 'https://notendur.hi.is/~pap5/bomberman/pic/p'+winner+'_win.png';
    		winner_image.onload = function(){
    			ctx.drawImage(winner_image, 220, 230);
  			}	
        ctx.fillText("Player "+ winner+" wins!", 250, 400);
  			ctx.fillText(points_p1 +" - "+points_p2, 300, 500);
 	 	}
},
 	//button for 
 

 update : function(du){
  if (this.gameOver || mute)
    this.intro.pause();
  else if (!mute && this.playGame)
    this.intro.play()
 },

 intro : new Audio(
  "http://www.vgmuseum.com/mrp/cv-rob/tdxc/music/07-BLOODYTEARS.mp3"),

 buttonClicked : function(mouseX,mouseY){
 	var b1 = this.P1_Button;
 	var b1_TLeft = util.getTopLeftCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
 	var b1_BRight = util.getBottomRightCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
 	var num_buttons = this.buttons.length;
	for (i = 0; i<num_buttons; i++){
		var b = this.buttons[i];
 		var b_TLeft = util.getTopLeftCorner(b.cx, b.cy, b.halfWidth, b.halfHeight);
 		var b_BRight= util.getBottomRightCorner(b.cx, b.cy, b.halfWidth, b.halfHeight);

 		if (mouseX >= b_TLeft.x && mouseX <= b_BRight.x &&
 		mouseY >= b_TLeft.y && mouseY <= b_BRight.y)
      this.handleUserInput(i+1);
	}
 },

 handleUserInput : function (i){
    if (this.numPlayerScreen){
          //this.playGame = true;
          this.numPlayerScreen = false;
          this.numOpponentScreen = true;
          this.num_players = i;
          //break;
      }
      else if (this.numOpponentScreen){
        this.num_opponents = i;
        this.themeScreen = true;
        this.numOpponentScreen = false;
       // break;
      }
      else if (this.themeScreen){
        this.playGame = true;
        this.themeScreen = false;
        i==1 ? this.theme = "grass" : this.theme = "space";
        createPlayerSprites(this.num_players, this.num_opponents);
        createThemeSprites(this.theme);
        this.intro.play();
      }
 },

};