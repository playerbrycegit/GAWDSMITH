const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  })
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const recipient = form.dataset.recipient?.trim();
  const subject = encodeURIComponent(`Gawdsmith Inquiry — ${data.organization}`);
  const inquiry = `Organization: ${data.organization}
Name: ${data.name}
Email: ${data.email}
Role: ${data.role || ''}
Organization size: ${data.size || ''}
Interest: ${data.interest || ''}
Leadership sponsor: ${data.sponsor || ''}
Desired start: ${data.timeline || ''}
Scope readiness: ${data.investment || ''}

Challenge:
${data.challenge}`;

  if (!recipient) {
    navigator.clipboard?.writeText(inquiry);
    status.textContent = 'Your inquiry is prepared. Gawdsmith contact routing is being finalized.';
    return;
  }

  status.textContent = 'Your inquiry is ready. Opening your email client.';
  window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${subject}&body=${encodeURIComponent(inquiry)}`;
});


window.requestAnimationFrame(() => document.body.classList.add('page-ready'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('is-transitioning');
    void document.body.offsetWidth;
    document.body.classList.add('is-transitioning');
    window.setTimeout(() => document.body.classList.remove('is-transitioning'), 620);
  });
});

const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const trackedSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-38% 0px -52%', threshold: 0 });
trackedSections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 45}ms`);
});
