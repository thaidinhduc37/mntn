// ===== GALLERY FUNCTIONALITY =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== GALLERY FILTER SYSTEM =====
  const gallery = {
    filterButtons: [],
    galleryItems: [],
    currentFilter: "all",
    lightbox: null,

    // Initialize gallery
    init: function () {
      this.filterButtons = document.querySelectorAll(".filter-btn");
      this.galleryItems = document.querySelectorAll(".gallery-item");

      if (this.galleryItems.length === 0) return;

      this.bindEvents();
      this.initLightbox();
      this.addAccessibility();

      // Initial filter
      this.filterItems("all");
    },

    // Bind event listeners
    bindEvents: function () {
      // Filter button events
      this.filterButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const filter = button.getAttribute("data-filter");
          this.setActiveFilter(button);
          this.filterItems(filter);
        });
      });

      // Gallery item click events for lightbox
      this.galleryItems.forEach((item, index) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          this.openLightbox(index);
        });

        // Keyboard support
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.openLightbox(index);
          }
        });
      });
    },

    // Set active filter button
    setActiveFilter: function (activeButton) {
      this.filterButtons.forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });

      activeButton.classList.add("active");
      activeButton.setAttribute("aria-pressed", "true");
      this.currentFilter = activeButton.getAttribute("data-filter");
    },

    // Filter gallery items
    filterItems: function (filter) {
      let visibleCount = 0;

      this.galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          this.showItem(item, visibleCount * 100); // Stagger animation
          visibleCount++;
        } else {
          this.hideItem(item);
        }
      });

      // Update accessibility announcement
      this.announceFilterResults(visibleCount, filter);
    },

    // Show gallery item with animation
    showItem: function (item, delay = 0) {
      item.style.display = "block";
      item.style.opacity = "0";
      item.style.transform = "translateY(20px) scale(0.95)";

      setTimeout(() => {
        item.style.transition = "all 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0) scale(1)";
      }, delay);
    },

    // Hide gallery item with animation
    hideItem: function (item) {
      item.style.transition = "all 0.3s ease";
      item.style.opacity = "0";
      item.style.transform = "translateY(-20px) scale(0.95)";

      setTimeout(() => {
        item.style.display = "none";
      }, 300);
    },

    // Announce filter results for screen readers
    announceFilterResults: function (count, filter) {
      const announcement = document.getElementById("gallery-announcement");
      if (announcement) {
        const filterText =
          filter === "all" ? "tất cả" : this.getFilterLabel(filter);
        announcement.textContent = `Hiển thị ${count} hình ảnh thuộc danh mục ${filterText}`;
      }
    },

    // Get filter label in Vietnamese
    getFilterLabel: function (filter) {
      const labels = {
        classroom: "lớp học",
        activities: "hoạt động",
        events: "sự kiện",
        facilities: "cơ sở vật chất",
      };
      return labels[filter] || filter;
    },

    // Add accessibility features
    addAccessibility: function () {
      // Add ARIA announcement region
      if (!document.getElementById("gallery-announcement")) {
        const announcement = document.createElement("div");
        announcement.id = "gallery-announcement";
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "sr-only";
        announcement.style.cssText = `
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

        const gallerySection = document.querySelector(".gallery");
        if (gallerySection) {
          gallerySection.appendChild(announcement);
        }
      }

      // Make gallery items focusable
      this.galleryItems.forEach((item, index) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Xem hình ảnh ${index + 1}`);
      });

      // Add ARIA labels to filter buttons
      this.filterButtons.forEach((button) => {
        const filter = button.getAttribute("data-filter");
        const label =
          filter === "all"
            ? "Hiển thị tất cả hình ảnh"
            : `Lọc theo ${this.getFilterLabel(filter)}`;
        button.setAttribute("aria-label", label);
        button.setAttribute("role", "button");
        button.setAttribute(
          "aria-pressed",
          button.classList.contains("active")
        );
      });
    },

    // ===== LIGHTBOX FUNCTIONALITY =====

    // Initialize lightbox
    initLightbox: function () {
      this.createLightboxHTML();
      this.bindLightboxEvents();
    },

    // Create lightbox HTML structure
    createLightboxHTML: function () {
      const lightboxHTML = `
                <div id="gallery-lightbox" class="lightbox" role="dialog" aria-modal="true" aria-hidden="true">
                    <div class="lightbox-overlay"></div>
                    <div class="lightbox-container">
                        <button class="lightbox-close" aria-label="Đóng lightbox">&times;</button>
                        <button class="lightbox-prev" aria-label="Hình ảnh trước">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="lightbox-next" aria-label="Hình ảnh sau">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="lightbox-content">
                            <img class="lightbox-image" src="" alt="" />
                            <div class="lightbox-info">
                                <h3 class="lightbox-title"></h3>
                                <p class="lightbox-description"></p>
                                <div class="lightbox-counter">
                                    <span class="lightbox-current">1</span> / <span class="lightbox-total">1</span>
                                </div>
                            </div>
                        </div>
                        <div class="lightbox-loading">
                            <div class="loading-spinner"></div>
                        </div>
                    </div>
                </div>
            `;

      document.body.insertAdjacentHTML("beforeend", lightboxHTML);
      this.lightbox = document.getElementById("gallery-lightbox");

      // Add lightbox styles
      this.addLightboxStyles();
    },

    // Add lightbox CSS styles
    addLightboxStyles: function () {
      if (document.getElementById("lightbox-styles")) return;

      const styles = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .lightbox.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                }
                
                .lightbox-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    box-sizing: border-box;
                }
                
                .lightbox-content {
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                }
                
                .lightbox.active .lightbox-content {
                    transform: scale(1);
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                .lightbox-info {
                    color: white;
                    padding: 20px 0;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .lightbox-title {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: white;
                }
                
                .lightbox-description {
                    font-size: 16px;
                    opacity: 0.9;
                    margin-bottom: 15px;
                }
                
                .lightbox-counter {
                    font-size: 14px;
                    opacity: 0.7;
                }
                
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    position: absolute;
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .lightbox-close {
                    top: 20px;
                    right: 20px;
                    font-size: 30px;
                }
                
                .lightbox-prev {
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .lightbox-next {
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .lightbox-close:hover,
                .lightbox-prev:hover,
                .lightbox-next:hover {
                    background: rgba(255,255,255,0.2);
                    transform: scale(1.1);
                }
                
                .lightbox-next:hover {
                    transform: translateY(-50%) scale(1.1);
                }
                
                .lightbox-prev:hover {
                    transform: translateY(-50%) scale(1.1);
                }
                
                .lightbox-loading {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: none;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @media (max-width: 768px) {
                    .lightbox-container {
                        padding: 10px;
                    }
                    
                    .lightbox-image {
                        max-height: 60vh;
                    }
                    
                    .lightbox-title {
                        font-size: 20px;
                    }
                    
                    .lightbox-description {
                        font-size: 14px;
                    }
                    
                    .lightbox-close,
                    .lightbox-prev,
                    .lightbox-next {
                        width: 40px;
                        height: 40px;
                        font-size: 18px;
                    }
                }
            `;

      const styleSheet = document.createElement("style");
      styleSheet.id = "lightbox-styles";
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    },

    // Bind lightbox events
    bindLightboxEvents: function () {
      if (!this.lightbox) return;

      const closeBtn = this.lightbox.querySelector(".lightbox-close");
      const prevBtn = this.lightbox.querySelector(".lightbox-prev");
      const nextBtn = this.lightbox.querySelector(".lightbox-next");
      const overlay = this.lightbox.querySelector(".lightbox-overlay");

      // Close lightbox
      closeBtn?.addEventListener("click", () => this.closeLightbox());
      overlay?.addEventListener("click", () => this.closeLightbox());

      // Navigation
      prevBtn?.addEventListener("click", () => this.showPrevImage());
      nextBtn?.addEventListener("click", () => this.showNextImage());

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!this.lightbox.classList.contains("active")) return;

        switch (e.key) {
          case "Escape":
            this.closeLightbox();
            break;
          case "ArrowLeft":
            this.showPrevImage();
            break;
          case "ArrowRight":
            this.showNextImage();
            break;
        }
      });
    },

    // Open lightbox with specific image
    openLightbox: function (index) {
      if (!this.lightbox) return;

      this.currentImageIndex = index;
      this.updateLightboxContent();

      // Show lightbox
      this.lightbox.classList.add("active");
      this.lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus management
      const closeBtn = this.lightbox.querySelector(".lightbox-close");
      closeBtn?.focus();
    },

    // Close lightbox
    closeLightbox: function () {
      if (!this.lightbox) return;

      this.lightbox.classList.remove("active");
      this.lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      // Return focus to the gallery item that opened the lightbox
      const currentItem = this.galleryItems[this.currentImageIndex];
      currentItem?.focus();
    },

    // Show previous image
    showPrevImage: function () {
      this.currentImageIndex =
        this.currentImageIndex > 0
          ? this.currentImageIndex - 1
          : this.galleryItems.length - 1;
      this.updateLightboxContent();
    },

    // Show next image
    showNextImage: function () {
      this.currentImageIndex =
        this.currentImageIndex < this.galleryItems.length - 1
          ? this.currentImageIndex + 1
          : 0;
      this.updateLightboxContent();
    },

    // Update lightbox content
    updateLightboxContent: function () {
      if (!this.lightbox) return;

      const currentItem = this.galleryItems[this.currentImageIndex];
      const img = currentItem.querySelector("img");
      const overlay = currentItem.querySelector(".gallery-overlay");

      // Show loading
      const loading = this.lightbox.querySelector(".lightbox-loading");
      const content = this.lightbox.querySelector(".lightbox-content");
      loading.style.display = "block";
      content.style.opacity = "0";

      // Update image
      const lightboxImg = this.lightbox.querySelector(".lightbox-image");
      lightboxImg.onload = () => {
        loading.style.display = "none";
        content.style.opacity = "1";
      };
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Update info
      const title = overlay?.querySelector("h4")?.textContent || "";
      const description = overlay?.querySelector("p")?.textContent || "";

      this.lightbox.querySelector(".lightbox-title").textContent = title;
      this.lightbox.querySelector(".lightbox-description").textContent =
        description;

      // Update counter
      this.lightbox.querySelector(".lightbox-current").textContent =
        this.currentImageIndex + 1;
      this.lightbox.querySelector(".lightbox-total").textContent =
        this.galleryItems.length;
    },
  };

  // ===== GALLERY UTILITIES =====

  // Masonry layout (if needed)
  function initMasonryLayout() {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (!galleryGrid) return;

    // Simple masonry-like layout using CSS Grid
    function updateMasonryLayout() {
      const items = galleryGrid.querySelectorAll(".gallery-item");
      items.forEach((item) => {
        const img = item.querySelector("img");
        if (img && img.complete) {
          const ratio = img.naturalHeight / img.naturalWidth;
          const spans = Math.ceil(ratio * 10);
          item.style.gridRowEnd = `span ${Math.max(spans, 10)}`;
        }
      });
    }

    // Update layout when images load
    const images = galleryGrid.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        updateMasonryLayout();
      } else {
        img.addEventListener("load", updateMasonryLayout);
      }
    });

    // Update on window resize
    window.addEventListener("resize", debounce(updateMasonryLayout, 250));
  }

  // Lazy loading for gallery images
  function initGalleryLazyLoading() {
    const galleryImages = document.querySelectorAll(".gallery-item img");

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "100px",
      }
    );

    galleryImages.forEach((img) => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }

  // Debounce function
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

  // ===== INITIALIZE GALLERY =====

  gallery.init();
  initMasonryLayout();
  initGalleryLazyLoading();

  // Expose gallery API
  window.galleryAPI = {
    filterItems: (filter) => gallery.filterItems(filter),
    openLightbox: (index) => gallery.openLightbox(index),
    closeLightbox: () => gallery.closeLightbox(),
    getCurrentFilter: () => gallery.currentFilter,
    getVisibleItems: () => {
      return Array.from(gallery.galleryItems).filter(
        (item) => item.style.display !== "none"
      ).length;
    },
  };
});
