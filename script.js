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

    // Function to set a random position for the goal
    function setRandomGoalPosition() {
        const maxX = gameContainer.clientWidth - goal.clientWidth;
        const maxY = gameContainer.clientHeight - goal.clientHeight;
        goalX = Math.floor(Math.random() * maxX);
        goalY = Math.floor(Math.random() * maxY);
        goal.style.left = goalX + 'px';
        goal.style.top = goalY + 'px';
    }

    // Function to move obstacles randomly
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
        });
    }

    // Initialize the goal position
    setRandomGoalPosition();

    // Set interval to move obstacles periodically
    setInterval(moveObstacles, 100);
});
