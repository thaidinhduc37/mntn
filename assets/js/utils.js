// ==================== Date & Time Utilities ====================
const DateUtils = {
    formatDate: function(date, format = 'dd/mm/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        if (format === 'dd/mm/yyyy') {
            return `${day}/${month}/${year}`;
        } else if (format === 'vietnamese') {
            const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                           'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
            return `${day} ${months[d.getMonth()]} ${year}`;
        }
        return date;
    },

    getRelativeTime: function(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'Vừa xong';
        if (minutes < 60) return `${minutes} phút trước`;
        if (hours < 24) return `${hours} giờ trước`;
        if (days < 7) return `${days} ngày trước`;
        if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
        
        return this.formatDate(date, 'vietnamese');
    },

    getDayName: function(date) {
        const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        return days[new Date(date).getDay()];
    },

    isToday: function(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return today.toDateString() === checkDate.toDateString();
    },

    isTomorrow: function(date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const checkDate = new Date(date);
        return tomorrow.toDateString() === checkDate.toDateString();
    }
};

// ==================== String Utilities ====================
const StringUtils = {
    capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    capitalizeWords: function(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    },

    truncate: function(str, length = 100, suffix = '...') {
        if (str.length > length) {
            return str.substring(0, length) + suffix;
        }
        return str;
    },

    removeTags: function(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    },

    slugify: function(str) {
        return str.toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-');
    },

    countWords: function(str) {
        return str.trim().split(/\s+/).length;
    },

    reverseString: function(str) {
        return str.split('').reverse().join('');
    }
};

// ==================== Array Utilities ====================
const ArrayUtils = {
    shuffle: function(arr) {
        const newArr = [...arr];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    },

    unique: function(arr) {
        return [...new Set(arr)];
    },

    chunk: function(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },

    flatten: function(arr) {
        return arr.reduce((flat, item) => {
            return flat.concat(Array.isArray(item) ? this.flatten(item) : item);
        }, []);
    },

    groupBy: function(arr, key) {
        return arr.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) groups[group] = [];
            groups[group].push(item);
            return groups;
        }, {});
    }
};

// ==================== Object Utilities ====================
const ObjectUtils = {
    clone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    merge: function(...objs) {
        return Object.assign({}, ...objs);
    },

    keys: function(obj) {
        return Object.keys(obj);
    },

    values: function(obj) {
        return Object.values(obj);
    },

    entries: function(obj) {
        return Object.entries(obj);
    },

    isEmpty: function(obj) {
        return Object.keys(obj).length === 0;
    },

    hasProperty: function(obj, prop) {
        return prop in obj;
    }
};

// ==================== DOM Utilities ====================
const DOMUtils = {
    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return document.querySelectorAll(selector);
    },

    addClass: function(element, className) {
        element.classList.add(className);
    },

    removeClass: function(element, className) {
        element.classList.remove(className);
    },

    toggleClass: function(element, className) {
        element.classList.toggle(className);
    },

    hasClass: function(element, className) {
        return element.classList.contains(className);
    },

    setStyles: function(element, styles) {
        Object.assign(element.style, styles);
    },

    getStyle: function(element, property) {
        return window.getComputedStyle(element).getPropertyValue(property);
    },

    createElement: function(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    },

    append: function(parent, child) {
        if (Array.isArray(child)) {
            child.forEach(c => parent.appendChild(c));
        } else {
            parent.appendChild(child);
        }
    },

    remove: function(element) {
        element.remove();
    },

    hide: function(element) {
        element.style.display = 'none';
    },

    show: function(element) {
        element.style.display = '';
    },

    toggle: function(element) {
        element.style.display === 'none' ? element.style.display = '' : element.style.display = 'none';
    }
};

// ==================== Validation Utilities ====================
const ValidationUtils = {
    isEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    isPhone: function(phone) {
        const regex = /^[0-9]{10,}$/;
        return regex.test(phone.replace(/[-\s]/g, ''));
    },

    isURL: function(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    },

    isEmpty: function(str) {
        return !str || str.trim().length === 0;
    },

    minLength: function(str, length) {
        return str.length >= length;
    },

    maxLength: function(str, length) {
        return str.length <= length;
    },

    isNumber: function(num) {
        return !isNaN(num) && num !== '';
    },

    isPositive: function(num) {
        return this.isNumber(num) && num > 0;
    }
};

// ==================== Math Utilities ====================
const MathUtils = {
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    round: function(num, decimals = 0) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    percentage: function(part, whole) {
        return (part / whole) * 100;
    },

    average: function(arr) {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    },

    sum: function(arr) {
        return arr.reduce((a, b) => a + b, 0);
    },

    max: function(arr) {
        return Math.max(...arr);
    },

    min: function(arr) {
        return Math.min(...arr);
    }
};

// ==================== Storage Utilities ====================
const StorageUtils = {
    set: function(key, value) {
        try {
            if (typeof(Storage) !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            }
        } catch (e) {
            console.log('Storage error:', e);
        }
        return false;
    },

    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.log('Storage error:', e);
            return null;
        }
    },

    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.log('Storage error:', e);
        }
        return false;
    },

    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.log('Storage error:', e);
        }
        return false;
    }
};

// ==================== Logger Utility ====================
const Logger = {
    log: function(message, data = null) {
        console.log(`%c[INFO] ${message}`, 'color: #0066cc; font-weight: bold;', data || '');
    },

    warn: function(message, data = null) {
        console.warn(`%c[WARNING] ${message}`, 'color: #ff9900; font-weight: bold;', data || '');
    },

    error: function(message, data = null) {
        console.error(`%c[ERROR] ${message}`, 'color: #ff0000; font-weight: bold;', data || '');
    },

    success: function(message, data = null) {
        console.log(`%c[SUCCESS] ${message}`, 'color: #00cc00; font-weight: bold;', data || '');
    }
};

// ==================== Export for use ====================
// These utilities can be used globally in other JS files
window.DateUtils = DateUtils;
window.StringUtils = StringUtils;
window.ArrayUtils = ArrayUtils;
window.ObjectUtils = ObjectUtils;
window.DOMUtils = DOMUtils;
window.ValidationUtils = ValidationUtils;
window.MathUtils = MathUtils;
window.StorageUtils = StorageUtils;
window.Logger = Logger;