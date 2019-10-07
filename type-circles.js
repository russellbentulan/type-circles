$(function(){
    // Namespace object
    const typeCircles = {};

    // Create a play state for the game
    typeCircles.playingGame = null;

    // All words (200 should be enough)
    typeCircles.words = ["juno", "surround", "install", "narrow", "constraint", "craftsman", "album", "extent", "carriage", "colon", "landscape", "software", "kettle", "default", "constant", " borrow", "couple", "common", "debut", "absorb", "employ", "basket", "physics", "command", "trouser", "surprise", "doctor", "pioneer", "presence", "handy", "cluster", "decade", "oven", "descent", "publish", "singer", "fossil", "quarrel", "mirror", "balance", "bubble", "promote", "dollar", "sweater", "support", "speaker", "cottage", "powder", "engine", "stubborn", "video", "replace", "reduce", "dairy", "waiter", "accept", "pile", "valid", "final", "ribbon", "favor", "poetry", "scatter", "applaud", "army", "marine", "fraction", "vague", "plastic", "fiction", "mourning", "summer", "construct", "pupil", "suppress", "bathroom", "eaux", "topple", "confine", "export", "feather", "patrol", "nonsense", "standard", "knowledge", "discreet", "pepper", "medal", "lemon", "profound", "proclaim", "leader", "studio", "cabin", "moving", "present", "distort", "discuss", "crystal", "painter", "behave", "entry", "fragrant", "season", "jelly", "discount", "rumor", "bracket", "morning", "earwax", "master", "secure", "latest", "surface", "symbol", "fever", "fixture", "future", "wander", "funny", "freckle", "rebel", "reinforce", "award", "volume", "failure", "apple", "audience", "earthwax", "elapse", "pocket", "navy", "dribble", "piano", "bundle", "expect", "football", "notion", "payment", "spirit", "angle", "castle", "dictate", "sale", "confront", "addicted", "pursuit", "kidnap", "detail", "hover", "thesis", "reverse", "healthy", "relate", "idea", "lesson", "behead", "problem", "applied", "bargain", "echo", "damage", "charter", "perfume", "receipt", "finger", "whole", "portrait", "concern", "ensure", "monster", "social", "rabbit", "even", "warrant", "bury", "journal", "belong", "player", "debate", "hero", "lineage", "sequence", "revoke", "lily", "reward", "sister", "flatware", "feeling", "ethics", "basic", "junior", "control", "agree", "muggy", "looting", "justice", "driver", "linen", "undress"];

    typeCircles.word = $('#title');
    typeCircles.answer = $('#user-answer');

    // Pull a random word out of the array
    typeCircles.randomWord = () => {
        totalWords = typeCircles.words.length;
        randomIndex = Math.floor(Math.random() * totalWords);
        return typeCircles.words.splice(randomIndex, 1);
    };
    
    // Get a different word
    typeCircles.changeWord = () => {

    };

    // Start the game
    typeCircles.startGame = (theWord) => {
        console.log(theWord);
        typeCircles.answer.on('keyup', function() {
            if (theWord.toUpperCase() === $(this).val().toUpperCase()) {
            console.log($(this).val());
        }
        });
    };

    // Clear answer input
    typeCircles.answer.val('');

    // Hide instructions
    // Change the title to a word
    // Start the game
    typeCircles.answer.one('focus', function() {
        $('#instructions').animate({ opacity: 0 });
        typeCircles.word.attr('id', 'word');
        newWord = typeCircles.randomWord()[0];
        typeCircles.word.text(newWord);
        typeCircles.startGame(newWord);
    });
});