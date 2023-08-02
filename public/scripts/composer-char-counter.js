$(document).ready(function () {
  const maxCount = 140;
  const minCount = 0;

  $('.new-tweet textarea').on('input', function () {
    let textLength = $(this).val().length;
    let remainLength = maxCount - textLength;

    $(this).closest('.new-tweet').find('.counter').text(remainLength);

    if (remainLength < 0) {
      $(this).closest('.new-tweet').find('.counter').addClass('counter-over');
    } else {
      $(this)
        .closest('.new-tweet')
        .find('.counter')
        .removeClass('counter-over');
    }
  });
});
