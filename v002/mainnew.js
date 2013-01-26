enchant();

window.onload = function () {
	game = new Game(320, 320);
	game.fps = 24;
	game.score = 0;
    game.touched = false;
	
	game.preload('graphic.png', 'icon1.png');
	
	game.onload = function () {
	
		VirusArray = new Array();
		AntiVirusArray = new Array();
		
		game.rootScene.backgroundColor = 'black';
		
		createLevel();
		
		
		
		game.rootScene.addEventListener('enterframe', function () {
			//
		});
		
		game.rootScene.addEventListener("touchstart", function (evt) {
			var player = new Player(evt.x, evt.y);
		});
		
		scoreLabel = new ScoreLabel(8, 8);
        game.rootScene.addChild(scoreLabel);
		
	};
    game.start();
};


var Player = enchant.Class.create(enchant.Sprite, { 
	initialize: function (x, y) {
       
        enchant.Sprite.call(this, 16, 16);        
        this.image = game.assets['graphic.png'];
        
        this.x = x;
        this.y = y;

        this.frame = 0;
		
		
		this.num_anti = 8;
		
		this.addEventListener('enterframe', function () {
			/*
			if(game.touched) {
                
            }
			*/
			
			if(game.frame % game.fps == 0){
				for(var i = 0; i < this.num_anti; i++){
					console.log("SPAWN ANTIVIRUS");
				
					var anti = new AntiVirusSpawn(this.x, this.y);
				}
			}
			
			
			
        });
		
		game.rootScene.addChild(this);
	}
});


var Virus = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, direction) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['icon1.png'];
        this.x = x;
        this.y = y;
        this.frame = 4;
        this.direction = direction;
        this.moveSpeed = 2;
        this.addEventListener('enterframe', function () {
		
		
			// NEED REDONE!
			if(Math.random >> 0.5) { 
				this.direction+= Math.random() * 10;
			}else{
				this.direction-= Math.random() * 10;
			}
			
		
			// MOVEMENT
            this.x += this.moveSpeed * Math.cos(this.direction);
            this.y += this.moveSpeed * Math.sin(this.direction);
			
			//OFFSCREEN
			if(this.y > 320) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.y < 0) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.x > 310) {				
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.x < 0) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
        });
        game.rootScene.addChild(this);
    },
    remove: function () {
        game.rootScene.removeChild(this);
        delete this;
    }
});


var VirusSpawn = enchant.Class.create(Virus, {
    initialize: function (x, y) {
        Virus.call(this, x, y, 0);
        this.addEventListener('enterframe', function () {
			// HIT TEST
			/*
            for (var i in VirusArray) {
                if(VirusArray[i].intersect(this)) {
                    this.remove();
                    VirusArray[i].remove();
                    game.score += 100;
                }
            }
			*/
        });
    }
});




// ANTI VIRUS


var AntiVirus = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, direction) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['icon1.png'];
        this.x = x;
        this.y = y;
        this.frame = 3;
        this.direction = direction;
        this.moveSpeed = 2;
        this.addEventListener('enterframe', function () {
			
			
			
			
			// NEED REDONE!
			if(Math.random >> 0.5) { 
				this.direction+= Math.random() * 10;
			}else{
				this.direction-= Math.random() * 10;
			}
			
		
			// MOVEMENT
            this.x += this.moveSpeed * Math.cos(this.direction);
            this.y += this.moveSpeed * Math.sin(this.direction);
			
			//OFFSCREEN
			if(this.y > 320) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.y < 0) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.x > 310) {				
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			if(this.x < 0) {
				this.moveSpeed = this.moveSpeed * (-1);				
			}
			
        });
        game.rootScene.addChild(this);
    },
    remove: function () {
        game.rootScene.removeChild(this);
        delete this;
    }
});


var AntiVirusSpawn = enchant.Class.create(AntiVirus, {
    initialize: function (x, y) {
        AntiVirus.call(this, x+Math.random()*10, y+Math.random()*10, 0);
        this.addEventListener('enterframe', function () {
		
			// HIT TEST
            for (var i in VirusArray) {
                if(VirusArray[i].intersect(this)) {
                    this.remove();
                    VirusArray[i].remove();
                    game.score += 100;
                }
            }
        });
    }
});


function createLevel() {
	
	for(var i = 0; i < 20; i++){
		console.log("CREAT A NEW VIRUS");
		posX = Math.random()*100;
		posY = Math.random()*100;
		
		var s = new VirusSpawn(posX, posY);
		//var s = new VirusSpawn(200, 200);
		
		VirusArray.push(s);
    }
}