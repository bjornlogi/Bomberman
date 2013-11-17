"use strict";


var frontEndManager = {

 startScreen : true,
 playGame : false,
 P1_Button : {cx : 300, cy: 400, halfWidth: 70, halfHeight : 25},
 P2_Button : {cx : 300, cy: 550, halfWidth: 70, halfHeight : 25},
 buttons : [{cx : 300, cy: 400, halfWidth: 70, halfHeight : 25}, 
 			{cx : 300, cy: 480, halfWidth: 70, halfHeight : 25}],

 render : function(ctx){
 	if (this.startScreen)
 		this.renderStartScreen(ctx);
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

   	//util.fillBox(ctx, 0,0,600,600,"black");

 	//buttons
 	var textCalibration = 30;
 	var num_buttons = this.buttons.length;
 	for (i = 0; i<num_buttons; i++){
 		var b = this.buttons[i];
 		var b_TLeft = util.getTopLeftCorner(b.cx, b.cy, b.halfWidth, b.halfHeight);

	 	util.fillBox(ctx, b_TLeft.x, b_TLeft.y, b.halfWidth*2, b.halfHeight*2, "blue");
	 	ctx.fillStyle="#FFFFFF";
	    ctx.font = "bold 20px Arial";
	 	ctx.fillText(i+1+" Player", b_TLeft.x + textCalibration, b_TLeft.y + textCalibration);
	 }

 	//button for 
 },

 update : function(du){

 },

 buttonClicked : function(mouseX,mouseY){
 	var b1 = this.P1_Button;
 	var b1_TLeft = util.getTopLeftCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
 	var b1_BRight = util.getBottomRightCorner(b1.cx, b1.cy, b1.halfWidth, b1.halfHeight);
 	var num_buttons = this.buttons.length;
 	//console.log(mouseY,buttonTLeft.y)// && mouseY <= buttonBRight.y);
	for (i = 0; i<num_buttons; i++){
		var b = this.buttons[i];
 		var b_TLeft = util.getTopLeftCorner(b.cx, b.cy, b.halfWidth, b.halfHeight);
 		var b_BRight= util.getBottomRightCorner(b.cx, b.cy, b.halfWidth, b.halfHeight);

 		if (mouseX >= b_TLeft.x && mouseX <= b_BRight.x &&
 		mouseY >= b_TLeft.y && mouseY <= b_BRight.y){
 			this.playGame = true;
			this.startScreen = false;
			createPlayerSprites(i+1);
 		}
	}
 }

};