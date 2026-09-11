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
