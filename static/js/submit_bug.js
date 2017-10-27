$(document).ready(function () {
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
                    'csrfmiddlewaretoken': csrf_token
                },
                success: function(data) {
                    if (data.status === 'success') {
                        $('#body-center').animate({
                            'opacity': '0'
                        }, 500, function() {
                            $('#body-center').css({
                                'display':'none'
                            }, 1)
                        })
                    }
                },
            })
        }
    });
});