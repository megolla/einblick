/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


$(function(){	
	// Schrift via FitText anpassen
	$("#abdecker").fitText(3, { minFontSize: '16px', maxFontSize: '50px' });
	
	// Abdecker unsichtbar machen
	$('#abdecker').click(function(){
		$(this).addClass('weg');
	});
});

$(function(){
	$('nav ul ul li').hide();
	$('nav .haupt').click(function(){
		var ele = $(this).next('ul').find('li');
		if (ele.hasClass('offen') && ele.hasClass('ausgewaehlt')){
			ele
				.removeClass('offen')
				.slideUp('slow');
		} else {
			ele
				.slideDown('slow')
				.addClass('offen');
		}
		return false;
	});
	
	// Filter werden als ausgewählt oder nicht ausgewählt markiert
	$('nav ul ul li').click(function(){
		if ($(this).hasClass('ausgewaehlt')){
			$(this).removeClass('ausgewaehlt');
		} else {
			$(this).addClass('ausgewaehlt');
		}
		
		return false;
	});
});