/**
 * Global Variables
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
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

    $(this).addClass("hidden");
    if(first_card_clicked===null){
        first_card_clicked = $(this);
        return true;
    }else{
        second_card_clicked = $(this);
        if(first_card_clicked.find(".front").attr("id") === second_card_clicked.find(".front").attr("id")){
            match_counter++;
            second_card_clicked.find("."+second_card_clicked.find(".front").attr("id")+"4").addClass("animation_fadeToTransparent");
            second_card_clicked.find("."+second_card_clicked.find(".front").attr("id")+"2").addClass("animation_transparentToFade");
            first_card_clicked.find("."+first_card_clicked.find(".front").attr("id")+"3").addClass("animation_fadeToTransparent");
            first_card_clicked.find("."+first_card_clicked.find(".front").attr("id")).addClass("animation_transparentToFade");
            first_card_clicked = null;
            second_card_clicked = null;
            if(total_possible_matches===match_counter){
               $('.message').text("You Won!");
                $('.message').removeClass("hidden");
            }else{
                return true;
            }
        }else{
            setTimeout(function(){
                first_card_clicked.removeClass("hidden");
                second_card_clicked.removeClass("hidden");
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
            return true;
        }
    }
}