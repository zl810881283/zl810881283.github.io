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

  var titles = [
    'Za is so cool, right?',
    'Chuan plans to be a Full Stack developer',
    'Chuan dreams to be a CTO',
    'Chuan is now fighting with AngularJS',
    'Chuan loves animals and traveling',
    'Chuan has girlfriend now, so not available :D',
    'Cool Boy',
  ];
  var counter = 0;
  var $title = $("#persol-title");
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