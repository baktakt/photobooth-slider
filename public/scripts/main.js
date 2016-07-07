$(document).ready(function() {
  $('#slickcontent').slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      speed: 1000,
      dots: false,
      prevArrow: false,
      nextArrow: false,
      lazyLoad: 'ondemand'
  });
  $('#open-slideshow').click(function () {
    var eventCode = $('#eventcode').val();
    if(eventCode) {
      window.location.href = '/' + eventCode;
    }
  });

  var socket = io();
  setInterval(pollForNewImages, 180000);

  socket.on('newdata', function(data) {
    var numberOfImages = $('.slick-slide').length;
    if(numberOfImages < data.images.length) {
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
