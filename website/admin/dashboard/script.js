//Set the correct height
var categories = 0;
$('.side-box nav.categories ul li').each(function(i) {
  categories++;
});
$('.side-box').css('max-height', 120 + (categories * 46));

// Select item
$('.list .items .item').click(function() {

  var t = $(this);
  if (t.hasClass('active') == 0) {
    t.addClass('active');
    checkAmount();
    t.children('.checkbox').children('.check').append('<div class="fa fa-check"></div>');
  } else {
    t.removeClass('active');
    checkAmount();
    t.children('.checkbox').children('.check').children('.fa').remove();
  }
});

// check amount of selected items
function checkAmount() {
  var amount = $('.list .active').length;

  if (amount === 0) {
    $('.content .top .selected').hide();
    $('.name-box').show();
  } else {
    $('.name-box').hide();
    $('.selected #amount').text(amount);
    $('.content .top .selected').show();
  }
}