/**
 * Skylark Fire Safe Council - Main JavaScript
 */

(function() {
    'use strict';

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    function initMobileNav() {
        const navToggle = document.querySelector('.nav__toggle');
        const navList = document.querySelector('.nav__list');

        if (navToggle && navList) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navList.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = navList.querySelectorAll('.nav__link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navList.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navList.contains(event.target)) {
                    navToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            });
        }
    }

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') {
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    event.preventDefault();

                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // Contact Form Validation
    // ===================================
    function initFormValidation() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                // Reset previous errors
                clearFormErrors(contactForm);

                // Validate fields
                let isValid = true;

                // Name validation
                const nameInput = contactForm.querySelector('#name');
                if (nameInput && !nameInput.value.trim()) {
                    showError(nameInput, 'Please enter your name');
                    isValid = false;
                }

                // Email validation
                const emailInput = contactForm.querySelector('#email');
                if (emailInput) {
                    if (!emailInput.value.trim()) {
                        showError(emailInput, 'Please enter your email address');
                        isValid = false;
                    } else if (!isValidEmail(emailInput.value)) {
                        showError(emailInput, 'Please enter a valid email address');
                        isValid = false;
                    }
                }

                // Subject validation
                const subjectInput = contactForm.querySelector('#subject');
                if (subjectInput && !subjectInput.value.trim()) {
                    showError(subjectInput, 'Please enter a subject');
                    isValid = false;
                }

                // Message validation
                const messageInput = contactForm.querySelector('#message');
                if (messageInput && !messageInput.value.trim()) {
                    showError(messageInput, 'Please enter your message');
                    isValid = false;
                }

                // If valid, show success message (in real implementation, would submit to server)
                if (isValid) {
                    showFormSuccess(contactForm);
                }
            });
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('form-group--error');

            // Create error message element
            const errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }
    }

    function clearFormErrors(form) {
        const errorGroups = form.querySelectorAll('.form-group--error');
        errorGroups.forEach(function(group) {
            group.classList.remove('form-group--error');
        });

        const errorMessages = form.querySelectorAll('.form-error');
        errorMessages.forEach(function(error) {
            error.remove();
        });

        // Remove any previous success message
        const successMessage = form.querySelector('.form-success');
        if (successMessage) {
            successMessage.remove();
        }
    }

    function showFormSuccess(form) {
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.style.cssText = 'background-color: #27ae60; color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;';
        successElement.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.';

        // Insert at the top of the form
        form.insertBefore(successElement, form.firstChild);

        // Reset form fields
        form.reset();

        // Scroll to success message
        successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ===================================
    // Scroll to Top Button
    // ===================================
    function initScrollToTop() {
        // Create scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '&#8679;';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--color-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            z-index: 999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;

        document.body.appendChild(scrollButton);

        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Active Navigation Link
    // ===================================
    function initActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // ===================================
    // Animate on Scroll (Simple Implementation)
    // ===================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card, .feature-card, .news-card, .donate-card');

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // ===================================
    // Initialize All Functions
    // ===================================
    function init() {
        initMobileNav();
        initSmoothScroll();
        initFormValidation();
        initScrollToTop();
        initActiveNavLink();
        initScrollAnimations();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
