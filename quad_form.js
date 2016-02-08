// It doesn't look like there's a better way to to non-int rounding in JS, so we're making one
function round_to(value, decimals) {
	return Math.round(value * Math.pow(10, decimals))/Math.pow(10, decimals);
}

$(function() {
	var $inputs = $('#a, #b, #c');
	var $a = $('#a'), $b = $('#b'), $c = $('#c');
	
	var $xs = $('#x1, #x2');
	var $x1 = $('#x1'), $x2 = $('#x2');
	
	function update_form() {
		
		$xs.removeClass('small');
	
		// Sanitize the three inputs
		var error = false;
		$inputs.each(function(i) {
			var $this = $(this);
			var value = parseFloat($this.val());
			if (isNaN(value) || ($this.is($a) && value == 0)) {
				$this.addClass('error');
				error = true;
			}
			else {
				$this.removeClass('error');
			}
		});
	
		if (!error) {
			var a = parseFloat($('#a').val());
			var b = parseFloat($('#b').val());
			var c = parseFloat($('#c').val());
	
			var disc = Math.pow(b, 2) - 4*a*c;
	
			if (disc >= 0) {
				$x1.val(round_to((-1*b + Math.sqrt(disc))/(2*a), 8));
				$x2.val(round_to((-1*b - Math.sqrt(disc))/(2*a), 8));
			}
			else {
				// The roots are complex
				$x1.val(round_to(-1*b/(2*a), 5) +  ' + ' + round_to(Math.sqrt(-disc)/(2*a), 5) + 'i');
				$x2.val(round_to(-1*b/(2*a), 5) +  ' - ' + round_to(Math.sqrt(-disc)/(2*a), 5) + 'i');
				
				if ($x1.val().length > 12 || $x2.val().length > 12) {
					$xs.addClass('small');
				}
			}
		}
		else {
			$x1.val('');
			$x2.val('');
		}
	}
	
	// Call update_form() whenver the three inputs are changed
	$inputs.each(function(i) {
		$(this).bind('change', update_form); 
	});
	
	// Select all text when the result fields are clicked
	$xs.each(function(i) {
		$(this).bind('click', function() {
			this.focus();
			this.select();
		}); 
	});
});