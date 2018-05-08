$(document).ready(function () {

    $('#helbert-img').click(function (){
        $('#helbert-help').css({
            'visibility':'none',
            'opacity':'0.0'
        })
        $('#helbert').animate({
            'bottom':'-300',
            'visibility':'none'
        }, 'fast')
    })

    $('#bug-info').keyup(function (){
        var amt = $(this).val()
        $('#info-length').text(amt.length)
    })

    $('#bug-recreate').keyup(function (){
        var amt = $(this).val()
        $('#recreate-length').text(amt.length)
    })


    $('#bug-submit').click(function() {
        var info = $('#bug-info').val()
        var recreate = $('#bug-recreate').val()
        var team = $('#bug-team option:selected').text()
        var submit = false;

        if (info == '' || recreate == '') {
            $('#warning').css({
                'display':'block'
            })

            
        } else {
            $('#warning').css({
                'display':'none'
            })

            submit = true;
        }

        if (submit) {

            $.ajax({
                type: 'POST',
                url: '/bug/api/submit/',
                data: {
                    'info': info,
                    'recreate': recreate,
                    'team': team,
                    'csrfmiddlewaretoken': csrf_token
                },
                success: function(data) {
                    if (data.status === 'success') {
                        $('#body-center').animate({
                            'opacity': '0'
                        }, 500, function() {
                            $('#body-center').css({
                                'display':'none'
                            });
                            $('#return').css({
                                'display':'block'
                            });
                        })
                    }
                },
            })
        }
    });
});