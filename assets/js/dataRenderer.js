// ===== DATA RENDERER - SỬ DỤNG MOCK DATABASE =====
// File này render dữ liệu từ mockDatabase.js lên các trang HTML

document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra xem mockDatabase đã load chưa
  if (typeof MOCK_DATABASE === "undefined") {
    console.error("Mock Database chưa được load!");
    return;
  }

  // ===== RENDER CHUNG CHO TẤT CẢ TRANG =====
  renderCommonElements();

  // ===== RENDER THEO TỪNG TRANG =====
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "index":
      renderHomePage();
      break;
    case "about":
      renderAboutPage();
      break;
    case "programs":
      renderProgramsPage();
      break;
    case "teachers":
      renderTeachersPage();
      break;
    case "news":
      renderNewsPage();
      break;
    case "contact":
      renderContactPage();
      break;
    default:
      console.log("Unknown page:", currentPage);
  }

  // ===== FUNCTIONS =====

  // Xác định trang hiện tại
  function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().split(".")[0];
    return filename || "index";
  }

  // Render các phần tử chung (header, footer)
  function renderCommonElements() {
    const schoolInfo = DatabaseHelper.getSchoolInfo();

    // Update page title
    if (document.title.includes("Trường Mầm non Tuổi Ngọc")) {
      // Title đã được set sẵn
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = DatabaseHelper.getSiteConfig().seo.description;
    }

    // Update header logo text
    const logoTexts = document.querySelectorAll(".logo-text h1");
    logoTexts.forEach((el) => {
      if (el) el.textContent = schoolInfo.name;
    });

    const logoSubTexts = document.querySelectorAll(".logo-text p");
    logoSubTexts.forEach((el) => {
      if (el)
        el.textContent = `${schoolInfo.address.ward}, ${schoolInfo.address.province}`;
    });

    // Update footer contact info
    updateFooterContact(schoolInfo);

    // Update navigation active state
    updateNavigationActiveState();
  }

  // Cập nhật thông tin liên hệ footer
  function updateFooterContact(schoolInfo) {
    const footerContacts = document.querySelectorAll(".footer-content");
    footerContacts.forEach((footer) => {
      const addressEl = footer.querySelector('p:contains("Địa chỉ")');
      if (addressEl) {
        addressEl.textContent = `Địa chỉ: ${schoolInfo.address.full}`;
      }

      const phoneEl = footer.querySelector('p:contains("Điện thoại")');
      if (phoneEl) {
        phoneEl.textContent = `Điện thoại: ${schoolInfo.contact.phone}`;
      }

      const emailEl = footer.querySelector('p:contains("Email")');
      if (emailEl) {
        emailEl.textContent = `Email: ${schoolInfo.contact.email}`;
      }
    });
  }

  // Cập nhật trạng thái active của navigation
  function updateNavigationActiveState() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll(".navbar a, .nav-menu a");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (
        (currentPage === "index" && href === "index.html") ||
        (currentPage === "about" && href === "about.html") ||
        (currentPage === "programs" && href === "programs.html") ||
        (currentPage === "teachers" && href === "teachers.html") ||
        (currentPage === "news" && href === "news.html") ||
        (currentPage === "contact" && href === "contact.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  // ===== RENDER TRANG CHỦ =====
  function renderHomePage() {
    // Render statistics
    renderStatistics();

    // Render featured news
    renderFeaturedNews();

    // Render programs overview
    renderProgramsOverview();

    // Render latest news
    renderLatestNews();
  }

  function renderStatistics() {
    const stats = DatabaseHelper.getStatistics();

    // Update stat numbers
    const statElements = {
      ".stat-students": stats.students,
      ".stat-teachers": stats.teachers,
      ".stat-classes": stats.classes,
      ".stat-years": stats.yearsInOperation,
    };

    Object.entries(statElements).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = value;
        element.setAttribute("data-target", value);
      }
    });
  }

  function renderFeaturedNews() {
    const featuredNews = DatabaseHelper.getFeaturedNews();
    const container = document.querySelector(".featured-news");

    if (container && featuredNews.length > 0) {
      container.innerHTML = featuredNews
        .map(
          (news) => `
                <article class="news-card featured">
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                        <div class="news-date">
                            <span class="day">${new Date(
                              news.date
                            ).getDate()}</span>
                            <span class="month">Tháng ${
                              new Date(news.date).getMonth() + 1
                            }</span>
                        </div>
                    </div>
                    <div class="news-content">
                        <div class="news-category">${news.category}</div>
                        <h3>${news.title}</h3>
                        <p>${news.summary}</p>
                        <a href="news.html#${news.id}" class="read-more">
                            Đọc thêm <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            `
        )
        .join("");
    }
  }

  function renderProgramsOverview() {
    const programs = DatabaseHelper.getPrograms();
    const container = document.querySelector(".programs-overview");

    if (container) {
      container.innerHTML = programs
        .map(
          (program) => `
                <div class="program-card">
                    <div class="program-icon">
                        <i class="fas fa-child"></i>
                    </div>
                    <h3>${program.name}</h3>
                    <p class="age-range">${program.ageRange}</p>
                    <p>${program.description}</p>
                    <a href="programs.html#${program.id}" class="btn btn-primary">Chi tiết</a>
                </div>
            `
        )
        .join("");
    }
  }

  function renderLatestNews() {
    const latestNews = DatabaseHelper.getNews(null, 4);
    const container = document.querySelector(".latest-news");

    if (container) {
      container.innerHTML = latestNews
        .map(
          (news) => `
                <article class="news-item">
                    <div class="news-date">${DatabaseHelper.formatDate(
                      news.date
                    )}</div>
                    <h4><a href="news.html#${news.id}">${news.title}</a></h4>
                    <p>${news.summary}</p>
                </article>
            `
        )
        .join("");
    }
  }

  // ===== RENDER TRANG GIỚI THIỆU =====
  function renderAboutPage() {
    const aboutData =
      DatabaseHelper.getSchoolInfo().aboutUs || MOCK_DATABASE.aboutUs;
    const facilities = DatabaseHelper.getFacilities();
    const achievements = DatabaseHelper.getAchievements();

    // Render about content
    renderAboutContent(aboutData);

    // Render facilities
    renderFacilitiesList(facilities);

    // Render achievements
    renderAchievements(achievements);
  }

  function renderAboutContent(aboutData) {
    // History
    const historyEl = document.querySelector(".history-content");
    if (historyEl) {
      historyEl.textContent = aboutData.history;
    }

    // Mission & Vision
    const missionEl = document.querySelector(".mission-text");
    if (missionEl) {
      missionEl.textContent = aboutData.mission;
    }

    const visionEl = document.querySelector(".vision-text");
    if (visionEl) {
      visionEl.textContent = aboutData.vision;
    }

    // Core Values
    const valuesContainer = document.querySelector(".values-grid");
    if (valuesContainer && aboutData.coreValues) {
      valuesContainer.innerHTML = aboutData.coreValues
        .map(
          (value) => `
                <div class="value-item">
                    <h3>${value.title}</h3>
                    <p>${value.description}</p>
                </div>
            `
        )
        .join("");
    }
  }

  function renderFacilitiesList(facilities) {
    const facilitiesEl = document.querySelector(".facilities-list");
    if (facilitiesEl) {
      facilitiesEl.innerHTML = facilities
        .map(
          (facility) => `
                <li>
                    <strong>${facility.name}:</strong> ${facility.description}
                    ${
                      facility.features
                        ? "<ul>" +
                          facility.features
                            .map((f) => `<li>${f}</li>`)
                            .join("") +
                          "</ul>"
                        : ""
                    }
                </li>
            `
        )
        .join("");
    }
  }

  function renderAchievements(achievements) {
    const achievementsEl = document.querySelector(".achievements-list");
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements
        .map(
          (achievement) => `
                <div class="achievement-item">
                    <div class="achievement-year">${achievement.year}</div>
                    <div class="achievement-content">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                        <span class="achievement-category">${achievement.category}</span>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // ===== RENDER TRANG CHƯƠNG TRÌNH =====
  function renderProgramsPage() {
    const programs = DatabaseHelper.getPrograms();
    renderProgramsList(programs);
  }

  function renderProgramsList(programs) {
    const container = document.querySelector(".programs-container");
    if (container) {
      container.innerHTML = programs
        .map(
          (program) => `
                <section id="${program.id}" class="program-section">
                    <div class="program-header">
                        <h2>${program.name}</h2>
                        <span class="age-range">${program.ageRange}</span>
                    </div>
                    <div class="program-content">
                        <p class="program-description">${
                          program.description
                        }</p>
                        
                        <div class="program-details">
                            <div class="objectives">
                                <h3>Mục tiêu</h3>
                                <ul>
                                    ${program.objectives
                                      .map((obj) => `<li>${obj}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                            
                            <div class="activities">
                                <h3>Hoạt động</h3>
                                <ul>
                                    ${program.activities
                                      .map((act) => `<li>${act}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="curriculum-info">
                            <h3>Chương trình học</h3>
                            <p>${program.curriculum}</p>
                        </div>
                    </div>
                </section>
            `
        )
        .join("");
    }
  }

  // ===== RENDER TRANG GIÁO VIÊN =====
  function renderTeachersPage() {
    const teachers = DatabaseHelper.getTeachers();
    renderTeachersList(teachers);
  }

  function renderTeachersList(teachers) {
    const container = document.querySelector(".teachers-container");
    if (container) {
      container.innerHTML = teachers
        .map(
          (teacher) => `
                <div class="teacher-card">
                    <div class="teacher-avatar">
                        <img src="assets/images/teachers/teacher-${
                          teacher.id
                        }.jpg" 
                             alt="${teacher.name}" 
                             onerror="this.src='assets/images/default-avatar.jpg'">
                    </div>
                    <div class="teacher-info">
                        <h3>${teacher.name}</h3>
                        <p class="position">${teacher.position}</p>
                        <div class="teacher-details">
                            <p><strong>Học vấn:</strong> ${
                              teacher.education
                            }</p>
                            <p><strong>Kinh nghiệm:</strong> ${
                              teacher.experience
                            }</p>
                            <p><strong>Chuyên môn:</strong> ${
                              teacher.specialization
                            }</p>
                            ${
                              teacher.achievements.length > 0
                                ? `
                                <div class="achievements">
                                    <strong>Thành tích:</strong>
                                    <ul>
                                        ${teacher.achievements
                                          .map((ach) => `<li>${ach}</li>`)
                                          .join("")}
                                    </ul>
                                </div>
                            `
                                : ""
                            }
                        </div>
                        <div class="teacher-contact">
                            <p><i class="fas fa-phone"></i> ${teacher.phone}</p>
                            <p><i class="fas fa-envelope"></i> ${
                              teacher.email
                            }</p>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // ===== RENDER TRANG TIN TỨC =====
  function renderNewsPage() {
    const allNews = DatabaseHelper.getNews();
    renderNewsList(allNews);
    setupNewsFilter();
  }

  function renderNewsList(newsList) {
    const container = document.querySelector(".news-container");
    if (container) {
      container.innerHTML = newsList
        .map(
          (news) => `
                <article id="${news.id}" class="news-article">
                    <div class="news-header">
                        <div class="news-meta">
                            <span class="news-category">${news.category}</span>
                            <span class="news-date">${DatabaseHelper.formatDate(
                              news.date
                            )}</span>
                            <span class="news-author">Bởi: ${news.author}</span>
                        </div>
                        <h2>${news.title}</h2>
                    </div>
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}" 
                             onerror="this.src='assets/images/default-news.jpg'">
                    </div>
                    <div class="news-content">
                        <div class="news-summary">
                            <p>${news.summary}</p>
                        </div>
                        <div class="news-body">
                            ${news.content}
                        </div>
                    </div>
                </article>
            `
        )
        .join("");
    }
  }

  function setupNewsFilter() {
    // Tạo bộ lọc tin tức theo category
    const categories = [
      ...new Set(DatabaseHelper.getNews().map((news) => news.category)),
    ];
    const filterContainer = document.querySelector(".news-filter");

    if (filterContainer) {
      filterContainer.innerHTML = `
                <button class="filter-btn active" data-category="all">Tất cả</button>
                ${categories
                  .map(
                    (cat) => `
                    <button class="filter-btn" data-category="${cat}">${cat}</button>
                `
                  )
                  .join("")}
            `;

      // Xử lý sự kiện filter
      filterContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("filter-btn")) {
          // Update active button
          filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          e.target.classList.add("active");

          // Filter news
          const category = e.target.dataset.category;
          const filteredNews =
            category === "all"
              ? DatabaseHelper.getNews()
              : DatabaseHelper.getNews(category);

          renderNewsList(filteredNews);
        }
      });
    }
  }

  // ===== RENDER TRANG LIÊN HỆ =====
  function renderContactPage() {
    const schoolInfo = DatabaseHelper.getSchoolInfo();
    renderContactInfo(schoolInfo);
    setupContactForm();
  }

  function renderContactInfo(schoolInfo) {
    // Update contact details
    const contactDetails = document.querySelectorAll(".contact-details");
    contactDetails.forEach((detail) => {
      const addressEl = detail.querySelector(".address");
      if (addressEl) addressEl.textContent = schoolInfo.address.full;

      const phoneEl = detail.querySelector(".phone");
      if (phoneEl) phoneEl.textContent = schoolInfo.contact.phone;

      const emailEl = detail.querySelector(".email");
      if (emailEl) emailEl.textContent = schoolInfo.contact.email;
    });

    // Update working hours
    const workingHoursEl = document.querySelector(".working-hours");
    if (workingHoursEl) {
      workingHoursEl.innerHTML = `
                <p>Thứ Hai - Thứ Sáu: ${schoolInfo.workingHours.weekdays}</p>
                <p>Thứ Bảy: ${schoolInfo.workingHours.saturday}</p>
                <p>Chủ Nhật: ${schoolInfo.workingHours.sunday}</p>
            `;
    }
  }

  function setupContactForm() {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simulate form submission
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log("Form submitted:", data);

        // Show success message
        showNotification(
          "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.",
          "success"
        );

        // Reset form
        form.reset();
      });
    }
  }

  // ===== UTILITY FUNCTIONS =====

  function showNotification(message, type = "info") {
    // Tạo notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Styling
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Helper để check nếu element chứa text
  Element.prototype.textContains = function (text) {
    return this.textContent.includes(text);
  };

  // Expose functions globally for debugging
  window.DataRenderer = {
    getCurrentPage,
    renderHomePage,
    renderAboutPage,
    renderProgramsPage,
    renderTeachersPage,
    renderNewsPage,
    renderContactPage,
    showNotification,
  };
});
