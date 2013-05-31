/*global jQuery *//*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/(function(e){e.fn.fitText=function(t,n){var r=t||1,i=e.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},n);return this.each(function(){var t=e(this),n=function(){t.css("font-size",Math.max(Math.min(t.width()/(r*10),parseFloat(i.maxFontSize)),parseFloat(i.minFontSize)))};n();e(window).on("resize.fittext orientationchange.fittext",n)})}})(jQuery);$(function(){$("#abdecker").fitText(3,{minFontSize:"16px",maxFontSize:"50px"});$("#abdecker").click(function(){$(this).addClass("weg")});$("#filter div").hide();$("#filterbutton").click(function(){if($("#filter").hasClass("offen")){$("#filter div").fadeOut("fast");$("#filter").removeClass("offen")}else{$("#filter").addClass("offen");$("#filter div").slideDown("slow")}});$("nav ul ul").hide();$("nav .haupt").click(function(){$("nav ul ul").not("offen").slideUp("slow");var e=$(this).next("ul");e.hasClass("offen")?e.removeClass("offen").slideUp("slow"):e.slideDown("slow").addClass("offen");return!1});$("nav ul ul li").click(function(){$(this).hasClass("ausgewaehlt")?$(this).removeClass("ausgewaehlt"):$(this).addClass("ausgewaehlt");return!1});$("#filterZurueckSetzen").click(function(){$("nav li.ausgewaehlt").removeClass("ausgewaehlt");return!1})});