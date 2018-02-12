/**
 * Global Variables
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var second_click = true;

var frontCards = ["bobble","bobble2","bomb","bomb2","dk","dk2",
    "pacman","pacman2","pole","pole2","sf","sf2",
    "galaga","galaga2","tetris","tetris2","zelda","zelda2"];

var sounds = {};
/***********************************************************************************/
$(document).ready(initApp);

/**
 *
 */
function initApp(){
    initSounds();//Iniciate all sounds and store in a global var
    create_cards(shuffle(frontCards));//create all cards from array
    $('.reset_button').click(reset_game);
    display_stats();
}

/**
 *
 */
function initSounds() {
    var bobble_sound = new Audio();
    bobble_sound.src= "sound/bobble.mp3";
    sounds["bobble"] = bobble_sound;

    var sf_sound = new Audio();
    sf_sound.src= "sound/sf.mp3";
    sounds["sf"] = sf_sound;

    var bomb_sound = new Audio();
    bomb_sound.src= "sound/bomb.mp3";
    sounds["bomb"] = bomb_sound;

    var dk_sound = new Audio();
    dk_sound.src= "sound/dk.wav";
    sounds["dk"] = dk_sound;

    var pacman_sound = new Audio();
    pacman_sound.src= "sound/pacman.wav";
    sounds["pacman"] = pacman_sound;

    var pole_sound = new Audio();
    pole_sound.src= "sound/pole.mp3";
    sounds["pole"] = pole_sound;

    var galaga_sound = new Audio();
    galaga_sound.src= "sound/galaga.mp3";
    sounds["galaga"] = galaga_sound;

    var tetris_sound = new Audio();
    tetris_sound.src= "sound/tetris.mp3";
    sounds["tetris"] = tetris_sound;

    var zelda_sound = new Audio();
    zelda_sound.src= "sound/zelda.mp3";
    sounds["zelda"] = zelda_sound;

    var card_sound = new Audio();
    card_sound.src= "sound/card.wav";
    sounds["card"] = card_sound;
}
/**
 *
 */
function reset_game() {
    create_cards(shuffle(frontCards));
    games_played++;
    reset_stats();
    $('.card').removeClass("flip");
    $('.message').addClass("hidden");
    $('.front').removeClass("animation_fadeToTransparent");
    $('.front').removeClass("animation_transparentToFade");
}

/**
 *
 * @param frontCards
 */
function create_cards(frontCards){
    var game_area = $('.gameArea');
    game_area.empty();

    var won_message = $('<div>').addClass('message hidden');//Won message. We hide at the begging
    game_area.append(won_message);
    for(var i = 0; i < frontCards.length; i++){

        //create a new row
        if(i % 6 == 0){
            var row = $('<div>').addClass('row');
        }

        var card = create_card(frontCards[i]);
        row.append(card);
        //append the row to the game area before create a new row
        if(i % 5 == 0){
            game_area.append(row);
        }
    }
}

/**
 * Create a card with DOM creation
 * @param front_class
 * @returns {*|jQuery|HTMLElement}
 */
function create_card(front_class){

    var card_container = $('<div>',{//this container is to make the flip animation
        class: "card_container"
    });
    var card = $('<div>',{//the actual card with the front and the back
        class: "card",
        click: card_clicked
    });
    var index = front_class.indexOf("2");
    var id;
    //We create a common id for the 2 different card for the same game
    if(index !== -1){
        id = front_class.slice(0,index);
    }else{
        id = front_class;
    }
    var front = $('<div>',{
        id: id,
        class: "front " + front_class
    });
    var back = $('<div>',{
        class: "back"
    });
    //Add an extra front card for an animation
    if(index !== -1){
        var front2 = $('<div>',{
            id: id,
            class: "front " + front_class.slice(0,index) + 4
        });
        card.append(front2);
    }else {
        var front2 = $('<div>',{
            id: id,
            class: "front " + front_class + 3
        });
        card.append(front2);
    }
    card.append(front);
    card.append(back);
    card_container.append(card);
    return card_container;
}

/**
 *
 * @returns {boolean}
 */
function card_clicked(){

    if($(this).find(".animation_fadeToTransparent").length===0){//check the card is not flip already
        if (second_click) {//check you can't click when the second card was already click
            second_click = false;
            sounds["card"].play();
            $(this).addClass("flip");
            if (first_card_clicked === null) {//control is the first card click
                first_card_clicked = $(this);
                second_click = true;
                return true;
            } else {
                if (first_card_clicked.find(".front")[1] !== $(this).find(".front")[1]) {//Don't click the same card twice
                    second_card_clicked = $(this);
                    attempts++;
                    //when you click two cards from the same game
                    if (first_card_clicked.find(".front").attr("id") === second_card_clicked.find(".front").attr("id")) {
                        //play a music from that game
                        sounds[first_card_clicked.find(".front").attr("id")].play();
                        matches++;
                        accuracy = matches / attempts;
                        //animation to transform from pixel to 3d
                        transformfromPixelTo3d(first_card_clicked, second_card_clicked);
                        first_card_clicked = null;
                        second_card_clicked = null;
                        display_stats();
                        second_click = true;
                        //when you have all the matches
                        if (total_possible_matches === matches) {
                            setTimeout(function () {
                                $('.message').text("You Won!");
                                $('.message').removeClass("hidden");
                            }, 2000);
                        } else {
                            return true;
                        }
                    } else {
                        setTimeout(function () {
                            //flip to back both cards
                            accuracy = matches / attempts;
                            first_card_clicked.removeClass("flip");
                            second_card_clicked.removeClass("flip");
                            first_card_clicked = null;
                            second_card_clicked = null;
                            display_stats();
                            second_click = true;
                        }, 1000);
                        return true;
                    }
                } else {
                    second_click = true;
                    return true;
                }
            }
        }
    }
}

/**
 *
 */
function display_stats(){
    $('.games-played span').text(games_played);
    $('.attempts span').text(attempts);
    var format_accuracy = (accuracy*100).toFixed() + "%";
    $('.accuracy span').text(format_accuracy);
}

/**
 *
 */
function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

/**
 * We convert the image from pixel to 3D using animation to change the opacity from 0 to 1
 *
 * @param first_card_clicked
 * @param second_card_clicked
 */
function transformfromPixelTo3d(first_card_clicked,second_card_clicked) {
    if(second_card_clicked.find("." + second_card_clicked.find(".front").attr("id") + "4").length===0){
        first_card_clicked.find("." + first_card_clicked.find(".front").attr("id") + "4").addClass("animation_fadeToTransparent");
        first_card_clicked.find("." + first_card_clicked.find(".front").attr("id") + "2").addClass("animation_transparentToFade");
        second_card_clicked.find("." + second_card_clicked.find(".front").attr("id") + "3").addClass("animation_fadeToTransparent");
        second_card_clicked.find("." + second_card_clicked.find(".front").attr("id")).addClass("animation_transparentToFade");
    }else{
        second_card_clicked.find("." + second_card_clicked.find(".front").attr("id") + "4").addClass("animation_fadeToTransparent");
        second_card_clicked.find("." + second_card_clicked.find(".front").attr("id") + "2").addClass("animation_transparentToFade");
        first_card_clicked.find("." + first_card_clicked.find(".front").attr("id") + "3").addClass("animation_fadeToTransparent");
        first_card_clicked.find("." + first_card_clicked.find(".front").attr("id")).addClass("animation_transparentToFade");
    }
}

/**
 * Shuffle the elements in an array
 * @param array
 * @returns {*}
 */
function shuffle (array) {

    var j = 0
    var temp = null;

    for (var i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}