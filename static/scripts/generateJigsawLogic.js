function createPuzzleData(boardWidth, boardHeight, numColumns, numRows, pieceWidth, pieceHeight, totalPieces) {
    return {
      board: { width: boardWidth, height: boardHeight, numColumns, numRows },
      tile: { width: pieceWidth, height: pieceHeight },
      pieces: totalPieces,
    };
  }
/* -------------------------------------Add generateJigsaw function to create jigsaw puzzle from image------------------------ */

export default async function generateJigsaw(imageSource, boardCols, boardWidthPx) {
  // creating a new empty image box.
  const image = new Image();
  // Set the crossOrigin attribute to "anonymous" to avoid tainting the canvas
  image.crossOrigin = "anonymous";
  // Place the web address of the image in the empty image box.
  image.src = imageSource;
  // Wait for the image to load and decode it
  await image.decode().catch((error) => {
    alert(`Error loading image: ${error.message}`);
  });
  const imageAspectRatio = image.naturalWidth / image.naturalHeight;
  const numColumns = parseInt(boardCols);
  const numRows = Math.round(numColumns / imageAspectRatio);
  let totalPieces = numColumns * numRows;
  const boardWidth = parseInt(boardWidthPx);
  const boardHeight = Math.ceil(boardWidth / imageAspectRatio);
  const pieceWidth = Math.ceil(boardWidth / numColumns);
  const pieceHeight = Math.ceil(boardHeight / numRows);

  // Create a canvas element for the scaled image
  const scaledCanvas = document.createElement("canvas");
  scaledCanvas.width = boardWidth;
  scaledCanvas.height = boardHeight;
  scaledCanvas.getContext("2d").drawImage(image, 0, 0, boardWidth, boardHeight);

  const edgeNames = ["left", "top", "right", "bottom"];
  const [left, top, right, bottom] = [0, 1, 2, 3];
  const pieceEdges = [];

  /* ------------------------------------------  Iterate over each puzzle piece and create edges  ----------------------------------------*/

  // Iterate over each puzzle piece and create edges
  for (let i = 0; i < totalPieces; i++) {
    pieceEdges.push(edgeNames.slice());
  }

  for (let piece = 0; piece < totalPieces; piece++) {
    // Checks if the current piece is at the end of the row.
    if ((piece + 1) % numColumns === 0) {
      pieceEdges[piece][right] = null;
      pieceEdges[(piece + 1) % totalPieces][left] = null; // the first piece of the next row
    } else {
      // Generate a random decision to extend the edge or not
      const extendEdge = Math.random() < 0.5;
      pieceEdges[piece][right] = extendEdge;
      pieceEdges[piece + 1][left] = !extendEdge;
    }
    // Checks if the current piece is in the bottom row.
    if (Math.ceil((piece + 1) / numColumns) === numRows) {
      pieceEdges[piece][bottom] = null;
      pieceEdges[(piece + numColumns) % totalPieces][top] = null;
    } else {
      const extendEdge = Math.random() < 0.5;
      pieceEdges[piece][bottom] = extendEdge;
      pieceEdges[(piece + numColumns) % totalPieces][top] = !extendEdge;
    }
  }

  /* --------------------------------------------  Crop a puzzle piece from the scaled canvas   -------------------------------------------- */

  // Define a function to crop a puzzle piece from the scaled canvas
  const cropPuzzlePiece = (x, y, edges) => {
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    canvas.width = pieceWidth * 1.5;
    canvas.height = pieceHeight * 1.5;
    // Translate the origin point (0,0) to the center of the canvas
    canvasContext.translate(canvas.width / 2, canvas.height / 2);
    const overlap = 1; // Define the overlap value for edges

    edges.forEach((extend, edge) => {
      // This line checks if the current piece is at the end of a row, allowing for appropriate handling of edge pieces.
      const rotatedWidth = edge % 2 ? pieceHeight : pieceWidth;
      const rotatedHeight = edge % 2 ? pieceWidth : pieceHeight;
      // Draw a line to the specified coordinates on the canvas
      canvasContext.lineTo(-(rotatedWidth / 2 + overlap), rotatedHeight / 2 + overlap);
      if (extend !== null) {
        canvasContext.ellipse(-(rotatedWidth / 2 + overlap), 0,
        rotatedWidth / 4 - overlap, rotatedWidth / 4, 0,
          (Math.PI / 180) * 90, (Math.PI / 180) * 270, !extend);
      }
      // Draws a line from the top-right corner to the bottom-right corner of the puzzle piece.
      canvasContext.lineTo(-(rotatedWidth / 2 + overlap), -(rotatedHeight / 2 + overlap));
      canvasContext.rotate((Math.PI / 180) * 90); // Rotates the canvas context by 90 degrees clockwise.
    });

    canvasContext.clip();
    // Draws a portion of the resized image onto the canvas, clipping the top-left portion based on the provided criteria
    canvasContext.drawImage(scaledCanvas,
      x - pieceWidth / 4, y - pieceHeight / 4, canvas.width, canvas.height,
      -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const pieceImg = document.createElement("canvas");
    const pieceImgContext = pieceImg.getContext("2d");
    // Calculate the width and height of the canvas for the puzzle piece based on its edges and dimensions
    pieceImg.width = (edges[left] + 4 + edges[right]) * (pieceWidth / 4);
    pieceImg.height = (edges[top] + 4 + edges[bottom]) * (pieceHeight / 4);

    // Draw a section of the source canvas (canvas) onto the destination canvas (pieceImg)
    pieceImgContext.drawImage(canvas,
      (!edges[left] * pieceWidth) / 4, (!edges[top] * pieceHeight) / 4,
      pieceImg.width, pieceImg.height, 0, 0, pieceImg.width, pieceImg.height
    );

    return {
      // Determine where the puzzle piece is centered on the fabric, to make it easier to determine where each piece should be placed in the puzzle.
      base64Url: pieceImg.toDataURL(),
      centerX: (edges[left] + 2) * (pieceWidth / 4),
      centerY: (edges[top] + 2) * (pieceHeight / 4),
    };
  };


/* -----------------------------------Generating puzzle pieces based on the scaled canvas dimensions and edges -------------------------------- */
// Generate puzzle pieces
totalPieces = [];
// Iterate over each row of puzzle pieces vertically
for (let vertical = 0; vertical < boardHeight; vertical += pieceHeight) {
    for (let horizontal = 0; horizontal < boardWidth; horizontal += pieceWidth) {
      // Retrieve the edges matrix corresponding to the current puzzle piece position in the grid from the 'pieceEdges' matrix.
      let edges = pieceEdges[(vertical / pieceHeight) * numColumns + horizontal / pieceWidth];
      // Extracts base64 URL and center coordinates of the piece.
      const { base64Url, centerX, centerY } = cropPuzzlePiece(horizontal, vertical, edges);
      // Determine if the puzzle piece should extend to fit with neighboring pieces.
      const leftOffset = horizontal - (edges[left] * pieceWidth) / 4;
      const topOffset = vertical - (edges[top] * pieceHeight) / 4;
      // Iterate over the edgeNames array to construct the edges object
      const edgesObject = {};
      edgeNames.forEach((edgeName, index) => {
        edgesObject[edgeName] = edges[index];
      });
      totalPieces.push({ base64Url, centerX, centerY, leftOffset, topOffset, edges: edgesObject });
    }
  }

// Return puzzle data
return createPuzzleData(boardWidth, boardHeight, numColumns, numRows, pieceWidth, pieceHeight, totalPieces);
}
