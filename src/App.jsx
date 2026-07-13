import { useEffect, useRef, useState } from 'react'
import './index.css'

function App() {
  const [formStatus, setFormStatus] = useState({ text: '', color: '' })
  
  useEffect(() => {
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
          observer.unobserve(entry.target);
          setTimeout(() => {
            entry.target.classList.remove('delay-1', 'delay-2', 'delay-3');
            entry.target.classList.add('fast-transition');
          }, 1000);
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const serviceType = formData.get('serviceType');
    const message = formData.get('message').trim();

    setFormStatus({ text: '', color: '#ef4444' });

    const urlPattern = /(https?:\/\/|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/|$))/i;
    if (urlPattern.test(message) || urlPattern.test(name)) {
      setFormStatus({ text: 'Security Alert: Links and URLs are not allowed in the message for security reasons.', color: '#ef4444' });
      return;
    }

    if (message.length > 500) {
      setFormStatus({ text: 'Message is too long. Please keep it under 500 characters.', color: '#ef4444' });
      return;
    }
    if (name.length > 100) {
      setFormStatus({ text: 'Name is too long.', color: '#ef4444' });
      return;
    }

    const phonePattern = /^[+\d\s-]{7,20}$/;
    if (!phonePattern.test(phone)) {
      setFormStatus({ text: 'Please enter a valid phone number (digits, +, - only).', color: '#ef4444' });
      return;
    }

    const xssPattern = /[<>]/;
    if (xssPattern.test(name) || xssPattern.test(message)) {
      setFormStatus({ text: 'Security Alert: Invalid characters (<, >) are not allowed.', color: '#ef4444' });
      return;
    }

    setFormStatus({ text: 'Message validated. Redirecting to WhatsApp...', color: '#10b981' });

    const safeName = encodeURIComponent(name);
    const safeEmail = encodeURIComponent(email);
    const safePhone = encodeURIComponent(phone);
    const safeServiceType = encodeURIComponent(serviceType);
    const safeMessage = encodeURIComponent(message);

    const text = `Hello FixFlow!%0A%0A*Name:* ${safeName}%0A*Email:* ${safeEmail}%0A*Phone:* ${safePhone}%0A*Service Required:* ${safeServiceType}%0A*Message:* ${safeMessage}`;
    const whatsappUrl = `https://wa.me/966531250719?text=${text}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      e.target.reset();
      setFormStatus({ text: '', color: '' });
    }, 800);
  };

  return (
    <>
      <nav className="navbar hidden">
        <a href="#home" className="logo">
          FixFlow
        </a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact" className="btn btn-primary">Connect</a></li>
        </ul>
      </nav>

      <header id="home" className="hero hidden">
        <div className="hero-content">
          <h1>Elevate Your Space with <span className="gradient-text">FixFlow</span></h1>
          <p>Premium plumbing, modern ceiling installations, and safe electrical works delivered with precision and excellence.</p>
          <div className="hero-actions">
            <button className="btn btn-outline" onClick={() => window.location.href='#services'}>Our Services</button>
            <button className="btn btn-primary" onClick={() => window.location.href='#contact'}>Get a Quote</button>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <img src="hero_illustration.png" alt="Fix-Flow Tools" className="hero-image" />
          <div className="glass-card main-card">
            <h3>Reliable Experts</h3>
            <p>24/7 Support for all your essential needs.</p>
          </div>
          <div className="floating-badge badge-1">
            <span className="badge-icon">⚡</span> Fast Service
          </div>
          <div className="floating-badge badge-2">
            <span className="badge-icon">🛠️</span> Expert Tools
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </header>

      <main>
        <section id="services" className="services-section">
          <div className="section-header hidden">
            <h2>Our Expertise</h2>
            <p>Comprehensive solutions tailored to your requirements</p>
          </div>
          <div className="services-grid">
            <div className="service-card hidden delay-1">
              <div className="card-icon plumbing-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3>Plumbing</h3>
              <p>From rapid leak repairs to complete pipe installations, ensuring your water systems flow flawlessly.</p>
              <a href="#contact" className="btn btn-outline" style={{marginTop: '1.5rem', width: '100%', textAlign: 'center', display: 'block'}} onClick={() => document.getElementById('serviceType').value='plumbing'}>Get a Quote</a>
            </div>
            <div className="service-card hidden delay-2">
              <div className="card-icon ceiling-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3>Ceiling Works</h3>
              <p>Modern false ceilings, aesthetic plastering, and structural repairs that redefine your interiors.</p>
              <a href="#contact" className="btn btn-outline" style={{marginTop: '1.5rem', width: '100%', textAlign: 'center', display: 'block'}} onClick={() => document.getElementById('serviceType').value='ceiling'}>Get a Quote</a>
            </div>
            <div className="service-card hidden delay-3">
              <div className="card-icon electrical-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Electrical Works</h3>
              <p>Safe wiring, smart lighting installations, and power issue resolutions by certified electricians.</p>
              <a href="#contact" className="btn btn-outline" style={{marginTop: '1.5rem', width: '100%', textAlign: 'center', display: 'block'}} onClick={() => document.getElementById('serviceType').value='electrical'}>Get a Quote</a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section hidden">
          <div className="about-content">
            <h2>Why Choose FixFlow?</h2>
            <p>We are a Saudi-based service company dedicated to transforming and maintaining your spaces with unmatched professionalism. Our team of experts ensures quality, safety, and modern aesthetics in every project.</p>
            <ul className="features-list">
              <li><span className="check-icon">✓</span> Experienced Professionals</li>
              <li><span className="check-icon">✓</span> Timely Project Completion</li>
              <li><span className="check-icon">✓</span> Transparent Pricing</li>
              <li><span className="check-icon">✓</span> Guaranteed Satisfaction</li>
            </ul>
          </div>
          <div className="about-image">
            <img src="about_illustration.png" alt="FixFlow Professionals" className="about-img-actual" />
            <div className="glass-panel">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section hidden">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Connect With Us</h2>
              <p>Ready to start your next project or need emergency repairs? Reach out today.</p>
              <div className="info-item">
                <strong>Email:</strong> fixflowofficial.saudi@gmail.com
              </div>
              <div className="info-item">
                <strong>Phone:</strong> +966 53 125 0719
              </div>
            </div>
            <form className="contact-form" id="connectForm" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required />
              </div>
              <div className="form-group">
                <select id="serviceType" name="serviceType" defaultValue="" required>
                  <option value="" disabled>Select Service</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="ceiling">Ceiling Works</option>
                  <option value="electrical">Electrical Works</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows="4" placeholder="How can we help? If you need any more services, please contact us to gather more details." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
              <p className="form-status" style={{color: formStatus.color}}>{formStatus.text}</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <a href="#home" className="logo">
            FixFlow
          </a>
          <p>&copy; 2026 FixFlow. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
