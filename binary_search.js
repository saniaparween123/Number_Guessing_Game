document.getElementById("startGameBtn").addEventListener("click", startGame);

let start, end, guess, guessCount;

function startGame() {
    start = parseInt(prompt("Enter the starting point:"));
    end = parseInt(prompt("Enter the ending point:"));

    if (isNaN(start) || isNaN(end) || start >= end) {
        document.getElementById("guessText").textContent = "Please enter valid starting and ending points.";
        return;
    }

    guessCount = 0; // Initialize guess count
    document.getElementById("instructionsContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none"; // Hide result container
    binarySearchGame();
}

function binarySearchGame() {
    guess = Math.floor((start + end) / 2);
    guessCount++; 
    updateGuessText();
}

// Function to update guess text with feedback
function updateGuessText() {
    const guessTextElement = document.getElementById("guessText");
    guessTextElement.textContent = `Is your number ${guess}?`;
    document.getElementById("guessCount").textContent = `Guesses made: ${guessCount}`;

    // Create a feedback message element
    const feedbackMessage = document.createElement("div");
    feedbackMessage.classList.add("feedback");
    feedbackMessage.textContent = `I guessed ${guess}.`;

    // Append feedback message to the game container
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.appendChild(feedbackMessage);

    // Fade in feedback message
    setTimeout(() => {
        feedbackMessage.style.opacity = 1; // Make it visible
    }, 100); // Delay to allow CSS transition

    // Remove feedback message after a few seconds
    setTimeout(() => {
        feedbackMessage.remove();
    }, 3000); // Adjust duration as necessary
}


document.getElementById("lowerBtn").addEventListener("click", function() {
    end = guess; // Update the ending point to the current guess
    makeGuess();
});

document.getElementById("higherBtn").addEventListener("click", function() {
    start = guess + 1; // Update the starting point to one more than the current guess
    makeGuess();
});

document.getElementById("equalBtn").addEventListener("click", function() {
    document.getElementById("resultMessage").textContent = `Yay! I guessed your number ${guess} in ${guessCount} attempts!`;
    showResult();
});

function makeGuess() {
    if (start <= end) {
        binarySearchGame();
    } else {
        document.getElementById("resultMessage").textContent = "Hmm... It seems like I couldn't guess your number.";
        showResult();
    }
}

function showResult() {
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";

    // Disable buttons
    document.getElementById("lowerBtn").disabled = true;
    document.getElementById("higherBtn").disabled = true;
    document.getElementById("equalBtn").disabled = true;
}

document.getElementById("resetGameBtn").addEventListener("click", resetGame);

function resetGame() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("instructionsContainer").style.display = "block";

    // Enable buttons for a new game
    document.getElementById("lowerBtn").disabled = false;
    document.getElementById("higherBtn").disabled = false;
    document.getElementById("equalBtn").disabled = false;
}

document.addEventListener("DOMContentLoaded", function() {
    const symbols = ["★", "✦", "✿", "❖", "✧","♡", "♡","𖹭" ,"𐙚⋆°｡⋆♡", "ᡣ𐭩"];
    for (let i = 0; i < 20; i++) {
        const symbol = document.createElement("div");
        symbol.className = "symbol";
        symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.top = `${Math.random() * 100}vh`;
        symbol.style.left = `${Math.random() * 100}vw`;
        symbol.style.fontSize = `${Math.random() * 20 + 20}px`;
        document.body.appendChild(symbol);
    }
});
