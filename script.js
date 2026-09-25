document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  document.querySelectorAll('.photo-slot[data-photo]').forEach((slot) => {
    const image = slot.querySelector('.photo-image');
    if (!image) return;
    const showPhoto = () => {
      slot.classList.add('has-photo');
      slot.setAttribute('aria-label', slot.dataset.label || image.alt || 'Photo');
    };
    image.addEventListener('load', showPhoto);
    image.addEventListener('error', () => {
      image.hidden = true;
      slot.classList.remove('has-photo');
    });
    if (image.complete && image.naturalWidth > 0) showPhoto();
  });

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    const target = new Date(countdown.dataset.countdown).getTime();
    const update = () => {
      const remaining = Math.max(0, target - Date.now());
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining / 3600000) % 24);
      const minutes = Math.floor((remaining / 60000) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);
      [['days', days], ['hours', hours], ['minutes', minutes], ['seconds', seconds]].forEach(([unit, value]) => {
        const element = countdown.querySelector(`[data-unit="${unit}"]`);
        if (element) element.textContent = String(value).padStart(2, '0');
      });
    };
    update();
    window.setInterval(update, 1000);
  }

  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

  const videoModal = document.querySelector('[data-video-modal]');
  const video = videoModal?.querySelector('video');
  const openVideo = document.querySelector('[data-video-open]');
  const closeVideo = () => {
    if (!videoModal) return;
    video?.pause();
    videoModal.classList.remove('is-open');
    videoModal.hidden = true;
  };
  openVideo?.addEventListener('click', () => {
    if (!videoModal) return;
    videoModal.hidden = false;
    videoModal.classList.add('is-open');
    videoModal.querySelector('[data-video-close]')?.focus();
    video?.play().catch(() => {});
  });
  videoModal?.querySelector('[data-video-close]')?.addEventListener('click', closeVideo);
  videoModal?.addEventListener('click', (event) => {
    if (event.target === videoModal) closeVideo();
  });

  const dobForm = document.querySelector('[data-dob-form]');
  const dobInput = document.querySelector('#dob');
  const dobError = document.querySelector('[data-dob-error]');
  const protectedLetter = document.querySelector('[data-protected-letter]');
  const letterLock = document.querySelector('[data-letter-lock]');
  dobForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const entered = (dobInput?.value || '').trim();
    if (entered === '27091998') {
      letterLock?.setAttribute('hidden', '');
      protectedLetter?.removeAttribute('hidden');
      protectedLetter?.setAttribute('aria-hidden', 'false');
      if (dobError) dobError.textContent = '';
      protectedLetter?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (dobError) dobError.textContent = 'That date did not open the letter. Please try again.';
    dobInput?.focus();
    dobInput?.select();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal?.classList.contains('is-open')) closeVideo();
  });
});
