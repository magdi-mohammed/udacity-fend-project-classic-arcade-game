// Enemies our player must avoid
let Enemy = function(x, y, s) {
    // letiables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.s = s;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.s * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.s = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.sprite = 'images/char-boy.png';
};

function winTheGame() {
  document.querySelector('#won-the-game').classList += 'show';
    setTimeout(function () {
    document.querySelector('#won-the-game').classList = '';
  }, 1000);
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 100;
        this.y = 380;
        winTheGame();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress === 'left') {
    this.x -= 100;
  };
  if (keyPress === 'up') {
    this.y -= 80;
  };
  if (keyPress === 'right') {
    this.x += 100;
  };
  if (keyPress === 'down') {
    this.y += 80;
  };
};

let allEnemies = [];

// three enemy posirions for the three pavon block
let enemyPositions = [60, 140, 220];
let player = new Player(100, 380, 50);
let enemy;

// set enemy positions for the three pavon blocks
enemyPositions.forEach(function(y) {
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
