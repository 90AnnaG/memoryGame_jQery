let boxOpened = '';
let imgOpened = '';
let counter = 0;
let imgFound = 0;
const showPoints = '.button-container__counter';
const messageForUser = '.game-box__end-message';
const resetBtn = '.button-container__reset-btn';
const gameContainer = '.game-box__cards-container';

const imagesForGame = ['images/1.svg', 'images/2.svg', "images/3.svg", 'images/4.svg', 'images/5.svg',
    'images/6.svg', 'images/7.svg', 'images/8.svg', 'images/9.svg', 'images/10.svg'];

// randomizing images
function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
};

function ShuffleImages() {
    let ImgAll = $(gameContainer).children();
    let ImgThis = $(gameContainer + ' div:first-child');
    let ImgArr = new Array();

    for (let i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $('#' + ImgThis.attr('id') + ' img').attr('src');
        ImgThis = ImgThis.next();
    }

    ImgThis = $(gameContainer + ' div:first-child');

    for (let z = 0; z < ImgAll.length; z++) {
        let RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr('id') + ' img').attr('src', ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
};

// reset game
$(resetBtn).click(function() {
    ShuffleImages();
    $(gameContainer + ' div img').hide();
    $(gameContainer + ' div').css('visibility', 'visible');
    counter = 0;
    $(showPoints).html('' + counter);
    $(messageForUser).text(" ");
    boxOpened = '';
    imgOpened = '';
    imgFound = 0;
    return false;
});

// show card after click
function OpenCard() {
    let id = $(this).attr('id');

    if ($('#' + id + ' img').is(':hidden')) {
        $(gameContainer + ' div').unbind('click', OpenCard);
        $('#' + id + ' img').slideDown('fast');

        // if cards mismatch they will hide after 0,7 seconds
        if (imgOpened == '') {
            boxOpened = id;
            imgOpened = $('#' + id + ' img').attr('src');
            setTimeout(function () {
                $(gameContainer + ' div').bind('click', OpenCard)
            }, 700);
        } else {
            CurrentOpened = $('#' + id + ' img').attr('src');
            if (imgOpened != CurrentOpened) {
                setTimeout(function () {
                    $('#' + id + ' img').slideUp('fast');
                    $('#' + boxOpened + ' img').slideUp('fast');
                    boxOpened = '';
                    imgOpened = '';
                }, 700);
                // if cards match
            } else {
                $('#' + id + ' img').parent().css('visibility', 'visible');
                $("#" + boxOpened + ' img').parent().css('visibility', 'visible');
                imgFound++;
                boxOpened = '';
                imgOpened = '';
            }
            setTimeout(function () {
                $(gameContainer + ' div').bind('click', OpenCard)
            }, 700);
        }
        // if user win
        counter++;
        $(showPoints).html("" + counter);
        if (imgFound == imagesForGame.length) {
            $(messageForUser).text('Wygrana! Ilość prób ' + counter + '!');
        }
    }
};

$(function () {
    for (let y = 1; y < 3; y++) {
        $.each(imagesForGame, function (i, val) {
            $(gameContainer).append('<div id=card' + y + i + '><img src=' + val + ' />');
        });
    }
    $(gameContainer + ' div').click(OpenCard);
    ShuffleImages();
});