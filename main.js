var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Define sizes and positions for the ball and hole
var ball_width = 100;
var ball_height = 90;
var golf_width = 150;
var golf_height = 50;

// Initial positions of the ball and hole
var ball_x = 10;
var ball_y = 10;
var golf_x = 150;
var golf_y = 50;

// Adjust golf position based on canvas size
golf_x = canvas.width - golf_width - 20; // 20 pixels from the right edge
golf_y = canvas.height - golf_height - 20; // 20 pixels from the bottom edge

var ball_img = "ball.png";
var golf_img = "golf-h.png";
var background_img = "Grass.jpg";

var ballsInHole = 0;
var ball_radius = ball_width / 2;

function load_img() {
    background_imgTag = new Image();
    background_imgTag.onload = uploadBackground;
    background_imgTag.src = background_img;

    ball_imgTag = new Image();
    ball_imgTag.onload = uploadBall;
    ball_imgTag.src = ball_img;

    golf_imgTag = new Image();
    golf_imgTag.onload = uploadGolf;
    golf_imgTag.src = golf_img;
}

function checkCollision() {
    var distance = Math.sqrt((ball_x + ball_width / 2 - (golf_x + golf_width / 2)) ** 2 + (ball_y + ball_height / 2 - (golf_y + golf_height / 2)) ** 2);
    return distance < ball_radius;
}

function uploadBackground() {
    ctx.drawImage(background_imgTag, 0, 0, canvas.width, canvas.height);
}

function uploadBall() {
    ctx.drawImage(ball_imgTag, ball_x, ball_y, ball_width, ball_height);
}

function uploadGolf() {
    ctx.drawImage(golf_imgTag, golf_x, golf_y, golf_width, golf_height);
}

window.addEventListener("keydown", my_keydown);

function my_keydown(e) {
    var keyPressed = e.keyCode;
    console.log(keyPressed);
    if (keyPressed == 38) {
        up();
        console.log("up");
    }
    if (keyPressed == 40) {
        down();
        console.log("down");
    }
    if (keyPressed == 37) {
        left();
        console.log("left");
    }
    if (keyPressed == 39) {
        right();
        console.log("right");
    }
}

function up() {
    if (ball_y >= 0) {
        ball_y -= 10;
        console.log("when up arrow is pressed, x=" + ball_x + " | y =" + ball_y);
        uploadBackground();
        uploadBall();
        uploadGolf();
    }
}

function down() {
    if (ball_y <= canvas.height - ball_height) {
        ball_y += 10;
        console.log("Ball position: x=" + ball_x + " | y=" + ball_y);
        uploadBackground();
        uploadBall();
        uploadGolf();
        if (checkCollision()) {
            ballsInHole++;
            document.getElementById('ballsInHole').textContent = ballsInHole;
            var audio = document.getElementById('wooSound');
            audio.play(); // Ensure proper playback
            // Optional: Visual indication
            canvas.style.background = 'yellow';
            setTimeout(restartGame, 2000); // Restart game after 2 seconds
        }
    }
}

function left() {
    if (ball_x >= 0) {
        ball_x -= 10;
        console.log("when left arrow is pressed, x=" + ball_x + " | y =" + ball_y);
        uploadBackground();
        uploadBall();
        uploadGolf();
    }
}

function right() {
    if (ball_x <= canvas.width - ball_width) {
        ball_x += 10;
        console.log("when right arrow is pressed, x=" + ball_x + " | y =" + ball_y);
        uploadBackground();
        uploadBall();
        uploadGolf();
    }
}

function restartGame() {
    ball_x = 10;
    ball_y = 10;
    canvas.style.background = ''; // Reset canvas background
    uploadBackground(); // Redraw background
    uploadBall(); // Redraw ball
    uploadGolf(); // Redraw hole
}

// Load images and start the game
load_img();
