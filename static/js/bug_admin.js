var currentPk;
var currentLabel;

$(document).ready(function() {
	// Enable semantic ui functionalities
	$('.ui.accordion').accordion();
	$('.ui.dropdown').dropdown();

  	// Pull up bug info
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
                	$('#btn-resolve').addClass('disabled');
                	$('#btn-unresolve').removeClass('disabled');
                }
                else{
                	$('#bug-label-icon').addClass('red bug').removeClass('green check');
                	$('#btn-resolve').removeClass('disabled');
                	$('#btn-unresolve').addClass('disabled');
                }
            }

        })
    });

	// Resolve a bug
    $('#btn-resolve').click(function(){
    	$.ajax({
            type: 'GET',
            url: '/bug/api/mark/' + currentPk + '/?resolved=True',
            success: function(data) {
                currentLabel = $('#' + currentPk);
                currentLabel.find("i").removeClass('red bug').addClass('green check');
                $('#bug-label-icon').removeClass('red bug').addClass('green check');
                $('#btn-resolve').addClass('disabled');
                $('#btn-unresolve').removeClass('disabled');
            }
        })
    });

    // Unresolve a bug
    $('#btn-unresolve').click(function(){
    	$.ajax({
            type: 'GET',
            url: '/bug/api/mark/' + currentPk + '/?resolved=False',
            success: function(data) {
                currentLabel = $('#' + currentPk);
                currentLabel.find("i").removeClass('green check').addClass('red bug');
                $('#bug-label-icon').removeClass('green check').addClass('red bug');
                $('#btn-unresolve').addClass('disabled');
                $('#btn-resolve').removeClass('disabled');
            }
        })
    });

    // Delete a bug
    $('#btn-delete').click(function(){
    	$.ajax({
            type: 'GET',
            url: '/bug/api/mark/' + currentPk + '/?resolved=delete',
            success: function(data) {
                $('#' + currentPk).remove();
                $('#btn-resolve').addClass('disabled');
                $('#btn-unresolve').addClass('disabled');
                $('#bug-label-icon').removeClass('green check red bug');
                $('#bug-label-id').text('--');
                $('#bug-info').text('');
                $('#bug-recreate').text('');
                $('#bug-team').text('...');
                $('#user').text('...');
            }
        })
    });
});