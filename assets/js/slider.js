// ===== HERO SLIDER FUNCTIONALITY =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== SLIDER INITIALIZATION =====
  const slider = {
    currentSlide: 0,
    slides: [],
    dots: [],
    autoplayTimer: null,
    autoplayDelay: 5000,
    isPlaying: true,

    // Initialize slider
    init: function () {
      this.slides = document.querySelectorAll(".hero-slide");
      this.dots = document.querySelectorAll(".dot");
      this.prevBtn = document.querySelector(".hero-prev");
      this.nextBtn = document.querySelector(".hero-next");

      if (this.slides.length === 0) return;

      this.bindEvents();
      this.startAutoplay();
      this.updateSliderState();
    },

    // Bind event listeners
    bindEvents: function () {
      // Navigation buttons
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => {
          this.goToSlide(this.currentSlide - 1);
          this.resetAutoplay();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => {
          this.goToSlide(this.currentSlide + 1);
          this.resetAutoplay();
        });
      }

      // Dots navigation
      this.dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          this.goToSlide(index);
          this.resetAutoplay();
        });
      });

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (this.isSliderInView()) {
          switch (e.key) {
            case "ArrowLeft":
              e.preventDefault();
              this.goToSlide(this.currentSlide - 1);
              this.resetAutoplay();
              break;
            case "ArrowRight":
              e.preventDefault();
              this.goToSlide(this.currentSlide + 1);
              this.resetAutoplay();
              break;
            case " ": // Spacebar
              e.preventDefault();
              this.toggleAutoplay();
              break;
          }
        }
      });

      // Touch/swipe support
      this.initTouchEvents();

      // Pause autoplay when tab is not visible
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.pauseAutoplay();
        } else {
          this.resumeAutoplay();
        }
      });

      // Pause on hover (desktop only)
      const heroSlider = document.querySelector(".hero-slider");
      if (heroSlider && window.innerWidth > 768) {
        heroSlider.addEventListener("mouseenter", () => {
          this.pauseAutoplay();
        });

        heroSlider.addEventListener("mouseleave", () => {
          this.resumeAutoplay();
        });
      }
    },

    // Touch/swipe events
    initTouchEvents: function () {
      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;
      const minSwipeDistance = 50;

      const heroSlider = document.querySelector(".hero-slider");
      if (!heroSlider) return;

      heroSlider.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        },
        { passive: true }
      );

      heroSlider.addEventListener(
        "touchmove",
        (e) => {
          // Prevent default only if it's a horizontal swipe
          const deltaX = Math.abs(e.touches[0].clientX - startX);
          const deltaY = Math.abs(e.touches[0].clientY - startY);

          if (deltaX > deltaY) {
            e.preventDefault();
          }
        },
        { passive: false }
      );

      heroSlider.addEventListener(
        "touchend",
        (e) => {
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;

          const deltaX = startX - endX;
          const deltaY = Math.abs(startY - endY);

          // Check if it's a horizontal swipe
          if (
            Math.abs(deltaX) > minSwipeDistance &&
            Math.abs(deltaX) > deltaY
          ) {
            if (deltaX > 0) {
              // Swipe left - next slide
              this.goToSlide(this.currentSlide + 1);
            } else {
              // Swipe right - previous slide
              this.goToSlide(this.currentSlide - 1);
            }
            this.resetAutoplay();
          }
        },
        { passive: true }
      );
    },

    // Go to specific slide
    goToSlide: function (slideIndex) {
      // Handle wraparound
      if (slideIndex >= this.slides.length) {
        slideIndex = 0;
      } else if (slideIndex < 0) {
        slideIndex = this.slides.length - 1;
      }

      // Update current slide
      this.currentSlide = slideIndex;
      this.updateSliderState();
    },

    // Update slider visual state
    updateSliderState: function () {
      // Update slides
      this.slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === this.currentSlide);
      });

      // Update dots
      this.dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === this.currentSlide);
      });

      // Update accessibility attributes
      this.updateAriaAttributes();
    },

    // Update ARIA attributes for accessibility
    updateAriaAttributes: function () {
      this.slides.forEach((slide, index) => {
        slide.setAttribute("aria-hidden", index !== this.currentSlide);
      });

      this.dots.forEach((dot, index) => {
        dot.setAttribute("aria-pressed", index === this.currentSlide);
      });
    },

    // Autoplay functions
    startAutoplay: function () {
      if (!this.isPlaying) return;

      this.autoplayTimer = setInterval(() => {
        this.goToSlide(this.currentSlide + 1);
      }, this.autoplayDelay);
    },

    pauseAutoplay: function () {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },

    resumeAutoplay: function () {
      if (this.isPlaying && !this.autoplayTimer) {
        this.startAutoplay();
      }
    },

    resetAutoplay: function () {
      this.pauseAutoplay();
      this.resumeAutoplay();
    },

    toggleAutoplay: function () {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.startAutoplay();
      } else {
        this.pauseAutoplay();
      }
    },

    // Check if slider is in viewport
    isSliderInView: function () {
      const heroSection = document.querySelector(".hero");
      if (!heroSection) return false;

      const rect = heroSection.getBoundingClientRect();
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return rect.top < viewHeight && rect.bottom > 0;
    },

    // Get current slide data
    getCurrentSlideData: function () {
      if (this.slides.length === 0) return null;

      const currentSlideElement = this.slides[this.currentSlide];
      const title = currentSlideElement.querySelector("h2")?.textContent || "";
      const description =
        currentSlideElement.querySelector("p")?.textContent || "";
      const button = currentSlideElement.querySelector(".btn");
      const buttonText = button?.textContent || "";
      const buttonLink = button?.getAttribute("href") || "";

      return {
        index: this.currentSlide,
        title,
        description,
        buttonText,
        buttonLink,
      };
    },

    // Destroy slider (cleanup)
    destroy: function () {
      this.pauseAutoplay();
      // Remove event listeners if needed
    },
  };

  // ===== SLIDER CONTROLS ENHANCEMENT =====

  // Add loading states
  function addLoadingStates() {
    const heroImages = document.querySelectorAll(".hero-slide img");
    let loadedImages = 0;

    heroImages.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === heroImages.length) {
            document.querySelector(".hero")?.classList.add("loaded");
          }
        });
      }
    });

    if (loadedImages === heroImages.length) {
      document.querySelector(".hero")?.classList.add("loaded");
    }
  }

  // Add progress indicator
  function addProgressIndicator() {
    const heroSlider = document.querySelector(".hero-slider");
    if (!heroSlider) return;

    const progressBar = document.createElement("div");
    progressBar.className = "slider-progress";
    progressBar.innerHTML = '<div class="slider-progress-bar"></div>';

    // Add CSS for progress bar
    const progressStyles = `
            .slider-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(255, 255, 255, 0.3);
                z-index: 10;
            }
            .slider-progress-bar {
                height: 100%;
                background: #3b82f6;
                width: 0%;
                transition: width linear;
            }
        `;

    if (!document.querySelector("#slider-progress-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "slider-progress-styles";
      styleSheet.textContent = progressStyles;
      document.head.appendChild(styleSheet);
    }

    heroSlider.appendChild(progressBar);

    // Animate progress bar
    function animateProgress() {
      const progressBarElement = progressBar.querySelector(
        ".slider-progress-bar"
      );
      if (progressBarElement && slider.isPlaying) {
        progressBarElement.style.transition = "none";
        progressBarElement.style.width = "0%";

        setTimeout(() => {
          progressBarElement.style.transition = `width ${slider.autoplayDelay}ms linear`;
          progressBarElement.style.width = "100%";
        }, 50);
      }
    }

    // Hook into slider events
    const originalGoToSlide = slider.goToSlide;
    slider.goToSlide = function (slideIndex) {
      originalGoToSlide.call(this, slideIndex);
      animateProgress();
    };

    // Start initial animation
    animateProgress();
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  function enhanceAccessibility() {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    // Add ARIA labels
    heroSection.setAttribute("aria-label", "Hero image carousel");

    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");

    if (prevBtn) {
      prevBtn.setAttribute("aria-label", "Previous slide");
    }

    if (nextBtn) {
      nextBtn.setAttribute("aria-label", "Next slide");
    }

    // Add ARIA labels to dots
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");

      // Add keyboard support for dots
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dot.click();
        }
      });
    });

    // Add live region for announcements
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;

    heroSection.appendChild(liveRegion);

    // Announce slide changes
    const originalUpdateSliderState = slider.updateSliderState;
    slider.updateSliderState = function () {
      originalUpdateSliderState.call(this);

      const slideData = this.getCurrentSlideData();
      if (slideData && liveRegion) {
        liveRegion.textContent = `Slide ${slideData.index + 1} of ${
          this.slides.length
        }: ${slideData.title}`;
      }
    };
  }

  // ===== RESPONSIVE ADJUSTMENTS =====

  function handleResponsiveChanges() {
    let currentBreakpoint = getBreakpoint();

    window.addEventListener(
      "resize",
      debounce(() => {
        const newBreakpoint = getBreakpoint();

        if (newBreakpoint !== currentBreakpoint) {
          currentBreakpoint = newBreakpoint;

          // Adjust autoplay delay based on screen size
          if (currentBreakpoint === "mobile") {
            slider.autoplayDelay = 4000; // Faster on mobile
          } else {
            slider.autoplayDelay = 5000; // Normal on desktop
          }

          slider.resetAutoplay();
        }
      }, 250)
    );
  }

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== INITIALIZE EVERYTHING =====

  // Initialize slider
  slider.init();

  // Add enhancements
  addLoadingStates();
  addProgressIndicator();
  enhanceAccessibility();
  handleResponsiveChanges();

  // Expose slider object for external control
  window.heroSlider = slider;

  // Handle page visibility for performance
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      slider.pauseAutoplay();
    } else if (slider.isPlaying) {
      slider.resumeAutoplay();
    }
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    slider.destroy();
  });
});

// ===== SLIDER API FOR EXTERNAL CONTROL =====

window.sliderAPI = {
  // Control methods
  goToSlide: (index) => window.heroSlider?.goToSlide(index),
  nextSlide: () =>
    window.heroSlider?.goToSlide(window.heroSlider.currentSlide + 1),
  prevSlide: () =>
    window.heroSlider?.goToSlide(window.heroSlider.currentSlide - 1),

  // Autoplay controls
  play: () => {
    if (window.heroSlider) {
      window.heroSlider.isPlaying = true;
      window.heroSlider.startAutoplay();
    }
  },
  pause: () => window.heroSlider?.pauseAutoplay(),
  toggle: () => window.heroSlider?.toggleAutoplay(),

  // State getters
  getCurrentSlide: () => window.heroSlider?.currentSlide || 0,
  getSlideCount: () => window.heroSlider?.slides.length || 0,
  isPlaying: () => window.heroSlider?.isPlaying || false,

  // Configuration
  setAutoplayDelay: (delay) => {
    if (window.heroSlider) {
      window.heroSlider.autoplayDelay = delay;
      window.heroSlider.resetAutoplay();
    }
  },
};
