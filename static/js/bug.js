$(document).ready(function() {
		// Kills off the autovalidation that browsers perform
	    $("form").attr('novalidate', 'novalidate');	

	    // Enables dropdown menu for team selection
	    $('.ui.dropdown').dropdown();

	    // Updates the character count on the forms
	    $('#id_info').keyup(function (){
	        var amt = $(this).val()
	        $('#info-length').text(amt.length)
	    })

	    $('#id_recreate').keyup(function (){
	        var amt = $(this).val()
	        $('#recreate-length').text(amt.length)
	    })
})

