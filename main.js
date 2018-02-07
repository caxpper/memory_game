/**
 * Global Variables
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

var frontCards = ["bobble","bobble2","bomb","bomb2","dk","dk2",
    "pacman","pacman2","pole","pole2","sf","sf2",
    "space","space2","tetris","tetris2","zelda","zelda2"];

/***********************************************************************************/
$(document).ready(initApp);



function initApp(){
    create_cards();
}

function create_cards(){
    var game_area = $('.gameArea');

    for(var i = 0; i < frontCards.length; i++){

        //create a new row
        if(i % 6 == 0){
            var row = $('<div>');
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
    card.append(front);
    card.append(back);
    return card;
}

function card_clicked(){

    $(this).addClass("hidden");
    if(first_card_clicked===null){
        first_card_clicked = $(this).find(".front").attr("id");
        return true;
    }else{
        second_card_clicked = $(this).find(".front").attr("id");
        if(first_card_clicked == second_card_clicked){
            match_counter++;
        }else{
            var i = 0;
        }
    }
}