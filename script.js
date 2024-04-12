document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const obstacles = document.querySelectorAll('.obstacle');

    let ballX = 50;
    let ballY = 50;
    let goalX = 0;
    let goalY = 0;

    // Function to set a random position for the goal
    function setRandomGoalPosition() {
        const maxX = gameContainer.clientWidth - goal.clientWidth;
        const maxY = gameContainer.clientHeight - goal.clientHeight;
        goalX = Math.floor(Math.random() * maxX);
        goalY = Math.floor(Math.random() * maxY);
        goal.style.left = goalX + 'px';
        goal.style.top = goalY + 'px';
    }

    // Function to move the goal using WASD keys
    function moveGoal(direction) {
        const step = 20; // Adjust movement step size
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

    // Function to check collision between ball and other elements
    function checkCollisions() {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();

        // Check collision with goal
        if (isColliding(ballRect, goalRect)) {
            setRandomGoalPosition();
        }

        // Check collision with obstacles
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (isColliding(ballRect, obstacleRect)) {
                // Handle collision (e.g., reset ball position)
                ballX = 50;
                ballY = 50;
                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';
            }
        });
    }

    // Function to detect collision between two elements' rectangles
    function isColliding(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
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
        checkCollisions();
    });

    // Initialize the goal position
    setRandomGoalPosition();
});
