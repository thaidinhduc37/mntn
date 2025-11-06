// ===== MAIN JAVASCRIPT FOR TRƯỜNG MẦM NON TUỔI NGỌC =====

document.addEventListener("DOMContentLoaded", function () {
  console.log("🌸 Website Trường Mầm non Tuổi Ngọc initialized");

  // ===== INITIALIZE ALL COMPONENTS =====
  initializeNavigation();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeStatsCounter();
  initializeFormHandling();
  initializeBackToTop();
  initializeLazyLoading();
  initializeScrollAnimations();
  initializeTouchOptimizations();
  initializeResponsiveImages();

  // ===== MOBILE NAVIGATION FUNCTIONALITY =====
  function initializeMobileMenu() {
    // Tạo mobile toggle button nếu chưa có
    let navToggle = document.querySelector(".nav-toggle");
    const header = document.querySelector("header");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    if (!navToggle && header) {
      navToggle = document.createElement("button");
      navToggle.className = "nav-toggle";
      navToggle.setAttribute("aria-label", "Mở menu điều hướng");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;

      const headerContent =
        header.querySelector(".header-content") ||
        header.querySelector(".container");
      if (headerContent) {
        headerContent.appendChild(navToggle);
      }
    }

    if (!navToggle || !navbar) return;

    // Toggle mobile menu
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = navbar.classList.contains("active");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking nav links
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 575) {
          setTimeout(closeMobileMenu, 150);
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 575 &&
        navbar.classList.contains("active") &&
        !navbar.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close menu on window resize
    window.addEventListener(
      "resize",
      debounce(function () {
        if (window.innerWidth > 575 && navbar.classList.contains("active")) {
          closeMobileMenu();
        }
      }, 250)
    );

    // Close menu with ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navbar.classList.contains("active")) {
        closeMobileMenu();
        navToggle.focus();
      }
    });

    // Trap focus in mobile menu
    document.addEventListener("keydown", function (e) {
      if (navbar.classList.contains("active") && e.key === "Tab") {
        trapFocus(e, navbar);
      }
    });

    function openMobileMenu() {
      navbar.classList.add("active");
      navToggle.classList.add("active");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Đóng menu điều hướng");
      body.classList.add("nav-open");

      // Prevent scrolling
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      // Focus first link for accessibility
      const firstLink = navbar.querySelector("a");
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }

    function closeMobileMenu() {
      navbar.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Mở menu điều hướng");
      body.classList.remove("nav-open");

      // Restore scrolling
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Focus trap helper
    function trapFocus(e, container) {
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  // ===== ENHANCED NAVIGATION FUNCTIONALITY =====
  function initializeNavigation() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    if (!navbar) return;

    // Highlight current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPage ||
        (currentPage === "index.html" && href === "index.html") ||
        (currentPath === "/" && href === "index.html")
      ) {
        link.classList.add("active");
      }
    });

    // Smooth scrolling for hash links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
            const headerHeight =
              document.querySelector("header")?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  // ===== TOUCH OPTIMIZATIONS =====
  function initializeTouchOptimizations() {
    // Detect touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
      document.body.classList.add("touch-device");

      // Improve button feedback on touch
      const touchElements = document.querySelectorAll(
        ".btn, .nav-toggle, .program-card, .news-card, .teacher-card"
      );

      touchElements.forEach((element) => {
        element.addEventListener(
          "touchstart",
          function () {
            this.classList.add("touching");
          },
          { passive: true }
        );

        element.addEventListener(
          "touchend",
          function () {
            setTimeout(() => {
              this.classList.remove("touching");
            }, 150);
          },
          { passive: true }
        );

        element.addEventListener(
          "touchcancel",
          function () {
            this.classList.remove("touching");
          },
          { passive: true }
        );
      });

      // Improve scroll performance
      let ticking = false;

      document.addEventListener(
        "touchmove",
        function () {
          if (!ticking) {
            requestAnimationFrame(function () {
              ticking = false;
            });
            ticking = true;
          }
        },
        { passive: true }
      );
    }

    // Handle orientation change
    window.addEventListener("orientationchange", function () {
      setTimeout(() => {
        // Force reflow to fix layout issues
        const activeElement = document.activeElement;
        if (activeElement && activeElement.scrollIntoView) {
          activeElement.scrollIntoView({ block: "center" });
        }

        // Recalculate viewport height
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      }, 500);
    });

    // Set initial viewport height
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );

    // Update on resize
    window.addEventListener(
      "resize",
      debounce(function () {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      }, 250)
    );
  }

  // ===== RESPONSIVE IMAGES =====
  function initializeResponsiveImages() {
    // Lazy loading for images
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // Responsive image sizing
    const images = document.querySelectorAll(
      ".news-image img, .teacher-avatar img"
    );
    images.forEach((img) => {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    });
  }

  // ===== SCROLL EFFECTS =====
  function initializeScrollEffects() {
    const header = document.querySelector("header");
    let lastScrollTop = 0;
    let scrollTimeout;

    if (!header) return;

    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Add scrolled class
          if (scrollTop > 100) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }

          // Hide/show header on mobile
          if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
              header.classList.add("hidden");
            } else {
              header.classList.remove("hidden");
            }
          }

          lastScrollTop = scrollTop;
        }, 10);
      },
      { passive: true }
    );
  }

  // ===== STATISTICS COUNTER =====
  function initializeStatsCounter() {
    const stats = document.querySelectorAll(".stat-number");

    if ("IntersectionObserver" in window) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      stats.forEach((stat) => statsObserver.observe(stat));
    }

    function animateCounter(element) {
      const target = parseInt(element.textContent);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 16);
    }
  }

  // ===== FORM HANDLING =====
  function initializeFormHandling() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, textarea, select");

      // Enhance form inputs
      inputs.forEach((input) => {
        // Label animation
        input.addEventListener("focus", function () {
          this.parentElement.classList.add("focused");
        });

        input.addEventListener("blur", function () {
          if (!this.value) {
            this.parentElement.classList.remove("focused");
          }
        });

        // Validation
        input.addEventListener("invalid", function () {
          this.classList.add("error");
        });

        input.addEventListener("input", function () {
          this.classList.remove("error");
        });
      });

      // Form submission
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Đang gửi...";
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = "Đã gửi!";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.reset();
          }, 2000);
        }, 1000);
      });
    });
  }

  // ===== BACK TO TOP =====
  function initializeBackToTop() {
    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute("aria-label", "Lên đầu trang");
    document.body.appendChild(backToTop);

    window.addEventListener(
      "scroll",
      debounce(() => {
        if (window.pageYOffset > 500) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }, 100),
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== LAZY LOADING =====
  function initializeLazyLoading() {
    if ("IntersectionObserver" in window) {
      const lazyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target;
              element.classList.add("loaded");
              lazyObserver.unobserve(element);
            }
          });
        },
        { rootMargin: "50px" }
      );

      document.querySelectorAll(".lazy-load").forEach((el) => {
        lazyObserver.observe(el);
      });
    }
  }

  // ===== SCROLL ANIMATIONS =====
  function initializeScrollAnimations() {
    if ("IntersectionObserver" in window) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        animationObserver.observe(el);
      });
    }
  }

  // ===== UTILITY FUNCTIONS =====
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

  // ===== ERROR HANDLING =====
  window.addEventListener("error", function (e) {
    console.error("❌ JavaScript Error:", e.error);
  });

  // ===== PERFORMANCE MONITORING =====
  if ("performance" in window) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "⚡ Page Load Time:",
          Math.round(perfData.loadEventEnd - perfData.loadEventStart),
          "ms"
        );
      }, 0);
    });
  }
});

// ===== GLOBAL UTILITIES =====

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Export for use in other scripts
window.SchoolUtils = {
  showNotification,
  formatNumber,
  isInViewport,
};
