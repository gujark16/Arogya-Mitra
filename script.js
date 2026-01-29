// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Check for logged-in user and display welcome message
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (isLoggedIn === 'true' && userRole) {
        // Create welcome banner
        const welcomeBanner = document.createElement('div');
        welcomeBanner.className = 'welcome-banner';
        welcomeBanner.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            text-align: center;
            position: relative;
            margin-bottom: 0;
        `;
        
        let welcomeMessage = `<i class="fas fa-user-circle"></i> Welcome back, ${userName || userEmail || userRole}! `;
        welcomeMessage += `You are logged in as <strong>${userRole}</strong>. `;
        welcomeMessage += `<button onclick="logout()" style="background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 5px 15px; border-radius: 20px; cursor: pointer; margin-left: 10px;">Logout</button>`;
        
        welcomeBanner.innerHTML = welcomeMessage;
        
        // Insert after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.parentNode.insertBefore(welcomeBanner, navbar.nextSibling);
        }
        
        // Update navigation to show logged-in state
        updateNavigationForLoggedInUser(userRole);
    }
});

// Update navigation for logged-in user
function updateNavigationForLoggedInUser(userRole) {
    const dashboardLink = document.querySelector('a[href="dashboard.html"]');
    if (dashboardLink) {
        dashboardLink.innerHTML = `<i class="fas fa-tachometer-alt"></i> Dashboard (${userRole})`;
        dashboardLink.style.background = 'rgba(102, 126, 234, 0.1)';
        dashboardLink.style.borderRadius = '5px';
    }
}

// Logout function
function logout() {
    sessionStorage.clear();
    alert('You have been logged out successfully.');
    window.location.reload();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Appointment Form Submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            doctor: document.getElementById('doctor').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Validate date is not in the past
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showModal('Error', 'Please select a future date for your appointment.');
            return;
        }

        // Log the appointment (in a real app, this would be sent to a server)
        console.log('Appointment Booked:', formData);

        // Show success message
        showModal('Appointment Confirmed!', 
            `Your appointment with ${formData.doctor} on ${formData.date} at ${formData.time} has been confirmed. We will send a confirmation email to ${formData.email}.`);

        // Reset form
        appointmentForm.reset();
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input, textarea');
        const formData = {
            name: inputs[0].value,
            email: inputs[1].value,
            message: inputs[2].value
        };

        console.log('Contact Message:', formData);

        showModal('Message Sent!', 
            `Thank you for contacting us, ${formData.name}. We will get back to you shortly at ${formData.email}.`);

        contactForm.reset();
    });
}

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('notificationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'none';
}

// Close modal when clicking the X button
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('notificationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Set minimum date to today for appointment booking
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
const cards = document.querySelectorAll('.service-card, .doctor-card, .stat-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #ffd700 !important;
    }
`;
document.head.appendChild(style);

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Initialize page
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// Add some interactivity to doctor cards
const doctorCards = document.querySelectorAll('.doctor-card');
doctorCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service cards click handler
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        showModal('Service Selected', 
            `You've selected ${serviceName}. Please book an appointment with our specialists for this service.`);
    });
});

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Add phone validation to appointment form
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ff6b6b';
            this.title = 'Please enter a valid phone number';
        } else {
            this.style.borderColor = '#e0e0e0';
            this.title = '';
        }
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statCards = document.querySelectorAll('.stat-card h3');
            statCards.forEach(card => {
                const text = card.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(card, number);
            });
        }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Print functionality for appointments
function printAppointment() {
    window.print();
}

// Export appointment as PDF (basic implementation)
function downloadAppointmentPDF() {
    const appointmentData = {
        name: document.getElementById('name').value,
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    if (!appointmentData.name) {
        showModal('Error', 'Please fill in the appointment form first.');
        return;
    }

    console.log('Downloading appointment as PDF:', appointmentData);
    showModal('PDF Download', 'Your appointment confirmation has been prepared for download.');
}

// Add loading state to form submissions
function setFormLoading(form, isLoading) {
    const button = form.querySelector('button[type="submit"]');
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Processing...';
    } else {
        button.disabled = false;
        button.textContent = 'Book Appointment';
    }
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus visible styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// Log page analytics (in a real app, this would send to analytics service)
console.log('Hospital Portal Loaded');
console.log('User Agent:', navigator.userAgent);
console.log('Page Load Time:', performance.now() + 'ms');

// ==================== REMINDERS FUNCTIONALITY ====================

// Initialize reminders from localStorage
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Tab switching
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName === 'appointment' ? 'appointment-reminder' : tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

// Medicine Form Submission
const medicineForm = document.getElementById('medicineForm');
if (medicineForm) {
    medicineForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const medicine = {
            id: Date.now(),
            name: document.getElementById('medicineName').value,
            dosage: document.getElementById('medicineDosage').value,
            frequency: document.getElementById('medicineFrequency').value,
            time: document.getElementById('medicineTime').value,
            startDate: document.getElementById('medicineStartDate').value,
            endDate: document.getElementById('medicineEndDate').value,
            notes: document.getElementById('medicineNotes').value,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        medicines.push(medicine);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        
        showModal('Medicine Reminder Added', 
            `${medicine.name} reminder has been added successfully. You'll receive reminders at ${medicine.time} ${medicine.frequency}.`);
        
        medicineForm.reset();
        displayMedicines();
    });
}

// Appointment Reminder Form Submission
const appointmentReminderForm = document.getElementById('appointmentReminderForm');
if (appointmentReminderForm) {
    appointmentReminderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const appointmentDate = new Date(document.getElementById('appointmentDate').value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (appointmentDate < today) {
            showModal('Error', 'Please select a future date for your appointment.');
            return;
        }

        const appointment = {
            id: Date.now(),
            doctor: document.getElementById('appointmentDoctor').value,
            specialty: document.getElementById('appointmentSpecialty').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            location: document.getElementById('appointmentLocation').value,
            reminderBefore: document.getElementById('reminderBefore').value,
            notes: document.getElementById('appointmentNotes').value,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };

        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        const reminderText = appointment.reminderBefore >= 1440 
            ? `${Math.floor(appointment.reminderBefore / 1440)} day(s)` 
            : `${appointment.reminderBefore} minute(s)`;

        showModal('Appointment Reminder Added', 
            `Your appointment with ${appointment.doctor} on ${appointment.date} at ${appointment.time} has been added. You'll be reminded ${reminderText} before.`);
        
        appointmentReminderForm.reset();
        displayAppointments();
    });
}

// Display Medicines
function displayMedicines() {
    const medicineList = document.getElementById('medicineList');
    
    if (medicines.length === 0) {
        medicineList.innerHTML = '<p class="empty-message">No medicine reminders yet. Add one to get started!</p>';
        return;
    }

    medicineList.innerHTML = medicines.map(medicine => {
        const today = new Date().toISOString().split('T')[0];
        const isActive = medicine.startDate <= today && medicine.endDate >= today;
        
        return `
            <div class="reminder-item medicine">
                <div class="reminder-header">
                    <div class="reminder-title">
                        <i class="fas fa-pills"></i> ${medicine.name}
                    </div>
                    <span class="reminder-badge badge-medicine">${isActive ? 'Active' : 'Scheduled'}</span>
                </div>
                <div class="reminder-details">
                    <div class="detail-item">
                        <i class="fas fa-weight"></i>
                        <span><strong>Dosage:</strong> ${medicine.dosage}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span><strong>Frequency:</strong> ${medicine.frequency}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-bell"></i>
                        <span><strong>Time:</strong> ${medicine.time}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span><strong>Period:</strong> ${medicine.startDate} to ${medicine.endDate}</span>
                    </div>
                </div>
                ${medicine.notes ? `<div class="detail-item"><i class="fas fa-sticky-note"></i> <span><strong>Notes:</strong> ${medicine.notes}</span></div>` : ''}
                <div class="reminder-status">
                    <div class="status-icon ${isActive ? 'status-active' : 'status-upcoming'}">
                        ${isActive ? '✓' : '○'}
                    </div>
                    <span>${isActive ? 'Currently Active' : 'Starts on ' + medicine.startDate}</span>
                </div>
                <div class="reminder-actions">
                    <button class="reminder-btn btn-mark-done" onclick="markMedicineComplete(${medicine.id})">
                        <i class="fas fa-check"></i> Mark as Taken
                    </button>
                    <button class="reminder-btn btn-delete" onclick="deleteMedicine(${medicine.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Display Appointments
function displayAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    
    if (appointments.length === 0) {
        appointmentList.innerHTML = '<p class="empty-message">No appointment reminders yet. Add one to get started!</p>';
        return;
    }

    appointmentList.innerHTML = appointments.map(appointment => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        const now = new Date();
        const isUpcoming = appointmentDateTime > now;
        
        return `
            <div class="reminder-item appointment">
                <div class="reminder-header">
                    <div class="reminder-title">
                        <i class="fas fa-user-md"></i> Dr. ${appointment.doctor}
                    </div>
                    <span class="reminder-badge badge-appointment">${isUpcoming ? 'Upcoming' : 'Completed'}</span>
                </div>
                <div class="reminder-details">
                    <div class="detail-item">
                        <i class="fas fa-stethoscope"></i>
                        <span><strong>Specialty:</strong> ${appointment.specialty}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span><strong>Date:</strong> ${appointment.date}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span><strong>Time:</strong> ${appointment.time}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><strong>Location:</strong> ${appointment.location}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-bell"></i>
                        <span><strong>Reminder:</strong> ${appointment.reminderBefore >= 1440 ? Math.floor(appointment.reminderBefore / 1440) + ' day(s)' : appointment.reminderBefore + ' min'} before</span>
                    </div>
                </div>
                ${appointment.notes ? `<div class="detail-item"><i class="fas fa-sticky-note"></i> <span><strong>Notes:</strong> ${appointment.notes}</span></div>` : ''}
                <div class="reminder-status">
                    <div class="status-icon ${isUpcoming ? 'status-upcoming' : 'status-completed'}">
                        ${isUpcoming ? '⏰' : '✓'}
                    </div>
                    <span>${isUpcoming ? 'Upcoming on ' + appointment.date : 'Completed'}</span>
                </div>
                <div class="reminder-actions">
                    <button class="reminder-btn btn-mark-done" onclick="markAppointmentComplete(${appointment.id})">
                        <i class="fas fa-check"></i> Mark as Done
                    </button>
                    <button class="reminder-btn btn-delete" onclick="deleteAppointment(${appointment.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Delete Medicine
function deleteMedicine(id) {
    if (confirm('Are you sure you want to delete this medicine reminder?')) {
        medicines = medicines.filter(m => m.id !== id);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        displayMedicines();
        showModal('Deleted', 'Medicine reminder has been deleted.');
    }
}

// Delete Appointment
function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment reminder?')) {
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
        showModal('Deleted', 'Appointment reminder has been deleted.');
    }
}

// Mark Medicine as Complete
function markMedicineComplete(id) {
    const medicine = medicines.find(m => m.id === id);
    if (medicine) {
        showModal('Logged', `You've taken ${medicine.name} (${medicine.dosage}) at ${new Date().toLocaleTimeString()}`);
    }
}

// Mark Appointment as Complete
function markAppointmentComplete(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        appointment.status = 'completed';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
        showModal('Completed', `Your appointment with ${appointment.doctor} has been marked as completed.`);
    }
}

// Check for reminders and show notifications
function checkReminders() {
    const now = new Date();
    
    // Check medicine reminders
    medicines.forEach(medicine => {
        const today = now.toISOString().split('T')[0];
        const medicineTime = medicine.time;
        const [hours, minutes] = medicineTime.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);
        
        if (medicine.startDate <= today && medicine.endDate >= today) {
            const timeDiff = (reminderTime - now) / 1000 / 60; // minutes
            // Check if within 1 minute before or after the scheduled time
            if (timeDiff >= -1 && timeDiff <= 1) {
                const reminderId = `medicine-${medicine.id}`;
                if (!hasBeenReminded(reminderId)) {
                    showReminderPopup(
                        `💊 Medicine Reminder`,
                        `Time to take ${medicine.name}`,
                        `Dosage: ${medicine.dosage}\nFrequency: ${medicine.frequency}`,
                        'medicine'
                    );
                    playReminderSound('medicine');
                    showNotification(`💊 Time to take ${medicine.name}`, `Dosage: ${medicine.dosage}`);
                    markAsReminded(reminderId);
                }
            }
        }
    });

    // Check appointment reminders
    appointments.forEach(appointment => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        const timeDiff = (appointmentDateTime - now) / 1000 / 60; // minutes
        const reminderMinutes = parseInt(appointment.reminderBefore);
        
        // Check if within 1 minute of the reminder time
        if (timeDiff > 0 && timeDiff <= reminderMinutes && timeDiff > reminderMinutes - 1) {
            const reminderId = `appointment-${appointment.id}`;
            if (!hasBeenReminded(reminderId)) {
                showReminderPopup(
                    `📅 Appointment Reminder`,
                    `Appointment with ${appointment.doctor}`,
                    `Time: ${appointment.time}\nLocation: ${appointment.location}\nSpecialty: ${appointment.specialty}`,
                    'appointment'
                );
                playReminderSound('appointment');
                showNotification(`📅 Appointment Reminder`, `You have an appointment with ${appointment.doctor} in ${Math.round(timeDiff)} minutes`);
                markAsReminded(reminderId);
            }
        }
    });
}

// Track which reminders have been shown
let remindedItems = JSON.parse(localStorage.getItem('remindedItems')) || [];

function hasBeenReminded(reminderId) {
    return remindedItems.includes(reminderId);
}

function markAsReminded(reminderId) {
    if (!remindedItems.includes(reminderId)) {
        remindedItems.push(reminderId);
        localStorage.setItem('remindedItems', JSON.stringify(remindedItems));
    }
}

// Clear reminded items daily
function clearDailyReminders() {
    const lastClear = localStorage.getItem('lastReminderClear');
    const today = new Date().toISOString().split('T')[0];
    
    if (lastClear !== today) {
        remindedItems = [];
        localStorage.setItem('remindedItems', JSON.stringify(remindedItems));
        localStorage.setItem('lastReminderClear', today);
    }
}

// Show reminder popup with sound and animation
function showReminderPopup(title, mainMessage, details, type) {
    const popup = document.createElement('div');
    popup.className = `reminder-popup reminder-popup-${type}`;
    popup.innerHTML = `
        <div class="reminder-popup-content">
            <div class="reminder-popup-header">
                <h3>${title}</h3>
                <button class="reminder-popup-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="reminder-popup-body">
                <p class="reminder-popup-main">${mainMessage}</p>
                <p class="reminder-popup-details">${details.replace(/\n/g, '<br>')}</p>
                <p class="reminder-popup-time">⏰ ${new Date().toLocaleTimeString()}</p>
            </div>
            <div class="reminder-popup-actions">
                <button class="reminder-popup-btn btn-acknowledge" onclick="acknowledgeReminder(this)">
                    <i class="fas fa-check"></i> Got it
                </button>
                <button class="reminder-popup-btn btn-snooze" onclick="snoozeReminder(this, 5)">
                    <i class="fas fa-clock"></i> Snooze 5 min
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Auto-close after 15 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }
    }, 15000);
}

// Acknowledge reminder
function acknowledgeReminder(button) {
    const popup = button.closest('.reminder-popup');
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
}

// Snooze reminder
function snoozeReminder(button, minutes) {
    const popup = button.closest('.reminder-popup');
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
    
    // Show snooze message
    showModal('Snoozed', `Reminder snoozed for ${minutes} minutes. You'll be reminded again.`);
}

// Play reminder sound
function playReminderSound(type) {
    try {
        // Create audio context for sound generation
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'medicine') {
            // Medicine reminder: 3 beeps
            playBeep(audioContext, 800, 0.3, 0.2);
            playBeep(audioContext, 800, 0.5, 0.2);
            playBeep(audioContext, 800, 0.7, 0.2);
        } else if (type === 'appointment') {
            // Appointment reminder: 2 longer beeps
            playBeep(audioContext, 600, 0.3, 0.3);
            playBeep(audioContext, 600, 0.7, 0.3);
        }
    } catch (e) {
        console.log('Audio context not available, trying alternative method');
        playFallbackSound(type);
    }
}

// Play beep sound
function playBeep(audioContext, frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + duration);
}

// Fallback sound using Web Audio API
function playFallbackSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        if (type === 'medicine') {
            // 3 quick beeps for medicine
            for (let i = 0; i < 3; i++) {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = 800;
                gain.gain.setValueAtTime(0.3, now + i * 0.3);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.2);
                osc.start(now + i * 0.3);
                osc.stop(now + i * 0.3 + 0.2);
            }
        } else {
            // 2 longer beeps for appointment
            for (let i = 0; i < 2; i++) {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = 600;
                gain.gain.setValueAtTime(0.3, now + i * 0.5);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.5 + 0.3);
                osc.start(now + i * 0.5);
                osc.stop(now + i * 0.5 + 0.3);
            }
        }
    } catch (e) {
        console.log('Could not play sound:', e);
    }
}

// Show notification (browser notification)
function showNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913152.png',
            tag: 'reminder-notification',
            requireInteraction: true
        });
    }
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Clear daily reminders on page load
clearDailyReminders();

// Check reminders every 10 seconds for more accurate timing
setInterval(() => {
    clearDailyReminders();
    checkReminders();
}, 10000);

// Also check on page load
checkReminders();

// Initial display
displayMedicines();
displayAppointments();

// ==================== PATIENT PORTAL FUNCTIONALITY ====================

// Initialize patient data from localStorage
let currentPatient = JSON.parse(localStorage.getItem('currentPatient')) || null;
let patientReports = JSON.parse(localStorage.getItem('patientReports')) || [];

// Switch patient tabs
function switchPatientTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.patient-tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.patient-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.closest('.patient-tab-btn').classList.add('active');

    // Load profile if switching to profile tab
    if (tabName === 'profile') {
        displayPatientProfile();
    }

    // Load reports if switching to reports tab
    if (tabName === 'reports') {
        displayPatientReports();
    }
}

// Patient Registration Form
const patientRegistrationForm = document.getElementById('patientRegistrationForm');
if (patientRegistrationForm) {
    patientRegistrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('patientFirstName').value;
        const lastName = document.getElementById('patientLastName').value;
        const email = document.getElementById('patientEmail').value;
        const phone = document.getElementById('patientPhone').value;
        const dob = document.getElementById('patientDOB').value;
        const gender = document.getElementById('patientGender').value;
        const bloodGroup = document.getElementById('patientBloodGroup').value;
        const address = document.getElementById('patientAddress').value;
        const medicalHistory = document.getElementById('patientMedicalHistory').value;

        // Generate unique patient ID and QR code data
        const patientId = 'PAT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        currentPatient = {
            id: patientId,
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            bloodGroup,
            address,
            medicalHistory,
            registrationDate: new Date().toISOString(),
            qrCodeData: patientId
        };

        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        
        showModal('Registration Successful!', 
            `Welcome ${firstName} ${lastName}!\n\nYour Patient ID: ${patientId}\n\nYour unique QR code has been generated. You can view it in the Profile tab.`);
        
        patientRegistrationForm.reset();
    });
}

// Display Patient Profile with QR Code
function displayPatientProfile() {
    const profileContent = document.getElementById('profileContent');

    if (!currentPatient) {
        profileContent.innerHTML = '<p class="empty-message">No patient registered yet. Please register first.</p>';
        return;
    }

    const age = calculateAge(currentPatient.dob);

    profileContent.innerHTML = `
        <div class="profile-card">
            <div class="profile-info">
                <h2>${currentPatient.firstName} ${currentPatient.lastName}</h2>
                <div class="profile-info-item">
                    <i class="fas fa-id-card"></i>
                    <div>
                        <strong>Patient ID:</strong>
                        <span>${currentPatient.id}</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <strong>Email:</strong>
                        <span>${currentPatient.email}</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <strong>Phone:</strong>
                        <span>${currentPatient.phone}</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-birthday-cake"></i>
                    <div>
                        <strong>Age:</strong>
                        <span>${age} years</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-venus-mars"></i>
                    <div>
                        <strong>Gender:</strong>
                        <span>${currentPatient.gender}</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-droplet"></i>
                    <div>
                        <strong>Blood Group:</strong>
                        <span>${currentPatient.bloodGroup}</span>
                    </div>
                </div>
                <div class="profile-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Address:</strong>
                        <span>${currentPatient.address}</span>
                    </div>
                </div>
                ${currentPatient.medicalHistory ? `
                <div class="profile-info-item">
                    <i class="fas fa-notes-medical"></i>
                    <div>
                        <strong>Medical History:</strong>
                        <span>${currentPatient.medicalHistory}</span>
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="qr-code-container">
                <h4>Your Patient QR Code</h4>
                <div id="qrCode"></div>
                <div class="qr-code-actions">
                    <button class="qr-btn" onclick="downloadQRCode()">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="qr-btn" onclick="printQRCode()">
                        <i class="fas fa-print"></i> Print
                    </button>
                </div>
            </div>
        </div>
    `;

    // Generate QR Code
    setTimeout(() => {
        const qrCodeDiv = document.getElementById('qrCode');
        qrCodeDiv.innerHTML = ''; // Clear previous QR code
        new QRCode(qrCodeDiv, {
            text: currentPatient.qrCodeData,
            width: 200,
            height: 200,
            colorDark: '#0066cc',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }, 100);
}

// Calculate age from date of birth
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Download QR Code
function downloadQRCode() {
    if (!currentPatient) {
        showModal('Error', 'No patient registered');
        return;
    }

    const canvas = document.querySelector('#qrCode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${currentPatient.firstName}_${currentPatient.lastName}_QRCode.png`;
        link.click();
        showModal('Downloaded', 'QR Code downloaded successfully!');
    }
}

// Print QR Code
function printQRCode() {
    if (!currentPatient) {
        showModal('Error', 'No patient registered');
        return;
    }

    const printWindow = window.open('', '', 'height=400,width=600');
    const canvas = document.querySelector('#qrCode canvas');
    
    if (canvas) {
        printWindow.document.write(`
            <html>
            <head>
                <title>Patient QR Code - ${currentPatient.firstName} ${currentPatient.lastName}</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    h2 { color: #0066cc; }
                    .info { margin: 20px 0; text-align: left; }
                    .info p { margin: 5px 0; }
                </style>
            </head>
            <body>
                <h2>Patient QR Code</h2>
                <div class="info">
                    <p><strong>Name:</strong> ${currentPatient.firstName} ${currentPatient.lastName}</p>
                    <p><strong>Patient ID:</strong> ${currentPatient.id}</p>
                    <p><strong>Blood Group:</strong> ${currentPatient.bloodGroup}</p>
                </div>
                <img src="${canvas.toDataURL('image/png')}" style="width: 300px; height: 300px;">
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Report Form Submission
const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!currentPatient) {
            showModal('Error', 'Please register as a patient first before uploading reports.');
            return;
        }

        const reportType = document.getElementById('reportType').value;
        const reportDate = document.getElementById('reportDate').value;
        const reportDescription = document.getElementById('reportDescription').value;
        const reportFile = document.getElementById('reportFile').files[0];

        if (!reportFile) {
            showModal('Error', 'Please select a file to upload');
            return;
        }

        // Read file as base64
        const reader = new FileReader();
        reader.onload = (event) => {
            const report = {
                id: Date.now(),
                patientId: currentPatient.id,
                type: reportType,
                date: reportDate,
                description: reportDescription,
                fileName: reportFile.name,
                fileSize: (reportFile.size / 1024).toFixed(2) + ' KB',
                fileData: event.target.result,
                uploadedAt: new Date().toISOString()
            };

            patientReports.push(report);
            localStorage.setItem('patientReports', JSON.stringify(patientReports));

            showModal('Report Uploaded', `${reportType} report uploaded successfully!`);
            reportForm.reset();
            displayPatientReports();
        };

        reader.readAsDataURL(reportFile);
    });
}

// Display Patient Reports
function displayPatientReports() {
    const reportsList = document.getElementById('reportsList');

    if (!currentPatient) {
        reportsList.innerHTML = '<p class="empty-message">Please register as a patient first to view reports.</p>';
        return;
    }

    const patientSpecificReports = patientReports.filter(r => r.patientId === currentPatient.id);

    if (patientSpecificReports.length === 0) {
        reportsList.innerHTML = '<p class="empty-message">No reports uploaded yet. Upload your first report.</p>';
        return;
    }

    reportsList.innerHTML = patientSpecificReports.map(report => {
        const reportDate = new Date(report.date).toLocaleDateString();
        const uploadedDate = new Date(report.uploadedAt).toLocaleDateString();

        return `
            <div class="report-item">
                <div class="report-header">
                    <div>
                        <div class="report-type">
                            <i class="fas fa-file-medical"></i> ${report.type}
                        </div>
                        <div class="report-date">Report Date: ${reportDate}</div>
                    </div>
                </div>
                ${report.description ? `<div class="report-description">${report.description}</div>` : ''}
                <div class="report-description">
                    <strong>File:</strong> ${report.fileName} (${report.fileSize})<br>
                    <strong>Uploaded:</strong> ${uploadedDate}
                </div>
                <div class="report-actions">
                    <button class="report-btn btn-view" onclick="viewReport(${report.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="report-btn btn-delete-report" onclick="deleteReport(${report.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View Report
function viewReport(reportId) {
    const report = patientReports.find(r => r.id === reportId);
    if (report) {
        const link = document.createElement('a');
        link.href = report.fileData;
        link.download = report.fileName;
        link.click();
        showModal('Report', `Opening ${report.type} report: ${report.fileName}`);
    }
}

// Delete Report
function deleteReport(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
        patientReports = patientReports.filter(r => r.id !== reportId);
        localStorage.setItem('patientReports', JSON.stringify(patientReports));
        displayPatientReports();
        showModal('Deleted', 'Report has been deleted successfully.');
    }
}

// Initialize patient portal on page load
if (currentPatient) {
    displayPatientProfile();
}

// ==================== QR SCANNER FUNCTIONALITY ====================

let scannerActive = false;
let allPatients = JSON.parse(localStorage.getItem('allPatients')) || [];

// Switch scanner tabs
function switchScannerTab(tabName) {
    const tabContents = document.querySelectorAll('.scanner-tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const tabBtns = document.querySelectorAll('.scanner-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    event.target.closest('.scanner-tab-btn').classList.add('active');

    if (tabName === 'camera') {
        // Stop any previous scanner
        stopQRScanner();
    }
}

// Start QR Scanner
function startQRScanner() {
    const video = document.getElementById('qrVideo');
    const startBtn = event.target;
    const stopBtn = document.getElementById('stopScannerBtn');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                video.srcObject = stream;
                scannerActive = true;
                startBtn.style.display = 'none';
                stopBtn.style.display = 'inline-block';
                scanQRCode();
            })
            .catch(err => {
                showModal('Camera Error', 'Unable to access camera. Please check permissions.');
                console.error('Camera error:', err);
            });
    } else {
        showModal('Not Supported', 'Camera access is not supported on this device.');
    }
}

// Stop QR Scanner
function stopQRScanner() {
    const video = document.getElementById('qrVideo');
    const startBtn = document.querySelector('.camera-container .btn-primary');
    const stopBtn = document.getElementById('stopScannerBtn');

    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    scannerActive = false;
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
}

// Scan QR Code
function scanQRCode() {
    const video = document.getElementById('qrVideo');
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');

    const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 2,
            });

            if (code) {
                stopQRScanner();
                handleScannedQRCode(code.data);
                return;
            }
        }

        if (scannerActive) {
            requestAnimationFrame(scan);
        }
    };

    scan();
}

// Handle Scanned QR Code
function handleScannedQRCode(patientId) {
    const allPatientData = JSON.parse(localStorage.getItem('allPatients')) || [];
    const scannedPatient = allPatientData.find(p => p.id === patientId);

    if (scannedPatient) {
        displayScannedPatientRecords(scannedPatient);
        showModal('Patient Found', `Patient ID: ${patientId} found successfully!`);
    } else {
        showModal('Patient Not Found', `No patient found with ID: ${patientId}`);
    }
}

// Search Patient by ID
function searchPatientById() {
    const patientIdInput = document.getElementById('patientIdInput').value.trim();

    if (!patientIdInput) {
        showModal('Error', 'Please enter a patient ID');
        return;
    }

    const allPatientData = JSON.parse(localStorage.getItem('allPatients')) || [];
    const searchedPatient = allPatientData.find(p => p.id === patientIdInput);

    if (searchedPatient) {
        displayScannedPatientRecords(searchedPatient);
        showModal('Patient Found', `Patient found: ${searchedPatient.firstName} ${searchedPatient.lastName}`);
    } else {
        showModal('Patient Not Found', `No patient found with ID: ${patientIdInput}`);
    }
}

// Display Scanned Patient Records
function displayScannedPatientRecords(patient) {
    const recordsSection = document.getElementById('scannedPatientRecords');
    const recordsContent = document.getElementById('recordsContent');

    // Get patient's reports
    const patientReportsList = patientReports.filter(r => r.patientId === patient.id);
    const age = calculateAge(patient.dob);

    let recordsHTML = `
        <!-- Patient Information Card -->
        <div class="patient-record-card">
            <div class="record-section-title">
                <i class="fas fa-user-circle"></i> Patient Information
            </div>
            <div class="patient-info-grid">
                <div class="info-box">
                    <strong>Name</strong>
                    <span>${patient.firstName} ${patient.lastName}</span>
                </div>
                <div class="info-box">
                    <strong>Patient ID</strong>
                    <span>${patient.id}</span>
                </div>
                <div class="info-box">
                    <strong>Age</strong>
                    <span>${age} years</span>
                </div>
                <div class="info-box">
                    <strong>Gender</strong>
                    <span>${patient.gender}</span>
                </div>
                <div class="info-box">
                    <strong>Blood Group</strong>
                    <span>${patient.bloodGroup}</span>
                </div>
                <div class="info-box">
                    <strong>Email</strong>
                    <span>${patient.email}</span>
                </div>
                <div class="info-box">
                    <strong>Phone</strong>
                    <span>${patient.phone}</span>
                </div>
                <div class="info-box">
                    <strong>Address</strong>
                    <span>${patient.address}</span>
                </div>
            </div>
        </div>
    `;

    // Medical History
    if (patient.medicalHistory) {
        recordsHTML += `
            <div class="patient-record-card">
                <div class="record-section-title">
                    <i class="fas fa-notes-medical"></i> Medical History
                </div>
                <div class="info-box">
                    <span>${patient.medicalHistory}</span>
                </div>
            </div>
        `;
    }

    // Medical Reports
    if (patientReportsList.length > 0) {
        recordsHTML += `
            <div class="patient-record-card">
                <div class="record-section-title">
                    <i class="fas fa-file-medical"></i> Medical Reports & Tests (${patientReportsList.length})
                </div>
                <div class="reports-grid">
        `;

        patientReportsList.forEach(report => {
            const reportDate = new Date(report.date).toLocaleDateString();
            const uploadedDate = new Date(report.uploadedAt).toLocaleDateString();

            recordsHTML += `
                <div class="report-card">
                    <div class="report-card-header">
                        <div class="report-card-type">
                            <i class="fas fa-file-pdf"></i> ${report.type}
                        </div>
                        <div class="report-card-date">${reportDate}</div>
                    </div>
                    <div class="report-card-info">
                        ${report.description ? `<p><strong>Description:</strong> ${report.description}</p>` : ''}
                        <p><strong>File:</strong> ${report.fileName}</p>
                        <p><strong>Size:</strong> ${report.fileSize}</p>
                        <p><strong>Uploaded:</strong> ${uploadedDate}</p>
                    </div>
                    <div class="report-card-actions">
                        <button class="report-card-btn download" onclick="downloadScannedReport('${report.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `;
        });

        recordsHTML += `
                </div>
            </div>
        `;
    } else {
        recordsHTML += `
            <div class="patient-record-card">
                <div class="no-records">
                    <i class="fas fa-file-medical"></i>
                    <p>No medical reports or tests uploaded yet</p>
                </div>
            </div>
        `;
    }

    recordsContent.innerHTML = recordsHTML;
    recordsSection.style.display = 'block';
    recordsSection.scrollIntoView({ behavior: 'smooth' });
}

// Download Scanned Report
function downloadScannedReport(reportId) {
    const report = patientReports.find(r => r.id === reportId);
    if (report) {
        const link = document.createElement('a');
        link.href = report.fileData;
        link.download = report.fileName;
        link.click();
        showModal('Downloaded', `${report.type} report downloaded successfully!`);
    }
}

// Close Patient Records
function closePatientRecords() {
    const recordsSection = document.getElementById('scannedPatientRecords');
    recordsSection.style.display = 'none';
    document.getElementById('patientIdInput').value = '';
}

// Save patient to all patients list when registering
const originalPatientRegistration = patientRegistrationForm ? patientRegistrationForm.onsubmit : null;

// Override patient registration to save to all patients
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('patientRegistrationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            // After registration, save to all patients list
            setTimeout(() => {
                if (currentPatient) {
                    let allPatientsList = JSON.parse(localStorage.getItem('allPatients')) || [];
                    const existingIndex = allPatientsList.findIndex(p => p.id === currentPatient.id);
                    
                    if (existingIndex === -1) {
                        allPatientsList.push(currentPatient);
                        localStorage.setItem('allPatients', JSON.stringify(allPatientsList));
                    }
                }
            }, 100);
        });
    }
});
