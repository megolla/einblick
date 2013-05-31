//@codekit-prepend "fitText.js";

$(function(){
	// Schrift via FitText anpassen
	$("#abdecker").fitText(3, { minFontSize: '16px', maxFontSize: '50px' });
	
	// Abdecker unsichtbar machen
	$('#abdecker').click(function(){
		$(this).addClass('weg');
	});
	
	// Filter-Sachen sollen erst mal unsichtbar sein
	$('#filter').hide();
	$('#filterbutton').click(function(){
		if ($('#filter').hasClass('offen')){
			$('#filter')
				.slideUp('slow')
				.removeClass('offen');
		} else {
			$('#filter')
				.addClass('offen')
				.slideDown('slow');
		}
	});
	
	// Filter bei Jahrgang, Studienrichtung & kategorie erst mal unsichtbar
	$('nav ul ul').hide();
	$('nav .haupt').click(function(){
	
		$('nav ul ul').not('offen').slideUp('slow');
	
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
	$('nav ul ul li').click(function(){
		if ($(this).hasClass('ausgewaehlt')){
			$(this).removeClass('ausgewaehlt');
		} else {
			$(this).addClass('ausgewaehlt');
		}
		
		return false;
	});
	
	// alle Filter zurücksetzen
	$('#filterZurueckSetzen').click(function(){
		$('nav li.ausgewaehlt').removeClass('ausgewaehlt');
		return false;
	});
});