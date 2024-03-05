window.addEventListener('DOMContentLoaded', function() {
  var videoPlayer = new Plyr('#video-player');
  var loadVideoBtn = document.getElementById('load-video-btn');
  var videoUrlInput = document.getElementById('video-url');

  function streamVideo(url) {
    videoPlayer.source = {
      type: 'video',
      sources: [
        {
          src: url,
          type: 'video/mp4',
        },
      ],
    };
  }

  loadVideoBtn.addEventListener('click', function() {
    var videoUrl = videoUrlInput.value;
    streamVideo(videoUrl);
  });
});
