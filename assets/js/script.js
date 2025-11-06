// ==================== Navigation Active State ====================
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ==================== Mobile Menu Toggle ====================
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navbar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Close menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navbar = document.querySelector('.navbar');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Form Validation ====================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'Trường này không được bỏ trống');
            isValid = false;
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Email không hợp lệ');
                isValid = false;
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[0-9]{10,}$/;
            if (!phoneRegex.test(input.value.replace(/[-\s]/g, ''))) {
                showError(input, 'Số điện thoại không hợp lệ');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    clearError(input);
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

function clearError(input) {
    input.classList.remove('error');
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// ==================== Contact Form Handling ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(contactForm)) {
                // Simulate sending (in real app, send to server)
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Đang gửi...';

                setTimeout(() => {
                    showSuccessMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }
});

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    document.body.insertBefore(successDiv, document.body.firstChild);
    
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);

    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// ==================== Accordion for FAQ ====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const isOpen = answer.style.maxHeight;
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer !== answer) {
                        otherAnswer.style.maxHeight = null;
                        otherAnswer.style.opacity = '0';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                if (isOpen) {
                    answer.style.maxHeight = null;
                    answer.style.opacity = '0';
                    item.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                    item.classList.add('active');
                }
            });
        }
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.content-section, .program-card, .teacher-card, .news-article').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
});

// ==================== Table of Contents (for long pages) ====================
function generateTableOfContents() {
    const headings = document.querySelectorAll('main h2');
    if (headings.length <= 1) return;

    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Mục lục</h3><ul>';

    headings.forEach((heading, index) => {
        const id = 'heading-' + index;
        heading.id = id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        toc.querySelector('ul').appendChild(li);
    });

    toc.innerHTML += '</ul>';
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.insertBefore(toc, mainContent.firstChild);
    }
}

// Call on pages with many sections
document.addEventListener('DOMContentLoaded', function() {
    const headingCount = document.querySelectorAll('main h2').length;
    if (headingCount > 3) {
        generateTableOfContents();
    }
});

// ==================== Back to Top Button ====================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = window.innerWidth < 480 ? '↑' : '↑ Lên đầu';
    button.className = 'back-to-top';
    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update button text on resize
    window.addEventListener('resize', function() {
        button.innerHTML = window.innerWidth < 480 ? '↑' : '↑ Lên đầu';
    });
}

document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ==================== Print Friendly ====================
function printPage() {
    window.print();
}

// Add print button to pages if needed
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ In trang';
    printBtn.className = 'print-btn';
    printBtn.onclick = printPage;
    // Can be added to header or specific location
}

// ==================== Local Storage for User Preferences ====================
function saveUserPreferences() {
    const preferences = {
        lastVisited: new Date().toISOString(),
        pageUrl: window.location.href
    };
    
    // Note: localStorage is not available in Claude artifacts
    // This is example code for real environments
    try {
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('tuoinoc_preferences', JSON.stringify(preferences));
        }
    } catch(e) {
        console.log('Local storage not available');
    }
}

// ==================== Analytics Tracking ====================
function trackPageView() {
    const pageInfo = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString()
    };
    
    console.log('Page view tracked:', pageInfo);
    // Send to analytics service here
}

document.addEventListener('DOMContentLoaded', function() {
    trackPageView();
    saveUserPreferences();
});

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', function(e) {
    // Alt + H: Go to home
    if (e.altKey && e.key === 'h') {
        window.location.href = 'index.html';
    }
    
    // Alt + C: Go to contact
    if (e.altKey && e.key === 'c') {
        window.location.href = 'contact.html';
    }
});

// ==================== Time-based Greeting ====================
function setTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Xin chào';
    
    if (hour < 12) {
        greeting = 'Chào buổi sáng';
    } else if (hour < 17) {
        greeting = 'Chào buổi chiều';
    } else {
        greeting = 'Chào buổi tối';
    }
    
    console.log('%c' + greeting + ' đến với Trường Mầm non Tuổi Ngọc', 'color: #2a5298; font-size: 16px; font-weight: bold;');
}

document.addEventListener('DOMContentLoaded', setTimeBasedGreeting);

// ==================== External Links Warning ====================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// ==================== Utility Functions ====================
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('vi-VN', options);
}

function getMonthYear() {
    const date = new Date();
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    return months[date.getMonth()] + ' ' + date.getFullYear();
}