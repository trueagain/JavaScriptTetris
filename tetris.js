window.onload = tetrisMainFunction;

function tetrisMainFunction(){
    var tetrisModel = new Object();
    tetrisModel.WIDTH = 10;
    tetrisModel.HEIGHT = 20;
    tetrisModel.staticCells = createEmptyTwoDimArray(tetrisModel.HEIGHT, tetrisModel.WIDTH);
	tetrisModel.staticCellsAndMovingPiece = cloneTwoDimArray(tetrisModel.staticCells);
	tetrisModel.createPieces = function(){
		var result = new Object;
		result.I = new Object;
		result.I.PARTS_POSITION_1 = [[1, 0], [1, 1], [1, 2], [1, 3]];
	    result.I.PARTS_POSITION_2 = [[0, 1], [1, 1], [2, 1], [3, 1]];
		result.I.PARTS_POSITION_3 = [[1, 0], [1, 1], [1, 2], [1, 3]];
	    result.I.PARTS_POSITION_4 = [[0, 1], [1, 1], [2, 1], [3, 1]];
	    result.I.partsPosition = result.I.PARTS_POSITION_1;
	    result.J = new Object;
	    result.J.PARTS_POSITION_1 = [[0, 0], [1, 0], [1, 1], [1, 2]];
	    result.J.PARTS_POSITION_2 = [[0, 1], [0, 2], [1, 1], [2, 1]];
		result.J.PARTS_POSITION_3 = [[1, 0], [1, 1], [1, 2], [2, 2]];
	    result.J.PARTS_POSITION_4 = [[0, 1], [1, 1], [2, 0], [2, 1]];
	    result.J.partsPosition = result.J.PARTS_POSITION_1;
	    result.L = new Object;
	    result.L.PARTS_POSITION_1 = [[0, 2], [1, 0], [1, 1], [1, 2]];
	    result.L.PARTS_POSITION_2 = [[0, 1], [1, 1], [2, 1], [2, 2]];
		result.L.PARTS_POSITION_3 = [[1, 0], [1, 1], [1, 2], [2, 0]];
	    result.L.PARTS_POSITION_4 = [[0, 0], [0, 1], [1, 1], [2, 1]];
	    result.L.partsPosition = result.L.PARTS_POSITION_1;
	    result.O = new Object;
	    result.O.PARTS_POSITION_1 = [[0, 0], [0, 1], [1, 0], [1, 1]];
	    result.O.PARTS_POSITION_2 = [[0, 0], [0, 1], [1, 0], [1, 1]];
		result.O.PARTS_POSITION_3 = [[0, 0], [0, 1], [1, 0], [1, 1]];
	    result.O.PARTS_POSITION_4 = [[0, 0], [0, 1], [1, 0], [1, 1]];
	    result.O.partsPosition = result.O.PARTS_POSITION_1;
	    result.S = new Object;
	    result.S.PARTS_POSITION_1 = [[1, 1], [1, 2], [2, 0], [2, 1]];
	    result.S.PARTS_POSITION_2 = [[0, 1], [1, 1], [1, 2], [2, 2]];
		result.S.PARTS_POSITION_3 = [[1, 1], [1, 2], [2, 0], [2, 1]];
	    result.S.PARTS_POSITION_4 = [[0, 1], [1, 1], [1, 2], [2, 2]];
	    result.S.partsPosition = result.S.PARTS_POSITION_1;
	    result.T = new Object;
	    result.T.PARTS_POSITION_1 = [[0, 1], [1, 0], [1, 1], [1, 2]];
	    result.T.PARTS_POSITION_2 = [[0, 1], [1, 1], [1, 2], [2, 1]];
		result.T.PARTS_POSITION_3 = [[1, 0], [1, 1], [1, 2], [2, 1]];
	    result.T.PARTS_POSITION_4 = [[0, 1], [1, 0], [1, 1], [2, 1]];
	    result.T.partsPosition = result.T.PARTS_POSITION_1;
	    result.Z = new Object;
	    result.Z.PARTS_POSITION_1 = [[1, 0], [1, 1], [2, 1], [2, 2]];
	    result.Z.PARTS_POSITION_2 = [[0, 1], [1, 0], [1, 1], [2, 0]];
		result.Z.PARTS_POSITION_3 = [[1, 0], [1, 1], [2, 1], [2, 2]];
	    result.Z.PARTS_POSITION_4 = [[0, 1], [1, 0], [1, 1], [2, 0]];
	    result.Z.partsPosition = result.Z.PARTS_POSITION_1;
	    return result;
	}
	tetrisModel.allPieces = tetrisModel.createPieces();
	tetrisModel.chooseNewActivePiece = function(){
		var randPieceNum = Math.random() * 7;
		var randPiece;
		if(randPieceNum <= 1){
			randPiece = this.allPieces.I;
		} else if(randPieceNum <= 2){
			randPiece = this.allPieces.J;
		} else if(randPieceNum <= 3){
			randPiece = this.allPieces.L;
		} else if(randPieceNum <= 4){
			randPiece = this.allPieces.O;
		} else if(randPieceNum <= 5){
			randPiece = this.allPieces.S;
		} else if(randPieceNum <= 6){
			randPiece = this.allPieces.T;
		} else {
			randPiece = this.allPieces.Z;
		}
		var randPosNum = Math.random() * 4;
		if(randPosNum <= 1){
			randPiece.partsPosition = randPiece.PARTS_POSITION_1;
		} else if(randPosNum <= 2){
			randPiece.partsPosition = randPiece.PARTS_POSITION_2;
		} else if(randPosNum <= 3){
			randPiece.partsPosition = randPiece.PARTS_POSITION_3;
		} else{
			randPiece.partsPosition = randPiece.PARTS_POSITION_4;
		}
		randPiece.position = [-1, 5];
		return randPiece;
	}
	tetrisModel.activePiece = tetrisModel.chooseNewActivePiece();
	tetrisModel.setNewActivePiece = function(){
		this.activePiece = this.chooseNewActivePiece();
	}
	tetrisModel.calcPiecePartsAbsolutePositions = function(position, parts){
		var result = new Array();
		var piece0 = new Array();
		piece0[0] = position[0] + parts[0][0];
		piece0[1] = position[1] + parts[0][1];
		result[0] = piece0;
		var piece1 = new Array();
		piece1[0] = position[0] + parts[1][0];
		piece1[1] = position[1] + parts[1][1];
		result[1] = piece1;
		var piece2 = new Array();
		piece2[0] = position[0] + parts[2][0];
		piece2[1] = position[1] + parts[2][1];
		result[2] = piece2;
		var piece3 = new Array();
		piece3[0] = position[0] + parts[3][0];
		piece3[1] = position[1] + parts[3][1];
		result[3] = piece3;
		return result;
	}
	tetrisModel.moveActivePieceIfPossible = function(x, y){
    	var newStaticCellsAndMovingPiece = cloneTwoDimArray(this.staticCells);
    	var newPiecePosition = new Array();
    	newPiecePosition[0] = this.activePiece.position[0] + x;
    	newPiecePosition[1] = this.activePiece.position[1] + y;
    	var positions = this.calcPiecePartsAbsolutePositions(newPiecePosition, this.activePiece.partsPosition);
    	for(i = 0; i < 4; i++){
	    	if((positions[i][0] >= 0) && (positions[i][1]) >= 0 
	    		&& (positions[i][0] < tetrisModel.HEIGHT) && (positions[i][1] < tetrisModel.WIDTH)
	    		&& (this.staticCells[positions[i][0]][positions[i][1]] == 0)){
	    		newStaticCellsAndMovingPiece[positions[i][0]][positions[i][1]] = 1;
	    	} else {
	    		return false;
	    	}
	    }
	    this.staticCellsAndMovingPiece = newStaticCellsAndMovingPiece;
	    this.activePiece.position = newPiecePosition;
	    return true;
    }
    tetrisModel.removeFilledRows = function(){
    	for(i = 0; i < this.HEIGHT; i++){
    		var filled = true;
            for(j = 0; j < this.WIDTH; j++){
            	if(this.staticCells[i][j] == 0){
            		filled = false;
            	}
            }
            var k;
            if(filled){
            	for(k = i; k > 0; k--){
            		for(j = 0; j < this.WIDTH; j++){
            			this.staticCells[k][j] = this.staticCells[k - 1][j];
            		}
            	}
            	for(j = 0; j < this.WIDTH; j++){
            		this.staticCells[0][j] = 0;
            	}
            }
        }
    }
    tetrisModel.changeActivePiecePartsPositionIfPossible = function(newPartsPosition){
    	var oldPartsPosition = this.activePiece.partsPosition;
    	this.activePiece.partsPosition = newPartsPosition;
    	if(!this.moveActivePieceIfPossible(0, 0)){
    		this.activePiece.partsPosition = oldPartsPosition;
    	}
    }
	tetrisModel.rotateActivePiece = function(){
    	if(this.activePiece.partsPosition == this.activePiece.PARTS_POSITION_1){
    		this.changeActivePiecePartsPositionIfPossible(this.activePiece.PARTS_POSITION_2);
    	} else if(this.activePiece.partsPosition == this.activePiece.PARTS_POSITION_2) {
    		this.changeActivePiecePartsPositionIfPossible(this.activePiece.PARTS_POSITION_3);
    	} else if(this.activePiece.partsPosition == this.activePiece.PARTS_POSITION_3) {
    		this.changeActivePiecePartsPositionIfPossible(this.activePiece.PARTS_POSITION_4);
    	} else if(this.activePiece.partsPosition == this.activePiece.PARTS_POSITION_4) {
    		this.changeActivePiecePartsPositionIfPossible(this.activePiece.PARTS_POSITION_1);
    	}
    }
    tetrisModel.addCurrentPieceToCells = function(){
    	var positions = this.calcPiecePartsAbsolutePositions(this.activePiece.position, this.activePiece.partsPosition);
    	for(i = 0; i < 4; i++){
	    	if((positions[i][0] >= 0) && (positions[i][1]) >= 0 
	    		&& (positions[i][0] < tetrisModel.HEIGHT) && (positions[i][1] < tetrisModel.WIDTH)
	    		&& (tetrisModel.staticCells[positions[i][0]][positions[i][1]] == 0)){
	    		tetrisModel.staticCells[positions[i][0]][positions[i][1]] = 1;
	    	} 
	    }
	    tetrisModel.removeFilledRows();
	    tetrisModel.staticCellsAndMovingPiece = cloneTwoDimArray(tetrisModel.staticCells);
    }
	
	var tetrisView = new Object;
	tetrisView.CELL_SIZE = 20;
	tetrisView.context = document.getElementById("drawingCanvas").getContext("2d");
	tetrisView.draw = function(){
    	this.context.fillStyle = "grey";
    	this.context.fillRect(0, 0, tetrisModel.WIDTH * this.CELL_SIZE, tetrisModel.HEIGHT * this.CELL_SIZE);
        var i, j;
        for(i = 0; i < tetrisModel.HEIGHT; i++){
            for(j = 0; j < tetrisModel.WIDTH; j++){
                if(tetrisModel.staticCellsAndMovingPiece[i][j] != 0){
                    this.context.fillStyle = "black";
                    this.context.fillRect(j * this.CELL_SIZE, i * this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE);
                }
            }
        }
    }
    
    function moveWaitAndCallNext(){
        if(tetrisModel.moveActivePieceIfPossible(1, 0)){
        	tetrisView.draw();
        } else {
        	tetrisModel.addCurrentPieceToCells();
        	tetrisModel.setNewActivePiece();
        	tetrisView.draw();
        }
        setTimeout(moveWaitAndCallNext, 500);
	}

	function addKeyListener(){
	    var LEFT_ARROW_KEY = 37;
	    var UP_ARROW_KEY = 38;
	    var RIGHT_ARROW_KEY = 39;
	    var DOWN_ARROW_KEY = 40;
	    var SPACE_KEY = 32;

    	function onKeydown(e){
	    	if(e.keyCode == RIGHT_ARROW_KEY){
	    		if(tetrisModel.moveActivePieceIfPossible(0, 1)){
	    			tetrisView.draw();
	    		}
	    	} else if(e.keyCode == LEFT_ARROW_KEY){
	    		if(tetrisModel.moveActivePieceIfPossible(0, -1)){
	    			tetrisView.draw();
	    		}
	    	} else if(e.keyCode == UP_ARROW_KEY){
	    		tetrisModel.rotateActivePiece();
	    		tetrisView.draw();
	    	} else if(e.keyCode == DOWN_ARROW_KEY){
	    		if(tetrisModel.moveActivePieceIfPossible(1, 0)){
	    			tetrisView.draw();
	    		} else {
	    			tetrisModel.addCurrentPieceToCells();
	    			tetrisModel.setNewActivePiece();
	    			tetrisView.draw();
	    		}
	    	} else if(e.keyCode == SPACE_KEY){
	    		moveWaitAndCallNext();
	    	}
	    }

    	document.addEventListener('keydown', onKeydown);
    }
    addKeyListener();
}

function createEmptyTwoDimArray(n, m){
	var result = new Array();
    var i, j;
    for(i = 0; i < n; i++){
    	var row = new Array();
    	for(j = 0; j < m; j++){
    		row[j] = 0;
    	}
    	result[i] = row;
    }
    return result;
}

function cloneTwoDimArray(a){
	var result = new Array();
	var i, j;
	for(i = 0; i < a.length; i++){
		result[i] = new Array();
		for(j = 0; j < a[0].length; j++){
			result[i][j] = a[i][j];
		}
	}
	return result;
}