// it doesn't look like there's a better way to to non-int rounding in JS, so we're making one
function round_to(value, decimals) {
	return Math.round(value * Math.pow(10, decimals))/Math.pow(10, decimals);
}

$(function() {
	var $inputs = $('#a, #b, #c');
	var $a = $('#a'), $b = $('#b'), $c = $('#c');
	
	var $xs = $('#x1, #x2');
	var $x1 = $('#x1'), $x2 = $('#x2');
	
	$inputs.on('input', function() {
		if (!$(this).is(':invalid')) {
			$(this).css('width', Math.max(1, this.value.length) + 'ch');
		}
	});
	
	$inputs.on('change', function() {
		var error = false;
		$inputs.each(function(i) {
			var $this = $(this);
			var value = parseFloat($this.val());
			if (isNaN(value) || ($this.is($a) && value == 0)) {
				error = true;
			}
		});
		if (error) {
			$x1.val('');
			$x2.val('');
			return;
		}
		
		var a = parseFloat($a.val());
		var b = parseFloat($b.val());
		var c = parseFloat($c.val());
		
		var disc = Math.pow(b, 2) - 4*a*c;
		
		if (disc >= 0) {
			$x1.val(round_to((-1*b + Math.sqrt(disc))/(2*a), 8));
			$x2.val(round_to((-1*b - Math.sqrt(disc))/(2*a), 8));
		}
		else {
			// the roots are complex
			$x1.val(round_to(-1*b/(2*a), 5) +  ' + ' + round_to(Math.sqrt(-disc)/(2*a), 5) + 'i');
			$x2.val(round_to(-1*b/(2*a), 5) +  ' - ' + round_to(Math.sqrt(-disc)/(2*a), 5) + 'i');
		}
		$x1.css('width', $x1.val().length + 'ch');
		$x2.css('width', $x2.val().length + 'ch');
	});
	
	// select all text when the result fields are clicked
	$xs.each(function(i) {
		$(this).on('click', function() {
			this.setSelectionRange(0, this.value.length);
		}); 
	});
});
