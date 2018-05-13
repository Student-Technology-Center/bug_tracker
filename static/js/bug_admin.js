$(document).ready(function() {
	$('.ui.accordion')
	  	.accordion();

	$('.ui.dropdown')
  		.dropdown();

	$('.item').click(function() {
        currentPk = $(this).text().trim();

        $.ajax({
            type: 'GET',
            url: '/bug/api/get/' + currentPk.toString() + '/',
            success: function(data) {
                $('#bug-info').text(data.bugReport.report)
                $('#bug-recreate').text(data.bugReport.recreation)
                $('#bug-team').text(data.bugReport.team)
                $('#user').text(data.bugReport.full_name)
                $('#bug-label-id').text(data.bugReport.pk)
                if(data.bugReport.resolved){
                	$('#bug-label-icon').addClass('green check').removeClass('red bug');
                }
                else{
                	$('#bug-label-icon').addClass('red bug').removeClass('green check');
                }
            }

        })
    })
});