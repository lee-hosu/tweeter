$(document).ready(() => {
  $(window).on('scroll resize', function () {
    if ($(this).width() < 1024 && $(this).scrollTop() > 200) {
      $('nav').css('background-color', '#4056a1');
    } else if ($(this).width() > 1024) {
      $('nav').css('background-color', '#4056a1');
    } else {
      $('nav').css('background-color', 'transparent');
    }
  });
});
