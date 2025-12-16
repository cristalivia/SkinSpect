// Mobile menu toggle functionality
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');

    if (carouselTrack && carouselPrev && carouselNext) {
        let currentIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        function getSlidesToShow() {
            if (window.innerWidth >= 768) return 5;
            if (window.innerWidth >= 480) return 3;
            return 2;
        }

        function updateCarousel() {
            if (slides.length === 0) return;
            
            const slidesToShow = getSlidesToShow();
            const maxIndex = Math.max(0, totalSlides - slidesToShow);
            
            // Calculate translateX based on slide width + gap
            if (slides[0]) {
                const slideWidth = slides[0].offsetWidth;
                const gap = 24; // 1.5rem = 24px
                const translateX = -currentIndex * (slideWidth + gap);
                carouselTrack.style.transform = `translateX(${translateX}px)`;
            }
            
            // Update button states
            carouselPrev.disabled = currentIndex === 0;
            carouselNext.disabled = currentIndex >= maxIndex;
        }

        carouselPrev.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        carouselNext.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const slidesToShow = getSlidesToShow();
            const maxIndex = Math.max(0, totalSlides - slidesToShow);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const slidesToShow = getSlidesToShow();
                const maxIndex = Math.max(0, totalSlides - slidesToShow);
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                updateCarousel();
            }, 250);
        });

        // Initialize after a short delay to ensure DOM is fully rendered
        setTimeout(() => {
            updateCarousel();
        }, 200);
    }
});

