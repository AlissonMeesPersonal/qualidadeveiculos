// Hero institucional: controles acessíveis, economia de dados e movimento reduzido.
const video = document.getElementById('hero-video');
const playButton = document.getElementById('hero-play-toggle');
const audioButton = document.getElementById('hero-audio-toggle');
if (video && playButton && audioButton) {
  let pausedByUser = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const allowAutoplay = !reduceMotion && !saveData;
  const syncButtons = () => {
    const playing = !video.paused;
    playButton.textContent = playing ? 'Ⅱ' : '▶';
    playButton.setAttribute('aria-label', playing ? 'Pausar vídeo' : 'Reproduzir vídeo');
    playButton.setAttribute('aria-pressed', String(playing));
    audioButton.textContent = video.muted ? '♪' : '♫';
    audioButton.setAttribute('aria-label', video.muted ? 'Ativar som' : 'Desativar som');
    audioButton.setAttribute('aria-pressed', String(!video.muted));
  };
  if (!allowAutoplay) {
    video.autoplay = false;
    video.pause();
  }
  playButton.addEventListener('click', async () => {
    if (video.paused) {
      pausedByUser = false;
      try { await video.play(); } catch { pausedByUser = true; }
    } else {
      pausedByUser = true;
      video.pause();
    }
    syncButtons();
  });
  audioButton.addEventListener('click', () => {
    video.muted = !video.muted;
    syncButtons();
  });
  video.addEventListener('play', syncButtons);
  video.addEventListener('pause', syncButtons);
  video.addEventListener('volumechange', syncButtons);
  video.addEventListener('error', () => {
    video.closest('.hero-video-frame')?.classList.add('video-unavailable');
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries[0]?.isIntersecting;
      if (!visible) video.pause();
      else if (allowAutoplay && !pausedByUser && document.visibilityState === 'visible') video.play().catch(() => {});
    }, { threshold: 0.15 });
    observer.observe(video);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (allowAutoplay && !pausedByUser) video.play().catch(() => {});
  });
  syncButtons();
}
