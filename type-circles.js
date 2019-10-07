$(function(){
    // Namespace object
    const typeCircles = {};

    // Create a play state for the game
    typeCircles.playingGame = null;

    // Log user score
    typeCircles.currentScore = 0;

    // Log a variable for speed of the game
    typeCircles.gameSpeed = 2000;

    // All words (200 should be enough)
    typeCircles.words = ["juno", "surround", "install", "narrow", "constraint", "craftsman", "album", "extent", "carriage", "colon", "landscape", "software", "kettle", "default", "constant", " borrow", "couple", "common", "debut", "absorb", "employ", "basket", "physics", "command", "trouser", "surprise", "doctor", "pioneer", "presence", "handy", "cluster", "decade", "oven", "descent", "publish", "singer", "fossil", "quarrel", "mirror", "balance", "bubble", "promote", "dollar", "sweater", "support", "speaker", "cottage", "powder", "engine", "stubborn", "video", "replace", "reduce", "dairy", "waiter", "accept", "pile", "valid", "final", "ribbon", "favor", "poetry", "scatter", "applaud", "army", "marine", "fraction", "vague", "plastic", "fiction", "mourning", "summer", "construct", "pupil", "suppress", "bathroom", "eaux", "topple", "confine", "export", "feather", "patrol", "nonsense", "standard", "knowledge", "discreet", "pepper", "medal", "lemon", "profound", "proclaim", "leader", "studio", "cabin", "moving", "present", "distort", "discuss", "crystal", "painter", "behave", "entry", "fragrant", "season", "jelly", "discount", "rumor", "bracket", "morning", "earwax", "master", "secure", "latest", "surface", "symbol", "fever", "fixture", "future", "wander", "funny", "freckle", "rebel", "reinforce", "award", "volume", "failure", "apple", "audience", "earthwax", "elapse", "pocket", "navy", "dribble", "piano", "bundle", "expect", "football", "notion", "payment", "spirit", "angle", "castle", "dictate", "sale", "confront", "addicted", "pursuit", "kidnap", "detail", "hover", "thesis", "reverse", "healthy", "relate", "idea", "lesson", "behead", "problem", "applied", "bargain", "echo", "damage", "charter", "perfume", "receipt", "finger", "whole", "portrait", "concern", "ensure", "monster", "social", "rabbit", "even", "warrant", "bury", "journal", "belong", "player", "debate", "hero", "lineage", "sequence", "revoke", "lily", "reward", "sister", "flatware", "feeling", "ethics", "basic", "junior", "control", "agree", "muggy", "looting", "justice", "driver", "linen", "undress"];

    // Keep track of all circles
    typeCircles.circles = [];

    // Keep track of all positions
    typeCircles.currentPositions = ["left", "middle", "right"];

    // Caching multi-use selectors
    typeCircles.gameContainer = $('#game-container');
    typeCircles.word = $('#title');
    typeCircles.answer = $('#user-answer');
    typeCircles.score = $('#score');
    typeCircles.circleContainer = $('#circles');

    // Pull a random word out of the array
    typeCircles.randomWord = () => {
        totalWords = typeCircles.words.length;
        randomIndex = Math.floor(Math.random() * totalWords);
        return typeCircles.words.splice(randomIndex, 1);
    };
    
    // Get a different word
    // Change the word in the page
    typeCircles.changeWord = () => {
        newWord = typeCircles.randomWord()[0];
        typeCircles.word.text(newWord);
        typeCircles.checkAnswer(newWord);
    };

    // Update scoring
    // Only allow for points to be scored once
    typeCircles.updateScore = (points) => {
        typeCircles.currentScore += points;
        typeCircles.score.text(typeCircles.currentScore);
    }

    // Change the word and add points if the right circle was clicked
    // Prevent button default
    // End the game if the wrong circle was clicked
    // Reset the game
    typeCircles.clearLevel = (winCondition) => {
        if (winCondition) {
            typeCircles.updateScore(50);
            typeCircles.changeWord();
            $('.can-score').removeClass('can-score');
            typeCircles.answer.focus();
        } else {

        }
    };

    // Create a circle and log the total
    // Add new circle to the DOM
    // Make the first circle the winner
    typeCircles.addCircle = () => {
        const circleCount = typeCircles.circles.length + 1;
        typeCircles.circles.push(circleCount);

        circle = $("<button class='circle'></div>");

        if ( circleCount === 1 ) {
            circle.addClass("winner");
        }

        // Prevent page refresh on button click
        // Check if the clicked circle has the win condition
        circle.on('click', function(e) {
            e.preventDefault();
            winningCondition = $(this).hasClass("can-score");
            typeCircles.clearLevel(winningCondition);
            
        });

        typeCircles.circleContainer.append(circle);
    };

    // Move a circle jQuery object laterally
    typeCircles.moveCircle = (circle, direction) => {
        const positions = {
            left: 0,
            middle: "50%",
            right: "100%"
        };

        circle.animate( {left: positions[direction]}, typeCircles.gameSpeed);
    };

    // Shuffle the global positions
    // Set new position of each circle
    typeCircles.shuffleCircles = () => {
        tempPosition = typeCircle.currentPositions[totalCircles];
        typeCircle.currentPositions[totalCircles] = typeCircle.currentPositions[randomPosition];
        typeCircle.currentPositions[randomPosition] = temporaryPosition;

        typeCircle.currentPositions.forEach(function(position) {

        });

        addCirclePositions();
    };

    // Set the circle to the first position in the positions array
    // Move the first element in the positions array to the back
    typeCircles.addCirclePositions = () => {
        $('.circle').each(function() {
            typeCircles.moveCircle($(this), typeCircles.currentPositions[0]);
            usedPosition = typeCircles.currentPositions.shift();
            typeCircles.currentPositions.push(usedPosition);
        });
    };

    // Change game state to playing
    typeCircles.startGame = () => {
        typeCircles.playingGame = true;
        typeCircles.gameContainer.removeClass('game-pause');
    };

    // End the game when the wrong circle is clicked
    typeCircles.endGame = () => {
        typeCircles.playingGame = false;
        typeCircles.gameContainer.addClass('game-pause');
    };

    // Listen to user input
    typeCircles.checkAnswer = (word) => {
        wordLetters = word.split("");
        lettersMatched = 0;

        // Check matching letters
        // Make sure letters can't give points twice
        const matchLetters = (answerLetters) => {
            if (wordLetters[lettersMatched] === answerLetters[lettersMatched]) {
                wordLetters[lettersMatched] = "answered";
                lettersMatched++;
                typeCircles.updateScore(10);
            }
        }

        // Listen for keypresses
        // Match letters for points
        // Match word to move to next step
        typeCircles.answer.on('keyup', function() {
            answer = $(this).val();
            matchLetters(answer);

            // If words match stop the shuffle
            if (word.toUpperCase() === $(this).val().toUpperCase()) {
                $(this).val('');
                $('.winner').addClass('can-score');
            }
        });
    };

    // Clear initial answer input
    typeCircles.answer.val('');

    // Set score
    typeCircles.score.text(typeCircles.currentScore);
    

    // Hide instructions
    // Change the title to a word
    // Start the game
    typeCircles.answer.one('focus', function() {
        $('#instructions').animate({ opacity: 0 });
        typeCircles.word.attr('id', 'word');
        newWord = typeCircles.randomWord()[0];
        typeCircles.word.text(newWord);
        typeCircles.checkAnswer(newWord);
        typeCircles.startGame();
    });

    // Add 3 circles to DOM
    // Initial animation
    typeCircles.addCircle();
    typeCircles.addCircle();
    typeCircles.addCircle();
    setTimeout(typeCircles.addCirclePositions, 500);
});