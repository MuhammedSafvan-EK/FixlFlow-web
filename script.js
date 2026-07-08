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
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const serviceType = document.getElementById('serviceType').value;
            const message = document.getElementById('message').value;
            
            const text = `Hello FixFlow!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Service Required:* ${serviceType}%0A*Message:* ${message}`;
            const whatsappUrl = `https://wa.me/966531250719?text=${text}`;
            
            window.open(whatsappUrl, '_blank');
            connectForm.reset();
        });
    }
});
