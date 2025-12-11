// ===== NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== PRODUCT FILTERING =====
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .product-card, .service-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ===== HERO STATS COUNTER =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
};

// Animate counters when hero section is visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (target > 0) {
                    stat.textContent = '0';
                    animateCounter(stat, target);
                }
            });
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

// Le bouton WhatsApp est maintenant un simple lien HTML, aucun JavaScript nécessaire

// ===== NEWSLETTER SUBSCRIPTION =====
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (!email) {
            alert('Veuillez entrer votre adresse email');
            return;
        }
        
        const button = newsletterForm.querySelector('button');
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Merci pour votre inscription à notre newsletter !');
            newsletterForm.reset();
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 1500);
    });
}

// ===== PRODUCT CARD HOVER EFFECTS =====
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===== IMAGE LOADING HANDLER =====
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        // Handle successful load
        img.onload = function() {
            this.style.opacity = '1';
            // Remove loading text if exists
            const loadingText = this.parentElement.querySelector('.loading-text');
            if (loadingText) {
                loadingText.remove();
            }
        };
        
        // Handle load error
        img.onerror = function() {
            console.error('Erreur de chargement de l\'image:', this.src);
            this.style.display = 'none';
            
            // Add error placeholder
            const errorDiv = document.createElement('div');
            errorDiv.className = 'image-error';
            errorDiv.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    background: #f3f4f6;
                    color: #6b7280;
                    font-size: 0.875rem;
                ">
                    <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <span>Image non disponible</span>
                </div>
            `;
            this.parentElement.appendChild(errorDiv);
        };
        
        // Force load if already cached
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image loading
handleImageLoad();

// ===== MOBILE MENU TOGGLE ANIMATION =====
navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PHOTO GALLERY MODAL =====
const photoGalleryModal = document.getElementById('photo-gallery-modal');
const btnDecouvrir = document.getElementById('btn-decouvrir');
const btnEnSavoirPlus = document.getElementById('btn-en-savoir-plus');
const closeGalleryBtn = document.getElementById('close-gallery');
const galleryGrid = document.getElementById('gallery-grid');
const galleryEmpty = document.getElementById('gallery-empty');

// Liste des extensions d'images supportées
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
// Liste des extensions de vidéos supportées
const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];

// Liste des fichiers produits (images et vidéos) à charger depuis le dossier produits
const productFiles = [
    'produits/poisson.jpg',
    'produits/lapin1.mp4',
    'produits/porc.mp4',
    'produits/poule.mp4',
    'produits/poisson video.mp4',
];

// Fonction pour vérifier si un fichier est une vidéo
function isVideoFile(filePath) {
    const lowerPath = filePath.toLowerCase();
    return videoExtensions.some(ext => lowerPath.endsWith(ext));
}

// Fonction pour charger les images et vidéos de la galerie
function loadGalleryImages() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    let loadedItems = 0;
    let failedItems = 0;
    let totalItems = productFiles.length;

    // Charger les fichiers (images et vidéos) depuis le dossier produits
    productFiles.forEach((filePath, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        if (isVideoFile(filePath)) {
            // Créer un élément vidéo
            const video = document.createElement('video');
            video.src = filePath;
            video.controls = true;
            video.muted = false;
            video.loop = false;
            video.preload = 'metadata';
            video.className = 'gallery-video';
            
            // Ajouter un indicateur vidéo
            const videoBadge = document.createElement('div');
            videoBadge.className = 'video-badge';
            videoBadge.innerHTML = '<i class="fas fa-play-circle"></i> Vidéo';
            
            // Limiter la lecture à 10 secondes maximum
            const MAX_VIDEO_TIME = 10; // 10 secondes
            
            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0;
            });
            
            // Surveiller le temps de lecture et arrêter à 10 secondes
            video.addEventListener('timeupdate', () => {
                if (video.currentTime >= MAX_VIDEO_TIME) {
                    video.pause();
                    video.currentTime = MAX_VIDEO_TIME;
                }
            });
            
            // Vérifier avant de jouer
            video.addEventListener('play', () => {
                if (video.currentTime >= MAX_VIDEO_TIME) {
                    video.pause();
                    video.currentTime = MAX_VIDEO_TIME;
                }
            });
            
            // Empêcher de dépasser 10 secondes même si l'utilisateur fait glisser la barre de progression
            video.addEventListener('seeked', () => {
                if (video.currentTime > MAX_VIDEO_TIME) {
                    video.currentTime = MAX_VIDEO_TIME;
                    video.pause();
                }
            });
            
            // Empêcher de chercher au-delà de 10 secondes
            video.addEventListener('seeking', () => {
                if (video.currentTime > MAX_VIDEO_TIME) {
                    video.currentTime = MAX_VIDEO_TIME;
                }
            });
            
            video.onloadeddata = () => {
                galleryItem.appendChild(video);
                galleryItem.appendChild(videoBadge);
                galleryGrid.appendChild(galleryItem);
                loadedItems++;
                checkGalleryState();
            };
            
            video.onerror = () => {
                failedItems++;
                checkGalleryState();
            };
            
        } else {
            // Créer un élément image
            const img = new Image();
            img.src = filePath;
            img.alt = `Produit ${index + 1}`;
            img.loading = 'lazy';
            img.className = 'gallery-image';
            
            img.onload = () => {
                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
                loadedItems++;
                checkGalleryState();
            };
            
            img.onerror = () => {
                failedItems++;
                checkGalleryState();
            };
        }
    });

    function checkGalleryState() {
        // Si aucun fichier n'a été chargé après toutes les tentatives, afficher le message vide
        if (loadedItems === 0 && failedItems === totalItems) {
            galleryGrid.style.display = 'none';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'block';
            }
        } else if (loadedItems > 0) {
            galleryGrid.style.display = 'grid';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'none';
            }
        }
    }

    // Vérifier après un délai si aucun fichier n'a été chargé
    setTimeout(() => {
        if (loadedItems === 0) {
            galleryGrid.style.display = 'none';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'block';
            }
        }
    }, 2000);
}

// Ouvrir la galerie
function openGallery() {
    photoGalleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadGalleryImages();
}

// Fermer la galerie
function closeGallery() {
    photoGalleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners pour les boutons
if (btnDecouvrir) {
    btnDecouvrir.addEventListener('click', openGallery);
}

if (btnEnSavoirPlus) {
    btnEnSavoirPlus.addEventListener('click', () => {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', closeGallery);
}

// Fermer la galerie en cliquant sur l'overlay
if (photoGalleryModal) {
    const overlay = photoGalleryModal.querySelector('.photo-gallery-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeGallery);
    }

    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && photoGalleryModal.classList.contains('active')) {
            closeGallery();
        }
    });
}

// ===== INITIALIZE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Add stagger animation to product cards
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);