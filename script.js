

// ===== PARTICLE BACKGROUND =====
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    const colors = ['#1565c0', '#ffc107', '#961a1aff'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            color: colors[i % colors.length]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections
            particles.forEach((particle2, j) => {
                if (i === j) return;
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.strokeStyle = `rgba(21, 101, 192, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();

// ===== TILT EFFECT ON CARDS =====
(function initTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .service-card .card, .project-card .card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
})();

// ===== PARALLAX EFFECT =====
(function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero gradients
        const gradient1 = document.querySelector('.hero-gradient-1');
        const gradient2 = document.querySelector('.hero-gradient-2');
        
        if (gradient1) gradient1.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (gradient2) gradient2.style.transform = `translateY(${scrolled * 0.3}px)`;
        
        // Parallax for floating icons
        const floatingIcons = document.querySelectorAll('.icon-box');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.2 + (index * 0.1);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
})();

// ===== NAVIGATION =====
(function initNavigation() {
    const nav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ===== TYPING ANIMATION =====
(function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const fullText = 'Building the Future of IT';
    let currentIndex = 0;
    
    function type() {
        if (currentIndex < fullText.length) {
            typingText.textContent = fullText.slice(0, currentIndex + 1);
            currentIndex++;
            setTimeout(type, 80);
        }
    }
    
    type();
})();

// ===== ENHANCED SCROLL ANIMATIONS =====
(function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right');
    animatedElements.forEach(el => observer.observe(el));
})();

// ===== MAGNETIC BUTTONS =====
(function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
})();

// ===== RIPPLE EFFECT ON CLICK =====
(function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
})();

// ===== CONTACT FORM =====
(function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }, 1500);
    });
})();

// ===== SCROLL TO TOP BUTTON =====
(function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

// ===== STATS COUNTER ANIMATION =====
(function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
})();

// ===== CURRENT YEAR IN FOOTER =====
(function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
})();

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', () => {
    console.log('DevScript Nepal website loaded successfully! 🚀');
    
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
});




const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerIcon = document.getElementById("hamburger-icon");
const navList = document.getElementById("navList");
const navLinks = document.querySelectorAll(".nav-link");

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navList.classList.toggle("active", isMenuOpen);
    hamburgerIcon.textContent = isMenuOpen ? "✕" : "☰";
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
}

// Hamburger click
hamburgerBtn.addEventListener("click", toggleMenu);

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        if (isMenuOpen) toggleMenu();
    });
});

// Click outside to close
document.addEventListener("click", (e) => {
    if (!navList.contains(e.target) && !hamburgerBtn.contains(e.target) && isMenuOpen) {
        toggleMenu();
    }
});

// ESC key to close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) toggleMenu();
});