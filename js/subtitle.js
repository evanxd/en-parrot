define(['jquery'], function($) {
  'use strict';

  function Subtitle(videoId) {
    this._loadSubtile(videoId);
  }

  Subtitle.prototype = {
    _subtitle: null,

    onload: function() {},

    caption: function(captionId) {
      return this._subtitle[captionId].caption;
    },

    _loadSubtile: function(videoId) {
      $.ajax({
        url: 'subtitle/' + videoId + '.json',
        dataType: 'json'
      })
      .done(function(data) {
        this._subtitle = data;
        this._adjustCaptionTime();
        this.onload();
      }.bind(this));
    },

    _adjustCaptionTime: function() {
      var subtitle = this._subtitle;
      for (var captionId in subtitle) {
        if (subtitle[captionId].caption) {
          subtitle[captionId].caption.startTime += 15000;
          subtitle[captionId].caption.duration += 1500;
        }
      }
    }
  };

  return Subtitle;
});
