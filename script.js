// Respect prefers-reduced-motion across scrolling, entrance animations, and video autoplay
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: motionQuery.matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations (skipped entirely for reduced-motion users)
if (!motionQuery.matches) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'scale(0.9)';
        category.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(category);
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Stop autoplaying videos and show their poster frame for reduced-motion users
function applyMotionPreference() {
    document.querySelectorAll('.media-frame video').forEach(video => {
        if (motionQuery.matches) {
            video.removeAttribute('autoplay');
            video.pause();
            video.load(); // resets playback so the poster frame shows
            video.controls = true;
        } else {
            video.setAttribute('autoplay', '');
            video.controls = false;
            video.play().catch(() => {});
        }
    });
}

applyMotionPreference();
motionQuery.addEventListener('change', applyMotionPreference);

// Form validation (if you add a contact form later)
// Add your form validation logic here

// Console message for recruiters
console.log('%cHey there! 👋', 'font-size: 20px; font-weight: bold; color: #B31B1B;');
console.log('%cThanks for checking out my portfolio! Feel free to reach out if you\'d like to connect.', 'font-size: 14px; color: #1C1B1A;');
console.log('%c- Danny McCance', 'font-size: 14px; font-style: italic; color: #6B6862;');
