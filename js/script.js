//@codekit-prepend "fitText.js";
//@codekit-prepend "riseToolbar.js"; 

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
	if (document.documentElement.clientWidth < 1024) {
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
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
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
		$("#abdecker").fitText(3, { minFontSize: '16px', maxFontSize: '50px' });
	}
	
	// Abdecker unsichtbar machen
	$('#abdecker').click(function(){
		$(this).addClass('weg');
		
		/*
			Cookie erzeugen, das verhindert, dass jedesmal der Abdecker sichtbar wird
			momentan so eingestellt, dass Abdecker wieder auftaucht
			wenn dazwischen Browser geschlossen wurde
		*/
		createCookie('Abdecker','weggeklickt',0);
	});
	
	// Filter-Sachen sollen erst mal unsichtbar sein
	$('#filter').hide();
	$('#filterbutton').click(function(){
		if ($('#filter').hasClass('offen')){
				Filtersichtbarkeit('unsichtbar');
		} else {
			$('#filter')
				Filtersichtbarkeit('sichtbar');
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
			var clicktext = $(this).text();
			Bildereinblenden(clicktext);
		} else {
			$(this).addClass('ausgewaehlt');
			var clicktext = $(this).text();
			Bilderausblenden(clicktext);
		}
		
		// wenn Browserfensterbreite < 1024, soll Filtermenü gleich ausgeblendet werden
		if (Filterausblenden == 1){
			Filtersichtbarkeit('unsichtbar');
		}
		
		Filtersymbol();
		
		return false;
	});
	
	// alle Filter zurücksetzen
	$('#filterZurueckSetzen').click(function(){
		$('nav li.ausgewaehlt').removeClass('ausgewaehlt');
		
		$('.bilderGalerie .fd').fadeIn(1000);
		$('.bilderGalerie .id').fadeIn(1000);
		$('.bilderGalerie .kd').fadeIn(1000);
		
		Filtersymbol();
		
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

// Filter-Button bekommt Warnsymbol, wenn Filter aktiviert sind
function Filtersymbol(){
	if ($('nav ul ul li').hasClass('ausgewaehlt')){
		$('#filterbutton').attr({src: 'assets/filter_warnung.gif'});
	} else {
		$('#filterbutton').attr({src: 'assets/filter.gif'});
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
