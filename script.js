// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Stop observing once element has appeared
            observer.unobserve(entry.target);
            
            // After the entrance animation finishes, clean up the delay classes
            // so that hover animations are fast and not delayed!
            setTimeout(() => {
                entry.target.classList.remove('delay-1', 'delay-2', 'delay-3');
                // We add a utility class to override any remaining slow transitions from .hidden
                entry.target.classList.add('fast-transition');
            }, 1000); // 1000ms is enough time for the entrance animation + delay to finish
        }
    });
}, observerOptions);

// Select all elements to be animated
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Form handling
    const connectForm = document.getElementById('connectForm');
    const formStatus = document.getElementById('formStatus');

    if (connectForm) {
        connectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceType = document.getElementById('serviceType').value;
            const message = document.getElementById('message').value.trim();
            
            // Clear any previous status
            formStatus.style.color = '#ef4444'; // Red for errors
            formStatus.textContent = '';

            // 1. Anti-Phishing / URL blocking (Prevent Links)
            // This prevents attackers from sending spam links via your form
            const urlPattern = /(https?:\/\/|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/|$))/i;
            if (urlPattern.test(message) || urlPattern.test(name)) {
                formStatus.textContent = 'Security Alert: Links and URLs are not allowed in the message for security reasons.';
                return;
            }

            // 2. Prevent incredibly long inputs (Buffer/Spam flood protection)
            if (message.length > 500) {
                formStatus.textContent = 'Message is too long. Please keep it under 500 characters.';
                return;
            }
            if (name.length > 100) {
                formStatus.textContent = 'Name is too long.';
                return;
            }

            // 3. Strict Phone Validation (Only allow numbers, spaces, plus, hyphens)
            const phonePattern = /^[+\d\s-]{7,20}$/;
            if (!phonePattern.test(phone)) {
                formStatus.textContent = 'Please enter a valid phone number (digits, +, - only).';
                return;
            }

            // 4. Basic XSS / Malicious Character Detection
            const xssPattern = /[<>]/;
            if (xssPattern.test(name) || xssPattern.test(message)) {
                formStatus.textContent = 'Security Alert: Invalid characters (<, >) are not allowed.';
                return;
            }
            
            formStatus.style.color = '#10b981'; // Green for success
            formStatus.textContent = 'Message validated. Redirecting to WhatsApp...';

            // 5. URL Encoding (Sanitize parameters so attackers cannot break the WhatsApp URL structure)
            const safeName = encodeURIComponent(name);
            const safeEmail = encodeURIComponent(email);
            const safePhone = encodeURIComponent(phone);
            const safeServiceType = encodeURIComponent(serviceType);
            const safeMessage = encodeURIComponent(message);
            
            const text = `Hello FixFlow!%0A%0A*Name:* ${safeName}%0A*Email:* ${safeEmail}%0A*Phone:* ${safePhone}%0A*Service Required:* ${safeServiceType}%0A*Message:* ${safeMessage}`;
            const whatsappUrl = `https://wa.me/966531250719?text=${text}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                connectForm.reset();
                formStatus.textContent = '';
            }, 800);
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });
        
        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            });
        });
    }
});
