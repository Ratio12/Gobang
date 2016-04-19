//赢法数组
var wins = [];
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

//赢法数组
var count = 0;
//所有横线赢法统计
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
//所有竖线赢法统计
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//所有正斜线赢法统计
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
//所有反斜线赢法统计
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

//赢法统计数组
var myWin = [];
var computerWin = [];
for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}

//检测是否有落子
var chessBoard = [];
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

//默认黑子先手
var me = true;
//棋局开始
var over = false;

var chess = document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = "#BFBFBF";

//画水印
var logo = new Image();
logo.src = "images/logo.png";
logo.onload = function() {
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}

//画棋盘
var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}
}

//画棋子
//i,j为在棋盘上的索引，me为黑白棋
var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI); //x,y,r,开始弧度，结束弧度
	context.closePath();
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0); //x1,y1,r1,x2,y2,r2
	if (me) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill(); //填充
}

//点击落子
chess.onclick = function(e) {
	if (over) {
		return;
	}
	//相对于canvas左上角的点所计算的坐标
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		if (me) {
			chessBoard[i][j] = 1;
		} else {
			chessBoard[i][j] = 2;
		}
		me = !me;
		for (var k = 0; k < count; k++) {
			if (!me && wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 1000;
				if (myWin[k] == 5) {
					window.alert("You Win!");
					over = true;
				}
			}else if(me && wins[i][j][k]){
				myWin[k]=1000;
				computerWin[k]++;
				if (computerWin[k] == 5) {
					window.alert("Computer Wins!");
					over = true;
				}
			}
		}
	}
}