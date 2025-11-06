// ==================== Counter Animation ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    updateCounter();
}

// Start counter animation when element becomes visible
document.addEventListener('DOMContentLoaded', function() {
    const statBoxes = document.querySelectorAll('.stat-box h3');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const text = entry.target.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                animateCounter(entry.target, number);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);

    statBoxes.forEach(box => observer.observe(box));
});

// ==================== Progress Bar Animation ====================
function animateProgressBar(element, percentage) {
    const bar = element.querySelector('.progress-fill');
    if (!bar) return;
    
    let current = 0;
    const target = percentage;
    const increment = target / 30;

    const update = () => {
        if (current < target) {
            current += increment;
            bar.style.width = Math.floor(current) + '%';
            requestAnimationFrame(update);
        } else {
            bar.style.width = target + '%';
        }
    };

    update();
}

// ==================== Parallax Effect ====================
function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const speed = element.getAttribute('data-parallax') || 0.5;
            
            if (scrollPosition + window.innerHeight > elementOffset) {
                element.style.backgroundPosition = `0 ${scrollPosition * speed}px`;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', parallaxEffect);

// ==================== Stagger Animation ====================
function staggerAnimate(elements, delayBetween = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'fadeIn 0.6s ease-out forwards';
        }, index * delayBetween);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.program-card, .teacher-card');
    if (cards.length > 0) {
        staggerAnimate(cards, 100);
    }
});

// ==================== Hover Effects ====================
function addHoverEffects() {
    const hoverElements = document.querySelectorAll('.program-card, .teacher-card, .news-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', addHoverEffects);

// ==================== Button Ripple Effect ====================
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - button.offsetLeft - radius) + 'px';
    circle.style.top = (event.clientY - button.offsetTop - radius) + 'px';
    circle.classList.add('ripple');

    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// ==================== Fade In on Scroll ====================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.content-section, .program-card, .news-article');
    
    const fadeIn = (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        fadeIn(element);
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', fadeInOnScroll);

// ==================== Scale Animation on Click ====================
function addClickAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addClickAnimation('.submit-btn');
});

// ==================== Rotate Animation ====================
function rotateOnHover(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    rotateOnHover('.teacher-avatar');
});

// ==================== Text Typing Effect ====================
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };

    type();
}

// Usage: typeText(element, 'Your text here', 50)

// ==================== Gradient Animation ====================
function animateGradient(element) {
    element.style.backgroundSize = '200% 200%';
    element.style.animation = 'gradient 3s ease infinite';
}

// ==================== Slide Animation ====================
function slideIn(element, direction = 'left', duration = 0.6) {
    const transforms = {
        left: 'translateX(-100px)',
        right: 'translateX(100px)',
        up: 'translateY(100px)',
        down: 'translateY(-100px)'
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction] || transforms.left;
    element.style.transition = `all ${duration}s ease-out`;

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
    }, 10);
}

// ==================== Bounce Animation ====================
function bounce(element, height = 20, duration = 0.6) {
    element.style.animation = `bounce ${duration}s ease-in-out infinite`;
    const keyframes = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-${height}px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
}

// ==================== Highlight Animation ====================
function highlightElement(element, color = '#fff3cd', duration = 1000) {
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = color;
    element.style.transition = `background-color ${duration}ms ease`;

    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, duration);
}

// ==================== Shake Animation ====================
function shake(element, intensity = 5, duration = 0.5) {
    const keyframes = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(${intensity}px); }
            50% { transform: translateX(-${intensity}px); }
            75% { transform: translateX(${intensity}px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    element.style.animation = `shake ${duration}s`;
    
    setTimeout(() => {
        element.style.animation = '';
    }, duration * 1000);
}

// ==================== Flip Animation ====================
function flip(element) {
    element.style.transition = 'transform 0.6s';
    element.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
        element.style.transform = 'rotateY(0deg)';
    }, 1200);
}

// ==================== Pulse Animation ====================
function pulse(element, scale = 1.1, duration = 0.6) {
    element.style.animation = `pulseAnim ${duration}s ease-out`;
    
    const keyframes = `
        @keyframes pulseAnim {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(${scale}); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
}