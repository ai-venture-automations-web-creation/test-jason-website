// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Sticky Navigation Effect
const navPill = document.getElementById('navPill');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    navPill.classList.add('scrolled');
  } else {
    navPill.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// Scroll Reveal Animation
const revealSections = document.querySelectorAll('.reveal-section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealSections.forEach(section => {
  revealObserver.observe(section);
});

// Floating CTA Visibility
const floatingCta = document.getElementById('floatingCta');

const ctaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      floatingCta.classList.remove('visible');
    } else {
      floatingCta.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Show floating CTA when hero is out of view
const heroSection = document.querySelector('.hero');
if (heroSection) {
  ctaObserver.observe(heroSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  console.log('Form submitted:', data);
  
  // Show success message (replace with actual submission logic)
  alert('Thank you for your interest! We\'ll contact you within 2 hours to discuss launching your digital empire.');
  
  // Reset form
  contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 100; // Account for nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Animated counters for stats
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 20);
};

// Initialize counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('+')) {
          const number = parseInt(text.replace('+', ''));
          stat.textContent = '0+';
          animateCounter(stat, number);
        } else if (text.includes('%')) {
          const number = parseFloat(text.replace('%', ''));
          stat.textContent = '0%';
          setTimeout(() => {
            stat.textContent = text;
          }, 1000);
        }
      });
      entry.target.dataset.animated = 'true';
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  statsObserver.observe(statsBar);
}

// Page load animations
window.addEventListener('load', () => {
  // Animate hero elements on load
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-actions');
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });
});

// Enhanced hover effects for cards
document.querySelectorAll('.process-step, .result-card, .testimonial-card, .pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Button click effects
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
  button.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.98)';
  });
  
  button.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1.04)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});