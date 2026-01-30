// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.admin-section');
const projectForm = document.getElementById('projectForm');
const clientForm = document.getElementById('clientForm');
const messageContainer = document.getElementById('messageContainer');

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuthentication()) {
        window.location.href = 'login.html';
        return;
    }
    
    setupNavigation();
    setupFormHandlers();
    loadDashboardStats();
    loadProjects();
    loadClients();
    loadContacts();
    loadNewsletters();
});

// Setup navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Setup form handlers
function setupFormHandlers() {
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }
    
    if (clientForm) {
        clientForm.addEventListener('submit', handleClientSubmit);
    }
}

// Navigation functions
function showAddProjectForm() {
    document.getElementById('addProjectForm').classList.remove('hidden');
}

function hideAddProjectForm() {
    document.getElementById('addProjectForm').classList.add('hidden');
    projectForm.reset();
}

function showAddClientForm() {
    document.getElementById('addClientForm').classList.remove('hidden');
}

function hideAddClientForm() {
    document.getElementById('addClientForm').classList.add('hidden');
    clientForm.reset();
}

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        const [projectsRes, clientsRes, contactsRes, newslettersRes] = await Promise.all([
            fetch(`${API_BASE_URL}/projects`),
            fetch(`${API_BASE_URL}/clients`),
            fetch(`${API_BASE_URL}/contacts`),
            fetch(`${API_BASE_URL}/newsletters`)
        ]);
        
        const projects = await projectsRes.json();
        const clients = await clientsRes.json();
        const contacts = await contactsRes.json();
        const newsletters = await newslettersRes.json();
        
        document.getElementById('totalProjects').textContent = projects.length;
        document.getElementById('totalClients').textContent = clients.length;
        document.getElementById('totalContacts').textContent = contacts.length;
        document.getElementById('totalNewsletters').textContent = newsletters.length;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Load projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        showMessage('error', 'Failed to load projects');
    }
}

// Display projects in table
function displayProjects(projects) {
    const tbody = document.getElementById('projectsTableBody');
    
    if (!projects || projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No projects found</td></tr>';
        return;
    }
    
    tbody.innerHTML = projects.map(project => `
        <tr>
            <td>
                <img src="${project.image || 'assets/images/Rectangle.svg'}" alt="${project.name}" class="table-image" onerror="this.src='assets/images/Rectangle.svg'">
            </td>
            <td>${project.name}</td>
            <td>${project.description}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editProject('${project._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProject('${project._id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Handle project form submission
async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(projectForm);
    const submitBtn = projectForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to add project');
        }
        
        const result = await response.json();
        showMessage('success', 'Project added successfully!');
        hideAddProjectForm();
        loadProjects();
        loadDashboardStats();
    } catch (error) {
        console.error('Error adding project:', error);
        showMessage('error', 'Failed to add project');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Load clients
async function loadClients() {
    try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const clients = await response.json();
        displayClients(clients);
    } catch (error) {
        console.error('Error loading clients:', error);
        showMessage('error', 'Failed to load clients');
    }
}

// Display clients in table
function displayClients(clients) {
    const tbody = document.getElementById('clientsTableBody');
    
    if (!clients || clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No clients found</td></tr>';
        return;
    }
    
    tbody.innerHTML = clients.map(client => `
        <tr>
            <td>
                <img src="${client.image || 'assets/images/Ellipse 11.svg'}" alt="${client.name}" class="table-image" onerror="this.src='assets/images/Ellipse 11.svg'">
            </td>
            <td>${client.name}</td>
            <td>${client.description}</td>
            <td>${client.designation}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editClient('${client._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteClient('${client._id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Handle client form submission
async function handleClientSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(clientForm);
    const submitBtn = clientForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/clients`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to add client');
        }
        
        const result = await response.json();
        showMessage('success', 'Client added successfully!');
        hideAddClientForm();
        loadClients();
        loadDashboardStats();
    } catch (error) {
        console.error('Error adding client:', error);
        showMessage('error', 'Failed to add client');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Load contact forms
async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        const contacts = await response.json();
        displayContacts(contacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
        showMessage('error', 'Failed to load contact forms');
    }
}

// Display contact forms in table
function displayContacts(contacts) {
    const tbody = document.getElementById('contactsTableBody');
    
    if (!contacts || contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No contact forms found</td></tr>';
        return;
    }
    
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.fullName}</td>
            <td>${contact.email}</td>
            <td>${contact.mobile}</td>
            <td>${contact.city}</td>
            <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Load newsletter subscribers
async function loadNewsletters() {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletters`);
        const newsletters = await response.json();
        displayNewsletters(newsletters);
    } catch (error) {
        console.error('Error loading newsletters:', error);
        showMessage('error', 'Failed to load newsletter subscribers');
    }
}

// Display newsletter subscribers in table
function displayNewsletters(newsletters) {
    const tbody = document.getElementById('newslettersTableBody');
    
    if (!newsletters || newsletters.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="empty-state">No newsletter subscribers found</td></tr>';
        return;
    }
    
    tbody.innerHTML = newsletters.map(newsletter => `
        <tr>
            <td>${newsletter.email}</td>
            <td>${new Date(newsletter.createdAt).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="delete-btn" onclick="deleteNewsletter('${newsletter._id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Delete project
async function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
        
        showMessage('success', 'Project deleted successfully!');
        loadProjects();
        loadDashboardStats();
    } catch (error) {
        console.error('Error deleting project:', error);
        showMessage('error', 'Failed to delete project');
    }
}

// Delete client
async function deleteClient(clientId) {
    if (!confirm('Are you sure you want to delete this client?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete client');
        }
        
        showMessage('success', 'Client deleted successfully!');
        loadClients();
        loadDashboardStats();
    } catch (error) {
        console.error('Error deleting client:', error);
        showMessage('error', 'Failed to delete client');
    }
}

// Delete newsletter subscriber
async function deleteNewsletter(newsletterId) {
    if (!confirm('Are you sure you want to delete this subscriber?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/newsletters/${newsletterId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete subscriber');
        }
        
        showMessage('success', 'Subscriber deleted successfully!');
        loadNewsletters();
        loadDashboardStats();
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        showMessage('error', 'Failed to delete subscriber');
    }
}

// Edit project (placeholder for future implementation)
function editProject(projectId) {
    showMessage('info', 'Edit functionality will be implemented in future updates');
}

// Edit client (placeholder for future implementation)
function editClient(clientId) {
    showMessage('info', 'Edit functionality will be implemented in future updates');
}

// Show message
function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    messageContainer.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        window.location.href = 'login.html';
    }
}

// Check authentication
function checkAuthentication() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Get current user
function getCurrentUser() {
    return sessionStorage.getItem('username') || 'Administrator';
}

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// Image preview functionality
function setupImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (input && preview) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    // Add validation logic as needed
    for (const [key, value] of formData.entries()) {
        if (!value || value.trim() === '') {
            errors.push(`${key} is required`);
        }
    }
    
    return errors;
}

// Export functions for global access
window.showAddProjectForm = showAddProjectForm;
window.hideAddProjectForm = hideAddProjectForm;
window.showAddClientForm = showAddClientForm;
window.hideAddClientForm = hideAddClientForm;
window.editProject = editProject;
window.editClient = editClient;
window.deleteProject = deleteProject;
window.deleteClient = deleteClient;
window.deleteNewsletter = deleteNewsletter;
window.handleLogout = handleLogout;
