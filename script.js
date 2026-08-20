/**
 * ADVANCED UI/UX SCRIPT - VANILLA HIGH-PERFORMANCE INTERACTIVE PORTFOLIO
 * Author: Lasindu Chanuka
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMobileNav();
  initHeroTypewriter();
  initGlitchPulse();
  initKashFlipCard();
  initModals();
  initNyxTerminal();
  initSplitScreen();
  initGeneralObserver();
  initCyberGlowObserver();
  initTimelineScrollTracker();
  initContactForm();
});

/* ==========================================================================
   1. CUSTOM DUAL-DOT MAGNET CURSOR ENGINE
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorAura = document.getElementById('cursor-aura');

  if (!cursorDot || !cursorAura) return;

  if (window.innerWidth <= 992 || 'ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorAura.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let auraX = mouseX;
  let auraY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateAura() {
    auraX += (mouseX - auraX) * 0.16;
    auraY += (mouseY - auraY) * 0.16;

    cursorAura.style.left = `${auraX}px`;
    cursorAura.style.top = `${auraY}px`;

    requestAnimationFrame(animateAura);
  }
  requestAnimationFrame(animateAura);

  const magnetics = document.querySelectorAll('.magnetic, a, button, input, textarea, .project-card, .cred-card, .stack-card, .flip-card, .pill-tag, .social-link-item');
  
  magnetics.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorAura.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursorAura.classList.remove('active');
    });
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   3. HERO TYPEWRITER EFFECT (INFINITE LOOP)
   ========================================================================== */
function initHeroTypewriter() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    "Technical Officer",
    "Cybersecurity Enthusiast",
    "Automation Builder",
    "UCSC Undergraduate"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = pauseStart;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   4. PERIODIC GLITCH PULSE TRIGGER
   ========================================================================== */
function initGlitchPulse() {
  const glitchTitles = document.querySelectorAll('.glitch-title');
  if (!glitchTitles.length) return;

  setInterval(() => {
    const randomTitle = glitchTitles[Math.floor(Math.random() * glitchTitles.length)];
    randomTitle.classList.add('glitch-active');
    setTimeout(() => {
      randomTitle.classList.remove('glitch-active');
    }, 450);
  }, 4000);
}

/* ==========================================================================
   5. KASH 3D FLIP CARD (SMARTPHONE CHASSIS & IFRAME)
   ========================================================================== */
function initKashFlipCard() {
  const kashCard = document.getElementById('kash-card');
  const flipBtn = document.getElementById('kash-flip-trigger') || document.getElementById('flip-toggle-btn');

  if (!kashCard) return;

  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      kashCard.classList.toggle('flipped');
    });
  }

  kashCard.addEventListener('dblclick', () => {
    kashCard.classList.toggle('flipped');
  });
}

/* ==========================================================================
   6. MODALS ENGINE (NATIVE <dialog>)
   ========================================================================== */
function initModals() {
  const routingModal = document.getElementById('smart-routing-modal');
  const overdraftModal = document.getElementById('overdraft-modal');

  const openRoutingBtn = document.getElementById('open-routing-modal');
  const closeRoutingBtn = document.getElementById('close-routing-modal');

  const openOverdraftBtn = document.getElementById('open-overdraft-modal');
  const closeOverdraftBtn = document.getElementById('close-overdraft-modal');

  if (routingModal && openRoutingBtn && closeRoutingBtn) {
    openRoutingBtn.addEventListener('click', () => routingModal.showModal());
    closeRoutingBtn.addEventListener('click', () => routingModal.close());
    routingModal.addEventListener('click', (e) => {
      const rect = routingModal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        routingModal.close();
      }
    });
  }

  if (overdraftModal && openOverdraftBtn && closeOverdraftBtn) {
    openOverdraftBtn.addEventListener('click', () => overdraftModal.showModal());
    closeOverdraftBtn.addEventListener('click', () => overdraftModal.close());
    overdraftModal.addEventListener('click', (e) => {
      const rect = overdraftModal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        overdraftModal.close();
      }
    });
  }
}

/* ==========================================================================
   7. NYX OPTIMIZER TERMINAL TYPEWRITER
   ========================================================================== */
function initNyxTerminal() {
  const nyxCard = document.getElementById('nyx-card');
  const termBody = document.getElementById('nyx-terminal-body');

  if (!nyxCard || !termBody) return;

  const scriptLines = [
    "PS C:\\> Invoke-NyxOptimization.ps1 -Profile Enterprise",
    "[+] Validating Administrator Execution Privileges... OK",
    "[+] Disabling Unnecessary Background Telemetry Services...",
    "[+] Tweaking TCP/IP Window Size & Low-Latency Routing...",
    "[+] Hardening PowerShell Execution Policy & Firewall Rules...",
    "[+] Optimization Complete. 0 Bottlenecks Detected. System Ready."
  ];

  let typingTimeout = null;
  let isRunning = false;

  function runTerminalScript() {
    termBody.innerHTML = '';
    let lineIdx = 0;
    isRunning = true;

    function printNextLine() {
      if (!isRunning || lineIdx >= scriptLines.length) return;

      const lineDiv = document.createElement('div');
      lineDiv.className = 'term-line';
      const text = scriptLines[lineIdx];

      if (lineIdx === 0) {
        lineDiv.style.color = '#00f0ff';
      } else if (lineIdx === scriptLines.length - 1) {
        lineDiv.style.color = '#00ff88';
        lineDiv.style.fontWeight = 'bold';
      } else {
        lineDiv.style.color = '#a0a0a0';
      }

      lineDiv.textContent = text;
      termBody.appendChild(lineDiv);
      termBody.scrollTop = termBody.scrollHeight;

      lineIdx++;
      typingTimeout = setTimeout(printNextLine, 350);
    }

    printNextLine();
  }

  function resetTerminal() {
    isRunning = false;
    if (typingTimeout) clearTimeout(typingTimeout);
    termBody.innerHTML = '<div class="term-line term-prompt">PS C:\\&gt; <span class="term-hover-hint">&lt; Hover card to run script &gt;</span></div>';
  }

  nyxCard.addEventListener('mouseenter', runTerminalScript);
  nyxCard.addEventListener('mouseleave', resetTerminal);
}

/* ==========================================================================
   8. OFFENSIVE SECURITY LAB SPLIT SCREEN
   ========================================================================== */
function initSplitScreen() {
  const container = document.getElementById('split-screen');
  if (!container) return;

  const leftSide = container.querySelector('.left-side');
  const rightSide = container.querySelector('.right-side');
  const divider = container.querySelector('.split-divider');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(15, Math.min(85, (x / rect.width) * 100));

    leftSide.style.flex = `${percentage}`;
    rightSide.style.flex = `${100 - percentage}`;
    divider.style.left = `${percentage}%`;
  });

  container.addEventListener('mouseleave', () => {
    leftSide.style.flex = '1';
    rightSide.style.flex = '1';
    divider.style.left = '50%';
  });
}

/* ==========================================================================
   9. GENERAL INTERSECTION OBSERVER FOR CARDS
   ========================================================================== */
function initGeneralObserver() {
  const animatedItems = document.querySelectorAll('.project-card, .cred-card, .stack-card');
  if (!animatedItems.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedItems.forEach(item => observer.observe(item));
}

/* ==========================================================================
   10. SCROLL-TRIGGERED CYBER GLOW OBSERVER (STRICT ROOTMARGIN: -25% 0px -25% 0px)
   ========================================================================== */
function initCyberGlowObserver() {
  const glowTargets = document.querySelectorAll('.cyber-glow-target');
  if (!glowTargets.length) return;

  const glowObserverOptions = {
    root: null,
    rootMargin: '-25% 0px -25% 0px', // Active middle 50% region of viewport
    threshold: 0.1
  };

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-glowing');
      } else {
        entry.target.classList.remove('is-glowing'); // Removes glow when scrolling past/away
      }
    });
  }, glowObserverOptions);

  glowTargets.forEach(target => glowObserver.observe(target));
}

/* ==========================================================================
   11. CONTINUOUS SCROLL TRACKER DOT & ACTIVE CYAN TRACK FILL
   ========================================================================== */
function initTimelineScrollTracker() {
  const container = document.getElementById('timeline-container');
  const activeTrack = document.getElementById('timeline-track-active');
  const movingDot = document.getElementById('timeline-dot');

  if (!container || !activeTrack || !movingDot) return;

  let ticking = false;

  function updateTracker() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const totalHeight = rect.height;
    const currentOffset = (windowHeight * 0.5) - rect.top;

    let progress = currentOffset / totalHeight;
    progress = Math.max(0, Math.min(1, progress));

    const activeHeightPx = progress * totalHeight;

    activeTrack.style.height = `${activeHeightPx}px`;
    movingDot.style.top = `${activeHeightPx}px`;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateTracker);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      requestAnimationFrame(updateTracker);
      ticking = true;
    }
  }, { passive: true });

  updateTracker();
}

/* ==========================================================================
   12. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!contactForm || !statusMsg) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    statusMsg.style.color = '#00f0ff';
    statusMsg.textContent = `[+] Thank you, ${name}! Your message has been dispatched securely.`;
    contactForm.reset();

    setTimeout(() => {
      statusMsg.textContent = '';
    }, 5000);
  });
}
