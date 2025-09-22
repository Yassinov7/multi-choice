// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    initializeFormValidation();
    initializeFAQ();
    initializeAnimations();
    initializeFormSubmission();
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Real-time validation for email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', validateEmail);
    
    // Real-time validation for phone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', validatePhone);
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearError(e);
    
    if (!value) {
        showError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (value.length < 2) {
                showError(field, 'يجب أن يكون الاسم أكثر من حرفين');
                return false;
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
                return false;
            }
            break;
            
        case 'phone':
            if (!isValidPhone(value)) {
                showError(field, 'يرجى إدخال رقم هاتف صحيح');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showError(field, 'يجب أن تكون الرسالة أكثر من 10 أحرف');
                return false;
            }
            break;
    }
    
    return true;
}

function validateEmail(e) {
    const email = e.target.value.trim();
    const field = e.target;
    
    if (email && !isValidEmail(email)) {
        showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
    } else {
        clearError(e);
    }
}

function validatePhone(e) {
    const phone = e.target.value.trim();
    const field = e.target;
    
    if (phone && !isValidPhone(phone)) {
        showError(field, 'يرجى إدخال رقم هاتف صحيح');
    } else {
        clearError(e);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(\+966|0)?[5][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(field, message) {
    field.style.borderColor = '#e74c3c';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(e) {
    const field = e.target;
    field.style.borderColor = '#e1e5e9';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Form Submission
function initializeFormSubmission() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Validate all fields
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateFormSubmission(formData);
        
        // Show success message
        showSuccessModal();
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const event = { target: field };
        if (!validateField(event)) {
            isValid = false;
        }
    });
    
    // Check terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    return isValid;
}

async function simulateFormSubmission(formData) {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', Object.fromEntries(formData));
            resolve();
        }, 2000);
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

function showErrorMessage(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => toggleFAQ(item));
    });
}

function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.info-item, .sidebar-item, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Stagger animation for info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Map functionality
function openMap() {
    const address = 'الرياض، المملكة العربية السعودية';
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapUrl, '_blank');
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('966')) {
        value = '+' + value;
    } else if (value.startsWith('05')) {
        value = '+966' + value.substring(1);
    }
    
    input.value = value;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .error-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .error-notification button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .error-notification button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #27ae60;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }
`;

document.head.appendChild(style);

// Add success/error classes to inputs
function addValidationClasses() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const isValid = this.checkValidity() && this.value.trim() !== '';
            this.classList.remove('error', 'success');
            
            if (this.value.trim() !== '') {
                this.classList.add(isValid ? 'success' : 'error');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error', 'success');
        });
    });
}

// Initialize validation classes
document.addEventListener('DOMContentLoaded', addValidationClasses);

// Export functions for global access
window.closeModal = closeModal;
window.openMap = openMap;