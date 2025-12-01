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

// ===== EMAILJS CONFIGURATION =====
// Remplacez ces valeurs par vos propres identifiants EmailJS
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // À remplacer par votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // À remplacer par votre Template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // À remplacer par votre Public Key

// Initialiser EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ===== FORM HANDLING WITH EMAILJS =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'gic.coop.ca@gmail.com' // Votre adresse email de réception
        };
        
        // Validation simple
        if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
            showMessage('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(templateParams.from_email)) {
            showMessage('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Afficher l'état de chargement
        setLoadingState(true);
        
        try {
            // Envoyer l'email via EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            if (response.status === 200) {
                showMessage('Message envoyé avec succès ! Nous vous contacterons bientôt.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            showMessage('Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
}

// Fonction pour afficher les messages
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Style selon le type
    if (type === 'success') {
        formMessage.style.backgroundColor = '#d1fae5';
        formMessage.style.color = '#065f46';
        formMessage.style.border = '1px solid #a7f3d0';
    } else {
        formMessage.style.backgroundColor = '#fee2e2';
        formMessage.style.color = '#991b1b';
        formMessage.style.border = '1px solid #fca5a5';
    }
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Fonction pour gérer l'état de chargement
function setLoadingState(loading) {
    if (loading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

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

// Liste des images à charger depuis le dossier images/produit
// Vous pouvez ajouter vos propres images ici ou elles seront détectées automatiquement
const productImages = [
    'images/produit/image1.jpg',
    'images/produit/image2.jpg',
    'images/produit/image3.jpg',
    'images/produit/image4.jpg',
    'images/produit/image5.jpg',
    'images/produit/image6.jpg',
    'images/produit/image7.jpg',
    'images/produit/image8.jpg',
    'images/produit/image9.jpg',
    'images/produit/image10.jpg',
];

// Fonction pour charger les images de la galerie
function loadGalleryImages() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    let loadedImages = 0;
    let failedImages = 0;
    let totalImages = productImages.length;

    // Essayer de charger les images depuis le dossier produit
    productImages.forEach((imagePath, index) => {
        const img = new Image();
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        img.src = imagePath;
        img.alt = `Produit ${index + 1}`;
        img.loading = 'lazy';
        
        img.onload = () => {
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
            loadedImages++;
            checkGalleryState();
        };
        
        img.onerror = () => {
            failedImages++;
            checkGalleryState();
        };
    });

    function checkGalleryState() {
        // Si aucune image n'a été chargée après toutes les tentatives, afficher le message vide
        if (loadedImages === 0 && failedImages === totalImages) {
            galleryGrid.style.display = 'none';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'block';
            }
        } else if (loadedImages > 0) {
            galleryGrid.style.display = 'grid';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'none';
            }
        }
    }

    // Vérifier après un délai si aucune image n'a été chargée
    setTimeout(() => {
        if (loadedImages === 0) {
            galleryGrid.style.display = 'none';
            if (galleryEmpty) {
                galleryEmpty.style.display = 'block';
            }
        }
    }, 1500);
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