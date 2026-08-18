document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Premium Ambient Background
    const bgEffects = document.querySelector('.bg-effects');
    if (bgEffects) {
        // Inject Futuristic Grid
        const grid = document.createElement('div');
        grid.classList.add('futuristic-grid');
        bgEffects.appendChild(grid);

        // Inject Ambient Orbs (Reduced to 3 for performance)
        for(let i=1; i<=3; i++) {
            const orb = document.createElement('div');
            orb.classList.add('ambient-orb', `orb-${i}`);
            bgEffects.appendChild(orb);
        }

        // Inject SVG Light Trails
        const svgTrails = document.createElement('div');
        svgTrails.classList.add('light-trails');
        svgTrails.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,20 50,50 T100,50" class="trail trail-1"></path>
                <path d="M0,80 Q30,100 60,60 T100,30" class="trail trail-2"></path>
                <path d="M-20,20 Q40,-20 80,40 T120,80" class="trail trail-3"></path>
            </svg>
        `;
        bgEffects.appendChild(svgTrails);

        // Generate Tiny Particles (Responsive count)
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 8 : 20; // 8 mobile, 20 desktop
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Premium tiny particles
            const size = Math.random() * 3 + 1.5; 
            const left = Math.random() * 100; 
            const delay = Math.random() * 20; 
            const duration = Math.random() * 12 + 10; 
            const maxOpacity = Math.random() * 0.6 + 0.3; 
            const twinkleDelay = Math.random() * 5; 
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}vw`;
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite, twinkleParticle 3s ease-in-out ${twinkleDelay}s infinite alternate`;
            particle.style.setProperty('--max-opacity', maxOpacity);
            
            bgEffects.appendChild(particle);
        }

        // Mouse Parallax Effect (Throttled with requestAnimationFrame)
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!isMobile && !prefersReducedMotion) {
            let rafId = null;
            let targetX = 0, targetY = 0;
            const orbs = document.querySelectorAll('.ambient-orb');
            
            document.addEventListener('mousemove', (e) => {
                targetX = e.clientX / window.innerWidth - 0.5;
                targetY = e.clientY / window.innerHeight - 0.5;
                
                if (!rafId) {
                    rafId = requestAnimationFrame(updateParallax);
                }
            });
            
            function updateParallax() {
                grid.style.transform = `rotateX(60deg) translate3d(${targetX * 20}px, ${targetY * 20}px, 0)`;
                
                orbs.forEach((orb, index) => {
                    const depth = (index + 1) * 30;
                    orb.style.transform = `translate3d(${targetX * -depth}px, ${targetY * -depth}px, 0)`;
                });
                
                rafId = null;
            }
        }
    }

    // 2. Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Handle .pmm-close button
        const pmmClose = document.querySelector('.pmm-close');
        if (pmmClose) {
            pmmClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Handle link clicks inside .pmm-links to auto-close
        const pmmLinks = document.querySelectorAll('.pmm-link-item');
        pmmLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // 4. Fade Up Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 5. Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length > 0 && portfolioCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Testimonial Carousel
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                updateCarousel();
            });
        }

        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000);
    }
    
    // 7. Pause Hero Animations Offscreen
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    heroVisual.style.setProperty('--play-state', 'paused');
                } else {
                    heroVisual.style.setProperty('--play-state', 'running');
                }
            });
        }, { threshold: 0 });
        observer.observe(heroVisual);
    }
});
