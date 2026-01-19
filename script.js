document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('span');

            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                if (icon) icon.textContent = '+';
            } else {
                answer.style.display = 'block';
                if (icon) icon.textContent = '−';
            }
        });

        // Initialize FAQ items (hide answers)
        const answer = question.nextElementSibling;
        answer.style.display = 'none';

        // Add plus icon to questions
        const iconSpan = document.createElement('span');
        iconSpan.textContent = '+';
        iconSpan.style.marginLeft = 'auto';
        iconSpan.style.fontSize = '1.2rem';
        iconSpan.style.fontWeight = 'bold';
        question.appendChild(iconSpan);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });

    // Add animation to process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');

    function checkStepVisibility() {
        processSteps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (stepPosition < windowHeight - 100) {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
                step.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }

    // Initialize process steps (hidden)
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Check visibility on load and scroll
    checkStepVisibility();
    window.addEventListener('scroll', checkStepVisibility);

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Add countdown timer for urgency
    function initializeCountdown() {
        // Set the target date (January 22nd)
        const targetDate = new Date();
        targetDate.setDate(22);
        targetDate.setMonth(0); // January
        targetDate.setHours(23, 59, 59, 999);

        function updateCountdown() {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                // Countdown expired
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }

            // Calculate time units
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update the countdown display
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown if timer exists
    if (document.querySelector('.countdown-timer')) {
        initializeCountdown();
    }

    // Mobile menu functionality
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const toggle = document.querySelector('.mobile-nav-toggle');

        if (menu && toggle) {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        }
    };

    window.closeMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const toggle = document.querySelector('.mobile-nav-toggle');

        if (menu && toggle) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('mobile-menu');
        const toggle = document.querySelector('.mobile-nav-toggle');

        if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize (if user resizes to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});
