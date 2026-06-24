// Let's Drive Auction - Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadAuctions();
    setupScrollBehavior();
}

// Setup Event Listeners
function setupEventListeners() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Bid buttons
    const bidButtons = document.querySelectorAll('.btn-secondary');
    bidButtons.forEach(button => {
        button.addEventListener('click', handleBidClick);
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Browse Auctions button in hero
    const browseButton = document.querySelector('.hero .btn-primary');
    if (browseButton) {
        browseButton.addEventListener('click', function() {
            document.getElementById('auctions').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Handle Navigation Clicks
function handleNavClick(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Handle Contact Form Submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name') || e.target.querySelector('input[type="text"]').value,
        email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
        message: formData.get('message') || e.target.querySelector('textarea').value
    };

    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Thank you! We\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Handle Bid Click
function handleBidClick(e) {
    e.preventDefault();
    
    const auctionCard = e.target.closest('.auction-card');
    const vehicleName = auctionCard.querySelector('h3').textContent;
    const currentBid = auctionCard.querySelector('.current-bid').textContent;
    
    // Show modal or redirect to login/bid page
    showNotification(`Ready to bid on ${vehicleName}? Log in to continue.`, 'info');
    
    // In a real app, this would open a modal or redirect to the bidding page
    // window.location.href = '/bid/' + auctionId;
}

// Load Auctions (Simulated)
function loadAuctions() {
    // In a real application, this would fetch from the backend API
    // fetch('/api/auctions')
    //     .then(response => response.json())
    //     .then(data => populateAuctions(data))
    //     .catch(error => console.error('Error loading auctions:', error));
    
    console.log('Auctions loaded (demo mode)');
}

// Populate Auctions Grid
function populateAuctions(auctions) {
    const auctionsGrid = document.getElementById('auctions-grid');
    if (!auctionsGrid) return;

    auctionsGrid.innerHTML = auctions.map(auction => `
        <div class="auction-card">
            <img src="${auction.image}" alt="${auction.name}">
            <div class="auction-info">
                <h3>${auction.name}</h3>
                <p class="mileage">${auction.mileage} miles</p>
                <div class="auction-details">
                    <span class="current-bid">Current Bid: $${auction.currentBid.toLocaleString()}</span>
                    <span class="time-left">${auction.timeLeft} left</span>
                </div>
                <button class="btn btn-secondary">Place Bid</button>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners to new buttons
    setupEventListeners();
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        zIndex: '10000',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease'
    });

    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb';
    notification.style.backgroundColor = bgColor;
    notification.style.color = 'white';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';

    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Setup Smooth Scroll Behavior
function setupScrollBehavior() {
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}

// Utility: API Request
async function apiRequest(endpoint, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(`/api${endpoint}`, mergedOptions);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        showNotification('An error occurred. Please try again.', 'error');
        throw error;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        apiRequest,
        loadAuctions,
        populateAuctions
    };
}
