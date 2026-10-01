/* ==========================================================================
   HIMA'S COZY CARE PACKAGE — JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1. INTERACTIVE MOOD SELECTOR FOR HIMA
  // -------------------------------------------------------------
  const moodResponses = {
    crampy: "🌸 <strong>Time to hug stitch!</strong> Grab your fluffiest blanket, lay down under the covers and snuggle hima, I pray pain would go away! 🧸",
    treats: "🍫 <strong>Time for Dark Choco!</strong> Get some dark choco in you, also no junkfood for you or caffeine. tea and fresh fruits only today!",
    tired: "☁️ <strong>Petition to Sleep!</strong> You hv traveled a lot ne. today's time to rest. rest well and you can explore later. hv nice nap my sleeping beauty ",
    emotional: "🥺 <strong>Sending the tightest hug, Hima.</strong> Don't overthink anything today. Put on a show from the watchlist below and rest."
  };

  const moodButtons = document.querySelectorAll('.mood-btn');
  const moodFeedbackBox = document.getElementById('mood-feedback');

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      moodButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const moodKey = button.getAttribute('data-mood');
      if (moodResponses[moodKey] && moodFeedbackBox) {
        moodFeedbackBox.innerHTML = moodResponses[moodKey];
        moodFeedbackBox.style.display = 'block';
      }
    });
  });

  // -------------------------------------------------------------
  // 2. BEDTIME NIGHT MODE TOGGLE
  // -------------------------------------------------------------
  const nightToggleBtn = document.getElementById('night-toggle');
  if (nightToggleBtn) {
    nightToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('night-mode');
      const isNight = document.body.classList.contains('night-mode');
      nightToggleBtn.textContent = isNight ? '☀️' : '🌙';
      nightToggleBtn.title = isNight ? 'Switch to Soft Daylight Mode' : 'Switch to Cozy Bedtime Mode';
    });
  }

  // -------------------------------------------------------------
  // 3. LIGHTWEIGHT STITCH INTERACTION (FAST & PERFORMANT)
  // -------------------------------------------------------------
  const stitchImg = document.getElementById('stitch-img');
  const stitchBtn = document.getElementById('stitch-btn');
  const watchlistSection = document.getElementById('watchlist-section');

  function handleStitchInteraction() {
    // A. Trigger fast, hardware-accelerated CSS wiggle/bounce on Stitch image
    if (stitchImg) {
      stitchImg.classList.remove('stitch-bounce');
      // Trigger reflow to restart CSS keyframe animation smoothly
      void stitchImg.offsetWidth;
      stitchImg.classList.add('stitch-bounce');
    }

    // B. Lightweight mobile haptic pulse (if supported)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([30, 40]);
    }

    // C. Smooth scroll down to Watchlist section
    if (watchlistSection) {
      watchlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (stitchImg) {
    stitchImg.addEventListener('click', handleStitchInteraction);
  }

  if (stitchBtn) {
    stitchBtn.addEventListener('click', handleStitchInteraction);
  }

  // Fallback for Stitch Image if stitch.png is missing or fails to load
  if (stitchImg) {
    stitchImg.addEventListener('error', () => {
      stitchImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23D6E4FF"/><path d="M 22,35 C 10,20 12,45 28,48 C 24,38 32,32 38,36" fill="%235B92E5"/><path d="M 78,35 C 90,20 88,45 72,48 C 76,38 68,32 62,36" fill="%235B92E5"/><ellipse cx="50" cy="48" rx="22" ry="18" fill="%235B92E5"/><ellipse cx="44" cy="45" rx="4" ry="5" fill="%231A365D"/><ellipse cx="56" cy="45" rx="4" ry="5" fill="%231A365D"/><circle cx="43" cy="44" r="1.5" fill="%23FFFFFF"/><circle cx="55" cy="44" r="1.5" fill="%23FFFFFF"/><ellipse cx="50" cy="50" rx="4" ry="3" fill="%232B6CB0"/><path d="M 45,53 Q 50,57 55,53" stroke="%231A365D" stroke-width="1.5" fill="none"/><path d="M 25,60 C 25,55 75,55 75,60 C 75,82 25,82 25,60 Z" fill="%23F8E1E7" stroke="%23E8A3B1" stroke-width="2"/><text x="50" y="74" font-size="12" text-anchor="middle" fill="%23D47488">🧸 Hima</text></svg>';
    });
  }

  // -------------------------------------------------------------
  // 4. IMAGE ERROR FALLBACKS (ACROSS ALL CARD & POSTER IMAGES)
  // -------------------------------------------------------------
  const allImages = document.querySelectorAll('img:not(#stitch-img)');
  allImages.forEach(img => {
    img.addEventListener('error', () => {
      const altText = img.alt || 'Cozy Image';
      img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="300" height="150"><rect width="100%" height="100%" fill="%23F8E1E7"/><circle cx="150" cy="75" r="45" fill="%23EDE8F8"/><text x="50%" y="48%" font-size="16" font-family="sans-serif" font-weight="bold" fill="%23D47488" text-anchor="middle">🌸 ${encodeURIComponent(altText)}</text><text x="50%" y="65%" font-size="12" font-family="sans-serif" fill="%237A5C65" text-anchor="middle">Cozy Comfort View</text></svg>`;
    });
  });

  // -------------------------------------------------------------
  // 5. LIGHTWEIGHT SCROLL FADE-IN OBSERVER
  // -------------------------------------------------------------
  const fadeElements = document.querySelectorAll('.fade-in');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => scrollObserver.observe(el));
});
