$(document).ready(function() {
  $('#slickcontent').slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: false,
      speed: 1000,
      dots: false,
      prevArrow: false,
      nextArrow: false,
      lazyLoad: 'ondemand',
      pauseOnHover: false,
      pauseOnFocue: false
  });
  $('#open-slideshow').click(function () {
    var eventCode = $('#eventcode').val();
    if(eventCode) {
      window.location.href = '/' + eventCode;
    }
  });
  $('input').keypress(function (e) {
    if (e.which == 13) {
      var eventCode = $('#eventcode').val();
      if(eventCode) {
        window.location.href = '/' + eventCode;
      }
      return false;    //<---- Add this line
    }
  });

  var socket = io();
  setInterval(pollForNewImages, 180000);

  socket.on('newdata', function(data) {
    var numberOfImages = $('.slick-slide').length;
    var imageUrlOfFirstSlide = $('#firstimage').val();
    if(imageUrlOfFirstSlide !== data.images[0].imageUrl) {
      window.location.reload();
    }
  });

  function pollForNewImages() {
    var eventCode = $('#eventcode').val();
    if(eventCode) {
      socket.emit('poll', eventCode);
    }
  };
  pollForNewImages();
});
