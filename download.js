document.addEventListener('DOMContentLoaded', () => {
    // URL se video ka URL aur Title nikalo
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('url');
    const videoTitle = urlParams.get('title');

    const titleElement = document.getElementById('video-title');
    const videoPreview = document.getElementById('download-video-preview');
    const downloadButton = document.getElementById('final-download-btn');

    if (videoUrl) {
        // Page par title set karo
        titleElement.textContent = videoTitle || 'Your Video';

        // Video preview ka source set karo
        videoPreview.src = videoUrl;

        // Final download button ka link set karo
        downloadButton.href = videoUrl;
    } else {
        titleElement.textContent = "Error: Video not found!";
        videoPreview.style.display = 'none';
        downloadButton.style.display = 'none';
    }
});