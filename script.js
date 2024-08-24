const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameMusic = document.getElementById('gameMusic');
const foodSound = document.getElementById('foodSound');
const hitSound = document.getElementById('hitSound');
const moveSound = document.getElementById('MoveSound');

let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = 20, dy = 0;
let score = 0;
let highScore = 0;
let gameActive = true;
gameMusic.play();

function createDivElement(className, x, y) {
    const div = document.createElement('div');
    div.className = className;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    gameArea.appendChild(div);
    return div;
}

function updateGameArea() {
    gameArea.innerHTML = '';
    snake.forEach(part => createDivElement('snake-part', part.x, part.y));
    createDivElement('food', food.x, food.y);
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -20; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 20; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; }
    moveSound.play()
});

function gameLoop() {
    if (!gameActive) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // hit check
    if (head.x < 0 || head.x >= gameArea.clientWidth || head.y < 0 || head.y >= gameArea.clientHeight ||
        snake.some(part => part.x === head.x && part.y === head.y)) {
        hitSound.play();
        if (score > highScore) {
            highScore = score;
        }
        alert('Game Over! Click OK to restart.');
        snake = [{ x: 200, y: 200 }];
        dx = 20; dy = 0; score = 0;
        gameActive = true;
        gameLoop();
        return;
    }

    snake.unshift(head);

    //food eat
    if (head.x === food.x && head.y === food.y) {
        foodSound.play();
        score += 10;
        food = {
            x: Math.floor(Math.random() * (gameArea.clientWidth / 20)) * 20,
            y: Math.floor(Math.random() * (gameArea.clientHeight / 20)) * 20
        };
    } else {
        snake.pop();
    }

    updateGameArea();

    setTimeout(gameLoop, 100);
}


gameLoop();