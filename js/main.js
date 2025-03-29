/*
 * Personal Portfolio - .NET Developer
 * Main JavaScript file
 */

document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    // DOM elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.querySelector('#contactForm');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Sticky Header
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Projects filter
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            // If form is valid, submit (or show success message in this demo)
            if (isValid) {
                // In a real project, you would send this data to a server
                // For now, let's just show a success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for contacting me. I'll get back to you soon.</p>
                `;
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Reset form for future use
                contactForm.reset();
                
                // Optionally, remove success message after some time
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.style.display = 'block';
                }, 5000);
            }
        });
    }

    // Show error message for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.innerText = message;
        input.classList.add('error');
    }

    // Remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }

    // Validate email format
    function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    // Animate skills progress bars on scroll
    function animateSkills() {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;
        
        const progressBars = document.querySelectorAll('.progress');
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            
            // Remove event listener once animation is triggered
            window.removeEventListener('scroll', animateSkills);
        }
    }
    
    // Add scroll event listener for skill animation
    window.addEventListener('scroll', animateSkills);
    
    // Trigger the animation on page load if skills section is visible
    setTimeout(animateSkills, 500);

    // Project details modal (if needed)
    document.querySelectorAll('.project-links .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Project modal implementation would go here
            }
        });
    });

    // Animate on scroll for timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const position = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                item.classList.add('show');
            }
        });
    }
    
    // Add initial class to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('hidden');
    });
    
    // Add scroll event for timeline animation
    window.addEventListener('scroll', animateTimeline);
    
    // Trigger on page load
    setTimeout(animateTimeline, 300);

    // Auto-add current year to footer copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
