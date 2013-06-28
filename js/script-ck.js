/*global jQuery *//*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/function browserBreite(){document.documentElement.clientWidth<815?Filterausblenden=1:Filterausblenden=0;console.log(Filterausblenden)}function createCookie(e,t,n){if(n){var r=new Date;r.setTime(r.getTime()+n*60*1e3);var i="; expires="+r.toGMTString()}else var i="";document.cookie=e+"="+t+i+"; path=/"}function readCookie(e){var t=e+"=",n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return null}function Bilderausblenden(e){if(e=="Fotodesign")var t=".bilderGalerie .id",n=".bilderGalerie .kd";else if(e=="Industriedesign")var t=".bilderGalerie .fd",n=".bilderGalerie .kd";else if(e=="Kommunikationsdesign")var t=".bilderGalerie .fd",n=".bilderGalerie .id";$(t).fadeOut(1e3);$(n).fadeOut(1e3)}function Bildereinblenden(e){if(e=="Fotodesign")var t=".bilderGalerie .id",n=".bilderGalerie .kd";else if(e=="Industriedesign")var t=".bilderGalerie .fd",n=".bilderGalerie .kd";else if(e=="Kommunikationsdesign")var t=".bilderGalerie .fd",n=".bilderGalerie .id";$(t).fadeIn(1e3);$(n).fadeIn(1e3)}function Filtersichtbarkeit(e){e=="unsichtbar"?$("#filter").slideUp("slow").removeClass("offen"):$("#filter").addClass("offen").slideDown("slow")}function EinAusblenden(e){document.documentElement.clientWidth<815?$(e).hide():$(e).show()}(function(e){e.fn.fitText=function(t,n){var r=t||1,i=e.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},n);return this.each(function(){var t=e(this),n=function(){t.css("font-size",Math.max(Math.min(t.width()/(r*10),parseFloat(i.maxFontSize)),parseFloat(i.minFontSize)))};n();e(window).on("resize.fittext orientationchange.fittext",n)})}})(jQuery);(function(e){var t=e.document;if(!location.hash&&e.addEventListener){window.scrollTo(0,1);var n=1,r=function(){return e.pageYOffset||t.compatMode==="CSS1Compat"&&t.documentElement.scrollTop||t.body.scrollTop||0},i=setInterval(function(){if(t.body){clearInterval(i);n=r();e.scrollTo(0,n===1?0:1)}},15);e.addEventListener("load",function(){setTimeout(function(){r()<20&&e.scrollTo(0,n===1?0:1)},0)})}})(this);var Abdecker_modus=readCookie("Abdecker");console.log(Abdecker_modus);var Filterausblenden;$(window).resize(function(){browserBreite()});$(function(){browserBreite();Abdecker_modus=="weggeklickt"?$("#abdecker").hide():$("#abdecker").fitText(3,{minFontSize:"16px",maxFontSize:"30px"});$("#abdecker").click(function(){$(this).addClass("weg");createCookie("Abdecker","weggeklickt",10)});$("#filter ul ul").hide();$("#filter .haupt").click(function(){$("#filter ul ul").not("offen").slideUp("slow");$(this).hasClass("offen")?$(this).removeClass("offen"):$(this).addClass("offen");var e=$(this).next("ul");e.hasClass("offen")?e.removeClass("offen").slideUp("slow"):e.slideDown("slow").addClass("offen");return!1});$("#filter ul ul li").click(function(){if($(this).hasClass("ausgewaehlt")){$(this).removeClass("ausgewaehlt");var e=$(this).text();Bildereinblenden(e)}else{$(this).addClass("ausgewaehlt");var e=$(this).text();Bilderausblenden(e)}Filterausblenden==1&&Filtersichtbarkeit("unsichtbar");return!1});$("#filterZurueckSetzen").click(function(){$("#filter li.ausgewaehlt").removeClass("ausgewaehlt");$(".bilderGalerie .fd").fadeIn(1e3);$(".bilderGalerie .id").fadeIn(1e3);$(".bilderGalerie .kd").fadeIn(1e3);return!1});$("#suchbereich").hide();var e;$("#suche").click(function(){e==1?$("#suchbereich").slideUp("fast"):$("#suchbereich").slideDown("fast");e=!e;return!1})});$(function(){EinAusblenden("nav");$("#navMenueOeffnen").click(function(){$("nav").show("fast")});$("#navMenueSchliessen").click(function(){$("nav").hide("fast")});EinAusblenden("#filter");$("#FilterOeffnen").click(function(){$("#filter").show("fast")});$("#FilterSchliessen").click(function(){$("#filter").hide("fast")})});$(window).resize(function(){EinAusblenden("nav");EinAusblenden("#filter")});