jQuery(function ($) {
  "use strict";
  $('a[href^="#"]').click(function($event){
    $event.preventDefault();
    var hash=$(this).attr('href');
    if(history.pushState) {
      history.pushState(null, null, hash);
    }
    else {
      location.hash = hash;
    }
    $("body, html").animate({
      scrollTop: $(hash).offset().top - 80
    }, 600);
  });
  if(location.hash){
    $("body, html").animate({
      scrollTop: $(location.hash).offset().top - 80
    }, 600);
  }
});