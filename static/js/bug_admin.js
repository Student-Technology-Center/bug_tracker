var currentPk;
var currentLabel;

$(document).ready(function() {
	// Enable semantic ui functionalities
	$('.ui.accordion').accordion();
	$('.ui.dropdown').dropdown();

  	// Pull up bug info
	$('.bug').click(function() {
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
                $('#resolved-by').text(data.bugReport.resolved_by)
                $('#btn-delete').removeClass('disabled');
                var resolution = data.bugReport.resolution;
                if(resolution != 'None'){
                    $('#bug-resolution').val(resolution);
                }
                else {
                    $('#bug-resolution').val('');
                }
                if(data.bugReport.resolved){
                	$('#bug-label-icon').addClass('green check').removeClass('red bug');
                	$('#btn-resolve').addClass('disabled');
                	$('#btn-unresolve').removeClass('disabled');
                    $('#bug-resolution').attr('readonly','readonly');
                }
                else{
                	$('#bug-label-icon').addClass('red bug').removeClass('green check');
                	$('#btn-resolve').removeClass('disabled');
                	$('#btn-unresolve').addClass('disabled');
                    $('#bug-resolution').removeAttr('readonly','readonly');
                }
            }

        })
    });

    $('#bug-resolution').keyup(function (){
        var amt = $(this).val()
        $('#resolution-length').text(amt.length)
    })


    // Setup CSRF authentication for the POST methods
    // Ripped straight from Django docs
    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    // Resolve a bug
    $('#btn-resolve').click(function(){
        var resolution = $('#bug-resolution').val().trim();
        if(resolution.length <= 0){
            $('#resolution-required').css({
                'display':'block'
            });
        }
        else{
            var updated_data = { 'pk':currentPk, 'resolved':'True', 'resolution':resolution }
            $.ajax({
                type: 'POST',
                url: '/bug/api/update/',
                data: updated_data,
                success: function(data) {
                    currentLabel = $('#' + currentPk);
                    currentLabel.find("i").removeClass('red bug').addClass('green check');
                    $('#bug-label-icon').removeClass('red bug').addClass('green check');
                    $('#btn-resolve').addClass('disabled');
                    $('#btn-unresolve').removeClass('disabled');
                    $('#bug-resolution').attr('readonly','readonly');
                }
            })
        }
        
    });

    // Unresolve a bug
    $('#btn-unresolve').click(function(){
         var updated_data = { 'pk':currentPk, 'resolved':'False', 'resolution':'' }
    	$.ajax({
            type: 'POST',
            url: '/bug/api/update/',
            data: updated_data,
            success: function(data) {
                currentLabel = $('#' + currentPk);
                currentLabel.find("i").removeClass('green check').addClass('red bug');
                $('#bug-label-icon').removeClass('green check').addClass('red bug');
                $('#btn-unresolve').addClass('disabled');
                $('#btn-resolve').removeClass('disabled');
                $('#bug-resolution').removeAttr('readonly','readonly');
                $('#bug-resolution').val('');
            }
        })
    });

    // Delete a bug
    $('#btn-delete').click(function(){
    	$.ajax({
            type: 'GET',
            url: '/bug/api/delete/' + currentPk + '/',
            success: function(data) {
                $('#' + currentPk).remove();
                $('#btn-delete').addClass('disabled');
                $('#btn-resolve').addClass('disabled');
                $('#btn-unresolve').addClass('disabled');
                $('#bug-label-icon').removeClass('green check red bug');
                $('#bug-label-id').text('--');
                $('#bug-info').text('');
                $('#bug-recreate').text('');
                $('#bug-team').text('...');
                $('#user').text('...');
                $('#resolved-by').text('...');
                $('#bug-resolution').val('');
                $('#bug-resolution').attr('readonly','readonly');
            }
        })
    });
});