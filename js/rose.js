/* ============================================
   ROSE DAY WEBSITE - JAVASCRIPT
   ============================================ */

// ============================================
// PARTICLE BACKGROUND
// ============================================
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(230, 57, 70, ${p.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// FLOATING PETALS
// ============================================
function createFloatingPetals() {
    const container = document.getElementById('petals-bg');
    const petals = ['🌹', '🌸', '💮', '🏵️', '❤️'];

    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        petal.style.animationDelay = Math.random() * 20 + 's';
        petal.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(petal);
    }
}

// ============================================
// REASONS CAROUSEL
// ============================================
class ReasonsCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.reason-card');
        this.dotsContainer = document.getElementById('carousel-dots');
        this.currentIndex = 0;
        this.createDots();
        this.autoPlay();
    }

    createDots() {
        for (let i = 0; i < this.cards.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    goTo(index) {
        this.cards[this.currentIndex].classList.remove('active');
        document.querySelectorAll('.carousel-dot')[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.cards[this.currentIndex].classList.add('active');
        document.querySelectorAll('.carousel-dot')[this.currentIndex].classList.add('active');
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goTo(nextIndex);
    }

    autoPlay() {
        setInterval(() => this.next(), 4000);
    }
}

// ============================================
// SURPRISE BOX
// ============================================
function setupSurprise() {
    const box = document.getElementById('surprise-box');
    const reveal = document.getElementById('surprise-reveal');

    box.addEventListener('click', () => {
        box.style.display = 'none';
        reveal.classList.remove('hidden');
        createPetalBurst();
    });
}

function createPetalBurst() {
    const container = document.createElement('div');
    container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    overflow: hidden;
  `;
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
        const petal = document.createElement('div');
        const hue = 340 + Math.random() * 30;
        const size = 10 + Math.random() * 15;
        const startX = 50 + (Math.random() - 0.5) * 20;
        const startY = 50;
        const endX = startX + (Math.random() - 0.5) * 100;
        const endY = startY + 30 + Math.random() * 70;
        const duration = 2 + Math.random() * 2;

        petal.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, hsl(${hue}, 80%, 50%), hsl(${hue}, 80%, 30%));
      border-radius: 50% 0 50% 50%;
      left: ${startX}%;
      top: ${startY}%;
      opacity: 0.9;
      animation: burstPetal ${duration}s ease-out forwards;
    `;

        const style = document.createElement('style');
        style.textContent = `
      @keyframes burstPetal {
        0% { 
          transform: translate(0, 0) rotate(0deg) scale(0); 
          opacity: 0;
        }
        20% { 
          opacity: 0.9;
          transform: scale(1);
        }
        100% { 
          transform: translate(${(endX - startX) * 3}vw, ${(endY - startY) * 2}vh) rotate(720deg) scale(0.5); 
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);
        container.appendChild(petal);
    }

    setTimeout(() => container.remove(), 5000);
}

// ============================================
// MUSIC - YouTube Control
// ============================================
let isMusicPlaying = true; // Auto-plays by default
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
    const mainPlayer = document.getElementById('main-video-player');

    if (isMusicPlaying) {
        // Pause
        mainPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        musicBtn.textContent = '🔇';
    } else {
        // Play
        mainPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        musicBtn.textContent = '🎵';
    }
    isMusicPlaying = !isMusicPlaying;
}

// ============================================
// OPEN BUTTON & GIFT BOX
// ============================================
function setupOpenButton() {
    const openBtn = document.getElementById('open-btn');
    const giftBox = document.getElementById('gift-box');
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('main-content');

    const openGift = () => {
        // Start opening animation
        giftBox.classList.add('opening');

        // Create burst of hearts
        createPetalBurst();

        // After lid opens, fly away and show content
        setTimeout(() => {
            giftBox.classList.add('opened');

            // Fade out landing, fade in content
            setTimeout(() => {
                landing.classList.add('hidden');
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('visible');
                }
            }, 800);
        }, 800);
    };

    openBtn.addEventListener('click', openGift);
    if (giftBox) {
        giftBox.addEventListener('click', openGift);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.letter-container, .idea-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Add visible class styles dynamically
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  /* Cursor Trail Styles */
  .cursor-sparkle {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    font-size: 1.5rem;
    animation: sparkleFloat 1s ease-out forwards;
  }
  
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -100px) scale(0.3) rotate(180deg);
    }
  }
`;
document.head.appendChild(style);

// ============================================
// VIDEO CAROUSEL - Smart Auto Slide
// ============================================
class VideoCarousel {
    constructor() {
        this.container = document.querySelector('.video-grid');
        this.cards = document.querySelectorAll('.video-card');
        this.isPaused = false;
        this.interval = null;
        this.scrollSpeed = 2; // px per tick
        this.autoScrollDelay = 3000; // Delay before next scroll

        if (this.container && this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        this.startAutoScroll();
        this.setupVideoEvents();
        this.setupTouchEvents();

        // Pause on hover (desktop)
        this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
        this.container.addEventListener('mouseleave', () => {
            if (!this.isVideoPlaying()) this.startAutoScroll();
        });
    }

    startAutoScroll() {
        if (this.interval) return;

        this.interval = setInterval(() => {
            if (this.isPaused) return;

            // Calculate next scroll position (one card width + gap)
            const cardWidth = this.cards[0].offsetWidth;
            const gap = 16; // approximate gap
            const currentScroll = this.container.scrollLeft;
            const maxScroll = this.container.scrollWidth - this.container.clientWidth;

            let nextScroll = currentScroll + cardWidth + gap;

            // Loop back to start if reached end
            if (currentScroll >= maxScroll - 10) {
                nextScroll = 0;
            }

            this.container.scrollTo({
                left: nextScroll,
                behavior: 'smooth'
            });

        }, this.autoScrollDelay);
    }

    stopAutoScroll() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setupVideoEvents() {
        this.cards.forEach((card, index) => {
            const video = card.querySelector('video');
            if (video) {
                // When video plays, stop scrolling
                video.addEventListener('play', () => {
                    this.isPaused = true;
                    this.stopAutoScroll();
                    this.pauseOtherVideos(video);
                });

                // When video ends, scroll to next
                video.addEventListener('ended', () => {
                    this.isPaused = false;
                    this.scrollToNext(index);
                });

                // When video paused manually
                video.addEventListener('pause', () => {
                    // Optional: Resume scrolling after short delay?
                    // For now, let user manually control it
                });
            }
        });
    }

    setupTouchEvents() {
        // Stop auto-scroll when user manually touches/scrolls
        this.container.addEventListener('touchstart', () => {
            this.stopAutoScroll();
            this.isPaused = true;
        }, { passive: true });

        // Resume after touch ends (if no video playing)
        this.container.addEventListener('touchend', () => {
            setTimeout(() => {
                if (!this.isVideoPlaying()) {
                    this.isPaused = false;
                    this.startAutoScroll();
                }
            }, 5000); // 5s delay before resuming
        });
    }

    pauseOtherVideos(currentVideo) {
        document.querySelectorAll('video').forEach(video => {
            if (video !== currentVideo && !video.paused) {
                video.pause();
            }
        });
    }

    isVideoPlaying() {
        return Array.from(document.querySelectorAll('video')).some(v => !v.paused);
    }

    scrollToNext(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.cards.length;
        const nextCard = this.cards[nextIndex];

        this.container.scrollTo({
            left: nextCard.offsetLeft - this.container.offsetLeft, // Center it roughly or align left
            behavior: 'smooth'
        });

        // Optional: Auto-play next video?
        // User asked: "whole video play and slide"
        // Let's optimize experience: Scroll first, then play next if needed
        // For now, just slide to next as requested.

        // Resume auto-scroll
        setTimeout(() => {
            if (!this.isVideoPlaying()) this.startAutoScroll();
        }, 1000);
    }
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
class CursorTrail {
    constructor() {
        this.emojis = ['✨', '💕', '💖', '🌹', '❤️', '💗', '✨', '💫'];
        this.throttle = 50; // ms between particles
        this.lastTime = 0;
        this.init();
    }

    init() {
        // Mouse move
        document.addEventListener('mousemove', (e) => this.createSparkle(e.clientX, e.clientY));

        // Touch move for mobile
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            this.createSparkle(touch.clientX, touch.clientY);
        });

        // Touch start for mobile
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createSparkle(touch.clientX, touch.clientY);
        });
    }

    createSparkle(x, y) {
        const now = Date.now();
        if (now - this.lastTime < this.throttle) return;
        this.lastTime = now;

        const sparkle = document.createElement('span');
        sparkle.className = 'cursor-sparkle';
        sparkle.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = (1 + Math.random() * 0.8) + 'rem';

        document.body.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    createFloatingPetals();
    new ReasonsCarousel();
    new VideoCarousel(); // Start video carousel
    setupSurprise();
    setupOpenButton();
    setupScrollAnimations();
    new CursorTrail(); // Add cursor trail
});
