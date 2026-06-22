// Code Exchange — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile hamburger ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // --- Active nav link ---
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // --- Contact form validation ---
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const err = field.parentElement.querySelector('.form-error');
        if (!field.value.trim()) {
          if (err) err.style.display = 'block';
          field.style.borderColor = '#dc2626';
          valid = false;
        } else {
          if (err) err.style.display = 'none';
          field.style.borderColor = '';
        }
      });
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        const err = emailField.parentElement.querySelector('.form-error');
        if (err) { err.textContent = 'Please enter a valid email.'; err.style.display = 'block'; }
        emailField.style.borderColor = '#dc2626';
        valid = false;
      }
      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        setTimeout(() => { btn.textContent = original; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3000);
      }
    });
    form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(f => {
      f.addEventListener('input', () => {
        f.style.borderColor = '';
        const err = f.parentElement.querySelector('.form-error');
        if (err) err.style.display = 'none';
      });
    });
  }

  // --- Sticky header shadow ---
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
