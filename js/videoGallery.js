// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    function createVideoCard(video) {
        const thumbnailUrl = video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
        
        return `
            <article class="video-card" itemscope itemtype="http://schema.org/VideoObject">
                <div class="video-thumbnail">
                    <img src="${thumbnailUrl}" alt="${video.title}" loading="lazy" itemprop="thumbnail">
                    <button class="play-btn" aria-label="Play video">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                </div>
                <div class="video-info">
                    <h3 class="video-title" itemprop="name">${video.title}</h3>
                    <p class="video-description" itemprop="description">${video.description || 'Experience perfect lip synchronization in this anime clip.'}</p>
                    <div class="video-meta">
                        <span class="meta-item" title="Duration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                            <meta itemprop="duration" content="PT${video.duration || '0:30'}M">
                            ${video.duration || '0:30'}
                        </span>
                        <span class="meta-item" title="Views">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <meta itemprop="interactionCount" content="${video.views || 1000} views">
                            ${video.views || '1K'}
                        </span>
                    </div>
                </div>
                <div class="video-actions">
                    <a href="../download.html?url=${encodeURIComponent(video.videoUrl)}&title=${encodeURIComponent(video.title)}" 
                       class="download-btn" 
                       title="Download this video"
                       itemprop="contentUrl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
                        </svg>
                        Download
                    </a>
                    <button class="preview-btn" title="Preview video">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Preview
                    </button>
                </div>
            </article>
        `;
    }

    function renderGallery(videos) {
        const gallery = document.getElementById('video-gallery');
        const loader = document.getElementById('loader');

        if (!gallery || !loader) return;

        gallery.innerHTML = videos.map(video => createVideoCard(video)).join('');
        gallery.classList.remove('hidden');
        loader.style.display = 'none';

        // Add click handlers for preview buttons
        gallery.querySelectorAll('.preview-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => showVideoPreview(videos[index].videoUrl));
        });
    }

    function showVideoPreview(videoUrl) {
        const popup = document.getElementById('video-popup');
        const popupVideo = document.getElementById('popup-video');
        
        if (!popup || !popupVideo) return;

        popupVideo.src = videoUrl;
        popup.classList.add('active');

        // Handle popup close
        const closePopup = () => {
            popup.classList.remove('active');
            popupVideo.pause();
            popupVideo.src = '';
        };

        popup.querySelector('.close-btn').addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
    }

    // Initialize gallery with videos array
    if (typeof videos !== 'undefined') {
        renderGallery(videos);
    }
});