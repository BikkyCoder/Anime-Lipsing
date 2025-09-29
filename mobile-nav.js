document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    menuToggle.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (body.classList.contains('menu-open') && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            body.classList.remove('menu-open');
        }
    });
});