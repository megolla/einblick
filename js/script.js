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

/* **********************************************
     Begin riseToolbar.js
********************************************** */

(function( win ){
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){

		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );

/* **********************************************
     Begin script.js
********************************************** */

var Abdecker_modus = readCookie('Abdecker');
console.log(Abdecker_modus);

/*
	Variable definieren, die von Breite des Browserfensters abhänig ist
	ab Browserfenster-Breite des iPad horizontal soll beim Einstellen der Filter
	das Filtermenü unsichtbar gemacht werden, sobald man einen Filter auswählt,
	weil man sonst zu wenig Platz hat
*/
var Filterausblenden; // globale Variable!
function browserBreite(){
	if (document.documentElement.clientWidth < 815) {
		Filterausblenden = 1;
	} else {
		Filterausblenden = 0;
	}
	console.log(Filterausblenden);
}

// beim Resizing des Browserfenster soll auch Breite abgefragt werden
$(window).resize(function() {
    browserBreite();
});

// http://www.quirksmode.org/js/cookies.html#script
function createCookie(name,value,mins) {
    if (mins) {
        var date = new Date();
        date.setTime(date.getTime()+(mins*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

$(function(){
	// legt Variable fest, die das Verhalten des Filtermenüs beeinflusst
	browserBreite(); 
	
	// wenn Abdecker in der Session schon mal weggeklickt wurde
	// soll dieser nicht wieder auftauchen
	// Abfrage via Cookie "Abdecker"
	if (Abdecker_modus == 'weggeklickt'){
		$('#abdecker').hide();
	} else {
		// Schrift via FitText anpassen
		$("#abdecker").fitText();
	}
	
	// Abdecker unsichtbar machen
	$('#abdecker').click(function(){
		$(this).addClass('weg');
		
		/*
			Cookie erzeugen, das verhindert, dass jedesmal der Abdecker sichtbar wird
			momentan so eingestellt, dass Abdecker nach 10min wieder auftaucht	*/
		createCookie('Abdecker','weggeklickt',10);
	});
	
	// Filter bei Jahrgang, Studienrichtung & kategorie erst mal unsichtbar
	$('#filter ul ul').hide();
	$('#filter .haupt').click(function(){
	
		$('#filter ul ul').not('offen').slideUp('slow');
		
		// ^ bei Filter umdrehen
		if ($(this).hasClass('offen')){
			$(this).removeClass('offen');
		}else {
			$(this).addClass('offen');
		}
	
		var ele = $(this).next('ul');
		if (ele.hasClass('offen')){
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
	$('#filter ul ul li').click(function(){
		if ($(this).hasClass('ausgewaehlt')){
			$(this).removeClass('ausgewaehlt');
			var clicktext = $(this).text();
			Bildereinblenden(clicktext);
		} else {
			$(this).addClass('ausgewaehlt');
			var clicktext = $(this).text();
			Bilderausblenden(clicktext);
		}
		
		// wenn Browserfensterbreite < 768, soll Filtermenü gleich ausgeblendet werden
		if (Filterausblenden == 1){
			Filtersichtbarkeit('unsichtbar');
		}
		
		return false;
	});
	
	// alle Filter zurücksetzen
	$('#filterZurueckSetzen').click(function(){
		$('#filter li.ausgewaehlt').removeClass('ausgewaehlt');
		
		$('.bilderGalerie .fd').fadeIn(1000);
		$('.bilderGalerie .id').fadeIn(1000);
		$('.bilderGalerie .kd').fadeIn(1000);
		
		return false;
	});
	
	// Suchfelder unsichtbarmachen und zeigen
	$('#suchbereich').hide();
	var sucheSichtbar;
	$('#suche').click(function(){
		if (sucheSichtbar == 1){
			$('#suchbereich').hide('fast');
		} else {
			$('#suchbereich').show('fast');
		}
		sucheSichtbar = !sucheSichtbar;
		return false;
	});
});

// Bilder ausblenden, wenn diese nicht in der richtige Kategorie sind
// das ist noch gar nicht gut programmiert und macht noch nicht richtig Sinn - da müssen PROFIS dran!!!!
function Bilderausblenden(clicktext){
	if (clicktext == 'Fotodesign'){
		var ausblenden_1 = '.bilderGalerie .id';
		var ausblenden_2 = '.bilderGalerie .kd';
	} else if (clicktext == 'Industriedesign'){
		var ausblenden_1 = '.bilderGalerie .fd';
		var ausblenden_2 = '.bilderGalerie .kd';
	} else if (clicktext == 'Kommunikationsdesign'){
		var ausblenden_1 = '.bilderGalerie .fd';
		var ausblenden_2 = '.bilderGalerie .id';
	}
	
	$(ausblenden_1).fadeOut(1000);
	$(ausblenden_2).fadeOut(1000);
}

// Bilder ausblenden, wenn diese nicht in der richtige Kategorie sind
function Bildereinblenden(clicktext){
	if (clicktext == 'Fotodesign'){
		var einblenden_1 = '.bilderGalerie .id';
		var einblenden_2 = '.bilderGalerie .kd';
	} else if (clicktext == 'Industriedesign'){
		var einblenden_1 = '.bilderGalerie .fd';
		var einblenden_2 = '.bilderGalerie .kd';
	} else if (clicktext == 'Kommunikationsdesign'){
		var einblenden_1 = '.bilderGalerie .fd';
		var einblenden_2 = '.bilderGalerie .id';
	}
	
	$(einblenden_1).fadeIn(1000);
	$(einblenden_2).fadeIn(1000);
}

// Filter-Auswahlliste ein-/ausblenden
function Filtersichtbarkeit(wie){
	if(wie == 'unsichtbar'){
		$('#filter')
			.slideUp('slow')
			.removeClass('offen');
	} else {
		$('#filter')
			.addClass('offen')
			.slideDown('slow');
	}
}

// Öffnen und Schliessen des Nav und Filter-Menues
$(function(){
	
	EinAusblenden('nav');
	
	$('#navMenueOeffnen').click(function(){
		$('nav').show('fast');
	});
	
	$('#navMenueSchliessen').click(function(){
		$('nav').hide('fast');
	});
	
	EinAusblenden('#filter');
	
	$('#FilterOeffnen').click(function(){
		$('#filter').show('fast');
	});
	
	$('#FilterSchliessen').click(function(){
		$('#filter').hide('fast');
	});
});

// Blendet Navigation und Filter ein/aus
function EinAusblenden(ele){
	if (document.documentElement.clientWidth < 815) {
		$(ele).hide();
	} else {
		$(ele).show();
	}
}

$(window).resize(function() {
    EinAusblenden('nav');
    EinAusblenden('#filter');
});