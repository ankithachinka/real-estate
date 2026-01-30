// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const projectsGrid = document.getElementById('projectsGrid');
const clientsGrid = document.getElementById('clientsGrid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadClients();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Smooth scrolling for navigation links
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
}

// Load projects from backend
async function loadProjects() {
    try {
        showLoading(projectsGrid);
        const response = await fetch(`${API_BASE_URL}/projects`);
        
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        showError(projectsGrid, 'Failed to load projects. Please try again later.');
    }
}

// Display projects in the grid
function displayProjects(projects) {
    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = '<p>No projects available at the moment.</p>';
        return;
    }
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image || 'assets/images/Rectangle.svg'}" alt="${project.name}" onerror="this.src='assets/images/Rectangle.svg'">
            <div class="project-card-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="read-more-btn" onclick="alert('Read More functionality is not implemented yet.')">Read More</button>
            </div>
        </div>
    `).join('');
}

// Load clients from backend
async function loadClients() {
    try {
        showLoading(clientsGrid);
        const response = await fetch(`${API_BASE_URL}/clients`);
        
        if (!response.ok) {
            throw new Error('Failed to load clients');
        }
        
        const clients = await response.json();
        displayClients(clients);
    } catch (error) {
        console.error('Error loading clients:', error);
        showError(clientsGrid, 'Failed to load client testimonials. Please try again later.');
    }
}

// Display clients in the grid
function displayClients(clients) {
    if (!clients || clients.length === 0) {
        clientsGrid.innerHTML = '<p>No client testimonials available at the moment.</p>';
        return;
    }
    
    clientsGrid.innerHTML = clients.map(client => `
        <div class="client-card">
            <img src="${client.image || 'assets/images/Ellipse 11.svg'}" alt="${client.name}" onerror="this.src='assets/images/Ellipse 11.svg'">
            <p>"${client.description}"</p>
            <h4>${client.name}</h4>
            <p class="designation">${client.designation}</p>
        </div>
    `).join('');
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        city: formData.get('city')
    };
    
    // Validate form data
    if (!validateContactForm(contactData)) {
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }
        
        const result = await response.json();
        showMessage(contactForm, 'success', 'Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showMessage(contactForm, 'error', 'Failed to submit form. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Handle newsletter form submission
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(newsletterForm);
    const email = formData.get('email');
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage(newsletterForm, 'error', 'Please enter a valid email address.');
        return;
    }
    
    const subscribeBtn = newsletterForm.querySelector('.subscribe-btn');
    const originalText = subscribeBtn.textContent;
    
    try {
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (!response.ok) {
            throw new Error('Failed to subscribe to newsletter');
        }
        
        const result = await response.json();
        showMessage(newsletterForm, 'success', 'Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        showMessage(newsletterForm, 'error', 'Failed to subscribe. Please try again.');
    } finally {
        subscribeBtn.textContent = originalText;
        subscribeBtn.disabled = false;
    }
}

// Validate contact form data
function validateContactForm(data) {
    if (!data.fullName || data.fullName.trim().length < 2) {
        showMessage(contactForm, 'error', 'Please enter your full name.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showMessage(contactForm, 'error', 'Please enter a valid email address.');
        return false;
    }
    
    if (!data.mobile || !validatePhone(data.mobile)) {
        showMessage(contactForm, 'error', 'Please enter a valid mobile number.');
        return false;
    }
    
    if (!data.city || data.city.trim().length < 2) {
        showMessage(contactForm, 'error', 'Please enter your city.');
        return false;
    }
    
    return true;
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show loading spinner
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// Show error message
function showError(element, message) {
    element.innerHTML = `<div class="error-message">${message}</div>`;
}

// Show success or error message
function showMessage(formElement, type, message) {
    // Remove any existing messages
    const existingMessage = formElement.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    // Insert message after the form
    formElement.parentNode.insertBefore(messageDiv, formElement.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Utility function to handle image errors
function handleImageError(img) {
    img.onerror = null;
    img.src = 'assets/images/Rectangle.svg';
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature, .project-card, .client-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
