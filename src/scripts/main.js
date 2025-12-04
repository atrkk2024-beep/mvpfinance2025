/* ========================================
   MAIN JAVASCRIPT FILE
   ======================================== */

// ========================================
// HEADER SCROLL BEHAVIOR
// ========================================
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ========================================
// MOBILE MENU TOGGLE
// ========================================
const burgerMenu = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');

  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-list .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});


// ========================================
// SMOOTH SCROLL TO SECTIONS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 70;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ========================================
// TABS FUNCTIONALITY
// ========================================
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');

    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('tab-button--active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('tab-content--active');
    });

    // Add active class to clicked button and corresponding content
    button.classList.add('tab-button--active');
    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
      tabContent.classList.add('tab-content--active');
    }
  });
});


// ========================================
// FAQ ACCORDION
// ========================================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current FAQ item
    button.setAttribute('aria-expanded', !isExpanded);
  });
});


// ========================================
// CALCULATOR FUNCTIONALITY
// ========================================
const calcForm = document.getElementById('calculator-form');
const resultUSD = document.getElementById('result-usd');
const resultRUB = document.getElementById('result-rub');

const commissionRates = {
  company: { rub: 0.02, mixed: 0.03, crypto: 0.05 },
  freelancer: { rub: 0.015, mixed: 0.02, crypto: 0.035 },
  agency: { rub: 0.025, mixed: 0.035, crypto: 0.05 }
};

function recalculate() {
  const type = document.getElementById('calc-type').value;
  const volume = parseFloat(document.getElementById('calc-volume').value) || 0;
  const scheme = document.getElementById('calc-scheme').value;

  if (!type || !volume || !scheme) {
    resultUSD.textContent = '0';
    resultRUB.textContent = '0';
    return;
  }

  const rate = commissionRates[type]?.[scheme] || 0;
  const commission = volume * rate;
  const commissionRUB = Math.round(commission * 90); // ~90 рублей за доллар

  resultUSD.textContent = Math.round(commission).toLocaleString('ru-RU');
  resultRUB.textContent = commissionRUB.toLocaleString('ru-RU');
}

if (calcForm) {
  calcForm.addEventListener('change', recalculate);
  calcForm.addEventListener('input', recalculate);
}


// ========================================
// STATS COUNTER ANIMATION
// ========================================
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const element = entry.target;
      const target = parseInt(element.getAttribute('data-target'));
      animateNumber(element, 0, target, 1500);
      element.classList.add('counted');
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => {
  statsObserver.observe(el);
});

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuad = progress * (2 - progress);
    const value = Math.floor(start + range * easeOutQuad);

    element.textContent = value.toLocaleString('ru-RU');

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}


// ========================================
// SECTION ANIMATIONS ON SCROLL
// ========================================
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});


// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================
function validateForm(form) {
  const errors = [];
  let isValid = true;

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(error => {
    error.textContent = '';
  });
  form.querySelectorAll('.error').forEach(input => {
    input.classList.remove('error');
  });

  // Name validation
  const nameInput = form.querySelector('input[name="name"]');
  if (nameInput && !nameInput.value.trim()) {
    errors.push({ field: nameInput, message: 'Укажите ваше имя' });
    isValid = false;
  }

  // Email validation
  const emailInput = form.querySelector('input[name="email"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailRegex.test(emailInput.value)) {
    errors.push({ field: emailInput, message: 'Укажите корректный email' });
    isValid = false;
  }

  // Phone validation
  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput && !phoneInput.value.trim()) {
    errors.push({ field: phoneInput, message: 'Укажите телефон' });
    isValid = false;
  }

  // Type/Select validation
  const selectInput = form.querySelector('select[name="type"]');
  if (selectInput && !selectInput.value) {
    errors.push({ field: selectInput, message: 'Выберите вариант' });
    isValid = false;
  }

  // Agreement checkbox validation
  const agreeCheckbox = form.querySelector('input[name="agree"]');
  if (agreeCheckbox && !agreeCheckbox.checked) {
    errors.push({ field: agreeCheckbox, message: 'Необходимо согласие' });
    isValid = false;
  }

  // Display errors
  errors.forEach(error => {
    error.field.classList.add('error');
    const errorSpan = error.field.parentElement.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.textContent = error.message;
    }
  });

  return isValid;
}

async function submitForm(form, formData) {
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = 'Отправка...';

  try {
    // TODO: Replace with actual API endpoint
    // For MVP, you can use Formspree or similar service
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      button.textContent = 'Спасибо! Мы свяжемся с вами';
      button.style.background = '#10b981'; // Green success color
      form.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
      }, 3000);
    } else {
      throw new Error('Ошибка при отправке');
    }
  } catch (err) {
    console.error(err);
    button.textContent = 'Ошибка. Попробуйте позже';
    button.style.background = '#ef4444'; // Red error color

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.background = '';
    }, 3000);
  }
}

// Apply form submission to all forms
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    const formData = new FormData(form);
    await submitForm(form, formData);
  });
});


// ========================================
// MODAL FUNCTIONALITY (FOR CTA BUTTONS)
// ========================================
// This is a simple implementation. You can expand it as needed.
document.querySelectorAll('[data-modal="contact"]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    // Scroll to the final CTA section
    const finalCTA = document.getElementById('final-cta');
    if (finalCTA) {
      const headerHeight = 70;
      const targetPosition = finalCTA.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Focus on the first input
      setTimeout(() => {
        const firstInput = finalCTA.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 600);
    }
  });
});


// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('MVP Finance 2025 - Loaded successfully');

  // Trigger animations for elements already in viewport
  const viewportHeight = window.innerHeight;
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      section.classList.add('animated');
    }
  });
});


// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy load images if needed
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}


// ========================================
// ANALYTICS (Optional - add your tracking code)
// ========================================
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  console.log('Event tracked:', category, action, label);
}

// Track form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    trackEvent('Form', 'Submit', form.id || 'unknown');
  });
});

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', () => {
    trackEvent('CTA', 'Click', button.textContent.trim());
  });
});
