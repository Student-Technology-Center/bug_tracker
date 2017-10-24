$(document).ready(function () {
    $('.bug-button').click(function() {
        var pk = $(this).siblings()[0].innerHTML;

        $.ajax({
            type: 'GET',
            url: '/bug/api/get/' + pk.toString() + '/',
            success: function(data) {
                console.log(data.bugReport.info)
                $('#bug-info').text(data.bugReport.report)
                $('#bug-recreate').text(data.bugReport.recreation)
                $('#user').text(data.bugReport.full_name)
            }
        })
    })
})