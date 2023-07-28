let youtubePlayer;

function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        playerVars: {
            'origin': window.location.origin, // Allow embedding from the same origin
            'rel': 0 // Disable related videos
        }
    });
}

async function connectChannel() {
    const channelId = document.getElementById('channelId').value;
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';

        if (data.items.length > 0) {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnailUrl = item.snippet.thumbnails.default.url;
                contentDiv.innerHTML += `
                    <div class="video-thumbnail" onclick="playVideo('${videoId}')">
                        <img src="${thumbnailUrl}" alt="${title}">
                        <p>${title}</p>
                    </div>`;
            });
        } else {
            contentDiv.innerHTML = '<p>No videos posted by this user.</p>';
        }
    } catch (error) {
        console.error('Error fetching video data:', error);
    }
}

function playVideo(videoId) {
    if (youtubePlayer) {
        youtubePlayer.loadVideoById(videoId);
    }
}
