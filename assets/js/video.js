var $video = document.getElementById('videoplayerhtml');

$(window).scroll(function(e){
  console.log(e);
  var speed = 90;
  var scroll = $(this).scrollTop() / speed;
  $video.currentTime = scroll;
});