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
});  