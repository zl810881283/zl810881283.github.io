$(function(){$(window).scroll(function(){$(this).scrollTop();$(window).scrollTop()>70?$("#site-header-id").addClass("site-header-nav-scrolled"):$("#site-header-id").removeClass("site-header-nav-scrolled")});var e=0,t=$("#person-title");if(t.length>0){var l=[],n=t.data("person-titles").split("|");for(var s in n)n[s]&&l.push(n[s]);l.length>0&&(t.html(l[e]),setInterval(function(){e=(e+1)%l.length,t.fadeOut(1e3,function(){t.html(l[e])}),t.fadeIn(1e3)},2e3))}});