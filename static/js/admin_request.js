var currentPk;
var $currentButton;

$(document).ready(function () {
    $('.bug-button').click(function() {
        currentPk = $(this).siblings()[0].innerHTML;
        currentButton = $(this);

        $.ajax({
            type: 'GET',
            url: '/bug/api/get/' + currentPk.toString() + '/',
            success: function(data) {
                $('#bug-info').text(data.bugReport.report)
                $('#bug-recreate').text(data.bugReport.recreation)
                $('#user').text(data.bugReport.full_name)
            }
        })
    })

    $('#resolved-button').click(function() {
        var answer = $('#resolved').val()
        console.log(answer)
        
        if ($('#bug-info').val() !== '' || $('#bug-recreate').val() !== '') {
            $.ajax({
                type: 'GET',
                url: '/bug/api/mark/' + currentPk + '/?resolved=' + answer,
                success: function(data) {
                    console.log(data.resolved)
                    if (data.resolved === 'true') {
                        currentButton.css({
                            'background-color': '#5dc16a'
                        });
                        console.log('goin green')
                    } else {
                        currentButton.css({
                            'background-color': '#aa4b54'
                        });
                        console.log('goin red')
                    }
                }
            })
        }
        
    });
})