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

var frontCards = [
    {
        "count": 1,
        "class": "front bobble",
        "src": "image/bobble.png",
        "src_3d": "image/bobble2.png",
        "on": {
            "click": "card_clicked "
        }
    },
    {

    }
]

/***********************************************************************************/
$(document).ready(initApp);



function initApp(){
    create_cards();
    $('.reset').click(function () {
        games_played++;
        reset_stats();
        $('.card').removeClass("hidden");
        $('.message').addClass("hidden");
        $('.front').removeClass("animation_fadeToTransparent");
        $('.front').removeClass("animation_transparentToFade");
    });
    display_stats();
}

function create_cards(){
    var game_area = $('.gameArea');

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

function create_card(front_class){

    var card = $('<div>',{
        class: "card",
        click: card_clicked
    });
    var index = front_class.indexOf("2");
    var id;
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
    return card;
}

function card_clicked(){

    if($(this).find(".animation_fadeToTransparent").length===0){//check the card is not flip already
        if (second_click) {//check you can't click when the second card was already click
            second_click = false;
            $(this).addClass("hidden");
            if (first_card_clicked === null) {//control
                first_card_clicked = $(this);
                second_click = true;
                return true;
            } else {
                if (first_card_clicked.find(".front")[1] !== $(this).find(".front")[1]) {
                    second_card_clicked = $(this);
                    attempts++;
                    if (first_card_clicked.find(".front").attr("id") === second_card_clicked.find(".front").attr("id")) {
                        matches++;
                        accuracy = matches / attempts;
                        transformfromPixelTo3d(first_card_clicked, second_card_clicked);
                        first_card_clicked = null;
                        second_card_clicked = null;
                        display_stats();
                        second_click = true;
                        if (total_possible_matches === matches) {
                            $('.message').text("You Won!");
                            $('.message').removeClass("hidden");
                        } else {
                            return true;
                        }
                    } else {
                        setTimeout(function () {
                            accuracy = matches / attempts;
                            first_card_clicked.removeClass("hidden");
                            second_card_clicked.removeClass("hidden");
                            first_card_clicked = null;
                            second_card_clicked = null;
                            display_stats();
                            second_click = true;
                        }, 2000);
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

function display_stats(){
    $('.games-played span').text(games_played);
    $('.attempts span').text(attempts);
    var format_accuracy = (accuracy*100).toFixed() + "%";
    $('.accuracy span').text(format_accuracy);
}

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