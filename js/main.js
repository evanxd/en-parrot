require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
  }
});

require(['subtitle'], function(Subtitle) {
  'use strict';
  var player = document.querySelector('#player');
  var play = document.querySelector('#play');
  var input = document.querySelector('#input');
  var stage = document.querySelector('#stage');
  var captions = document.querySelector('#captions');
  var captionId = 0;
  var videoId = '23Uuehgmd14';
  var subtitle;

  player.onready = function() {
    subtitle = new Subtitle(videoId);
    subtitle.onload = function() {
      playPartialVideo(captionId);
    };
  };

  player.onstatechange = function(e) {
    switch(e.data) {
      case player.state.PLAYING:
        setTimeout(function() {
          player.pause();
        }, subtitle.caption(captionId).duration);
        break;
    }
  };

  play.addEventListener('click', function() {
    stage.innerHTML = captionId;
    playPartialVideo(captionId);
  });

  input.addEventListener('input', function(e) {
    var content = subtitle.caption(captionId).content;

    if (e.target.value.toLowerCase() ===
        // Don't need to compare with punctuation marks.
        content.toLowerCase().replace(',', '').replace('!', '').replace('.', '')) {
      captions.innerHTML += content + '<br>';
      e.target.value = '';
      // Go to next stage.
      captionId++;
    }
  });

  function playPartialVideo(captionId) {
    var caption = subtitle.caption(captionId);
    var startTime = caption.startTime / 1000;
    player.seekTo(startTime);
    player.play();
    console.log('content: ' + caption.content);
  }
});
