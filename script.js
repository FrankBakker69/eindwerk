document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const obstacles = document.querySelectorAll('.obstacle');

    let ballX = 30;
    let ballY = 30;
    let goalX = 0;
    let goalY = 0;
    let level = 1;
    let gameRunning = true;

    
    function setRandomGoalPosition() {
        const maxX = gameContainer.clientWidth - goal.clientWidth;
        const maxY = gameContainer.clientHeight - goal.clientHeight;
        goalX = Math.floor(Math.random() * maxX);
        goalY = Math.floor(Math.random() * maxY);
        goal.style.left = goalX + 'px';
        goal.style.top = goalY + 'px';
    }

    
    function moveGoal(direction) {
        const step = 20; 
        switch (direction) {
            case 'W':
                goalY = Math.max(goalY - step, 0);
                break;
            case 'A':
                goalX = Math.max(goalX - step, 0);
                break;
            case 'S':
                goalY = Math.min(goalY + step, gameContainer.clientHeight - goal.clientHeight);
                break;
            case 'D':
                goalX = Math.min(goalX + step, gameContainer.clientWidth - goal.clientWidth);
                break;
        }
        goal.style.left = goalX + 'px';
        goal.style.top = goalY + 'px';
    }

    
    function moveObstacles() {
        obstacles.forEach(obstacle => {
            const obstacleX = parseInt(obstacle.style.left) || 0;
            const obstacleY = parseInt(obstacle.style.top) || 0;
            const maxX = gameContainer.clientWidth - obstacle.clientWidth;
            const maxY = gameContainer.clientHeight - obstacle.clientHeight;
            const directionX = Math.random() < 0.5 ? -1 : 1;
            const directionY = Math.random() < 0.5 ? -1 : 1;
            const newX = obstacleX + directionX * 5;
            const newY = obstacleY + directionY * 5;
            obstacle.style.left = Math.max(0, Math.min(maxX, newX)) + 'px';
            obstacle.style.top = Math.max(0, Math.min(maxY, newY)) + 'px';

            
            if (gameRunning) { // Only check collision if game is running
                const ballRect = ball.getBoundingClientRect();
                const obstacleRect = obstacle.getBoundingClientRect();
                if (isColliding(ballRect, obstacleRect)) {
                    // Display loss message and stop the game
                    alert('Helaas, je hebt verloren! Probeer opnieuw.');
                    gameRunning = false;
                }
            }
        });
    }

    
    function checkGoalCollision() {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        if (isColliding(ballRect, goalRect)) {
            // Display win message and proceed to next level
            alert(`Gefeliciteerd, je hebt level ${level} gehaald!`);
            level++;
            setRandomGoalPosition();
        }
    }

    
    function isColliding(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    
    document.addEventListener('keydown', function(event) {
        if (gameRunning) { // Allow movement only if game is running
            switch (event.key) {
                case 'ArrowUp':
                    ballY = Math.max(ballY - 10, 0);
                    break;
                case 'ArrowDown':
                    ballY = Math.min(ballY + 10, gameContainer.clientHeight - ball.clientHeight);
                    break;
                case 'ArrowLeft':
                    ballX = Math.max(ballX - 10, 0);
                    break;
                case 'ArrowRight':
                    ballX = Math.min(ballX + 10, gameContainer.clientWidth - ball.clientWidth);
                    break;
                case 'w':
                case 'a':
                case 's':
                case 'd':
                    moveGoal(event.key.toUpperCase());
                    break;
            }

            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';
            checkGoalCollision();
        }
    });

    // Set interval to move obstacles periodically
    setInterval(moveObstacles, 100);

    // Initialize the goal position and ball position
    setRandomGoalPosition();
    initializeBallPosition();

    // Function to initialize the ball position without collision with obstacles
    function initializeBallPosition() {
        let overlap = true;
        while (overlap) {
            // Generate random initial ball position
            ballX = Math.floor(Math.random() * (gameContainer.clientWidth - ball.clientWidth));
            ballY = Math.floor(Math.random() * (gameContainer.clientHeight - ball.clientHeight));
            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';

            // Check if the ball collides with any obstacle
            overlap = false;
            obstacles.forEach(obstacle => {
                const obstacleRect = obstacle.getBoundingClientRect();
                const ballRect = ball.getBoundingClientRect();
                if (isColliding(ballRect, obstacleRect)) {
                    overlap = true;
                }
            });
        }
    }
});
