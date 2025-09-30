// Video gallery functionality
document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const gallery = document.getElementById('video-gallery');

    try {
        // Show loader
        loader.classList.remove('hidden');
        gallery.classList.add('hidden');

        // Simulate fetching videos (replace with your actual API call)
        const videos = await fetchVideos();

        // Create video cards
        videos.forEach(video => {
            const videoCard = createVideoCard(video);
            gallery.appendChild(videoCard);
        });

        // Hide loader and show gallery
        loader.classList.add('hidden');
        gallery.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading videos:', error);
        loader.innerHTML = '<p class="error-message">Error loading videos. Please try again later.</p>';
    }
});

// Fetch videos function (replace with your actual implementation)
async function fetchVideos() {
    // This is a placeholder. Replace with your actual video data fetching logic
    const sampleVideos = [
        {
            id: 1,
            title: 'Sample Video 1',
            thumbnail: '../images/thumbnails/video1.jpg',
            url: 'path/to/video1.mp4'
        },
        // Add more sample videos as needed
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return sampleVideos;
}

// Create video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail || '../images/placeholder.jpg'}" alt="${video.title}">
            <div class="video-overlay">
                <button class="preview-btn" data-video="${video.url}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 3l14 9-14 9V3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <a href="download.html?url=${encodeURIComponent(video.url)}&title=${encodeURIComponent(video.title)}" 
               class="download-btn">Download</a>
        </div>
    `;

    // Add preview functionality
    const previewBtn = card.querySelector('.preview-btn');
    previewBtn.addEventListener('click', () => {
        const popup = document.getElementById('video-popup');
        const popupVideo = document.getElementById('popup-video');
        const closeBtn = document.querySelector('.close-btn');

        popupVideo.src = video.url;
        popup.style.display = 'flex';

        closeBtn.onclick = () => {
            popup.style.display = 'none';
            popupVideo.pause();
            popupVideo.src = '';
        };

        // Close on outside click
        popup.onclick = (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                popupVideo.pause();
                popupVideo.src = '';
            }
        };
    });

    return card;
}