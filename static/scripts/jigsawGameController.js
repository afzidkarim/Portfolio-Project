import JigsawPuzzle from "./generateJigsawLogic.js";

let imageSource = "";
let puzzleColumns = "3";
let puzzleWidth = "300";
let shuffleTiles = false;
let timerInterval = null;
let moveCounter = 0;
let seconds = 0;

// Add event listener to image input for when a new image is selected
const imageInput = document.getElementById("image");
imageInput.onchange = () => {
  imageSource = URL.createObjectURL(imageInput.files[0]);
  startGame();
};

// Select the load image button and assign an event listener to load the image from URL
const imageUrlInput = document.getElementById("imageUrlInput");
const chooseImageLabel = document.querySelector('label[for="image"]');
const loadImage = () => {
  const imageUrl = imageUrlInput.value.trim();
  imageSource = imageUrl;
  const image = new Image();
  image.crossOrigin = "anonymous"; // Set CORS attribute
  image.src = imageSource;

  image.onload = () => {
    startGame();
    // Hide the image input and the input field for the image URL after successfully loading the image
    imageInput.classList.add("notShown");
    imageUrlInput.classList.add("notShown");
    chooseImageLabel.classList.add("notShown");
  };

  image.onerror = () => {
    displayErrorMessage("Error loading image. Please check the image URL.");
    imageSource = "";
    imageUrlInput.value = ""; // Clear the input value if an error occurs
  };
};

// Add event listener for the "keydown" event on the input field
imageUrlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadImage();
  }
});

// Select all Levels buttons and assign event listeners to them
const LevelLabe = document.querySelectorAll(".level-label");
LevelLabe.forEach((button) => {
  button.addEventListener("click", () => {
    puzzleColumns = button.dataset.cols;
    puzzleWidth = button.dataset.width;
    startGame();
  });
});

const shuffleButton = document.getElementById("shuffle");
shuffleButton.onclick = () => {
  shuffleTiles = !shuffleTiles;
  shuffleButton.innerText = shuffleTiles ? "Solve" : "Shuffle";

  // Start the timer when shuffle button is pressed
  if (shuffleTiles && imageSource) {
    startTimer();
    menu.style.transform = "translateX(100vw)";
    button.checked = false;
  } else {
    resetTimer();
    pauseTimer();
  }

  // Select all puzzle pieces on the document body with the class name "piece"
  const puzzlePieces = document.body.getElementsByClassName("piece");
  for (let pieceIndex = 0; pieceIndex < puzzlePieces.length; pieceIndex++) {
    // Call the animatePuzzlePiece method on each puzzle piece to animate it
    puzzlePieces[pieceIndex].animatePuzzlePiece();
  }
};

const button = document.getElementById("label-check");
const menu = document.querySelector(".menu");

button.addEventListener("click", function () {
  if (!button.checked) {
    menu.style.transform = "translateX(100vw)";
  } else {
    menu.style.transform = "translateX(0vw)";
  }
});

const startGame = async () => {
  resetTimer();

  const puzzleContainerElement = document.getElementById("puzzle");
  // Prepare the space in which we will assemble the puzzle by making sure it is empty and ready for a new game.
  while (puzzleContainerElement.firstChild) {
    puzzleContainerElement.removeChild(puzzleContainerElement.lastChild);
  }
  if (!imageSource || !puzzleColumns || !puzzleWidth) return;

  const { board, tile, pieces } = await JigsawPuzzle( imageSource, puzzleColumns, puzzleWidth).catch(alert);

  const customBgContainer = document.getElementById("customBgContainer");
  const originalImage = document.getElementById("originalImage");
  originalImage.src = imageSource;

  originalImage.addEventListener("load", function () {
    customBgContainer.style.width = originalImage.width + "px";
    customBgContainer.style.height = originalImage.height + "px";
  });

  puzzleContainerElement.style.width = `${board.width}px`;
  puzzleContainerElement.style.height = `${board.height}px`;

  // Hide the image input and the input field for the image URL
  const imageInput = document.getElementById("image");
  const imageUrlInput = document.getElementById("imageUrlInput");
  const orText = document.getElementById("orText");

  imageInput.classList.add("notShown", "pointer-events-none");
  imageUrlInput.classList.add("notShown", "pointer-events-none");
  chooseImageLabel.classList.add("notShown", "pointer-events-none");
  orText.classList.add("notShown");
  /* pointer-events-none */

  // const pieces = [1, 2, 3, 4, 5];
  // Array(pieces.length) We create a new array with length equal to the number of puzzle pieces,
  // .fill(false) We fill each element of the array with the value `false`.like [false, false ...]
  const PieceCompleted = Array(pieces.length).fill(false);

  let PieceBeingDragged = false; // Indicates whether a puzzle piece is currently being dragged by the user
  let zIndex = pieces.length;

  // Loop through each puzzle piece and create an image element for it.
  // The "puzzlePiece" represents an individual piece of the puzzle.
  // "pieceIndex" helps us keep track of the order of pieces.
  pieces.forEach((puzzlePiece, pieceIndex) => {
    const pieceImageElement = new Image();
    // Define a function to animate the puzzle piece
    pieceImageElement.animatePuzzlePiece = () => {
      pieceImageElement.style.transition = "all 0.5s ease-in-out";
      // Check if shuffling is enabled
      if (shuffleTiles) {
        const randomIndex = getRandomNumber(shufflePositions.length);
        pieceImageElement.style.left = `${shufflePositions[randomIndex].shuffleX(board, tile)}px`;
        pieceImageElement.style.top = `${shufflePositions[randomIndex].shuffleY(board,tile)}px`;
        pieceImageElement.style.zIndex = getRandomNumber(pieces.length) + 1;
      } else {
        // If shuffling is disabled, set the piece to its original position
        pieceImageElement.style.left = `${puzzlePiece.leftOffset}px`;
        pieceImageElement.style.top = `${puzzlePiece.topOffset}px`;
      }
      // Remove transition effect after 500 milliseconds
      setTimeout(() => (pieceImageElement.style.transition = "none"), 500);
      PieceCompleted.fill(false);
    };

    // Set the source and class of the puzzle piece image
    pieceImageElement.src = puzzlePiece.base64Url;
    pieceImageElement.className = "piece";
    // Append the puzzle piece image to the puzzle container
    puzzleContainerElement.appendChild(pieceImageElement);
    pieceImageElement.animatePuzzlePiece();

    // Define functions for moving and dropping puzzle pieces
    const movePiece = (pageX, pageY) => {
      pieceImageElement.style.left = `${pageX - puzzlePiece.centerX - puzzleContainerElement.offsetLeft}px`;
      pieceImageElement.style.top = `${pageY - puzzlePiece.centerY - puzzleContainerElement.offsetTop}px`;
    };

    // This function calculates the position where a puzzle piece is dropped on the puzzle Board.
    const checkDropLocation = (pageX, pageY) => {
      moveCounter++; // Increment move counter

      // Calculate the exact position where the puzzle piece is dropped on the board, considering the board's position on the page.
      const offsetX = pageX - puzzleContainerElement.offsetLeft;
      const offsetY = pageY - puzzleContainerElement.offsetTop;
      /* offsetX > 0: Ensures that the projection position is to the right of the left border of the puzzle container.
            offsetX <board.width: Ensures that the drop position is to the left of the puzzle container's right border.
            offsetY > 0: Ensures that the projection position is below the top border of the puzzle container.
            offsetY <board.height: Ensures that the drop position is above the bottom border of the puzzle container.*/
      if (offsetX > 0 && offsetX < board.width && offsetY > 0 && offsetY < board.height) {
        // Prevent the pieces from going beyond the edges of the board
        const snapOnLeft = (Math.trunc(offsetX / tile.width) - puzzlePiece.edges.left / 4) * tile.width;
        const snapOnTop = (Math.trunc(offsetY / tile.height) - puzzlePiece.edges.top / 4) * tile.height;
        // Check if the puzzle piece is placed correctly in its original position on the game board
        if (snapOnLeft === puzzlePiece.leftOffset && snapOnTop === puzzlePiece.topOffset) {
          PieceCompleted[pieceIndex] = true;
          pieceImageElement.style.transition = "all 0.1s ease-in-out";
          // Pin the puzzle piece in place on the game board,
          pieceImageElement.style.left = `${snapOnLeft}px`;
          pieceImageElement.style.top = `${snapOnTop}px`;
          pieceImageElement.style.zIndex = 0;
          setTimeout(() => (pieceImageElement.style.transition = "none"), 100);
        }

        // Check if all puzzle pieces are completed
        if (PieceCompleted.every((tile) => tile)) {
          // Calculate elapsed time
          const elapsedTime = document.getElementById("watch").innerText;
          // Convert elapsed time to seconds
          const elapsedTimeInSeconds =
            parseInt(elapsedTime.split(":")[0]) * 3600 +
            parseInt(elapsedTime.split(":")[1]) * 60 +
            parseInt(elapsedTime.split(":")[2]);

          // Check if the timer is running
          const timerRunning = elapsedTimeInSeconds > 0;

          shuffleTiles = false;
          shuffleButton.innerText = "Shuffle";
          PieceCompleted.fill(false);
          pauseTimer();

          // Determine the score based on the elapsed time
          let score = "";
          let cupImageId = "";
          if (elapsedTimeInSeconds < 60) {
            // Less than 1 minute
            score = "100%";
            cupImageId = "goldenCup";
          } else if (elapsedTimeInSeconds < 120) {
            // Between 1 and 2 minutes
            score = "75%";
            cupImageId = "silverCup";
          } else {
            score = "50%";
            cupImageId = "bronzeCup";
          }

          // Hide the Menu Container and Hamburger Icon
          const menuContainer = document.querySelector('.menu');
          const hamburgerIcon = document.querySelector('.hamburger');
          menuContainer.style.display = "none";
          hamburgerIcon.style.display = "none";


          // Display the congratulations container and the appropriate cup image if the timer is running
          if (timerRunning) {
            // Hide all cup images first
            document.getElementById("goldenCup").classList.add("hidden");
            document.getElementById("silverCup").classList.add("hidden");
            document.getElementById("bronzeCup").classList.add("hidden");
            // Hide the puzzle board and all puzzle pieces
            const puzzleContainerElement = document.getElementById("puzzle");
            puzzleContainerElement.style.display = "none";
            const congratulationsContainer = document.getElementById(
              "congratulationsContainer"
            );
            congratulationsContainer.style.display = "block";
            congratulationsContainer.querySelector(`#${cupImageId}`).classList.remove("hidden");

            // Show confetti
            if (congratulationsContainer.style.display == "block") {
              const jsConfetti = new JSConfetti();
              jsConfetti.addConfetti({
                confettiColors: [
                    "#6E00FF","#FF4500","#00BFFF","#FFD700","#8A2BE2","#32CD32",
                ],
              });
            }

            // Update the content inside the congratulationsContainer
            document.getElementById("elapsedTimeText").innerText = `Time: ${elapsedTime}`;
            document.getElementById("scoreText").innerText = `Score: ${score}`;
            document.getElementById("movesText").innerText = `Moves: ${moveCounter}`;
            document.getElementById("elapsedTimeText").classList.remove("hidden");
            document.getElementById("scoreText").classList.remove("hidden");
            document.getElementById("movesText").classList.remove("hidden");
          }
          resetTimer();
          moveCounter = 0;
        }
      }
    };

    /* ------------------------ This part is related to mouse and touch events ---------------------- */

    // mousedown event listener to drag a puzzle piece
    pieceImageElement.onmousedown = (event) => {
      event.preventDefault();
      // Checks if the current puzzle piece is not yet complete.
      if (!PieceCompleted[pieceIndex]) {
        PieceBeingDragged = true;
        pieceImageElement.style.transition = "all 0.1s ease-in-out";
        movePiece(event.pageX, event.pageY);
        setTimeout(() => (pieceImageElement.style.transition = "none"), 100);
        pieceImageElement.style.zIndex = ++zIndex;
      }
    };

    // Event listener for mouse movement over the puzzle piece element
    pieceImageElement.onmousemove = (event) => {
      if (PieceBeingDragged) {
        movePiece(event.pageX, event.pageY);
      }
    };

    // Event handler for when the mouse leaves the puzzle piece area
    pieceImageElement.onmouseleave = () => (PieceBeingDragged = false);
    pieceImageElement.onmouseup = (event) => {
      if (!PieceCompleted[pieceIndex]) {
        PieceBeingDragged = false;
        checkDropLocation(event.pageX, event.pageY);
      }
    };

    // Touch event listener to handle interactions with touch devices
    pieceImageElement.addEventListener(
      "touchstart",
      (event) => {
        if (!PieceCompleted[pieceIndex]) {
          pieceImageElement.style.transition = "all 0.1s ease-in-out";
          movePiece(event.touches[0].pageX, event.touches[0].pageY);
          setTimeout(() => (pieceImageElement.style.transition = "none"), 100);
          pieceImageElement.style.zIndex = ++zIndex;
        }
      },
      { passive: true }
    );

    // Add a touch event listener to the puzzle piece for the 'ontouchmove' event.
    pieceImageElement.ontouchmove = (event) => {
      event.preventDefault();
      if (!PieceCompleted[pieceIndex]) {
        movePiece(event.touches[0].pageX, event.touches[0].pageY);
      }
    };

    // When the touch interaction with the puzzle piece ends,
    pieceImageElement.ontouchend = (event) => {
      if (!PieceCompleted[pieceIndex]) {
        // Determines whether the widget should be locked in place or not.
        checkDropLocation(
          event.changedTouches[0].pageX,
          event.changedTouches[0].pageY
        );
      }
    };
  });
};

/* ------------------------  This part is related to shuffling puzzle pieces ---------------------- */

// Function to generate a random integer within a specified range
const getRandomNumber = (range) => Math.floor(Math.random() * range);

// Array of shuffle positions used when shuffling tiles
const shufflePositions = [
  {
    // Example: puzzleBoard.width - puzzlePiece.width = 600 - 100 = 500. getRandomNumber(500) generates a random number between 0 and 499.
    shuffleX: (puzzleBoard, puzzlePiece) =>
      getRandomNumber(puzzleBoard.width - puzzlePiece.width),
    // Example: puzzlePiece.height = 200 and puzzleBoard.height = 800, getRandomNumber(200) generates a random number between 0 and 199.
    // If the random number generated is 100, then `100 + 800 = 900`.
    shuffleY: (puzzleBoard, puzzlePiece) =>
      getRandomNumber(puzzlePiece.height) + puzzleBoard.height,
  },
  {
    shuffleX: (puzzleBoard, puzzlePiece) =>
      getRandomNumber(puzzlePiece.width) + puzzleBoard.width,
    shuffleY: (puzzleBoard, puzzlePiece) =>
      getRandomNumber(puzzleBoard.height - puzzlePiece.height),
  },
  {
    shuffleX: (puzzleBoard, puzzlePiece) =>
      -getRandomNumber(puzzlePiece.width) - puzzlePiece.width,
    shuffleY: (puzzleBoard, puzzlePiece) =>
      getRandomNumber(puzzleBoard.height - puzzlePiece.height),
  },
];

/* ------------------------  This part is related to timer control ---------------------- */

const StartButton = document.getElementById("startButton");
const PauseButton = document.getElementById("pauseButton");

function updateWatch() {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  document.getElementById("watch").innerText = `${h}:${m}:${s}`;
  seconds++;
}

const startTimer = () => {
  if (timerInterval === null && imageSource) {
    updateWatch();
    timerInterval = setInterval(updateWatch, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

const resetTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  updateWatch();
};

StartButton.onclick = () => {
  startTimer();
};

PauseButton.onclick = () => {
  pauseTimer();
};

/* ------------------------ Dragging piece to scroll document ---------------------- */

let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

document.addEventListener("mousedown", (e) => {
  if (e.target === document.documentElement) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = document.documentElement.scrollLeft;
    scrollTop = document.documentElement.scrollTop;
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  document.documentElement.scrollLeft = scrollLeft - dx;
  document.documentElement.scrollTop = scrollTop - dy;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

/* ------------------------  This part is for continue or exit  ---------------------- */

// Event listener for the continue  Game button
document.getElementById("continueBtn").addEventListener("click", function () {
  const puzzleContainerElement = document.getElementById("puzzle");
  puzzleContainerElement.style.display = "block";

  // Hide the congratulations container
  const congratulationsContainer = document.getElementById(
    "congratulationsContainer"
  );
  congratulationsContainer.style.display = "none";

  // Show the Menu Container and Hamburger Icon
  const menuContainer = document.querySelector('.menu');
  const hamburgerIcon = document.querySelector('.hamburger');
  menuContainer.style.display = "block";
  hamburgerIcon.style.display = "block";
  menu.style.transform = "translateX(0vw)";
  button.checked = true;
});


// Event listener for the Exit Game button
document.getElementById("exitGameBtn").addEventListener("click", function () {
  window.location.href = "../templates/landing_page.html";
});

// Event listener for the ExitButton to redirect to the landing page
document.getElementById("ExitButton").addEventListener("click", function () {
  window.location.href = "../templates/landing_page.html";
});

// Event listener for the HelpButton to toggle the visibility of the msgerr div
document.getElementById("HelpButton").addEventListener("click", function () {
  var msgerr = document.getElementById("msgerr");
  if (msgerr.classList.contains("hidden")) {
      msgerr.classList.remove("hidden");
  } else {
      msgerr.classList.add("hidden");
  }
});

/* ------------------------  This part is related to the error message display ---------------------- */

// display the error message
function displayErrorMessage(errorMessage) {
  document.getElementById("errorMessageText").innerText = errorMessage;
  document.getElementById("errorMessage").style.display = "flex";

  // Hide the error message after 5 seconds
  setTimeout(() => {
    document.getElementById("errorMessage").style.display = "none";
  }, 5000);
}


// Retrieve image number from query parameter
const imageNumber = new URLSearchParams(window.location.search).get('image');
let imageUrl = "";

if (imageNumber) {
    imageUrl = `../static/game_assets/preview_images/${imageNumber}.png`;
}

const imageElement = document.createElement("img");
if (imageUrl) {
    imageElement.src = imageUrl;
    imageSource = imageUrl;
}

startGame();

// A simple addition to the fun.
let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Come Back to Play! 🎉";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});
