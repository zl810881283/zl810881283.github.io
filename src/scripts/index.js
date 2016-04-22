/**
 * Created by chuandong on 15/12/17.
 */

$(function () {
  $(window).scroll(function () {
    var scrollPos = $(this).scrollTop();

    if ($(window).scrollTop() > 70) {
      $('#site-header-id').addClass('site-header-nav-scrolled');
    } else {
      $('#site-header-id').removeClass('site-header-nav-scrolled');
    }
  });


  var counter = 0;
  var $title = $("#person-title");
  
  var titles=[], temp= $title.data('person-titles').split('|');

  for(var i in temp){
    if(temp[i]){
      titles.push(temp[i])
    }
  }
  
  if ($title.length > 0 && titles.length > 0) {
    $title.html(titles[counter]);
    setInterval(function () {
      counter = (counter + 1) % titles.length;
      $title.fadeOut(1000, function () {
        $title.html(titles[counter]);
      });
      $title.fadeIn(1000);
    }, 2000);
  }
});