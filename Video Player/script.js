document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".Download-button").addEventListener("click", loadVideo);
});

function loadVideo() {
  var url = document.getElementById("video-url").value;
  var player = new Plyr("#player");

  var videoElement = document.createElement("video");

  videoElement.src = url;

  videoElement.onloadedmetadata = function () {
    if (videoElement.duration === Infinity || isNaN(videoElement.duration)) {
      document.getElementById("error").style.display = "block";
      document.querySelector(".video-player").style.display = "none";
    } else {
      player.source = {
        type: "video",
        sources: [
          {
            src: url,
            type: "video/mp4",
          },
        ],
      };

      player.on("ready", function () {
        document.getElementById("error").style.display = "none";
        document.querySelector(".video-player").style.display = "block";
      });
    }
  };
}