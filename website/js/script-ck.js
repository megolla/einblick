/*global jQuery *//*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/function Filtersymbol(){$("nav ul ul li").hasClass("ausgewaehlt")?$("#filterbutton").attr({src:"p/filter_warnung.gif"}):$("#filterbutton").attr({src:"p/filter.gif"})}(function(e){e.fn.fitText=function(t,n){var r=t||1,i=e.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},n);return this.each(function(){var t=e(this),n=function(){t.css("font-size",Math.max(Math.min(t.width()/(r*10),parseFloat(i.maxFontSize)),parseFloat(i.minFontSize)))};n();e(window).on("resize.fittext orientationchange.fittext",n)})}})(jQuery);$(function(){$("#abdecker").fitText(3,{minFontSize:"16px",maxFontSize:"50px"});$("#abdecker").click(function(){$(this).addClass("weg")});$("#filter").hide();$("#filterbutton").click(function(){$("#filter").hasClass("offen")?$("#filter").slideUp("slow").removeClass("offen"):$("#filter").addClass("offen").slideDown("slow")});Filtersymbol();$("nav ul ul").hide();$("nav .haupt").click(function(){$("nav ul ul").not("offen").slideUp("slow");var e=$(this).next("ul");e.hasClass("offen")?e.removeClass("offen").slideUp("slow"):e.slideDown("slow").addClass("offen");return!1});$("nav ul ul li").click(function(){$(this).hasClass("ausgewaehlt")?$(this).removeClass("ausgewaehlt"):$(this).addClass("ausgewaehlt");Filtersymbol();return!1});$("#filterZurueckSetzen").click(function(){$("nav li.ausgewaehlt").removeClass("ausgewaehlt");Filtersymbol();return!1})});