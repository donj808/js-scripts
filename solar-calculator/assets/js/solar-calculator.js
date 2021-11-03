
(function($){
	'use strict';
	var monthly_bill = document.getElementById('bill');
	var shading = document.getElementsByName('shades');

	monthly_bill.addEventListener( "change", function(){
		//var el = this;
		var marker = this.previousElementSibling;
		var width = this.offsetWidth;

		var newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
		var newPlace = newPoint * width;
		var offset = marker.offsetWidth / 2 * -1 * newPoint - 16;

		this.style.backgroundImage = 
			'-webkit-gradient(linear, left top, right top, '
			+ 'color-stop(' + (newPoint) + ', #3a4b66), '
			+ 'color-stop(' + (newPoint) + ', #d8c8b4)'
			+ ')';

		// Move Pin Marker
		marker.style.marginLeft = newPlace + offset;
		console.log( newPlace + offset );
		marker.innerHTML = "$" + this.value;

		var avg_bill = document.getElementById("averageBill");
		avg_bill.innerHTML = "$"+this.value;
		calculate_savings();
	});

	for (let i = 0; i < shading.length; i++) {
		shading[i].addEventListener( "change", function(){
			calculate_savings();
		});
	}

	function calculate_savings() {
		var savings = 0;
		var years = 25;
		var eff = $("input[name='shades']:checked").val() ? parseInt($("input[name='shades']:checked").val()) : 1;
		var m = parseInt($('#bill').val());
		var i;
		for (i = 0; i < years; i++) {
			savings += (m * 12) * eff * Math.pow(1.045, (years - 1));
		}
		// console.log({ eff, m, savings });
		set_meter(parseInt(savings));
	}

	function set_meter(amount) {

		const meters = document.querySelectorAll( 'li.meter-data' );
		meters.forEach( (el) => {
			var pos = parseInt( el.getAttribute('data-meter-index') ) + 1;

			$({ countNum: el.innerHTML }).animate( {
				countNum: amount
			},
			{
				duration: 1500,
				easing: 'linear',
				step: function () {
					var val = Math.floor(this.countNum);
					var digits = val.toString(10).split("").map(function (t) { return parseInt(t) }); //array of ints

					var num_digits = digits.length;
					var output = digits[num_digits - pos];
					el.innerHTML = output?output:0;
				},
				complete: function (result) {
					return result;
				}
			});
		});
	}

	const event = new Event('change');
	monthly_bill.dispatchEvent(event);

})(jQuery);