// ===== MAIN JAVASCRIPT FOR TRƯỜNG MẦM NON TUỔI NGỌC =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== INITIALIZE ALL COMPONENTS =====
  initializeNavigation();
  initializeScrollEffects();
  initializeStatsCounter();
  initializeFormHandling();
  initializeBackToTop();
  initializeLazyLoading();
  initializeScrollAnimations();

  // ===== NAVIGATION FUNCTIONALITY =====
  function initializeNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
      });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu
          if (navMenu.classList.contains("active")) {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          }

          // Update active link
          updateActiveNavLink(targetId);
        }
      });
    });

    // Update active navigation link on scroll
    window.addEventListener("scroll", updateActiveNavOnScroll);
  }

  function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active");
      }
    });
  }

  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const headerHeight = document.querySelector(".header").offsetHeight;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // ===== SCROLL EFFECTS =====
  function initializeScrollEffects() {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ===== STATISTICS COUNTER =====
  function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");
    const statsSection = document.querySelector(".stats");
    let hasAnimated = false;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateStats();
        }
      });
    }, observerOptions);

    if (statsSection) {
      observer.observe(statsSection);
    }

    function animateStats() {
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  // ===== FORM HANDLING =====
  function initializeFormHandling() {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }

        // Validate form
        if (validateForm(data)) {
          // Show loading state
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = "Đang gửi...";
          submitBtn.disabled = true;
          submitBtn.classList.add("loading");

          // Simulate form submission
          setTimeout(() => {
            showNotification(
              "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
              "success"
            );
            this.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
          }, 1500);
        } else {
          showNotification("Vui lòng điền đầy đủ thông tin bắt buộc.", "error");
        }
      });
    }
  }

  function validateForm(data) {
    const required = ["name", "email", "phone", "subject", "message"];
    return required.every((field) => data[field] && data[field].trim() !== "");
  }

  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existing = document.querySelector(".notification");
    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${
              type === "success"
                ? "#059669"
                : type === "error"
                ? "#dc2626"
                : "#3b82f6"
            };
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 9999;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Handle close button
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ===== BACK TO TOP BUTTON =====
  function initializeBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      });

      backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  // ===== LAZY LOADING FOR IMAGES =====
  function initializeLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ===== SCROLL ANIMATIONS =====
  function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll(".fade-in");

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animateElements.forEach((el) => {
      animationObserver.observe(el);
    });
  }

  // ===== UTILITY FUNCTIONS =====

  // Debounce function for performance optimization
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

  // Format date function
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  }

  // Smooth scroll to element
  function scrollToElement(elementId, offset = 0) {
    const element = document.querySelector(elementId);
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = element.offsetTop - headerHeight - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Get viewport width
  function getViewportWidth() {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
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

  // ===== ACCESSIBILITY IMPROVEMENTS =====

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Escape key closes mobile menu
    if (e.key === "Escape") {
      const navMenu = document.querySelector(".nav-menu");
      const navToggle = document.querySelector(".nav-toggle");

      if (navMenu && navMenu.classList.contains("active")) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    }
  });

  // Focus management for mobile menu
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setTimeout(() => {
        if (document.querySelector(".nav-menu").classList.contains("active")) {
          const firstNavLink = document.querySelector(".nav-link");
          if (firstNavLink) {
            firstNavLink.focus();
          }
        }
      }, 100);
    });
  }

  // ===== ERROR HANDLING =====
  window.addEventListener("error", function (e) {
    console.error("JavaScript Error:", e.error);
    // Could implement error reporting here
  });

  // ===== PERFORMANCE MONITORING =====
  if ("performance" in window) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "Page Load Time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
      }, 0);
    });
  }

  // ===== EXPORT FUNCTIONS FOR TESTING =====
  window.schoolWebsite = {
    scrollToElement,
    showNotification,
    formatDate,
    isInViewport,
    getViewportWidth,
  };
});

// ===== SERVICE WORKER REGISTRATION (Progressive Web App) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed");
      });
  });
}
