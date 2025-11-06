// ===== WEBSITE CONFIGURATION =====
// File này chứa các cấu hình dễ thay đổi cho website

const CONFIG = {
  // Thông tin cơ bản của trường
  school: {
    name: "Trường Mầm non Tuổi Ngọc",
    shortName: "Tuổi Ngọc",
    address: "Xã Quảng Phú, Huyện Cư M'gar, Tỉnh Đắk Lắk",
    phone: "0262.XXX.XXXX",
    email: "truongmamnontuoingoc@daklak.edu.vn",
    website: "https://truongmamnontuoingoc.edu.vn",
    establishedYear: 2009,
    principal: "Cô Nguyễn Thị A",
  },

  // Giờ làm việc
  workingHours: {
    weekdays: "6:30 - 17:00",
    saturday: "6:30 - 11:30",
    sunday: "Nghỉ",
  },

  // Mạng xã hội
  socialMedia: {
    facebook: "https://facebook.com/truongmamnontuoingoc",
    youtube: "https://youtube.com/@truongmamnontuoingoc",
    instagram: "#",
  },

  // Cấu hình slider
  slider: {
    autoplayDelay: 5000, // 5 giây
    showDots: true,
    showArrows: true,
    loop: true,
  },

  // Cấu hình gallery
  gallery: {
    itemsPerPage: 9,
    enableLightbox: true,
    enableFilters: true,
    categories: [
      { id: "all", label: "Tất cả" },
      { id: "classroom", label: "Lớp học" },
      { id: "activities", label: "Hoạt động" },
      { id: "events", label: "Sự kiện" },
      { id: "facilities", label: "Cơ sở vật chất" },
    ],
  },

  // Cấu hình form liên hệ
  contact: {
    enableValidation: true,
    showSuccessMessage: true,
    redirectAfterSubmit: false,
    maxMessageLength: 500,
  },

  // Cấu hình SEO
  seo: {
    title: "Trường Mầm non Tuổi Ngọc - Xã Quảng Phú, Đắk Lắk",
    description:
      "Trường Mầm non Tuổi Ngọc - Môi trường giáo dục chất lượng, an toàn và yêu thương cho trẻ em xã Quảng Phú, tỉnh Đắk Lắk.",
    keywords:
      "mầm non, trường mầm non, Tuổi Ngọc, Quảng Phú, Đắk Lắk, giáo dục mầm non",
    author: "Trường Mầm non Tuổi Ngọc",
  },

  // Màu sắc chủ đạo (có thể override trong CSS)
  colors: {
    primary: "#1e40af",
    secondary: "#059669",
    accent: "#dc2626",
    text: "#374151",
    background: "#ffffff",
  },

  // Cấu hình hiệu ứng
  animations: {
    enableScrollAnimations: true,
    enableHoverEffects: true,
    enableTransitions: true,
    reducedMotion: false, // Tự động phát hiện từ hệ thống
  },

  // Cấu hình accessibility
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReaderSupport: true,
    enableHighContrast: false,
    enableFocusIndicators: true,
  },

  // Cấu hình performance
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCaching: true,
    preloadCriticalResources: true,
  },

  // Menu navigation
  navigation: [
    { id: "home", label: "Trang chủ", href: "#home" },
    { id: "about", label: "Giới thiệu", href: "#about" },
    { id: "programs", label: "Chương trình", href: "#programs" },
    { id: "news", label: "Tin tức", href: "#news" },
    { id: "gallery", label: "Thư viện", href: "#gallery" },
    { id: "contact", label: "Liên hệ", href: "#contact" },
  ],

  // Thống kê trường
  stats: {
    students: 180,
    teachers: 25,
    classes: 8,
    yearsOfOperation: 15,
  },

  // Cấu hình responsive breakpoints
  breakpoints: {
    mobile: 576,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
  },

  // Text content có thể thay đổi
  content: {
    heroTitle: "Chào mừng đến với Trường Mầm non Tuổi Ngọc",
    heroSubtitle:
      "Môi trường giáo dục chất lượng, an toàn và yêu thương cho trẻ em xã Quảng Phú",
    aboutTitle: "Giới thiệu về trường",
    aboutSubtitle: "Trường Mầm non Tuổi Ngọc - Nơi ươm mầm tương lai",
  },
};

// Export configuration
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}

// Make available globally
window.CONFIG = CONFIG;
