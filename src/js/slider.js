$(document).ready(function() {
  $('.slick-slide, .img-holder, .slick-track').height($(window).height());
  $('#slickcontent').slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      speed: 1000,
      dots: false,
      prevArrow: false,
      nextArrow: false
  });
  $('#open-slideshow').click(function () {
    var eventCode = $('#eventcode').val();
    if(eventCode) {
      window.location.href = '/' + eventCode;
    }
  });


  $(window).resize(function() {
    $('.slick-slide, .img-holder, .slick-track').height($(window).height());
  });
});
