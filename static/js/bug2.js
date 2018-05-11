$(document).ready(function() {
		// Kills off the autovalidation that browsers perform
	    $("form").attr('novalidate', 'novalidate');	
	    $('.ui.dropdown').dropdown();

	    $('#id_info').keyup(function (){
	        var amt = $(this).val()
	        $('#info-length').text(amt.length)
	    })

	    $('#id_recreate').keyup(function (){
	        var amt = $(this).val()
	        $('#recreate-length').text(amt.length)
	    })
})

