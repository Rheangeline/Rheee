const revealEls = [...document.querySelectorAll('.reveal-line, .reveal-up')];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  {
    threshold: 0.22,
    rootMargin: '0px 0px -6% 0px',
  }
);

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 70, 380)}ms`;
  observer.observe(el);
});

const heroPanels = [...document.querySelectorAll('.hero-visual .layer-card')];
window.addEventListener('load', () => {
  heroPanels.forEach((panel, index) => {
    panel.animate(
      [
        { opacity: 0, transform: 'translateY(26px) translateZ(-20px)' },
        { opacity: 1, transform: getComputedStyle(panel).transform },
      ],
      {
        duration: 900,
        delay: 320 + index * 130,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'forwards',
      }
    );
  });
});

const workCards = [...document.querySelectorAll('.work-card')];
const previewPanels = [...document.querySelectorAll('.preview-panel')];

function setActivePreview(id) {
  previewPanels.forEach((panel) => panel.classList.remove('is-active'));
  const target = document.querySelector(`.${id}`);
  if (target) target.classList.add('is-active');
}

workCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const id = card.dataset.preview;
    setActivePreview(id);
  });
});

const magneticTargets = [...document.querySelectorAll('.magnetic')];
magneticTargets.forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.06}px, ${y * 0.08}px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});

const evoSection = document.querySelector('.evolution');
const evoTrack = document.getElementById('evolution-track');
const evoCards = [...document.querySelectorAll('.evo-card')];

function updateEvolution() {
  if (!evoSection || !evoTrack) return;

  const rect = evoSection.getBoundingClientRect();
  const viewport = window.innerHeight;
  const start = viewport * 0.15;
  const end = viewport * 0.85;
  const progress = Math.min(Math.max((start - rect.top) / (rect.height + end), 0), 1);

  const maxTranslate = Math.max(evoTrack.scrollWidth - window.innerWidth + 90, 0);
  evoTrack.style.transform = `translateX(${-maxTranslate * progress}px)`;

  const active = Math.round(progress * (evoCards.length - 1));
  evoCards.forEach((card, index) => {
    card.classList.toggle('is-active', index === active);
  });
}

window.addEventListener('scroll', updateEvolution, { passive: true });
window.addEventListener('resize', updateEvolution);
updateEvolution();
