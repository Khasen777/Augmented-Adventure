// Start the game and reveal the game area
function startGame() {
    document.querySelector(".landing").classList.add("hidden");
    document.getElementById("gameArea").classList.remove("hidden");
    initializeGame();
  }
  
  // Setup for game
  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");
  
  let player = { x: canvas.width / 2, y: canvas.height / 2, size: 20 };
  let stars = [];
  let obstacles = [];
  let score = 0;
  
  // Populate stars and obstacles
  function createElements() {
    for (let i = 0; i < 5; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
      obstacles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: 1 + Math.random() * 3 });
    }
  }
  
  // Draw player
  function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6f61";
    ctx.fill();
    ctx.closePath();
  }
  
  // Draw stars
  function drawStars() {
    ctx.fillStyle = "#ffd700";
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
  
  // Draw obstacles
  function drawObstacles() {
    ctx.fillStyle = "#ff3f34";
    for (let obs of obstacles) {
      ctx.fillRect(obs.x, obs.y, 30, 30);
    }
  }
  
  // Update obstacle positions
  function updateObstacles() {
    for (let obs of obstacles) {
      obs.y += obs.speed;
      if (obs.y > canvas.height) obs.y = -30; // Respawn at top
    }
  }
  
  // Check for collisions with stars
  function checkStarCollision() {
    for (let i = stars.length - 1; i >= 0; i--) {
      let dist = Math.hypot(player.x - stars[i].x, player.y - stars[i].y);
      if (dist < player.size) {
        stars.splice(i, 1);
        score++;
        updateScore();
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
      }
    }
  }
  
  // Check for collisions with obstacles
  function checkObstacleCollision() {
    for (let obs of obstacles) {
      let distX = Math.abs(player.x - obs.x - 15);
      let distY = Math.abs(player.y - obs.y - 15);
      if (distX < player.size + 15 && distY < player.size + 15) {
        endGame();
      }
    }
  }
  
  // Update score display
  function updateScore() {
    document.querySelector('.instructions').textContent = `Score: ${score}`;
  }
  
  // End game
  function endGame() {
    alert("Game Over! Your score: " + score);
    document.location.reload();
  }
  
  // Main game loop
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawStars();
    drawObstacles();
    updateObstacles();
    checkStarCollision();
    checkObstacleCollision();
    requestAnimationFrame(gameLoop);
  }
  
  // Initialize Game
  function initializeGame() {
    createElements();
    gameLoop();
  }
  
  // Mouse movement control
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
  });
  
  
  
  