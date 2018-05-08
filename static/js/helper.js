/* Chances are, if you need to fix this code and you
 * don't know what it's for, it may not be worth fixing,
 * unless you really value the strange peacock man
 */

$(document).ready(function () {

    $('#chat-prompt').click(function (){
        $('#chat-prompt').css({
            'display':'none'
        })

        var summon = document.createElement('audio');
        summon.setAttribute('src', '/static/media/man_noise.wav');

        $('#helbert').css({
            'visibility':'visible'
        })
        $('#helbert').animate({
            'bottom':'-135'
        }, 'slow').delay(3000)
        $('#helbert').animate({
            'bottom':'0'
        }, 'fast', function() {
            summon.play();
            $('#helbert-help').css({
                'visibility':'visible',
                'opacity':'1.0'
            })
        })
    })

    $('#helbert-img').click(function (){
        $('#helbert-help').css({
            'visibility':'none',
            'opacity':'0.0'
        })
        $('#helbert').animate({
            'bottom':'-300',
            'visibility':'none'
        }, 'fast')
        $('#chat-prompt').css({
            'display':'block'
        })
    })
});  