// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initAboutAnimations();
    initStatisticsCounter();
    initTeamInteractions();
    initScrollAnimations();
});

// Initialize about page animations
function initAboutAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe story elements
    const storyElements = document.querySelectorAll('.story-text h2, .story-text p, .story-image');
    storyElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.animationDelay = `${index * 0.2}s`;
        observer.observe(element);
    });

    // Observe value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.animationDelay = `${index * 0.15}s`;
        observer.observe(member);
    });

    // Observe mission/vision items
    const mvItems = document.querySelectorAll('.mv-item');
    mvItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.animationDelay = `${index * 0.3}s`;
        observer.observe(item);
    });
}

// Statistics counter animation
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        statsObserver.observe(statNumbers[0].parentElement.parentElement);
    }

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            stat.style.animation = 'countUp 0.5s ease forwards';

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
}

// Team interactions
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add click event to show member details
        member.addEventListener('click', function() {
            showMemberModal(this);
        });

        // Add hover effects for social links
        const socialLinks = member.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent member modal from opening
                
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 100);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    });
}

// Show team member modal
function showMemberModal(memberElement) {
    const name = memberElement.querySelector('h3').textContent;
    const position = memberElement.querySelector('.position').textContent;
    const bio = memberElement.querySelector('.bio').textContent;
    const image = memberElement.querySelector('img').src;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'member-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="member-details">
                    <div class="member-photo">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="member-info-detailed">
                        <h2>${name}</h2>
                        <p class="position">${position}</p>
                        <p class="bio">${bio}</p>
                        <div class="member-skills">
                            <h4>المهارات الأساسية:</h4>
                            <div class="skills-list">
                                ${getSkillsForPosition(position)}
                            </div>
                        </div>
                        <div class="member-experience">
                            <h4>الخبرة:</h4>
                            <p>${getExperienceForPosition(position)}</p>
                        </div>
                    </div>
                </div>
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
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Add modal content styles
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--white-color);
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: slideInFromBottom 0.4s ease;
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

// Get skills based on position
function getSkillsForPosition(position) {
    const skills = {
        'المدير التنفيذي': ['القيادة', 'إدارة المشاريع', 'التخطيط الاستراتيجي', 'إدارة الفرق'],
        'مديرة التصميم': ['UI/UX Design', 'Adobe Creative Suite', 'Figma', 'تصميم الهوية البصرية'],
        'مطور أول': ['JavaScript', 'React', 'Node.js', 'Python', 'قواعد البيانات'],
        'مديرة التسويق': ['التسويق الرقمي', 'SEO', 'إدارة وسائل التواصل', 'تحليل البيانات']
    };

    const positionSkills = skills[position] || ['مهارات متنوعة', 'خبرة واسعة', 'عمل جماعي'];
    
    return positionSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

// Get experience based on position
function getExperienceForPosition(position) {
    const experiences = {
        'المدير التنفيذي': 'أكثر من 10 سنوات في إدارة الشركات التقنية وقيادة الفرق متعددة التخصصات',
        'مديرة التصميم': '8 سنوات في تصميم واجهات المستخدم وتجربة المستخدم للتطبيقات والمواقع',
        'مطور أول': '7 سنوات في تطوير التطبيقات والمواقع باستخدام أحدث التقنيات',
        'مديرة التسويق': '6 سنوات في التسويق الرقمي وإدارة الحملات الإعلانية'
    };

    return experiences[position] || 'خبرة واسعة في المجال التقني';
}

// Scroll animations
function initScrollAnimations() {
    // Parallax effect for page header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const pageHeader = document.querySelector('.page-header');
        
        if (pageHeader) {
            const rate = scrolled * -0.5;
            pageHeader.style.transform = `translateY(${rate}px)`;
        }

        // Animate value icons on scroll
        const valueIcons = document.querySelectorAll('.value-icon');
        valueIcons.forEach((icon, index) => {
            const rect = icon.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const rotation = (scrolled * 0.1) + (index * 45);
                icon.style.transform = `rotate(${rotation}deg)`;
            }
        });
    });

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Add CSS for modal and animations
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#about-page-styles')) {
        const style = document.createElement('style');
        style.id = 'about-page-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .member-modal .modal-header {
                padding: 1rem 2rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: flex-end;
            }
            
            .member-modal .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-color);
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .member-modal .modal-close:hover {
                background-color: var(--light-color);
            }
            
            .member-modal .modal-body {
                padding: 2rem;
            }
            
            .member-details {
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 2rem;
                align-items: start;
            }
            
            .member-photo img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 10px;
            }
            
            .member-info-detailed h2 {
                color: var(--dark-color);
                margin-bottom: 0.5rem;
            }
            
            .member-info-detailed .position {
                color: var(--primary-color);
                font-weight: 500;
                margin-bottom: 1rem;
            }
            
            .member-info-detailed .bio {
                color: var(--text-color);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .member-skills h4,
            .member-experience h4 {
                color: var(--dark-color);
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }
            
            .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .skill-tag {
                background: var(--primary-color);
                color: var(--dark-color);
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .member-experience p {
                color: var(--text-color);
                line-height: 1.6;
            }
            
            .section-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            @media (max-width: 768px) {
                .member-details {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                
                .member-photo {
                    justify-self: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.animation = 'fadeIn 0.5s ease forwards';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '0';
            img.style.animation = 'fadeIn 0.5s ease forwards';
        }
    });
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Value items hover effect
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mission/Vision items hover effect
    const mvItems = document.querySelectorAll('.mv-item');
    mvItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.mv-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.mv-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});