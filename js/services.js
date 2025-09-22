// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initServiceFiltering();
    initServiceAnimations();
    initServiceInteractions();
});

// Service filtering functionality
function initServiceFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter services
            filterServices(category, serviceItems);
        });
    });
}

function filterServices(category, serviceItems) {
    serviceItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            // Show item with delay for stagger effect
            setTimeout(() => {
                item.classList.remove('hidden');
                item.style.display = 'block';
            }, index * 100);
        } else {
            // Hide item
            item.classList.add('hidden');
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Service animations
function initServiceAnimations() {
    // Animate service items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromBottom 0.6s ease forwards';
            }
        });
    }, observerOptions);

    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        step.style.transitionDelay = `${index * 0.2}s`;
        
        observer.observe(step);
    });

    // Update observer for process steps
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    processSteps.forEach(step => {
        processObserver.observe(step);
    });
}

// Service interactions
function initServiceInteractions() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click tracking for service buttons
        const serviceBtn = item.querySelector('.btn');
        if (serviceBtn) {
            serviceBtn.addEventListener('click', function(e) {
                const serviceName = item.querySelector('h3').textContent;
                trackServiceClick(serviceName);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
    
    // Add parallax effect to service images
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const serviceImages = document.querySelectorAll('.service-image');
        
        serviceImages.forEach((image, index) => {
            const rate = scrolled * -0.5;
            image.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Track service clicks (for analytics)
function trackServiceClick(serviceName) {
    console.log(`Service clicked: ${serviceName}`);
    
    // Here you would typically send data to analytics service
    // Example: gtag('event', 'service_click', { service_name: serviceName });
    
    // Show confirmation message
    showServiceNotification(`تم تسجيل اهتمامكم بخدمة: ${serviceName}`);
}

// Show service-specific notification
function showServiceNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.service-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'service-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: var(--dark-color);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 350px;
        animation: slideInUp 0.3s ease;
        font-weight: 500;
    `;
    
    // Add notification styles to document
    if (!document.querySelector('#service-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'service-notification-styles';
        style.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }
            
            .service-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .service-notification .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                margin-right: auto;
                padding: 0 5px;
            }
            
            .service-notification .notification-close:hover {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Add smooth scrolling for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') === 'contact.html') {
            button.addEventListener('click', function(e) {
                // Add loading state
                const originalText = this.textContent;
                this.textContent = 'جاري التحويل...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 1000);
            });
        }
    });
});

// Add price calculator functionality
function initPriceCalculator() {
    // This could be expanded to include a price calculator modal
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const priceElement = item.querySelector('.service-price');
        if (priceElement) {
            priceElement.addEventListener('click', function() {
                showPriceDetails(item);
            });
        }
    });
}

function showPriceDetails(serviceItem) {
    const serviceName = serviceItem.querySelector('h3').textContent;
    const basePrice = serviceItem.querySelector('.service-price').textContent;
    
    // Create modal for price details
    const modal = document.createElement('div');
    modal.className = 'price-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تفاصيل الأسعار - ${serviceName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>السعر الأساسي:</strong> ${basePrice}</p>
                <p>الأسعار قابلة للتفاوض حسب متطلبات المشروع</p>
                <ul>
                    <li>استشارة مجانية</li>
                    <li>عرض أسعار مفصل</li>
                    <li>ضمان على الخدمة</li>
                    <li>دعم فني مجاني</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="window.location.href='contact.html'">
                    احصل على عرض أسعار
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Initialize price calculator
document.addEventListener('DOMContentLoaded', initPriceCalculator);