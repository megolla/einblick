//@codekit-prepend "fitText.js";
//@codekit-prepend "riseToolbar.js"; 

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
	
	Filtersymbol();
	
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
		
		Filtersymbol();
		
		return false;
	});
	
	// alle Filter zurücksetzen
	$('#filterZurueckSetzen').click(function(){
		$('nav li.ausgewaehlt').removeClass('ausgewaehlt');
		
		Filtersymbol();
		
		return false;
	});
});

// Filter-Button bekommt Warnsymbol, wenn Filter aktiviert sind
function Filtersymbol(){
	if ($('nav ul ul li').hasClass('ausgewaehlt')){
		$('#filterbutton').attr({src: 'p/filter_warnung.gif'});
	} else {
		$('#filterbutton').attr({src: 'p/filter.gif'});
	}
}

$(window).load(function() {

/*
setting vom Flexslider:

animation: "slide",              //String: Select your animation type, "fade" or "slide"
slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
slideshow: true,                //Boolean: Animate slider automatically
slideshowSpeed: 3000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
animationDuration: 350,         //Integer: Set the speed of animations, in milliseconds
directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
prevText: "Previous",           //String: Set the text for the "previous" directionNav item
nextText: "Next",               //String: Set the text for the "next" directionNav item
pausePlay: false,               //Boolean: Create pause/play dynamic element
pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
playText: 'Play',               //String: Set the text for the "play" pausePlay item
randomize: false,               //Boolean: Randomize slide order
slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
pauseOnHover: true

*/
	
	$('.flexslider').flexslider({
		animation: "slide",
		animationLoop: true,
		slideshow: true,
		randomize: true,
		pauseOnHover: true,
		slideshowSpeed: 4000,
		animationDuration: 800
	});
});
