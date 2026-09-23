/* ==========================================================================
   BENVENUTA IN ITALIA — HIMA'S BOLOGNA TRAVEL COMPANION
   Client-Side Interactive Scripts & Attraction Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPolaroidUploader();
  loadFavorites();
  initToast();
  initScrollNav();
});

/* --------------------------------------------------------------------------
   1. Attraction Activity Dataset & Slide-Up Modal Engine
   -------------------------------------------------------------------------- */
const attractionData = {
  'piazza-maggiore': {
    title: 'Piazza Maggiore',
    countBadge: '✨ 164 Activities',
    intro: 'The heart of Bologna since 1200. Surrounded by medieval palaces, grand archways, and vibrant terraces.',
    activities: [
      'Whisper across the Voltone del Podestà arches (acoustic miracle!)',
      'See the Fountain of Neptune lit up at night',
      'Watch an open-air summer film in the piazza',
      'Climb the Palazzo d\'Accursio clock tower'
    ],
    mapsUrl: 'https://maps.google.com/?q=Piazza+Maggiore+Bologna'
  },
  'two-towers': {
    title: 'The Two Towers: Asinelli & Garisenda',
    countBadge: '🗼 110 Activities',
    intro: 'Bologna\'s medieval skyscrapers standing proud at the crossroads of ancient Roman roads.',
    activities: [
      'Marvel at Garisenda\'s dramatic lean',
      'Read the Dante quote inscribed on the base',
      'Explore the artisan Quadrilatero market streets right underneath'
    ],
    mapsUrl: 'https://maps.google.com/?q=Due+Torri+Bologna'
  },
  'san-petronio': {
    title: 'Basilica di San Petronio',
    countBadge: '⛪ 61 Activities',
    intro: 'One of the largest basilicas in the world, famous for its unfinished half-marble facade.',
    activities: [
      'Stand on the Cassini Meridian Line at solar noon',
      'Admire the unfinished marble & brick facade',
      'Visit the world\'s oldest functional church organ'
    ],
    mapsUrl: 'https://maps.google.com/?q=Basilica+di+San+Petronio+Bologna'
  },
  'san-luca': {
    title: 'Sanctuary of the Madonna di San Luca',
    countBadge: '🌅 26 Activities',
    intro: 'High on Monte della Guardia overlooking Bologna\'s terracotta rooftops and rolling hills.',
    activities: [
      'Walk the world-record 666 continuous covered arches (Portico di San Luca)',
      'Take the San Luca Express mini-train from the center',
      'Enjoy the hilltop panoramic view across the Emilia hills'
    ],
    mapsUrl: 'https://maps.google.com/?q=Santuario+di+Madonna+di+San+Luca+Bologna'
  },
  'teatro-anatomico': {
    title: 'Teatro Anatomico / Archiginnasio',
    countBadge: '🏛️ 7 Activities',
    intro: 'Stunning 17th-century carved wood anatomical amphitheater inside the ancient university palace.',
    activities: [
      'Inspect the 17th-century carved spruce wood lecture hall',
      'Look up at the canopy held by the "Spellati" (skinless statues)',
      'Walk through the historic university library filled with heraldic crests'
    ],
    mapsUrl: 'https://maps.google.com/?q=Teatro+Anatomico+Archiginnasio+Bologna'
  }
};

function openActivityModal(key) {
  const data = attractionData[key];
  if (!data) return;

  const backdrop = document.getElementById('modal-backdrop');
  const sheet = document.getElementById('modal-sheet');
  const title = document.getElementById('modal-title');
  const countBadge = document.getElementById('modal-count-badge');
  const intro = document.getElementById('modal-intro');
  const list = document.getElementById('modal-activities-list');
  const mapsLink = document.getElementById('modal-maps-link');

  if (!backdrop || !sheet) return;

  title.innerText = data.title;
  countBadge.innerText = data.countBadge;
  intro.innerText = data.intro;
  mapsLink.href = data.mapsUrl;

  // Build bullet list of activities
  list.innerHTML = '';
  data.activities.forEach(act => {
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.innerHTML = `<span class="activity-bullet">✦</span><span>${act}</span>`;
    list.appendChild(li);
  });

  // Activate modal with animation
  backdrop.classList.add('active');
  sheet.classList.add('active');

  // Prevent body background scroll while modal open
  document.body.style.overflow = 'hidden';
}

function closeActivityModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const sheet = document.getElementById('modal-sheet');

  if (backdrop && sheet) {
    backdrop.classList.remove('active');
    sheet.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   2. Polaroid Custom Photo Upload & Local Storage
   -------------------------------------------------------------------------- */
function initPolaroidUploader() {
  const photoInput = document.getElementById('photo-upload');
  const polaroidImg = document.getElementById('polaroid-img');

  const savedPhoto = localStorage.getItem('hima_polaroid_photo');
  if (savedPhoto && polaroidImg) {
    polaroidImg.src = savedPhoto;
  }

  if (photoInput && polaroidImg) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        polaroidImg.src = dataUrl;
        try {
          localStorage.setItem('hima_polaroid_photo', dataUrl);
          showToast('Photo updated! Saved in your polaroid ❤️');
        } catch (err) {
          showToast('Photo updated for this session! 📷');
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

/* --------------------------------------------------------------------------
   3. Italian Phrase Text-to-Speech & Clipboard Copy
   -------------------------------------------------------------------------- */
function speakItalianPhrase() {
  const phraseElement = document.getElementById('italian-phrase');
  const ttsBtn = document.getElementById('tts-btn');

  if (!phraseElement) return;
  const textToSpeak = phraseElement.innerText.replace(/"/g, '');

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const italianVoice = voices.find(v => v.lang.includes('it') || v.lang.includes('IT'));
    if (italianVoice) utterance.voice = italianVoice;

    if (ttsBtn) {
      const originalText = ttsBtn.innerHTML;
      ttsBtn.innerHTML = '🔊 Speaking...';
      ttsBtn.style.opacity = '0.7';

      utterance.onend = () => {
        ttsBtn.innerHTML = originalText;
        ttsBtn.style.opacity = '1';
      };
      utterance.onerror = () => {
        ttsBtn.innerHTML = originalText;
        ttsBtn.style.opacity = '1';
        showToast('Audio playback unavailable.');
      };
    }

    window.speechSynthesis.speak(utterance);
  } else {
    showToast('Speech synthesis not supported on this browser.');
  }
}

function copyItalianPhrase() {
  const phraseElement = document.getElementById('italian-phrase');
  if (!phraseElement) return;

  const phraseText = phraseElement.innerText;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(phraseText)
      .then(() => showToast('Phrase copied to clipboard! 📋'))
      .catch(() => fallbackCopyText(phraseText));
  } else {
    fallbackCopyText(phraseText);
  }
}

function fallbackCopyText(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast('Phrase copied to clipboard! 📋');
  } catch (err) {
    showToast('Failed to copy text.');
  }
  document.body.removeChild(tempInput);
}

/* --------------------------------------------------------------------------
   4. Favorites / Wishlist Management
   -------------------------------------------------------------------------- */
function loadFavorites() {
  const favorites = getFavoritesFromStorage();
  favorites.forEach(id => {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
      const btn = card.querySelector('.favorite-btn');
      if (btn) btn.classList.add('favorited');
    }
  });
}

function toggleFavorite(id) {
  let favorites = getFavoritesFromStorage();
  const card = document.querySelector(`[data-id="${id}"]`);
  const btn = card ? card.querySelector('.favorite-btn') : null;

  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
    if (btn) btn.classList.remove('favorited');
    showToast('Removed from wish list');
  } else {
    favorites.push(id);
    if (btn) btn.classList.add('favorited');
    showToast('Saved to your Bologna wish list ❤️');
  }

  localStorage.setItem('hima_favorites', JSON.stringify(favorites));
}

function getFavoritesFromStorage() {
  try {
    const stored = localStorage.getItem('hima_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

/* --------------------------------------------------------------------------
   5. Toast Notification System
   -------------------------------------------------------------------------- */
let toastTimeout;

function initToast() {
  if (!document.querySelector('.toast-msg')) {
    const toastDiv = document.createElement('div');
    toastDiv.className = 'toast-msg';
    toastDiv.id = 'toast';
    document.body.appendChild(toastDiv);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --------------------------------------------------------------------------
   6. Scroll Navigation Sync
   -------------------------------------------------------------------------- */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navPills = document.querySelectorAll('.nav-pill');
  const stickyItems = document.querySelectorAll('.sticky-nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navPills.forEach(pill => {
        const href = pill.getAttribute('href').replace('#', '');
        pill.classList.toggle('active', href === currentId);
      });

      stickyItems.forEach(item => {
        const href = item.getAttribute('href').replace('#', '');
        item.classList.toggle('active', href === currentId);
      });
    }
  });
}
