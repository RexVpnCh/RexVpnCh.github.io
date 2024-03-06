window.onload = function() {
  var videoPlayer = new Plyr('#video-player', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
  });
  var videoUrlInput = document.getElementById('video-url-input');
  var videoNameInput = document.getElementById('video-name-input');
  var loadVideoButton = document.getElementById('load-video-button');
  var historyList = document.getElementById('history-list');
  var clearHistoryButton = document.getElementById('clear-history-button');

  loadVideoButton.addEventListener('click', function() {
    var videoUrl = videoUrlInput.value;
    var videoName = videoNameInput.value;
    if (videoUrl) {
      loadVideo(videoUrl, videoName);
    }
  });

  clearHistoryButton.addEventListener('click', function() {
    clearHistory();
  });

  function loadVideo(url, name) {
    videoPlayer.source = {
      type: 'video',
      sources: [
        {
          src: url,
          type: 'video/mp4'
        }
      ]
    };
    addHistoryItem(url, name);
    videoPlayer.play();
  }

  function addHistoryItem(url, name) {
    var existingItem = findHistoryItem(url);
    if (existingItem) {
      existingItem.textContent = name ? name : url;
    } else {
      var listItem = document.createElement('li');
      listItem.textContent = name ? name : url;
      listItem.dataset.videoUrl = url;
      listItem.addEventListener('click', function() {
        if (!this.dataset.played) {
          loadVideo(this.dataset.videoUrl, listItem.textContent);
          this.dataset.played = true;
        }
      });
      historyList.appendChild(listItem);
    }
    saveHistory();
  }

  function findHistoryItem(url) {
    var items = historyList.getElementsByTagName('li');
    for (var i = 0; i < items.length; i++) {
      if (items[i].dataset.videoUrl === url) {
        return items[i];
      }
    }
    return null;
  }

  function saveHistory() {
    var historyItems = Array.from(historyList.children).map(function(item) {
      return {
        url: item.dataset.videoUrl,
        name: item.textContent,
        played: item.dataset.played
      };
    });
    localStorage.setItem('videoHistory', JSON.stringify(historyItems));
  }

  function retrieveHistory() {
    var savedHistory = localStorage.getItem('videoHistory');
    if (savedHistory) {
      var historyItems = JSON.parse(savedHistory);
      historyItems.forEach(function(item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.dataset.videoUrl = item.url;
        if (item.played) {
          listItem.dataset.played = true;
        }
        listItem.addEventListener('click', function() {
          if (!this.dataset.played) {
            loadVideo(this.dataset.videoUrl, listItem.textContent);
            this.dataset.played = true;
          }
        });
        historyList.appendChild(listItem);
      });
    }
  }

  function clearHistory() {
    historyList.innerHTML = '';
    localStorage.removeItem('videoHistory');
  }

  retrieveHistory();
};