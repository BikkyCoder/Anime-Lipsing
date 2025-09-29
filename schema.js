// Schema markup for the website
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Anime Lipsync",
    "description": "AI-powered anime lip synchronization videos and tools",
    "url": "https://animelipsync.com"
};

// Organization schema
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Anime Lipsync",
    "url": "https://animelipsync.com",
    "logo": "https://animelipsync.com/images/logo.png",
    "sameAs": [
        "https://www.youtube.com/animelipsync",
        "https://instagram.com/animelipsync",
        "https://twitter.com/animelipsync"
    ]
};

// Software application schema
const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anime Lipsync Generator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

// Add schemas to the page
document.addEventListener('DOMContentLoaded', function() {
    const schemaScript = document.createElement('script');
    schemaScript.type = "application/ld+json";
    
    // Determine which schema to use based on the current page
    if (window.location.pathname === '/') {
        schemaScript.textContent = JSON.stringify([websiteSchema, organizationSchema, softwareSchema]);
    } else if (window.location.pathname.includes('blog')) {
        const blogSchema = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Anime Lipsync Blog",
            "description": "Expert tips and tutorials for creating perfect anime lipsync videos"
        };
        schemaScript.textContent = JSON.stringify([blogSchema, organizationSchema]);
    } else if (window.location.pathname.includes('about')) {
        schemaScript.textContent = JSON.stringify([organizationSchema]);
    }
    
    document.head.appendChild(schemaScript);
});