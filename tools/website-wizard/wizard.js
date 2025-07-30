// === WEBSITE CONSULTATION WIZARD ===
// Core wizard functionality and step management

// PIN Authentication System
const CORRECT_PIN = '1234';
const authOverlay = document.getElementById('authOverlay');
const mainContent = document.getElementById('mainContent');
const pinForm = document.getElementById('pinForm');
const pinInput = document.getElementById('pinInput');
const pinError = document.getElementById('pinError');

function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('thwebworks_authenticated');
    if (isAuthenticated === 'true') {
        showMainContent();
    }
}

function showMainContent() {
    authOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
}

// Authentication event listeners
pinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredPin = pinInput.value;
    
    if (enteredPin === CORRECT_PIN) {
        sessionStorage.setItem('thwebworks_authenticated', 'true');
        showMainContent();
        pinError.classList.add('hidden');
    } else {
        pinError.classList.remove('hidden');
        pinInput.value = '';
        pinInput.focus();
    }
});


// Initialize on page load
pinInput.focus();
checkAuth();

// === WIZARD STATE MANAGEMENT ===
let currentStep = 0;
window.formData = {};
let formData = window.formData;
let previewEnabled = false; // Control when preview is visible

// Debug function to reset wizard state
window.resetWizardDebug = function() {
    localStorage.removeItem('consultationWizardData');
    currentStep = 0;
    formData = {};
    previewEnabled = false;
    initializeFormData();
    renderStep(currentStep);
    updateProgressIndicator();
    updatePreviewVisibility();
    console.log('Wizard reset to step 1');
};

// Debug function to populate test data for easier workflow testing
window.populateTestData = function() {
    console.log('🧪 Populating test data...');
    
    // Clear existing data first
    window.formData = {};
    formData = window.formData;
    
    // Populate comprehensive test data
    formData.businessType = 'service-business';
    formData.goals = ['Generate Leads', 'Build Credibility', 'Showcase Services'];
    formData.pagesCore = ['Home', 'About', 'Services', 'Contact'];
    formData.pagesTrust = ['Testimonials', 'Portfolio'];
    formData.pagesEngage = ['Blog', 'FAQ'];
    formData.features = ['Contact Form', 'Service Showcase', 'Testimonials', 'Online Booking'];
    formData.designStyle = 'Modern & Clean';
    formData.primaryColor = '#3abbfa';
    formData.secondaryColor = '#f39c12';
    formData.backgroundColor = '#ffffff';
    formData.contactName = 'John Doe';
    formData.email = 'john@example.com';
    formData.phone = '+1 (555) 123-4567';
    formData.budget = '$3,000 - $5,000';
    formData.timeline = '4-6 weeks';
    formData.projectDeadline = '2025-03-15';
    formData.integrations = ['Google Analytics', 'Email Marketing', 'Social Media'];
    formData.contentResponsibility = 'client';
    formData.seoRequirements = ['Basic SEO', 'Mobile Responsive', 'Fast Loading'];
    formData.communicationMethods = ['Fiverr Messages', 'Email Updates'];
    formData.postLaunchSupport = 'basic';
    formData.handoffNotes = 'Looking for a professional, modern design that converts visitors into customers. Need responsive design and SEO optimization.';
    
    // Ensure global sync
    window.formData = formData;
    
    saveFormData();
    console.log('🧪 Test data populated:', formData);
    
    alert('Test data populated! Now navigate to step 10 (Summary) to see the populated data.');
};

// Initialize form data with default values
function initializeFormData() {
    window.formData = {
        businessType: '',
        businessTypeOther: '',
        goals: [],
        goalsOther: '',
        pagesCore: [],
        pagesTrust: [],
        pagesEngage: [],
        pagesCommerce: [],
        features: [],
        designStyle: 'Modern & Clean',
        primaryColor: '#3abbfa',
        secondaryColor: '#f39c12',
        backgroundColor: '#ffffff',
        headingTextColor: '#333333',
        bodyTextColor: '#666666',
        footerBackgroundColor: '#2c3e50',
        footerTextColor: '#ffffff',
        contactName: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '',
        additionalNotes: '',
        exampleSites: '',
        sendEmailCopy: true,
        // Handoff details
        projectName: '',
        projectDeadline: '',
        developerEmail: '',
        projectAssets: [],
        handoffNotes: '',
        // Technical requirements
        hasDomain: 'no',
        domainName: '',
        hostingPreference: 'developer-choice',
        integrations: [],
        // Content & SEO
        contentResponsibility: 'client',
        seoRequirements: [],
        // Project management
        communicationMethods: ['Fiverr Messages'],
        postLaunchSupport: 'basic'
    };
    
    // Update local reference
    formData = window.formData;
    
    // Ensure all array fields are properly initialized
    const arrayFields = ['goals', 'pagesCore', 'pagesTrust', 'pagesEngage', 'pagesCommerce', 'features', 'projectAssets', 'integrations', 'seoRequirements', 'communicationMethods'];
    arrayFields.forEach(field => {
        if (!Array.isArray(formData[field])) {
            formData[field] = [];
        }
    });
    
    console.log('Form data initialized:', formData);
    
    // Apply default design style to preview if available
    if (typeof updatePreview === 'function') {
        updatePreview();
    }
}

// Reset wizard state
function resetWizard() {
    // Clear localStorage
    localStorage.removeItem('consultationWizardData');
    
    // Reset all form data
    window.formData = {};
    formData = window.formData;
    currentStep = 0;
    previewEnabled = false;
    
    // Initialize with fresh defaults
    initializeFormData();
    
    // Update form panel classes for step-based styling
    const formPanel = document.querySelector('.form-panel');
    if (formPanel) {
        formPanel.classList.remove('step-1');
        formPanel.classList.add('step-1');
    }
    
    // Reset all visual states
    document.querySelectorAll('.input-option.selected, .business-type-card.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    document.querySelectorAll('.color-preset-btn.active').forEach(el => {
        el.classList.remove('active');
    });
    
    document.querySelectorAll('.scheme-preset-btn.active').forEach(el => {
        el.classList.remove('active');
    });
    
    // Reset form inputs
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(input => {
        input.value = '';
    });
    
    // Re-render everything
    renderStep(currentStep);
    updateProgressIndicator();
    updatePreviewVisibility();
    
    // Update preview with fresh defaults
    if (typeof updatePreview === 'function') {
        updatePreview();
    }
    
    console.log('Wizard completely reset to step 1');
}

// Update preview visibility based on current step
function updatePreviewVisibility() {
    const previewPanel = document.getElementById('previewPanel');
    if (previewPanel) {
        // Only show preview from step 2 onwards (index 1+)
        if (currentStep >= 1) {
            previewPanel.style.display = 'block';
            previewPanel.classList.remove('hidden');
            // Add visible class after a small delay for smooth animation
            setTimeout(() => {
                previewPanel.classList.add('visible');
            }, 50);
        } else {
            previewPanel.classList.remove('visible');
            // Hide after animation completes
            setTimeout(() => {
                previewPanel.style.display = 'none';
                previewPanel.classList.add('hidden');
            }, 500);
        }
    }
}

// === ICON MAPPING ===
const icons = {
    'briefcase': '💼',
    'target': '🎯',
    'layout': '📄',
    'settings': '⚙️',
    'palette': '🎨',
    'dollar': '💰',
    'user': '👤',
    'check': '✅',
    'service-business': '🔧',
    'trades': '🔨',
    'consulting': '💡',
    'education': '📚',
    'real-estate-agency': '🏠',
    'tech-startup': '💻',
    'other': '📋'
};

function getIcon(key) {
    return icons[key] || '📋';
}

// === HELPER FUNCTIONS FOR FORM INTERACTIONS ===

// Save form data to localStorage
function saveFormData() {
    localStorage.setItem('consultationWizardData', JSON.stringify(formData));
}

function selectRadioOption(name, value) {
    console.log('📻 selectRadioOption called with:', name, value);
    formData[name] = value;
    window.formData = formData; // Ensure global sync
    console.log('📻 formData after update:', formData);
    console.log('📻 window.formData after update:', window.formData);
    saveFormData(); // Save immediately
    
    // Update visual state
    const options = document.querySelectorAll(`input[name="${name}"]`);
    if (options) {
        options.forEach(option => {
            // Support both old input-option and new business-type-card classes
            const optionDiv = option.closest('.input-option, .business-type-card');
            if (!optionDiv) return;
            if (option.value === value) {
                option.checked = true;
                optionDiv.classList.add('selected');
            } else {
                option.checked = false;
                optionDiv.classList.remove('selected');
            }
        });
    }
    // Trigger preview update
    handleImmediateVisualChanges({ name, value });
    updatePreview();
}

function toggleCheckboxOption(name, value) {
    console.log('☑️ toggleCheckboxOption called with:', name, value);
    
    // Ensure formData[name] is an array
    if (!Array.isArray(formData[name])) {
        formData[name] = [];
    }
    
    const optionInput = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (!optionInput) return;
    
    const optionDiv = optionInput.closest('.input-option');
    if (!optionDiv) return;
    
    const checkbox = optionDiv.querySelector('input[type="checkbox"]');
    if (!checkbox) return;
    
    // Check if the value is already in the array
    const isCurrentlySelected = formData[name].includes(value);
    
    if (isCurrentlySelected) {
        console.log('☑️ Deselecting:', value);
        // Remove from array
        formData[name] = formData[name].filter(v => v !== value);
        checkbox.checked = false;
        optionDiv.classList.remove('selected');
    } else {
        console.log('☑️ Selecting:', value);
        // Add to array
        formData[name].push(value);
        checkbox.checked = true;
        optionDiv.classList.add('selected');
    }
    
    window.formData = formData; // Ensure global sync
    console.log('☑️ Updated formData[' + name + ']:', formData[name]);
    saveFormData(); // Save immediately
    
    // IMMEDIATE visual feedback for specific options
    handleImmediateVisualChanges({ name, value });
    updatePreview();
}

// === STEP RENDERING ===
async function renderStep(idx) {
    const form = document.getElementById('wizardForm');
    if (!form) return;
    
    form.innerHTML = '<div class="text-center py-8"><div class="loading-spinner"></div><p class="text-text-muted mt-4">Loading step...</p></div>';
    
    try {
        // Load the HTML template for this step
        const stepNumber = idx + 1;
        const templatePath = `steps/step-${stepNumber}-${getStepSlug(idx)}.html`;
        
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.statusText}`);
        }
        
        const template = await response.text();
        form.innerHTML = template;
        
        // Populate form data
        populateFormData();
        
            // Add interactive elements
    addInteractiveElements();
        
        // Special handling for summary step
        if (idx === 9) { // Step 10 (index 9) - Summary step
            setTimeout(() => {
                populateSummary();
            }, 100); // Small delay to ensure everything is loaded
        }
        
    } catch (error) {
        console.error('Error loading step template:', error);
        form.innerHTML = `
            <div class="text-center py-8">
                <div class="text-error text-lg mb-4">Error loading step</div>
                <p class="text-text-muted">Please refresh the page and try again.</p>
            </div>
        `;
    }
}

function getStepSlug(idx) {
    const slugs = [
        'welcome',
        'business-type', 
        'goals',
        'pages',
        'features',
        'design',
        'colors',
        'contact',
        'handoff',
        'summary'
    ];
    return slugs[idx] || 'welcome';
}

function populateFormData() {
    // Populate form fields with existing data
    Object.keys(formData).forEach(key => {
        const elements = document.querySelectorAll(`[name="${key}"]`);
        
        elements.forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = formData[key] === true || (Array.isArray(formData[key]) && formData[key].includes(element.value));
            } else if (element.type === 'radio') {
                element.checked = formData[key] === element.value;
            } else {
                element.value = formData[key] || '';
            }
            
            // Update visual state for input options
            const optionDiv = element.closest('.input-option, .business-type-card');
            if (optionDiv) {
                if (element.checked || (element.type === 'radio' && formData[key] === element.value)) {
                    optionDiv.classList.add('selected');
                } else {
                    optionDiv.classList.remove('selected');
                }
            }
        });
    });
    
    // Update color previews and active states
    updateColorPreviews();
}

function updateColorPreviews() {
    const primaryPreview = document.getElementById('primaryColorPreview');
    const secondaryPreview = document.getElementById('secondaryColorPreview');
    const backgroundPreview = document.getElementById('backgroundColorPreview');
    const textPreview = document.getElementById('textColorPreview');
    const footerBackgroundPreview = document.getElementById('footerBackgroundColorPreview');
    const footerTextPreview = document.getElementById('footerTextColorPreview');
    
    if (primaryPreview && formData.primaryColor) {
        primaryPreview.style.backgroundColor = formData.primaryColor;
    }
    if (secondaryPreview && formData.secondaryColor) {
        secondaryPreview.style.backgroundColor = formData.secondaryColor;
    }
    if (backgroundPreview && formData.backgroundColor) {
        backgroundPreview.style.backgroundColor = formData.backgroundColor;
    }
    if (textPreview && formData.textColor) {
        textPreview.style.backgroundColor = formData.textColor;
    }
    if (footerBackgroundPreview && formData.footerBackgroundColor) {
        footerBackgroundPreview.style.backgroundColor = formData.footerBackgroundColor;
    }
    if (footerTextPreview && formData.footerTextColor) {
        footerTextPreview.style.backgroundColor = formData.footerTextColor;
    }
    
    // Update active states for color preset buttons
    updateColorPresetActiveStates();
}

function updateColorPresetActiveStates() {
    // Clear all active states first
    document.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
    
    // Set active states based on current form data
    if (formData.primaryColor) {
        const primaryBtn = document.querySelector(`.color-preset-btn[data-color="${formData.primaryColor}"]`);
        if (primaryBtn && primaryBtn.closest('.form-group').querySelector('input[name="primaryColor"]')) {
            primaryBtn.classList.add('active');
        }
    }
    
    if (formData.secondaryColor) {
        const secondaryBtn = document.querySelector(`.color-preset-btn[data-color="${formData.secondaryColor}"]`);
        if (secondaryBtn && secondaryBtn.closest('.form-group').querySelector('input[name="secondaryColor"]')) {
            secondaryBtn.classList.add('active');
        }
    }
    
    if (formData.backgroundColor) {
        const backgroundBtn = document.querySelector(`.color-preset-btn[data-color="${formData.backgroundColor}"]`);
        if (backgroundBtn && backgroundBtn.closest('.form-group').querySelector('input[name="backgroundColor"]')) {
            backgroundBtn.classList.add('active');
        }
    }
    
    if (formData.textColor) {
        const textBtn = document.querySelector(`.color-preset-btn[data-color="${formData.textColor}"]`);
        if (textBtn && textBtn.closest('.form-group').querySelector('input[name="textColor"]')) {
            textBtn.classList.add('active');
        }
    }
    
    if (formData.footerBackgroundColor) {
        const footerBgBtn = document.querySelector(`.color-preset-btn[data-color="${formData.footerBackgroundColor}"]`);
        if (footerBgBtn && footerBgBtn.closest('.form-group').querySelector('input[name="footerBackgroundColor"]')) {
            footerBgBtn.classList.add('active');
        }
    }
    
    if (formData.footerTextColor) {
        const footerTextBtn = document.querySelector(`.color-preset-btn[data-color="${formData.footerTextColor}"]`);
        if (footerTextBtn && footerTextBtn.closest('.form-group').querySelector('input[name="footerTextColor"]')) {
            footerTextBtn.classList.add('active');
        }
    }
}

function populateSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) {
        console.error('Summary content element not found');
        return;
    }
    
    let summary = '';
    
    // Business Information
    if (formData.businessType) {
        const businessTypeFormatted = formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        summary += `<div class="summary-item">
            <i class="fas fa-building text-primary mr-2"></i>
            <strong>Business Type:</strong> ${businessTypeFormatted}
        </div>`;
    }
    
    // Goals
    if (formData.goals && formData.goals.length > 0) {
        summary += `<div class="summary-item">
            <i class="fas fa-bullseye text-primary mr-2"></i>
            <strong>Primary Goals:</strong> ${formData.goals.join(', ')}
        </div>`;
    }
    
    // Pages
    if (formData.pagesCore && formData.pagesCore.length > 0) {
        summary += `<div class="summary-item">
            <i class="fas fa-sitemap text-primary mr-2"></i>
            <strong>Core Pages:</strong> ${formData.pagesCore.join(', ')}
        </div>`;
    }
    
    // Features
    if (formData.features && formData.features.length > 0) {
        summary += `<div class="summary-item">
            <i class="fas fa-cogs text-primary mr-2"></i>
            <strong>Features:</strong> ${formData.features.join(', ')}
        </div>`;
    }
    
    // Design Style
    if (formData.designStyle) {
        summary += `<div class="summary-item">
            <i class="fas fa-palette text-primary mr-2"></i>
            <strong>Design Style:</strong> ${formData.designStyle}
        </div>`;
    }
    
    // Primary Color
    if (formData.primaryColor) {
        summary += `<div class="summary-item">
            <i class="fas fa-paint-brush text-primary mr-2"></i>
            <strong>Primary Color:</strong> 
            <span style="color: ${formData.primaryColor}; font-weight: bold;">${formData.primaryColor}</span>
            <span class="inline-block w-4 h-4 rounded ml-2" style="background-color: ${formData.primaryColor}; vertical-align: middle;"></span>
        </div>`;
    }
    
    // Contact Information
    if (formData.contactName) {
        summary += `<div class="summary-item">
            <i class="fas fa-user text-primary mr-2"></i>
            <strong>Contact:</strong> ${formData.contactName}
        </div>`;
    }
    
    if (formData.email) {
        summary += `<div class="summary-item">
            <i class="fas fa-envelope text-primary mr-2"></i>
            <strong>Email:</strong> ${formData.email}
        </div>`;
    }
    
    // Budget
    if (formData.budget) {
        summary += `<div class="summary-item">
            <i class="fas fa-dollar-sign text-primary mr-2"></i>
            <strong>Budget Range:</strong> ${formData.budget}
        </div>`;
    }
    
    // Timeline
    if (formData.timeline) {
        summary += `<div class="summary-item">
            <i class="fas fa-calendar text-primary mr-2"></i>
            <strong>Timeline:</strong> ${formData.timeline}
        </div>`;
    }
    
    // Project Deadline
    if (formData.projectDeadline) {
        const deadline = new Date(formData.projectDeadline);
        const formattedDate = deadline.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        summary += `<div class="summary-item">
            <i class="fas fa-clock text-primary mr-2"></i>
            <strong>Project Deadline:</strong> ${formattedDate}
        </div>`;
    }
    
    // Technical Requirements
    if (formData.integrations && formData.integrations.length > 0) {
        summary += `<div class="summary-item">
            <i class="fas fa-plug text-primary mr-2"></i>
            <strong>Required Integrations:</strong> ${formData.integrations.join(', ')}
        </div>`;
    }
    
    // Additional Notes
    if (formData.handoffNotes && formData.handoffNotes.trim()) {
        summary += `<div class="summary-item">
            <i class="fas fa-sticky-note text-primary mr-2"></i>
            <strong>Additional Notes:</strong> ${formData.handoffNotes}
        </div>`;
    }
    
    if (summary) {
        summaryContent.innerHTML = summary;
    } else {
        summaryContent.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-info-circle text-text-muted text-2xl mb-3"></i>
                <div class="text-text-muted">No consultation data found. Please go back and complete the wizard steps.</div>
            </div>
        `;
    }
}



// === NAVIGATION FUNCTIONS ===
function goToStep(idx) {
    if (idx >= 0 && idx < wizardSteps.length) {
        currentStep = idx;
        
        // Update form panel classes for step-based styling
        const formPanel = document.querySelector('.form-panel');
        if (formPanel) {
            formPanel.classList.remove('step-1');
            if (currentStep === 0) {
                formPanel.classList.add('step-1');
            }
        }
        
        renderStep(currentStep);
        updateProgressIndicator();
        updatePreviewVisibility();
    }
}

function nextStep() {
    if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
    }
}

function prevStep() {
    goToStep(currentStep - 1);
}

function validateStep(idx) {
    const step = wizardSteps[idx];
    if (!step) return true;
    
    let isValid = true;
    const requiredFields = step.fields.filter(field => field.required);
    
    requiredFields.forEach(field => {
        const value = formData[field.name];
        if (field.type === 'radio' && (!value || value === '')) {
            isValid = false;
        } else if (field.type === 'checkbox-group' && (!value || value.length === 0)) {
            isValid = false;
        } else if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
            if (!value || value.trim() === '') {
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// === PROGRESS INDICATOR ===
function updateProgressIndicator() {
    const progressStep = document.getElementById('progressStep');
    const progressTotal = document.getElementById('progressTotal');
    const progressLabel = document.getElementById('progressLabel');
    const progressBar = document.getElementById('progressBar');
    
    if (progressStep) progressStep.textContent = currentStep + 1;
    if (progressTotal) progressTotal.textContent = wizardSteps.length;
    if (progressLabel) progressLabel.textContent = wizardSteps[currentStep]?.title || 'Welcome';
    if (progressBar) {
        const progress = ((currentStep + 1) / wizardSteps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// === INTERACTIVE ELEMENTS ===
function addInteractiveElements() {
    // Add hover effects to input options
    const inputOptions = document.querySelectorAll('.input-option');
    inputOptions.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// === FORM EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form data
    initializeFormData();
    
    // Load saved data if exists
    const savedData = localStorage.getItem('consultationWizardData');
    if (savedData) {
        try {
            const loadedData = JSON.parse(savedData);
            formData = { ...formData, ...loadedData };
            
            // Ensure all array fields are properly initialized after loading
            const arrayFields = ['goals', 'pagesCore', 'pagesTrust', 'pagesEngage', 'pagesCommerce', 'features'];
            arrayFields.forEach(field => {
                if (!Array.isArray(formData[field])) {
                    formData[field] = [];
                }
            });
            
            console.log('Loaded form data (business type cleared):', formData);
        } catch (e) {
            console.warn('Failed to load saved form data');
        }
    }
    
    // Render initial step
    renderStep(currentStep);
    updateProgressIndicator();
    
    // Set initial step class
    const formPanel = document.querySelector('.form-panel');
    if (formPanel && currentStep === 0) {
        formPanel.classList.add('step-1');
    }
    
    // Add form event listeners
    setupFormEventListeners();
});

// Setup form event listeners
function setupFormEventListeners() {
    const form = document.getElementById('wizardForm');
    if (!form) return;
    
    // Input event listeners
    form.addEventListener('input', function(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        if (name) {
            formData[name] = value;
            saveFormData();
            handleImmediateVisualChanges({ name, value });
            updatePreview();
            
            // Update color previews if it's a color input
            if (name === 'primaryColor' || name === 'secondaryColor') {
                updateColorPreviews();
            }
        }
    });
    
    // Change event listeners
    form.addEventListener('change', function(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        if (name) {
            // Handle different input types
            if (target.type === 'checkbox') {
                if (!Array.isArray(formData[name])) {
                    formData[name] = [];
                }
                if (target.checked) {
                    if (!formData[name].includes(value)) {
                        formData[name].push(value);
                    }
                } else {
                    formData[name] = formData[name].filter(v => v !== value);
                }
            } else if (target.type === 'radio') {
                formData[name] = value;
            } else {
                formData[name] = value;
            }
            
            saveFormData();
            handleImmediateVisualChanges({ name, value });
            updatePreview();
        }
    });
    
    // Click event listeners for custom buttons
    form.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle radio option clicks
        if ((target.closest('.input-option') || target.closest('.business-type-card')) && 
            (target.closest('.input-option') || target.closest('.business-type-card')).querySelector('input[type="radio"]')) {
            const optionDiv = target.closest('.input-option, .business-type-card');
            const radio = optionDiv.querySelector('input[type="radio"]');
            const name = radio.name;
            const value = radio.value;
            
            selectRadioOption(name, value);
            saveFormData();
        }
        
        // Handle checkbox option clicks
        if (target.closest('.input-option') && target.closest('.input-option').querySelector('input[type="checkbox"]')) {
            const optionDiv = target.closest('.input-option');
            const checkbox = optionDiv.querySelector('input[type="checkbox"]');
            const name = checkbox.name;
            const value = checkbox.value;
            
            // Prevent default to avoid double handling
            e.preventDefault();
            e.stopPropagation();
            
            toggleCheckboxOption(name, value);
            saveFormData();
        }
        
        // Handle color preset button clicks
        if (target.classList.contains('color-preset-btn')) {
            const color = target.dataset.color;
            const formGroup = target.closest('.form-group');
            
            // Try to find the input by looking in the same form group first
            const primaryInput = formGroup.querySelector('input[name="primaryColor"]');
            const secondaryInput = formGroup.querySelector('input[name="secondaryColor"]');
            const backgroundInput = formGroup.querySelector('input[name="backgroundColor"]');
            const textInput = formGroup.querySelector('input[name="textColor"]');
            const footerBackgroundInput = formGroup.querySelector('input[name="footerBackgroundColor"]');
            const footerTextInput = formGroup.querySelector('input[name="footerTextColor"]');
            
            // Debug logging for troubleshooting
            // console.log('Color preset button clicked:', {
            //     color,
            //     formGroup: formGroup,
            //     primaryInput: !!primaryInput,
            //     secondaryInput: !!secondaryInput,
            //     backgroundInput: !!backgroundInput,
            //     textInput: !!textInput,
            //     footerBackgroundInput: !!footerBackgroundInput,
            //     footerTextInput: !!footerTextInput
            // });
            
            if (primaryInput) {
                // Update primary color
                formData.primaryColor = color;
                const colorInput = document.querySelector('input[name="primaryColor"][type="color"]');
                const textInput = document.querySelector('input[name="primaryColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'primaryColor', value: color });
                saveFormData();
            } else if (secondaryInput) {
                // Update secondary color
                formData.secondaryColor = color;
                const colorInput = document.querySelector('input[name="secondaryColor"][type="color"]');
                const textInput = document.querySelector('input[name="secondaryColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'secondaryColor', value: color });
                saveFormData();
            } else if (backgroundInput) {
                // Update background color
                formData.backgroundColor = color;
                const colorInput = document.querySelector('input[name="backgroundColor"][type="color"]');
                const textInput = document.querySelector('input[name="backgroundColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'backgroundColor', value: color });
                saveFormData();
            } else if (textInput) {
                // Update text color
                formData.textColor = color;
                const colorInput = document.querySelector('input[name="textColor"][type="color"]');
                const textInput = document.querySelector('input[name="textColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'textColor', value: color });
                saveFormData();
            } else if (footerBackgroundInput) {
                // console.log('Updating footer background color to:', color);
                // Update footer background color
                formData.footerBackgroundColor = color;
                const colorInput = document.querySelector('input[name="footerBackgroundColor"][type="color"]');
                const textInput = document.querySelector('input[name="footerBackgroundColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'footerBackgroundColor', value: color });
                saveFormData();
            } else if (footerTextInput) {
                // console.log('Updating footer text color to:', color);
                // Update footer text color
                formData.footerTextColor = color;
                const colorInput = document.querySelector('input[name="footerTextColor"][type="color"]');
                const textInput = document.querySelector('input[name="footerTextColor"][type="text"]');
                if (colorInput) colorInput.value = color;
                if (textInput) textInput.value = color;
                
                // Update active state
                formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update preview
                handleImmediateVisualChanges({ name: 'footerTextColor', value: color });
                saveFormData();
            } else {
                // Fallback: try to determine color type by looking at nearby elements
                // console.log('No specific color type detected, trying fallback...');
                
                // Look for the label text to determine which color this is
                const label = formGroup.querySelector('.form-label');
                if (label) {
                    const labelText = label.textContent.toLowerCase();
                    // console.log('Label text:', labelText);
                    
                    if (labelText.includes('footer background')) {
                        // console.log('Fallback: Updating footer background color to:', color);
                        formData.footerBackgroundColor = color;
                        const colorInput = document.querySelector('input[name="footerBackgroundColor"][type="color"]');
                        const textInput = document.querySelector('input[name="footerBackgroundColor"][type="text"]');
                        if (colorInput) colorInput.value = color;
                        if (textInput) textInput.value = color;
                        
                        // Update active state
                        formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                        target.classList.add('active');
                        
                        // Update preview
                        handleImmediateVisualChanges({ name: 'footerBackgroundColor', value: color });
                        saveFormData();
                    } else if (labelText.includes('footer text')) {
                        // console.log('Fallback: Updating footer text color to:', color);
                        formData.footerTextColor = color;
                        const colorInput = document.querySelector('input[name="footerTextColor"][type="color"]');
                        const textInput = document.querySelector('input[name="footerTextColor"][type="text"]');
                        if (colorInput) colorInput.value = color;
                        if (textInput) textInput.value = color;
                        
                        // Update active state
                        formGroup.querySelectorAll('.color-preset-btn').forEach(btn => btn.classList.remove('active'));
                        target.classList.add('active');
                        
                        // Update preview
                        handleImmediateVisualChanges({ name: 'footerTextColor', value: color });
                        saveFormData();
                    }
                }
            }
        }
        
        // Handle color scheme preset button clicks
        if (target.classList.contains('scheme-preset-btn')) {
            console.log('Color scheme button clicked:', target.dataset.scheme);
            const scheme = target.dataset.scheme;
            
            // Define color schemes
            const schemes = {
                professional: {
                    primaryColor: '#3abbfa',
                    secondaryColor: '#f39c12',
                    backgroundColor: '#ffffff',
                    headingTextColor: '#333333',
                    bodyTextColor: '#666666',
                    footerBackgroundColor: '#2c3e50',
                    footerTextColor: '#ffffff'
                },
                modern: {
                    primaryColor: '#2ecc71',
                    secondaryColor: '#34495e',
                    backgroundColor: '#f8f9fa',
                    headingTextColor: '#2c3e50',
                    bodyTextColor: '#666666',
                    footerBackgroundColor: '#34495e',
                    footerTextColor: '#ffffff'
                },
                warm: {
                    primaryColor: '#e67e22',
                    secondaryColor: '#f39c12',
                    backgroundColor: '#fefefe',
                    headingTextColor: '#2c3e50',
                    bodyTextColor: '#666666',
                    footerBackgroundColor: '#2c3e50',
                    footerTextColor: '#ffffff'
                },
                elegant: {
                    primaryColor: '#9b59b6',
                    secondaryColor: '#34495e',
                    backgroundColor: '#ffffff',
                    headingTextColor: '#2c3e50',
                    bodyTextColor: '#666666',
                    footerBackgroundColor: '#34495e',
                    footerTextColor: '#ffffff'
                }
            };
            
            const selectedScheme = schemes[scheme];
            if (selectedScheme) {
                console.log('Applying scheme:', scheme, selectedScheme);
                
                // Update active state first
                document.querySelectorAll('.scheme-preset-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Update all colors at once to prevent performance issues
                Object.keys(selectedScheme).forEach(colorKey => {
                    formData[colorKey] = selectedScheme[colorKey];
                    
                    // Update color inputs
                    const colorInput = document.querySelector(`input[name="${colorKey}"][type="color"]`);
                    const textInput = document.querySelector(`input[name="${colorKey}"][type="text"]`);
                    if (colorInput) colorInput.value = selectedScheme[colorKey];
                    if (textInput) textInput.value = selectedScheme[colorKey];
                });
                
                // Update preview once with all colors
                updateColorsImmediately('all', selectedScheme);
                
                // Save form data
                saveFormData();
                console.log('Scheme applied successfully:', scheme);
            }
        }
        
        // Handle button actions
        if (target.classList.contains('btn') || target.closest('.btn')) {
            const button = target.classList.contains('btn') ? target : target.closest('.btn');
            const action = button.dataset.action;
            
            if (action === 'next') {
                nextStep();
            } else if (action === 'prev') {
                prevStep();
            } else if (action === 'submit') {
                submitForm();
            } else if (action === 'download') {
                downloadSummary();
            } else if (action === 'reset') {
                resetWizard();
            }
        }
        
        // Handle toggle switch clicks
        if (target.closest('.toggle-switch')) {
            const toggle = target.closest('.toggle-switch');
            const input = toggle.previousElementSibling;
            if (input && input.type === 'checkbox') {
                input.checked = !input.checked;
                formData[input.name] = input.checked;
                saveFormData();
                
                // Update toggle visual state
                if (input.checked) {
                    toggle.classList.add('bg-primary');
                    toggle.querySelector('.toggle-knob').classList.add('translate-x-6');
                } else {
                    toggle.classList.remove('bg-primary');
                    toggle.querySelector('.toggle-knob').classList.remove('translate-x-6');
                }
            }
        }
    });
}

// === UTILITY FUNCTIONS ===
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

// === COMPLETION CELEBRATION ===
function addCompletionCelebration() {
    const form = document.getElementById('wizardForm');
    if (!form) return;
    
    // Add confetti effect
    triggerConfetti();
    
    // Show success message
    showSuccessMessage();
}

function triggerConfetti() {
    // Simple confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#3abbfa', '#f39c12', '#2ecc71', '#e74c3c', '#9b59b6'][Math.floor(Math.random() * 5)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function showSuccessMessage() {
    const form = document.getElementById('wizardForm');
    if (!form) return;
    
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    successDiv.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold mb-4">Thank You!</h3>
            <p class="text-gray-600 mb-6">Your consultation request has been submitted successfully. We'll get back to you within 24 hours with a custom proposal.</p>
            <button onclick="this.closest('.fixed').remove()" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(successDiv);
}

// === FORM SUBMISSION ===
async function submitForm() {
    // Validate final step
    if (!validateStep(currentStep)) {
        alert('Please complete all required fields before submitting.');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = document.querySelector('[data-action="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Handoff Package...';
        submitBtn.disabled = true;

        // Prepare form data for submission
        const submissionData = await prepareSubmissionData();
        
        // TEMPORARY: Create downloadable consultation package instead of backend submission
        const consultationPackage = await createConsultationPackage();
        
        // Download the consultation package
        downloadConsultationPackage(consultationPackage);
        
        // Add completion celebration
        addCompletionCelebration();
        
        // Show success message
        showSubmissionSuccess({
            message: 'Consultation package created successfully!',
            downloadReady: true
        });
        
        console.log('Consultation package created successfully');
    } catch (error) {
        console.error('Submission error:', error);
        
        // Show error message
        alert('There was an error submitting your consultation. Please try again or contact support.');
        
        // Restore button state
        const submitBtn = document.querySelector('[data-action="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Consultation';
            submitBtn.disabled = false;
        }
    }
    
    // Clear saved data on successful submission
    localStorage.removeItem('consultationWizardData');
}

// Create a comprehensive developer handoff package
async function createConsultationPackage() {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const clientName = (formData.contactName || 'Unknown-Client').replace(/[^a-zA-Z0-9]/g, '-');
    const projectName = (formData.projectName || clientName).replace(/[^a-zA-Z0-9]/g, '-');
    
    // Import JSZip library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
    
    return new Promise((resolve) => {
        script.onload = () => {
            const zip = new JSZip();
            
            // 1. CREATE EXECUTIVE SUMMARY (HTML)
            const executiveSummary = createExecutiveSummaryHTML();
            zip.file("01-EXECUTIVE-SUMMARY.html", executiveSummary);
            
            // 2. CREATE PROJECT OVERVIEW (HTML)
            const projectOverview = createProjectOverviewHTML();
            zip.file("02-PROJECT-OVERVIEW.html", projectOverview);
            
            // 3. CREATE DETAILED REQUIREMENTS (HTML)
            const detailedRequirements = createDetailedRequirementsHTML();
            zip.file("03-DETAILED-REQUIREMENTS.html", detailedRequirements);
            
            // 4. CREATE COMPETITIVE ANALYSIS (HTML)
            const competitiveAnalysis = createCompetitiveAnalysisHTML();
            zip.file("04-COMPETITIVE-ANALYSIS.html", competitiveAnalysis);
            
            // 5. CREATE UNIFIED CONSULTATION DASHBOARD (Single HTML file)
            const unifiedDashboard = createUnifiedConsultationDashboard();
            zip.file("CONSULTATION-DASHBOARD.html", unifiedDashboard);
            
            // 6. CREATE WIREFRAME/MOCKUP (HTML + CSS)
            const wireframePackage = createWireframePackage();
            zip.file("WIREFRAME/index.html", wireframePackage.html);
            zip.file("WIREFRAME/styles.css", wireframePackage.css);
            zip.file("WIREFRAME/README.md", wireframePackage.readme);
            
            // 7. CREATE RAW DATA (JSON)
            zip.file("RAW-DATA.json", JSON.stringify(formData, null, 2));
            
            // 8. CREATE README
            const readme = createPackageReadme();
            zip.file("README.md", readme);
            
            resolve({
                filename: `${projectName}-Premium-Consultation-Package-${timestamp}.zip`,
                zipObject: zip
            });
        };
    });
}

// Download the consultation package (ZIP file)
async function downloadConsultationPackage(packageData) {
    try {
        const content = await packageData.zipObject.generateAsync({ type: "blob" });
        const url = window.URL.createObjectURL(content);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = packageData.filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        console.log(`📁 Downloaded developer handoff package: ${packageData.filename}`);
    } catch (error) {
        console.error('Error creating ZIP package:', error);
        // Fallback to simple text file
        const fallbackContent = `Project: ${formData.projectName || formData.contactName}\n\nFull Data:\n${JSON.stringify(formData, null, 2)}`;
        const blob = new Blob([fallbackContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `consultation-${Date.now()}.txt`;
        link.click();
        
        window.URL.revokeObjectURL(url);
    }
}

// Create email backup of consultation data
window.createEmailBackup = function() {
    const emailSubject = `Website Consultation - ${formData.contactName || 'New Client'}`;
    const emailBody = `Hi,

Please find my website consultation details below:

CLIENT: ${formData.contactName || 'Not provided'}
EMAIL: ${formData.email || 'Not provided'}
BUSINESS: ${formData.businessType || 'Not specified'}
BUDGET: ${formData.budget || 'Not specified'}
TIMELINE: ${formData.timeline || 'Not specified'}
DEADLINE: ${formData.projectDeadline || 'Not specified'}

PAGES NEEDED: ${Array.isArray(formData.pagesCore) ? formData.pagesCore.join(', ') : 'Not specified'}
FEATURES: ${Array.isArray(formData.features) ? formData.features.join(', ') : 'Not specified'}
GOALS: ${Array.isArray(formData.goals) ? formData.goals.join(', ') : 'Not specified'}

DESIGN STYLE: ${formData.designStyle || 'Not specified'}
PRIMARY COLOR: ${formData.primaryColor || 'Not specified'}

NOTES: ${formData.handoffNotes || 'No additional notes'}

Please contact me to discuss this project further.

Best regards,
${formData.contactName || 'Client'}`;

    const mailtoLink = `mailto:your-team@thwebworks.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
};

// === PACKAGE CREATION FUNCTIONS ===

// Create professional HTML project overview
function createProjectOverviewHTML() {
    const projectName = formData.projectName || `${formData.contactName} Website Project`;
    const deadline = formData.projectDeadline ? new Date(formData.projectDeadline).toLocaleDateString() : 'TBD';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Project Overview</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center; }
        .section { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .tag { display: inline-block; background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px; }
        .urgent { color: #e74c3c; font-weight: bold; }
        .budget { font-size: 24px; font-weight: bold; color: #27ae60; }
        h1, h2 { margin-top: 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 ${projectName}</h1>
        <p>Professional Website Development Project</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <h2>👤 Client Information</h2>
        <div class="grid">
            <div>
                <strong>Client:</strong> ${formData.contactName || 'N/A'}<br>
                <strong>Email:</strong> ${formData.email || 'N/A'}<br>
                <strong>Phone:</strong> ${formData.phone || 'N/A'}
            </div>
            <div>
                <strong>Business Type:</strong> ${(formData.businessType || 'N/A').replace('-', ' ').toUpperCase()}<br>
                <strong>Domain:</strong> ${formData.domainName || 'TBD'}<br>
                <strong>Deadline:</strong> <span class="${new Date(formData.projectDeadline) < new Date(Date.now() + 30*24*60*60*1000) ? 'urgent' : ''}">${deadline}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>💰 Project Scope</h2>
        <div class="highlight">
            <div class="budget">${formData.budget || 'Budget TBD'}</div>
            <strong>Timeline:</strong> ${formData.timeline || 'TBD'}<br>
            <strong>Launch Date:</strong> ${deadline}
        </div>
    </div>

    <div class="section">
        <h2>🎯 Primary Goals</h2>
        ${Array.isArray(formData.goals) && formData.goals.length > 0 ? 
            formData.goals.map(goal => `<span class="tag">${goal}</span>`).join(' ') : 
            '<p>No specific goals defined</p>'
        }
    </div>

    <div class="section">
        <h2>📄 Required Pages</h2>
        <div class="grid">
            <div>
                <strong>Core Pages:</strong><br>
                ${Array.isArray(formData.pagesCore) ? formData.pagesCore.map(page => `• ${page}`).join('<br>') : 'None specified'}
            </div>
            <div>
                <strong>Additional Pages:</strong><br>
                ${[...(formData.pagesTrust || []), ...(formData.pagesEngage || []), ...(formData.pagesCommerce || [])].map(page => `• ${page}`).join('<br>') || 'None specified'}
            </div>
        </div>
    </div>

    <div class="section">
        <h2>⚙️ Required Features</h2>
        ${Array.isArray(formData.features) && formData.features.length > 0 ? 
            formData.features.map(feature => `<span class="tag">${feature}</span>`).join(' ') : 
            '<p>No specific features requested</p>'
        }
    </div>

    <div class="section">
        <h2>🎨 Design Direction</h2>
        <div class="highlight">
            <strong>Style:</strong> ${formData.designStyle || 'Not specified'}<br>
            <strong>Primary Color:</strong> <span style="background: ${formData.primaryColor}; color: white; padding: 2px 8px; border-radius: 3px;">${formData.primaryColor}</span><br>
            <strong>Secondary Color:</strong> <span style="background: ${formData.secondaryColor}; color: white; padding: 2px 8px; border-radius: 3px;">${formData.secondaryColor}</span>
        </div>
    </div>

    ${formData.handoffNotes ? `
    <div class="section">
        <h2>📝 Special Notes</h2>
        <div class="highlight">
            ${formData.handoffNotes.replace(/\n/g, '<br>')}
        </div>
    </div>
    ` : ''}

    <div class="section">
        <h2>📋 Next Steps</h2>
        <ol>
            <li><strong>Review</strong> all project requirements in detail</li>
            <li><strong>Confirm</strong> timeline and deliverables with client</li>
            <li><strong>Begin</strong> wireframing and design mockups</li>
            <li><strong>Set up</strong> development environment and hosting</li>
            <li><strong>Start</strong> development according to specifications</li>
        </ol>
    </div>

    <div style="text-align: center; margin-top: 40px; padding: 20px; background: #f1f3f4; border-radius: 8px;">
        <p><strong>🔥 Ready to build an amazing website! 🔥</strong></p>
        <p style="font-size: 12px; color: #666;">Generated by T&H WebWorks Consultation Wizard</p>
    </div>
</body>
</html>`;
}

// Create detailed requirements document
function createDetailedRequirementsHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detailed Requirements - ${formData.projectName || formData.contactName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .requirement { background: white; border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .priority-high { border-left: 5px solid #e74c3c; }
        .priority-medium { border-left: 5px solid #f39c12; }
        .priority-low { border-left: 5px solid #27ae60; }
        .spec-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .spec-table th, .spec-table td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        .spec-table th { background: #f8f9fa; font-weight: bold; }
        .checklist { list-style: none; padding: 0; }
        .checklist li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .checklist li:before { content: '☐ '; color: #3498db; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 Detailed Project Requirements</h1>
        <p><strong>Project:</strong> ${formData.projectName || formData.contactName} Website</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="requirement priority-high">
        <h2>🎯 Core Objectives</h2>
        <ul class="checklist">
            ${Array.isArray(formData.goals) ? formData.goals.map(goal => `<li>Implement ${goal} functionality</li>`).join('') : '<li>Define primary objectives with client</li>'}
        </ul>
    </div>

    <div class="requirement priority-high">
        <h2>📄 Page Structure & Content</h2>
        <table class="spec-table">
            <tr><th>Page</th><th>Priority</th><th>Requirements</th></tr>
            ${Array.isArray(formData.pagesCore) ? formData.pagesCore.map(page => `
                <tr>
                    <td><strong>${page}</strong></td>
                    <td>High</td>
                    <td>Core functionality, responsive design, SEO optimized</td>
                </tr>
            `).join('') : ''}
            ${Array.isArray(formData.pagesTrust) ? formData.pagesTrust.map(page => `
                <tr>
                    <td>${page}</td>
                    <td>Medium</td>
                    <td>Trust building, social proof integration</td>
                </tr>
            `).join('') : ''}
            ${Array.isArray(formData.pagesEngage) ? formData.pagesEngage.map(page => `
                <tr>
                    <td>${page}</td>
                    <td>Medium</td>
                    <td>Engagement features, content management</td>
                </tr>
            `).join('') : ''}
        </table>
    </div>

    <div class="requirement priority-medium">
        <h2>⚙️ Features & Functionality</h2>
        <ul class="checklist">
            ${Array.isArray(formData.features) ? formData.features.map(feature => `<li>Implement ${feature}</li>`).join('') : '<li>No specific features requested</li>'}
        </ul>
    </div>

    <div class="requirement priority-medium">
        <h2>🔧 Technical Requirements</h2>
        <table class="spec-table">
            <tr><th>Specification</th><th>Requirement</th></tr>
            <tr><td>Domain</td><td>${formData.domainName || 'Client will provide'}</td></tr>
            <tr><td>Hosting</td><td>${formData.hostingPreference || 'Developer choice'}</td></tr>
            <tr><td>Content Management</td><td>${formData.contentResponsibility === 'client' ? 'Client provides content' : 'Developer creates content'}</td></tr>
            <tr><td>Integrations</td><td>${Array.isArray(formData.integrations) ? formData.integrations.join(', ') : 'None specified'}</td></tr>
            <tr><td>SEO Requirements</td><td>${Array.isArray(formData.seoRequirements) ? formData.seoRequirements.join(', ') : 'Basic SEO'}</td></tr>
        </table>
    </div>

    <div class="requirement priority-low">
        <h2>🎨 Design Specifications</h2>
        <table class="spec-table">
            <tr><th>Element</th><th>Specification</th></tr>
            <tr><td>Design Style</td><td>${formData.designStyle || 'Not specified'}</td></tr>
            <tr><td>Primary Color</td><td><span style="background: ${formData.primaryColor}; color: white; padding: 4px 8px; border-radius: 3px;">${formData.primaryColor}</span></td></tr>
            <tr><td>Secondary Color</td><td><span style="background: ${formData.secondaryColor}; color: white; padding: 4px 8px; border-radius: 3px;">${formData.secondaryColor}</span></td></tr>
            <tr><td>Background</td><td>${formData.backgroundColor}</td></tr>
        </table>
    </div>

    <div class="requirement priority-medium">
        <h2>📞 Communication & Project Management</h2>
        <ul class="checklist">
            <li>Primary contact: ${formData.contactName} (${formData.email})</li>
            <li>Preferred communication: ${Array.isArray(formData.communicationMethods) ? formData.communicationMethods.join(', ') : 'Email'}</li>
            <li>Post-launch support: ${formData.postLaunchSupport || 'Basic'}</li>
            <li>Project deadline: ${formData.projectDeadline ? new Date(formData.projectDeadline).toLocaleDateString() : 'TBD'}</li>
        </ul>
    </div>

    ${formData.handoffNotes ? `
    <div class="requirement priority-high">
        <h2>⚠️ Special Instructions</h2>
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border: 1px solid #ffeaa7;">
            ${formData.handoffNotes.replace(/\n/g, '<br>')}
        </div>
    </div>
    ` : ''}

    <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
        <p><strong>✅ All requirements captured and ready for development!</strong></p>
        <p style="font-size: 12px; color: #666;">Generated by T&H WebWorks Consultation Wizard</p>
    </div>
</body>
</html>`;
}

// Create wireframe package from live preview
function createWireframePackage() {
    // Generate a basic wireframe based on form data
    const wireframeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.projectName || formData.contactName} - Wireframe</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">${formData.contactName || 'Logo'}</div>
            <ul class="nav-menu">
                ${Array.isArray(formData.pagesCore) ? formData.pagesCore.map(page => `<li><a href="#${page.toLowerCase()}">${page}</a></li>`).join('') : '<li><a href="#home">Home</a></li>'}
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h1>Professional ${(formData.businessType || 'Business').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Services</h1>
            <p>We provide exceptional service and deliver results that exceed expectations.</p>
            <button class="cta-button">Get Started</button>
        </section>

        ${Array.isArray(formData.pagesCore) ? formData.pagesCore.map(page => `
        <section id="${page.toLowerCase()}" class="page-section">
            <h2>${page}</h2>
            <p>Content for ${page} page goes here.</p>
        </section>
        `).join('') : ''}

        ${Array.isArray(formData.features) && formData.features.length > 0 ? `
        <section class="features">
            <h2>Features</h2>
            <div class="feature-grid">
                ${formData.features.map(feature => `
                <div class="feature-item">
                    <h3>${feature}</h3>
                    <p>Implementation of ${feature} functionality.</p>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}
    </main>

    <footer>
        <p>&copy; 2025 ${formData.contactName || 'Company Name'}. All rights reserved.</p>
    </footer>
</body>
</html>`;

    const wireframeCSS = `/* Wireframe Styles for ${formData.projectName || formData.contactName} */

:root {
    --primary-color: ${formData.primaryColor || '#3abbfa'};
    --secondary-color: ${formData.secondaryColor || '#f39c12'};
    --background-color: ${formData.backgroundColor || '#ffffff'};
    --text-color: ${formData.headingTextColor || '#333333'};
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: var(--primary-color);
}

.hero {
    text-align: center;
    padding: 4rem 5%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.cta-button {
    background: white;
    color: var(--primary-color);
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.page-section {
    padding: 3rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.page-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.features {
    background: #f8f9fa;
    padding: 3rem 5%;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 2rem auto 0;
}

.feature-item {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
}

.feature-item h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

footer {
    background: var(--text-color);
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
}`;

    const readme = `# Website Wireframe

This is the initial wireframe/mockup for ${formData.projectName || formData.contactName} website.

## Files Included:
- \`index.html\` - Main wireframe structure
- \`styles.css\` - Styling and layout
- \`README.md\` - This file

## Design Specifications:
- **Style**: ${formData.designStyle || 'Modern & Clean'}
- **Primary Color**: ${formData.primaryColor || '#3abbfa'}
- **Secondary Color**: ${formData.secondaryColor || '#f39c12'}
- **Background**: ${formData.backgroundColor || '#ffffff'}

## Pages Included:
${Array.isArray(formData.pagesCore) ? formData.pagesCore.map(page => `- ${page}`).join('\n') : '- Home\n- About\n- Contact'}

## Features to Implement:
${Array.isArray(formData.features) ? formData.features.map(feature => `- ${feature}`).join('\n') : '- Basic functionality'}

## Notes:
This is a basic wireframe to show the general layout and structure. The final design should be enhanced with:
- Professional imagery
- Detailed content
- Advanced interactions
- Mobile optimization
- Performance optimization

Generated by T&H WebWorks Consultation Wizard
`;

    return {
        html: wireframeHTML,
        css: wireframeCSS,
        readme: readme
    };
}

// Create technical specifications
function createTechnicalSpecifications() {
    return `# Technical Specifications

**Project:** ${formData.projectName || formData.contactName} Website  
**Generated:** ${new Date().toLocaleDateString()}

## Required Integrations
${Array.isArray(formData.integrations) && formData.integrations.length > 0 ? 
    formData.integrations.map(integration => `- ${integration}`).join('\n') : 
    '- No specific integrations requested'
}

## SEO Requirements
${Array.isArray(formData.seoRequirements) && formData.seoRequirements.length > 0 ? 
    formData.seoRequirements.map(req => `- ${req}`).join('\n') : 
    '- Basic SEO implementation'
}

## Hosting & Domain
- **Domain**: ${formData.domainName || 'Client to provide'}
- **Hosting Preference**: ${formData.hostingPreference || 'Developer choice'}
- **SSL Certificate**: Required

## Content Management
- **Content Responsibility**: ${formData.contentResponsibility || 'Client provides content'}

## Communication
- **Preferred Methods**: ${Array.isArray(formData.communicationMethods) ? formData.communicationMethods.join(', ') : 'Email'}
- **Post-Launch Support**: ${formData.postLaunchSupport || 'Basic'}
`;
}

// Create project timeline
function createProjectTimeline() {
    const deadline = formData.projectDeadline ? new Date(formData.projectDeadline) : new Date(Date.now() + 45*24*60*60*1000);
    
    return `# Project Timeline

**Project:** ${formData.projectName || formData.contactName} Website  
**Duration:** ${formData.timeline || '6-8 weeks'}  
**Target Launch:** ${deadline.toLocaleDateString()}

## Phase 1: Discovery & Planning (Week 1)
- Project kickoff meeting
- Requirements review
- Technical planning

## Phase 2: Design & Wireframing (Week 2)  
- Wireframe creation
- Visual design mockups
- Client review and approval

## Phase 3: Development (Weeks 3-4)
- Frontend development
- Backend implementation (if needed)
- Feature integration

## Phase 4: Testing & Content (Week 5)
- Quality assurance testing
- Content implementation
- Performance optimization

## Phase 5: Launch & Handoff (Week 6)
- Final review
- Go-live deployment
- Training and documentation

## Key Milestones
- Design Approval: Week 2
- Development Complete: Week 4
- Testing Complete: Week 5
- **LAUNCH**: ${deadline.toLocaleDateString()}
`;
}

// Create developer instructions
function createDeveloperInstructions() {
    const businessName = formData.contactName || 'Your Business';
    const projectName = formData.projectName || `${businessName} Website Project`;
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    
    const totalPages = [...pagesCore, ...pagesEngage, ...pagesTrust].length;
    const totalFeatures = features.length;
    
    return `# Developer Instructions & Standards
## ${projectName}

**Generated by T&H WebWorks** | ${new Date().toLocaleDateString()}
**Development Standards:** Professional Grade
**Quality Level:** Enterprise Ready

---

## 🎯 Development Philosophy

This project follows a **transparent, professional approach** where both client and developer have complete visibility into requirements, standards, and expectations. This ensures:

- ✅ **Client Confidence** - Clear understanding of what they're getting
- ✅ **Developer Clarity** - Complete specifications and standards
- ✅ **Quality Assurance** - Professional testing and validation protocols
- ✅ **Ongoing Success** - Maintenance and optimization plans

---

## 📋 Project Overview

### **Business Context**
- **Client:** ${businessName}
- **Business Type:** ${formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business'}
- **Primary Goals:** ${Array.isArray(formData.goals) ? formData.goals.join(', ') : 'Not specified'}
- **Target Audience:** ${formData.targetAudience || 'General business audience'}

### **Technical Scope**
- **Total Pages:** ${totalPages}
- **Advanced Features:** ${totalFeatures}
- **Design Style:** ${formData.designStyle || 'Modern & Clean'}
- **Color Scheme:** ${formData.primaryColor || 'Not specified'} / ${formData.secondaryColor || 'Not specified'}

---

## 🏗️ Technical Architecture

### **Recommended Stack**
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** React.js or Vue.js (if complex interactions)
- **Styling:** Tailwind CSS or Bootstrap 5
- **Performance:** Optimized images, lazy loading, CDN
- **SEO:** Semantic HTML, meta tags, structured data

### **Quality Standards**
- **Performance:** PageSpeed Score > 90
- **Accessibility:** WCAG 2.1 AA compliance
- **Security:** HTTPS, input validation, XSS protection
- **Mobile:** Responsive design, touch-friendly
- **Cross-browser:** Chrome, Firefox, Safari, Edge

---

## 📄 Page Requirements

### **Core Pages (${pagesCore.length})**
${Array.isArray(pagesCore) ? pagesCore.map(page => `- **${page}** - Professional layout with clear navigation and call-to-action`).join('\n') : '- Standard business pages'}

### **Engagement Pages (${pagesEngage.length})**
${Array.isArray(pagesEngage) ? pagesEngage.map(page => `- **${page}** - Interactive content with user engagement features`).join('\n') : '- No additional engagement pages'}

### **Trust Pages (${pagesTrust.length})**
${Array.isArray(pagesTrust) ? pagesTrust.map(page => `- **${page}** - Credibility-building content with social proof`).join('\n') : '- No additional trust pages'}

---

## ⚙️ Feature Implementation

### **Advanced Features (${totalFeatures})**
${Array.isArray(features) ? features.map(feature => {
    const featureSpecs = {
        'Analytics': 'Google Analytics 4 integration with custom event tracking',
        'Live Chat': 'Professional chat widget with business hours and auto-responses',
        'Payment Processing': 'Secure payment gateway with SSL encryption',
        'Online Scheduler': 'Calendar integration with booking confirmation system',
        'Newsletter Integration': 'Email marketing platform with double opt-in',
        'SEO Optimization': 'Technical SEO with meta tags, sitemap, and structured data',
        'Mobile Optimization': 'Mobile-first responsive design with touch optimization',
        'Social Media Integration': 'Social sharing buttons and platform integration',
        'Contact Forms': 'Secure forms with spam protection and email notifications',
        'Blog/Content Management': 'CMS with SEO-friendly URLs and content scheduling',
        'E-commerce': 'Product catalog with secure checkout and inventory management',
        'User Authentication': 'Secure login system with password recovery',
        'Multi-language Support': 'Internationalization with language switching',
        'Advanced Search': 'Site search with filters and search analytics',
        'API Integration': 'Third-party API integration with error handling'
    };
    return `- **${feature}** - ${featureSpecs[feature] || 'Professional implementation with best practices'}`;
}).join('\n') : '- Basic website functionality'}

---

## 🎨 Design Standards

### **Visual Design**
- **Style:** ${formData.designStyle || 'Modern & Clean'}
- **Primary Color:** ${formData.primaryColor || 'Professional blue'}
- **Secondary Color:** ${formData.secondaryColor || 'Complementary accent'}
- **Typography:** Professional, readable fonts (Inter, Roboto, or similar)
- **Imagery:** High-quality, optimized images with alt text

### **User Experience**
- **Navigation:** Clear, intuitive menu structure
- **Call-to-Action:** Prominent, action-oriented buttons
- **Forms:** User-friendly with validation and feedback
- **Loading:** Fast performance with loading indicators
- **Mobile:** Touch-friendly with appropriate sizing

---

## 🔒 Security Requirements

### **Essential Security Measures**
- [ ] **HTTPS Implementation** - SSL certificate with proper configuration
- [ ] **Input Validation** - Server-side and client-side validation
- [ ] **XSS Protection** - Content Security Policy headers
- [ ] **CSRF Protection** - Token-based form protection
- [ ] **SQL Injection Prevention** - Parameterized queries
- [ ] **File Upload Security** - Type and size validation
- [ ] **Error Handling** - Secure error messages without system exposure

### **Security Headers**
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy

---

## ⚡ Performance Standards

### **Speed Requirements**
- **Page Load Time:** < 3 seconds
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Google PageSpeed:** > 90/100
- **Mobile Performance:** Optimized for mobile networks

### **Optimization Techniques**
- [ ] **Image Optimization** - WebP format, lazy loading, responsive images
- [ ] **Code Minification** - CSS, JavaScript, and HTML compression
- [ ] **Caching Strategy** - Browser and server-side caching
- [ ] **CDN Implementation** - Content delivery network for global performance
- [ ] **Database Optimization** - Efficient queries and indexing

---

## ♿ Accessibility Standards

### **WCAG 2.1 AA Compliance**
- [ ] **Semantic HTML** - Proper heading structure and landmarks
- [ ] **Alt Text** - Descriptive alt text for all images
- [ ] **Color Contrast** - Minimum 4.5:1 ratio for normal text
- [ ] **Keyboard Navigation** - Full keyboard accessibility
- [ ] **Screen Reader Support** - ARIA labels and semantic markup
- [ ] **Focus Indicators** - Visible focus states for all interactive elements

### **Mobile Accessibility**
- [ ] **Touch Targets** - Minimum 44px for touch interactions
- [ ] **Text Scaling** - Support for 200% text scaling
- [ ] **Orientation** - Support for both portrait and landscape
- [ ] **Voice Control** - Compatibility with voice control systems

---

## 🔍 SEO Implementation

### **Technical SEO**
- [ ] **Meta Tags** - Title, description, and Open Graph tags
- [ ] **Structured Data** - JSON-LD markup for rich snippets
- [ ] **XML Sitemap** - Automatically generated sitemap
- [ ] **Robots.txt** - Proper search engine directives
- [ ] **Canonical URLs** - Prevent duplicate content issues

### **Content SEO**
- [ ] **Keyword Optimization** - Strategic keyword placement
- [ ] **Header Structure** - Proper H1, H2, H3 hierarchy
- [ ] **Internal Linking** - Strategic internal link structure
- [ ] **Image SEO** - Optimized filenames and alt text
- [ ] **Local SEO** - Google My Business integration (if applicable)

---

## 📱 Mobile-First Development

### **Responsive Design**
- [ ] **Mobile-First Approach** - Design for mobile, enhance for desktop
- [ ] **Breakpoints** - Standard breakpoints (320px, 768px, 1024px, 1440px)
- [ ] **Touch Interactions** - Appropriate touch targets and gestures
- [ ] **Performance** - Optimized for mobile networks and devices

### **Mobile Testing**
- [ ] **Device Testing** - Test on actual devices, not just emulators
- [ ] **Network Testing** - Test on slow 3G connections
- [ ] **Touch Testing** - Verify all touch interactions work properly
- [ ] **Orientation Testing** - Test both portrait and landscape modes

---

## 🧪 Quality Assurance

### **Testing Protocol**
- [ ] **Cross-Browser Testing** - Chrome, Firefox, Safari, Edge
- [ ] **Mobile Testing** - iOS Safari, Chrome Mobile, Samsung Internet
- [ ] **Performance Testing** - PageSpeed, GTmetrix, WebPageTest
- [ ] **Security Testing** - SSL Labs, security headers, vulnerability scan
- [ ] **Accessibility Testing** - WAVE, axe-core, screen reader testing

### **Code Quality**
- [ ] **Code Review** - Peer review of all code changes
- [ ] **Linting** - ESLint for JavaScript, Stylelint for CSS
- [ ] **Documentation** - Inline comments and README files
- [ ] **Version Control** - Proper Git workflow with meaningful commits

---

## 📊 Analytics & Tracking

### **Google Analytics Setup**
- [ ] **GA4 Implementation** - Proper tracking code installation
- [ ] **Goal Configuration** - Form submissions, phone calls, page views
- [ ] **Event Tracking** - Custom events for user interactions
- [ ] **E-commerce Tracking** - If applicable, enhanced e-commerce setup

### **Conversion Tracking**
- [ ] **Form Tracking** - Track form submissions and completions
- [ ] **Phone Tracking** - Call tracking for phone number clicks
- [ ] **Email Tracking** - Track email link clicks and opens
- [ ] **Social Tracking** - Track social media engagement

---

## 🚀 Deployment Standards

### **Pre-Launch Checklist**
- [ ] **Performance Optimization** - All performance standards met
- [ ] **Security Hardening** - All security measures implemented
- [ ] **SEO Optimization** - All SEO requirements completed
- [ ] **Accessibility Compliance** - WCAG 2.1 AA standards met
- [ ] **Cross-Browser Testing** - All major browsers tested
- [ ] **Mobile Testing** - All mobile devices and orientations tested

### **Launch Process**
- [ ] **Backup Creation** - Full backup before deployment
- [ ] **DNS Configuration** - Proper domain and SSL setup
- [ ] **Monitoring Setup** - Uptime and performance monitoring
- [ ] **Analytics Verification** - Confirm tracking is working
- [ ] **Client Training** - Provide client with management tools

---

## 📞 Communication & Support

### **Development Communication**
- **Daily Updates** - Brief progress updates
- **Weekly Reviews** - Detailed progress and milestone reviews
- **Issue Tracking** - Use project management tools for bug tracking
- **Client Updates** - Regular client communication on progress

### **Post-Launch Support**
- **30-Day Support** - Immediate post-launch support and fixes
- **Documentation** - Complete documentation for client and future developers
- **Training** - Client training on content management
- **Maintenance Plan** - Ongoing maintenance and optimization

---

## 🎯 Success Metrics

### **Technical Success**
- ✅ All pages load in < 3 seconds
- ✅ Google PageSpeed score > 90
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Cross-browser compatibility confirmed
- ✅ Mobile responsiveness verified

### **Business Success**
- ✅ Client satisfaction with final deliverable
- ✅ All functional requirements implemented
- ✅ Design matches approved specifications
- ✅ SEO optimization completed
- ✅ Analytics tracking confirmed

---

*These developer instructions ensure professional, transparent development that meets both technical excellence and business objectives.*

**T&H WebWorks** - Professional development, exceptional results`;
}

// Create asset requirements
function createAssetRequirements() {
    return `# Asset Requirements

## Content Needed from Client

### Text Content
- Company description
- Service/product descriptions  
- About us content
- Contact information
- Legal pages (Privacy Policy, Terms of Service)

### Images Required
- Logo (vector format preferred - .ai, .eps, .svg)
- High-resolution photos (minimum 1920px wide)
- Team photos (if applicable)
- Product/service images
- Hero/banner images

### Brand Assets
- Brand guidelines (if available)
- Color palette
- Typography preferences
- Existing marketing materials

### Technical Assets
- Domain credentials (if existing)
- Hosting account details (if applicable)
- Third-party account information for integrations

## Asset Specifications

### Logo Requirements
- Vector format (.ai, .eps, .svg)
- High resolution PNG (minimum 300 DPI)
- Transparent background version
- Various sizes (favicon, social media, etc.)

### Image Specifications
- Format: JPG, PNG, or WebP
- Resolution: Minimum 1920px width for hero images
- File size: Under 2MB per image (will be optimized)
- Quality: High resolution, professional photography preferred

### Content Guidelines
- SEO-friendly content
- Clear, concise messaging
- Call-to-action focused
- Mobile-friendly formatting

## Client Responsibilities
${formData.contentResponsibility === 'client' ? `
- Provide all text content
- Supply high-quality images
- Review and approve content
- Provide brand assets
` : formData.contentResponsibility === 'developer' ? `
- Review placeholder content created by developer
- Provide brand-specific information
- Approve final content choices
` : `
- Collaborate on content creation
- Provide business-specific information
- Review and approve all content
`}

## Timeline for Asset Delivery
- Initial assets: Within 1 week of project start
- Remaining content: By end of Week 2
- Final review materials: Before Week 4

**Note:** Delays in asset delivery may impact project timeline.
`;
}

// Create proposal template
function createProposalTemplate() {
    const businessName = formData.contactName || 'Your Business';
    const projectName = formData.projectName || `${businessName} Website Project`;
    const budget = formData.budget || 'Not specified';
    const timeline = formData.timeline || 'Not specified';
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    
    const totalPages = [...pagesCore, ...pagesEngage, ...pagesTrust].length;
    const totalFeatures = features.length;
    
    // Calculate estimated project value
    const baseValue = 2500;
    const featureMultiplier = totalFeatures * 0.3;
    const pageMultiplier = totalPages * 0.2;
    const estimatedValue = Math.round(baseValue * (1 + featureMultiplier + pageMultiplier));
    
    return `# Professional Website Development Proposal
## ${projectName}

**Presented by T&H WebWorks** | ${new Date().toLocaleDateString()}
**Proposal ID:** ${Date.now()}
**Valid Until:** ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}

---

## 🎯 Executive Summary

T&H WebWorks is pleased to present this comprehensive proposal for your professional website development project. Based on our detailed consultation, we've designed a strategic solution that will position ${businessName} for digital success and measurable business growth.

### **Project Overview**
- **Client:** ${businessName}
- **Business Type:** ${formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business'}
- **Primary Goals:** ${Array.isArray(formData.goals) ? formData.goals.join(', ') : 'Digital transformation and business growth'}
- **Estimated Project Value:** $${estimatedValue.toLocaleString()}
- **Timeline:** ${timeline}

---

## 💼 Our Approach

### **Transparent Process**
We believe in complete transparency throughout the development process. This means:
- ✅ **Clear Communication** - Regular updates and milestone reviews
- ✅ **Professional Standards** - Enterprise-grade development practices
- ✅ **Quality Assurance** - Comprehensive testing and validation
- ✅ **Ongoing Support** - Post-launch maintenance and optimization

### **Strategic Development**
Our approach combines technical excellence with business strategy:
- **Research & Planning** - Understanding your business and market
- **Design & Development** - Professional, responsive implementation
- **Testing & Optimization** - Quality assurance and performance tuning
- **Launch & Support** - Successful deployment and ongoing success

---

## 📋 Project Scope

### **Website Pages (${totalPages} Total)**
${Array.isArray(pagesCore) && pagesCore.length > 0 ? `
**Core Pages:**
${pagesCore.map(page => `- ${page}`).join('\n')}
` : ''}
${Array.isArray(pagesEngage) && pagesEngage.length > 0 ? `
**Engagement Pages:**
${pagesEngage.map(page => `- ${page}`).join('\n')}
` : ''}
${Array.isArray(pagesTrust) && pagesTrust.length > 0 ? `
**Trust & Credibility Pages:**
${pagesTrust.map(page => `- ${page}`).join('\n')}
` : ''}

### **Advanced Features (${totalFeatures})**
${Array.isArray(features) ? features.map(feature => `- ${feature}`).join('\n') : '- Professional website functionality'}

### **Design & Branding**
- **Style:** ${formData.designStyle || 'Modern & Professional'}
- **Color Scheme:** ${formData.primaryColor || 'Professional'} / ${formData.secondaryColor || 'Accent'}
- **Responsive Design:** Mobile-first approach
- **Brand Integration:** Consistent with your business identity

---

## 💰 Investment & ROI

### **Project Investment**
- **Development Investment:** $${estimatedValue.toLocaleString()}
- **Monthly Maintenance:** $200-500 (recommended)
- **Expected ROI:** 300-500% within 12 months
- **Break-even Timeline:** 6-12 months

### **Business Impact Projections**
- **Lead Generation:** 40-60% increase in qualified leads
- **Traffic Growth:** 50-100% increase in organic traffic
- **Conversion Rate:** 15-25% improvement in conversion
- **Customer Engagement:** 3-5x increase in user engagement

### **Value Comparison**
| Investment Type | Cost | ROI | Timeline |
|----------------|------|-----|----------|
| **Professional Development** | $${estimatedValue.toLocaleString()} | 300-500% | 6-12 months |
| **DIY Website Builder** | $300-600/year | Limited | Ongoing costs |
| **Basic Template** | $1,000-2,000 | 50-100% | 3-6 months |

---

## 🚀 Implementation Timeline

### **Phase 1: Discovery & Planning (Week 1)**
- Project scope finalization
- Content strategy development
- Technical architecture planning
- Design direction establishment

### **Phase 2: Design & Development (${timeline.includes('2-4') ? '2-3 weeks' : timeline.includes('1-2') ? '2-3 weeks' : '3-4 weeks'})**
- Professional design creation
- Responsive development
- Feature implementation
- Content integration

### **Phase 3: Testing & Optimization (1 week)**
- Cross-browser testing
- Performance optimization
- SEO implementation
- Security validation

### **Phase 4: Launch & Support (1 week)**
- Domain and hosting setup
- Final testing and deployment
- Client training
- Post-launch support

---

## 🎯 Deliverables

### **Core Deliverables**
- ✅ Professional, responsive website
- ✅ Mobile-optimized design
- ✅ SEO-optimized structure
- ✅ Security implementation
- ✅ Analytics setup
- ✅ Content management training

### **Additional Value**
- ✅ Performance optimization
- ✅ Accessibility compliance
- ✅ Cross-browser compatibility
- ✅ Search engine optimization
- ✅ Social media integration
- ✅ Ongoing support plan

---

## 🛡️ Quality Assurance

### **Professional Standards**
- **Performance:** Google PageSpeed Score > 90
- **Security:** SSL certificate and security hardening
- **Accessibility:** WCAG 2.1 AA compliance
- **Mobile:** Responsive design on all devices
- **SEO:** Technical and on-page optimization

### **Testing Protocol**
- Cross-browser compatibility testing
- Mobile device testing
- Performance optimization
- Security vulnerability scanning
- Accessibility compliance verification

---

## 📊 Success Metrics

### **Technical Metrics**
- Page load speed < 3 seconds
- 99.9% uptime guarantee
- Mobile responsiveness score: 100%
- SEO optimization score: > 90/100

### **Business Metrics**
- 40-60% increase in lead generation
- 50-100% increase in organic traffic
- 15-25% improvement in conversion rate
- 3-5x increase in user engagement

---

## 🔄 Ongoing Support

### **Post-Launch Support (30 Days)**
- Immediate bug fixes and adjustments
- Performance monitoring and optimization
- Analytics setup and training
- Content management training

### **Ongoing Maintenance (Optional)**
- **Monthly Maintenance:** $200-500
- **Quarterly Optimization:** $300-600
- **Annual Security Audit:** $500-1,000
- **Content Updates:** $100-300 per update

---

## 💡 Why Choose T&H WebWorks?

### **Professional Excellence**
- **Transparent Process** - Complete visibility into development
- **Quality Standards** - Enterprise-grade development practices
- **Strategic Approach** - Business-focused solutions
- **Ongoing Support** - Long-term partnership for success

### **Proven Results**
- **Client Satisfaction:** 98% satisfaction rate
- **Project Success:** 95% on-time delivery
- **ROI Achievement:** Average 300% return on investment
- **Long-term Partnerships:** 80% client retention

---

## 📞 Next Steps

### **Immediate Actions**
1. **Review Proposal** - Carefully review all deliverables and timeline
2. **Schedule Discussion** - Let's discuss any questions or modifications
3. **Project Approval** - Approve the project scope and timeline
4. **Contract Signing** - Formalize our partnership agreement

### **Project Kickoff**
- **Discovery Meeting** - Deep dive into requirements and goals
- **Content Planning** - Develop content strategy and requirements
- **Design Direction** - Establish visual design and branding
- **Development Timeline** - Set up project management and communication

---

## 📋 Terms & Conditions

### **Payment Schedule**
- **50%** - Project initiation and design phase
- **30%** - Development completion and testing
- **20%** - Final delivery and launch

### **Project Terms**
- **Timeline:** ${timeline} from project approval
- **Revisions:** 3 rounds of design revisions included
- **Support:** 30 days post-launch support included
- **Warranty:** 90-day bug fix warranty

### **Cancellation Policy**
- **Before Development:** 100% refund
- **During Development:** Pro-rated refund based on work completed
- **After Launch:** No refunds, ongoing support available

---

## 📞 Contact Information

**T&H WebWorks**
- **Email:** your-team@thwebworks.com
- **Phone:** (555) 123-4567
- **Website:** www.thwebworks.com
- **Hours:** Monday-Friday, 9 AM - 6 PM EST

---

## 🎯 Ready to Transform Your Digital Presence?

This proposal represents a strategic investment in your business's digital future. With our professional approach, transparent process, and proven results, we're confident we can deliver exceptional value and measurable success.

**Let's build something amazing together!**

---

*This proposal is valid for 30 days from the date of issue.*

**T&H WebWorks** - Professional transparency, exceptional results

---
**Proposal Generated:** ${new Date().toLocaleString()}
**Consultation ID:** ${Date.now()}
**Version:** 2.0 Professional Edition`;
}

// Create package readme
function createPackageReadme() {
    const businessName = formData.contactName || 'Your Business';
    const projectName = formData.projectName || `${businessName} Website Project`;
    
    return `# Premium Consultation Package
## ${projectName}

**Generated by T&H WebWorks** | ${new Date().toLocaleDateString()}
**Package Version:** 2.0 Professional Edition

---

## 📋 Package Overview

This comprehensive consultation package serves as a **transparent bridge** between client vision and developer execution. It's designed to be reviewed by both the client and development team to ensure complete alignment and professional delivery.

### 🎯 **Dual-Audience Design**
- **For Clients:** Strategic insights, ROI projections, and business value demonstration
- **For Developers:** Technical specifications, implementation details, and quality standards

---

## 📁 Package Contents

### **Main Dashboard**
1. **CONSULTATION-DASHBOARD.html** - Complete interactive consultation in one file
   - 📊 Project Overview & Key Metrics
   - 📋 Detailed Requirements & Specifications  
   - ⚙️ Technical Implementation Details
   - 📅 Implementation Timeline
   - 🎯 Market Analysis & Competitive Insights
   - ✅ Quality Assurance Standards
   - 📈 Success Metrics & Expected Outcomes

### **Supporting Files**
2. **WIREFRAME/** - Visual mockups and design specifications
3. **RAW-DATA.json** - Complete consultation data for development
4. **README.md** - Package documentation and usage guide

---

## 👥 How to Use This Package

### **For Everyone (One Unified Experience)**
1. **Open CONSULTATION-DASHBOARD.html** - Your complete consultation in one beautiful interface
2. **Navigate Using Tabs** - Switch between different sections seamlessly:
   - **Overview** - Project summary and key metrics
   - **Requirements** - Detailed specifications and page structure
   - **Technical** - Technology stack and quality standards
   - **Timeline** - Implementation phases and scheduling
   - **Market Analysis** - Competitive insights and opportunities
   - **Quality Standards** - Testing protocols and performance standards
   - **Success Metrics** - Expected outcomes and measurement criteria
3. **Print/Save PDF** - Use the print button to create a PDF version
4. **Share with Team** - Single file makes sharing simple
5. **Reference Raw Data** - Use JSON file for development details

---

## 🔄 Transparency & Collaboration

### **Shared Understanding**
This package ensures both client and developer have:
- ✅ **Complete project scope** - No hidden requirements
- ✅ **Clear expectations** - Measurable outcomes defined
- ✅ **Professional standards** - Quality assurance protocols
- ✅ **Transparent pricing** - Detailed cost breakdown
- ✅ **Ongoing value** - Maintenance and optimization plans

### **Professional Benefits**
- **Builds Trust** - Complete transparency in process and deliverables
- **Reduces Miscommunication** - Clear documentation for all parties
- **Ensures Quality** - Professional standards and testing protocols
- **Demonstrates Value** - ROI projections and business impact
- **Facilitates Collaboration** - Shared understanding between all stakeholders

---

## 📊 Package Value Proposition

### **For Clients**
- **Strategic Insights** - Business-focused analysis and recommendations
- **ROI Projections** - Clear return on investment calculations
- **Competitive Analysis** - Market positioning and opportunities
- **Success Metrics** - Measurable outcomes and KPIs
- **Professional Standards** - Quality assurance and testing protocols

### **For Developers**
- **Clear Specifications** - Detailed technical requirements
- **Implementation Guidelines** - Professional development standards
- **Quality Assurance** - Comprehensive testing protocols
- **Asset Requirements** - Content and media specifications
- **Timeline Planning** - Detailed project scheduling

---

## 🚀 Next Steps

### **Immediate Actions**
1. **Client Review** - Review strategic documents for business alignment
2. **Developer Briefing** - Share technical documents with development team
3. **Project Planning** - Use implementation roadmap for scheduling
4. **Resource Allocation** - Plan based on detailed requirements

### **Ongoing Collaboration**
- **Weekly Updates** - Track progress against timeline
- **Quality Checks** - Follow QA protocols throughout development
- **Success Monitoring** - Measure against defined KPIs
- **Continuous Optimization** - Use maintenance plan for ongoing success

---

## 📞 Support & Communication

### **T&H WebWorks Contact**
- **Email:** your-team@thwebworks.com
- **Phone:** (555) 123-4567
- **Support Hours:** Monday-Friday, 9 AM - 6 PM EST

### **Package Support**
- **Technical Questions** - Contact development team
- **Business Questions** - Contact project manager
- **Quality Assurance** - Follow QA protocols in package
- **Success Metrics** - Use defined KPIs for measurement

---

## 🎯 Success Criteria

### **Client Success**
- ✅ Clear understanding of project scope and value
- ✅ Confidence in ROI projections and business impact
- ✅ Trust in professional standards and quality
- ✅ Alignment with strategic goals and objectives

### **Developer Success**
- ✅ Complete technical specifications and requirements
- ✅ Clear implementation guidelines and standards
- ✅ Quality assurance protocols and testing procedures
- ✅ Detailed timeline and resource planning

### **Project Success**
- ✅ On-time delivery within budget
- ✅ Quality standards met or exceeded
- ✅ Client satisfaction and business value achieved
- ✅ Ongoing success through maintenance and optimization

---

*This package represents the gold standard in professional web development consultation, ensuring transparency, quality, and success for all stakeholders.*

**T&H WebWorks** - Professional transparency, exceptional results

---
**Package Generated:** ${new Date().toLocaleString()}
**Consultation ID:** ${Date.now()}
**Version:** 2.0 Professional Edition`;
}

// Prepare form data for submission including file uploads
async function prepareSubmissionData() {
    const formDataObj = new FormData();
    
    // Add all form fields as JSON
    const consultationData = { ...formData };
    
    // Handle file uploads separately
    const uploadedFiles = window.getUploadedFiles ? window.getUploadedFiles() : [];
    delete consultationData.projectAssets; // Remove from JSON as files are handled separately
    
    // Add consultation data as JSON
    formDataObj.append('consultationData', JSON.stringify(consultationData));
    
    // Add uploaded files
    uploadedFiles.forEach((file, index) => {
        formDataObj.append(`asset_${index}`, file);
    });
    
    return formDataObj;
}

// Show submission success with download link or confirmation
function showSubmissionSuccess(result) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
    
    let downloadSection = '';
    if (result.downloadUrl || result.downloadReady) {
        downloadSection = `
            <div class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p class="text-green-400 font-medium mb-3">✅ Your consultation package has been downloaded!</p>
                <p class="text-green-300 text-sm">Check your Downloads folder for the consultation report.</p>
            </div>
        `;
    }
    
    successDiv.innerHTML = `
        <div class="bg-gray-800 p-8 rounded-lg max-w-4xl w-full mx-4 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-white mb-4">Consultation Submitted!</h3>
            <p class="text-gray-300 mb-6">Your consultation has been submitted successfully and a comprehensive handoff package has been created.</p>
            ${downloadSection}
            <div class="mt-6">
                <p class="text-sm text-gray-400 mb-4">We'll get back to you within 24 hours with a custom proposal.</p>
                <div class="space-y-3">
                    <button onclick="window.openConsultationViewer()" 
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        📊 View Consultation Package
                    </button>
                    <button onclick="location.reload()" 
                            class="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                        Start New Consultation
                    </button>
                    <button onclick="window.createEmailBackup()" 
                            class="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                        📧 Email Backup Copy
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto-close after 30 seconds
    setTimeout(() => {
        if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
        }
    }, 30000);
}

// Create interactive consultation viewer
window.openConsultationViewer = function() {
    const viewerDiv = document.createElement('div');
    viewerDiv.className = 'fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto';
    viewerDiv.id = 'consultationViewer';
    
    const consultationData = {
        businessName: formData.contactName || 'Your Business',
        projectName: formData.projectName || `${formData.contactName} Website Project`,
        businessType: formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business',
        goals: formData.goals || [],
        features: formData.features || [],
        pagesCore: formData.pagesCore || [],
        pagesEngage: formData.pagesEngage || [],
        pagesTrust: formData.pagesTrust || [],
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        designStyle: formData.designStyle || 'Modern & Clean',
        primaryColor: formData.primaryColor || '#007bff',
        secondaryColor: formData.secondaryColor || '#6c757d'
    };
    
    const totalPages = [...consultationData.pagesCore, ...consultationData.pagesEngage, ...consultationData.pagesTrust].length;
    const totalFeatures = consultationData.features.length;
    
    // Calculate estimated project value
    const baseValue = 2500;
    const featureMultiplier = totalFeatures * 0.3;
    const pageMultiplier = totalPages * 0.2;
    const estimatedValue = Math.round(baseValue * (1 + featureMultiplier + pageMultiplier));
    
    viewerDiv.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            <!-- Header -->
            <div class="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center space-x-4">
                            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold">T&H</span>
                            </div>
                            <div>
                                <h1 class="text-white font-semibold">Consultation Package</h1>
                                <p class="text-blue-200 text-sm">${consultationData.projectName}</p>
                            </div>
                        </div>
                        <button onclick="document.getElementById('consultationViewer').remove()" 
                                class="text-white hover:text-blue-300 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white/5 backdrop-blur-sm border-b border-white/10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav class="flex space-x-8 overflow-x-auto">
                        <button onclick="showSection('overview')" class="tab-btn active py-4 px-3 border-b-2 border-blue-500 text-blue-300 whitespace-nowrap">
                            📊 Overview
                        </button>
                        <button onclick="showSection('executive')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            💼 Executive Summary
                        </button>
                        <button onclick="showSection('competitive')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            🎯 Competitive Analysis
                        </button>
                        <button onclick="showSection('technical')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            ⚙️ Technical Specs
                        </button>
                        <button onclick="showSection('timeline')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            📅 Timeline
                        </button>
                        <button onclick="showSection('quality')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            ✅ Quality Assurance
                        </button>
                        <button onclick="showSection('success')" class="tab-btn py-4 px-3 border-b-2 border-transparent text-gray-300 hover:text-blue-300 whitespace-nowrap">
                            📈 Success Metrics
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Content Area -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Overview Section -->
                <div id="overview" class="section-content">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Project Summary -->
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h2 class="text-2xl font-bold text-white mb-4">Project Summary</h2>
                            <div class="space-y-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-300">Client:</span>
                                    <span class="text-white font-semibold">${consultationData.businessName}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-300">Business Type:</span>
                                    <span class="text-white font-semibold">${consultationData.businessType}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-300">Budget Range:</span>
                                    <span class="text-white font-semibold">${consultationData.budget}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-300">Timeline:</span>
                                    <span class="text-white font-semibold">${consultationData.timeline}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-300">Design Style:</span>
                                    <span class="text-white font-semibold">${consultationData.designStyle}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Key Metrics -->
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h2 class="text-2xl font-bold text-white mb-4">Key Metrics</h2>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-blue-400">${totalPages}</div>
                                    <div class="text-gray-300 text-sm">Total Pages</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-green-400">${totalFeatures}</div>
                                    <div class="text-gray-300 text-sm">Advanced Features</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-yellow-400">$${estimatedValue.toLocaleString()}</div>
                                    <div class="text-gray-300 text-sm">Project Value</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-purple-400">300-500%</div>
                                    <div class="text-gray-300 text-sm">Expected ROI</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Goals & Features -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h3 class="text-xl font-bold text-white mb-4">Primary Goals</h3>
                            <div class="space-y-2">
                                ${consultationData.goals.map(goal => `
                                    <div class="flex items-center space-x-2">
                                        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span class="text-gray-300">${goal}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h3 class="text-xl font-bold text-white mb-4">Advanced Features</h3>
                            <div class="space-y-2">
                                ${consultationData.features.map(feature => `
                                    <div class="flex items-center space-x-2">
                                        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span class="text-gray-300">${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Executive Summary Section -->
                <div id="executive" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Executive Summary</h2>
                        <div class="prose prose-invert max-w-none">
                            <p class="text-gray-300 mb-6">
                                This comprehensive digital strategy assessment for <strong class="text-white">${consultationData.businessName}</strong> outlines a targeted approach to establishing a strong online presence and achieving measurable business growth through strategic web development.
                            </p>
                            
                            <div class="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                                <strong class="text-blue-300">Key Opportunity:</strong> ${consultationData.businessType} businesses that establish a professional online presence typically see a <strong class="text-white">40-60% increase in customer inquiries</strong> and <strong class="text-white">25-35% revenue growth</strong> within the first 6 months.
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 class="text-lg font-semibold text-white mb-3">Strategic Objectives</h3>
                                    <ul class="space-y-2 text-gray-300">
                                        <li>• Establish professional online presence</li>
                                        <li>• Increase lead generation and conversions</li>
                                        <li>• Improve customer engagement and trust</li>
                                        <li>• Achieve measurable business growth</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-white mb-3">Expected Outcomes</h3>
                                    <ul class="space-y-2 text-gray-300">
                                        <li>• 40-60% increase in qualified leads</li>
                                        <li>• 25-35% revenue growth</li>
                                        <li>• 3-5x improvement in user engagement</li>
                                        <li>• 6-12 month ROI achievement</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <!-- Competitive Analysis Section -->
                <div id="competitive" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Competitive Analysis</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Market Position</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span class="text-gray-300">Digital transformation opportunity</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span class="text-gray-300">Customer experience focus</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <span class="text-gray-300">Technology adoption gap</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span class="text-gray-300">Local market advantage</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Competitive Advantages</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span class="text-gray-300">Custom design & branding</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span class="text-gray-300">Advanced functionality</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span class="text-gray-300">SEO optimization</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span class="text-gray-300">Mobile-first design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Technical Specs Section -->
                <div id="technical" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Technical Stack</h3>
                                <div class="space-y-2 text-gray-300">
                                    <div>• HTML5, CSS3, JavaScript (ES6+)</div>
                                    <div>• Responsive design framework</div>
                                    <div>• SEO optimization</div>
                                    <div>• Security implementation</div>
                                    <div>• Performance optimization</div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Quality Standards</h3>
                                <div class="space-y-2 text-gray-300">
                                    <div>• PageSpeed Score > 90</div>
                                    <div>• WCAG 2.1 AA accessibility</div>
                                    <div>• Cross-browser compatibility</div>
                                    <div>• Mobile responsiveness</div>
                                    <div>• Security hardening</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Timeline Section -->
                <div id="timeline" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Implementation Timeline</h2>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                                <div>
                                    <h3 class="text-lg font-semibold text-white">Discovery & Planning (Week 1)</h3>
                                    <p class="text-gray-300">Project scope finalization, content strategy, technical architecture planning</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                <div>
                                    <h3 class="text-lg font-semibold text-white">Design & Development (${consultationData.timeline.includes('2-4') ? '2-3 weeks' : consultationData.timeline.includes('1-2') ? '2-3 weeks' : '3-4 weeks'})</h3>
                                    <p class="text-gray-300">Professional design creation, responsive development, feature implementation</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                <div>
                                    <h3 class="text-lg font-semibold text-white">Testing & Optimization (1 week)</h3>
                                    <p class="text-gray-300">Cross-browser testing, performance optimization, SEO implementation</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                                <div>
                                    <h3 class="text-lg font-semibold text-white">Launch & Support (1 week)</h3>
                                    <p class="text-gray-300">Domain setup, final testing, client training, post-launch support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quality Assurance Section -->
                <div id="quality" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Quality Assurance</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Testing Protocol</h3>
                                <div class="space-y-2 text-gray-300">
                                    <div>• Cross-browser compatibility testing</div>
                                    <div>• Mobile device testing</div>
                                    <div>• Performance optimization</div>
                                    <div>• Security vulnerability scanning</div>
                                    <div>• Accessibility compliance verification</div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Quality Standards</h3>
                                <div class="space-y-2 text-gray-300">
                                    <div>• PageSpeed Score > 90</div>
                                    <div>• WCAG 2.1 AA compliance</div>
                                    <div>• 99.9% uptime guarantee</div>
                                    <div>• SSL certificate implementation</div>
                                    <div>• Mobile responsiveness score: 100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Metrics Section -->
                <div id="success" class="section-content hidden">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h2 class="text-2xl font-bold text-white mb-6">Success Metrics</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Technical Metrics</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Page Load Speed:</span>
                                        <span class="text-green-400 font-semibold">< 3 seconds</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Uptime:</span>
                                        <span class="text-green-400 font-semibold">99.9%</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Mobile Responsiveness:</span>
                                        <span class="text-green-400 font-semibold">100%</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">SEO Score:</span>
                                        <span class="text-green-400 font-semibold">> 90/100</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-4">Business Metrics</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Lead Generation:</span>
                                        <span class="text-green-400 font-semibold">40-60% increase</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Traffic Growth:</span>
                                        <span class="text-green-400 font-semibold">50-100% increase</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Conversion Rate:</span>
                                        <span class="text-green-400 font-semibold">15-25% improvement</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">User Engagement:</span>
                                        <span class="text-green-400 font-semibold">3-5x improvement</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(viewerDiv);
    
    // Add tab switching functionality
    window.showSection = function(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('border-blue-500', 'text-blue-300');
            tab.classList.add('border-transparent', 'text-gray-300');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.remove('hidden');
        
        // Add active class to clicked tab
        event.target.classList.remove('border-transparent', 'text-gray-300');
        event.target.classList.add('border-blue-500', 'text-blue-300');
    };
};

function downloadSummary() {
    const summary = generateSummary();
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-consultation-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function generateSummary() {
    let summary = 'WEBSITE CONSULTATION SUMMARY\n';
    summary += '=============================\n\n';
    
    summary += `Business Type: ${formData.businessType}\n`;
    summary += `Goals: ${formData.goals.join(', ')}\n`;
    summary += `Core Pages: ${formData.pagesCore.join(', ')}\n`;
    summary += `Features: ${formData.features.join(', ')}\n`;
    summary += `Design Style: ${formData.designStyle}\n`;
    summary += `Primary Color: ${formData.primaryColor}\n`;
    summary += `Contact Name: ${formData.contactName}\n`;
    summary += `Email: ${formData.email}\n`;
    summary += `Phone: ${formData.phone}\n`;
    summary += `Budget: ${formData.budget}\n`;
    summary += `Timeline: ${formData.timeline}\n`;
    summary += `Additional Notes: ${formData.additionalNotes}\n\n`;
    
    // Add comprehensive handoff details
    if (formData.projectName || formData.projectDeadline || formData.developerEmail || formData.handoffNotes) {
        summary += 'PROJECT HANDOFF DETAILS\n';
        summary += '=======================\n';
        summary += `Project Name: ${formData.projectName || 'Not specified'}\n`;
        summary += `Target Completion Date: ${formData.projectDeadline || 'Not specified'}\n`;
        summary += `Developer Email: ${formData.developerEmail || 'Not specified'}\n\n`;
        
        // Technical Requirements
        summary += 'TECHNICAL REQUIREMENTS\n';
        summary += '---------------------\n';
        summary += `Has Domain: ${formData.hasDomain}\n`;
        summary += `Domain Name: ${formData.domainName || 'Not specified'}\n`;
        summary += `Hosting Preference: ${formData.hostingPreference}\n`;
        
        if (formData.integrations && formData.integrations.length > 0) {
            summary += `Required Integrations: ${formData.integrations.join(', ')}\n`;
        }
        summary += '\n';
        
        // Content & SEO
        summary += 'CONTENT & SEO\n';
        summary += '-------------\n';
        summary += `Content Responsibility: ${formData.contentResponsibility}\n`;
        if (formData.seoRequirements && formData.seoRequirements.length > 0) {
            summary += `SEO Requirements: ${formData.seoRequirements.join(', ')}\n`;
        }
        summary += '\n';
        
        // Project Management
        summary += 'PROJECT MANAGEMENT\n';
        summary += '------------------\n';
        if (formData.communicationMethods && formData.communicationMethods.length > 0) {
            summary += `Communication Methods: ${formData.communicationMethods.join(', ')}\n`;
        }
        summary += `Post-Launch Support: ${formData.postLaunchSupport}\n`;
        
        // Assets
        const uploadedFiles = window.getUploadedFiles ? window.getUploadedFiles() : [];
        if (uploadedFiles.length > 0) {
            summary += `\nUPLOADED ASSETS (${uploadedFiles.length} files)\n`;
            summary += '---------------\n';
            uploadedFiles.forEach(file => {
                summary += `• ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)\n`;
            });
        }
        
        // Additional Notes
        if (formData.handoffNotes) {
            summary += `\nADDITIONAL NOTES\n`;
            summary += '----------------\n';
            summary += `${formData.handoffNotes}\n`;
        }
    }
    
    return summary;
}

// === FILE UPLOAD FUNCTIONALITY ===
// Global array to store uploaded files
let uploadedFiles = [];
let currentUploadMode = 'files'; // 'files' or 'folders'

// File type categorization
function getFileCategory(file) {
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
    const documentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const designTypes = ['application/postscript', 'image/vnd.adobe.photoshop', 'application/sketch', 'application/figma'];
    const videoTypes = ['video/mp4', 'video/mov', 'video/quicktime'];

    if (imageTypes.includes(file.type)) return 'image';
    if (documentTypes.includes(file.type)) return 'document';
    if (designTypes.includes(file.type)) return 'design';
    if (videoTypes.includes(file.type)) return 'video';
    return 'other';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Upload mode management
window.setUploadMode = function(mode) {
    currentUploadMode = mode;
    console.log('📁 Upload mode set to:', mode);
    
    // Update button appearances
    const filesBtn = document.getElementById('filesModeBtn');
    const foldersBtn = document.getElementById('foldersModeBtn');
    
    if (filesBtn && foldersBtn) {
        filesBtn.classList.remove('upload-mode-active');
        foldersBtn.classList.remove('upload-mode-active');
        
        if (mode === 'files') {
            filesBtn.classList.add('upload-mode-active');
        } else {
            foldersBtn.classList.add('upload-mode-active');
        }
    }
};

// Global file upload functions
window.triggerFileSelect = function() {
    console.log('🚀 triggerFileSelect called, mode:', currentUploadMode);
    
    const inputId = currentUploadMode === 'folders' ? 'folderUpload' : 'assetUpload';
    const input = document.getElementById(inputId);
    
    if (input) {
        input.click();
    } else {
        console.error('❌ File input not found!', inputId);
    }
};

window.handleFileSelect = function(files) {
    console.log('📂 handleFileSelect called with', files.length, 'files');
    if (files.length > 0) {
        showUploadFeedback(files.length);
        handleFiles(files);
    }
};

window.handleDragOver = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('🔥 Drag over detected');
    const uploadArea = event.currentTarget;
    uploadArea.classList.add('upload-area-drag-over');
};

window.handleDragLeave = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('👋 Drag leave detected');
    const uploadArea = event.currentTarget;
    uploadArea.classList.remove('upload-area-drag-over');
};

window.handleDrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('📂 Drop detected with', event.dataTransfer.files.length, 'files');
    
    const uploadArea = event.currentTarget;
    uploadArea.classList.remove('upload-area-drag-over');
    
    if (event.dataTransfer.files.length > 0) {
        // Check if dropped items include folders
        const items = event.dataTransfer.items;
        if (items) {
            let hasDirectories = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry().isDirectory) {
                    hasDirectories = true;
                    break;
                }
            }
            
            if (hasDirectories) {
                console.log('📁 Folder(s) detected in drop');
                handleFolderDrop(event.dataTransfer.items);
                return;
            }
        }
        
        window.handleFileSelect(event.dataTransfer.files);
    }
};

window.getUploadedFiles = function() {
    return uploadedFiles;
};

window.clearAllFiles = function() {
    uploadedFiles = [];
    updateFileDisplay();
    console.log('🗑️ All files cleared');
    
    // Clear file displays
    const fileSummaryDisplay = document.getElementById('fileSummaryDisplay');
    if (fileSummaryDisplay) {
        fileSummaryDisplay.classList.add('hidden');
    }
    
    // Reset counters
    const counters = ['imageCounter', 'documentCounter', 'designCounter', 'otherCounter', 'totalFileCount'];
    counters.forEach(id => {
        const counter = document.getElementById(id);
        if (counter) counter.textContent = '0';
    });
};

// Enhanced checkbox and radio button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add change listeners to all checkboxes and radio buttons in section containers
    document.querySelectorAll('.section-container input[type="checkbox"], .section-container input[type="radio"]').forEach(input => {
        function updateLabelState() {
            const label = input.closest('label');
            if (label) {
                if (input.checked) {
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            }
        }
        
        // Initial state
        updateLabelState();
        
        // Listen for changes
        input.addEventListener('change', updateLabelState);
    });
});

// Handle folder drops
function handleFolderDrop(items) {
    console.log('📁 Processing folder drop...');
    const allFiles = [];
    let pendingItems = 0;
    
    function processEntry(entry, path = '') {
        pendingItems++;
        
        if (entry.isFile) {
            entry.file(function(file) {
                // Add path information to the file object
                file.relativePath = path + file.name;
                allFiles.push(file);
                pendingItems--;
                
                if (pendingItems === 0) {
                    console.log('✅ All folder files processed:', allFiles.length);
                    showUploadFeedback(allFiles.length);
                    handleFiles(allFiles);
                }
            });
        } else if (entry.isDirectory) {
            const dirReader = entry.createReader();
            dirReader.readEntries(function(entries) {
                pendingItems--;
                for (let i = 0; i < entries.length; i++) {
                    processEntry(entries[i], path + entry.name + '/');
                }
                
                if (pendingItems === 0) {
                    console.log('✅ All folder files processed:', allFiles.length);
                    showUploadFeedback(allFiles.length);
                    handleFiles(allFiles);
                }
            });
        }
    }
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.webkitGetAsEntry) {
            const entry = item.webkitGetAsEntry();
            if (entry) {
                processEntry(entry);
            }
        }
    }
}

function showUploadFeedback(count) {
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        // Flash success state to show files were selected
        uploadArea.classList.add('upload-area-success');
        
        // Reset after a moment
        setTimeout(() => {
            uploadArea.classList.remove('upload-area-success');
        }, 1000);
    }
    
    // Show a temporary message
    const message = document.createElement('div');
    message.className = 'upload-feedback-message';
    message.innerHTML = `<i class="fas fa-check"></i>Processing ${count} file${count > 1 ? 's' : ''}...`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 2000);
}



function handleFiles(files) {
    console.log('🔄 handleFiles called with', files.length, 'files');
    
    const allowedTypes = [
        'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp',
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', 'application/zip', 'application/x-zip-compressed',
        'video/mp4', 'video/mov', 'video/quicktime',
        'application/postscript', 'image/vnd.adobe.photoshop'
    ];
    
    let addedCount = 0;
    
    for (let file of files) {
        console.log(`📄 Processing: ${file.name} (${file.type}, ${formatFileSize(file.size)})`);
        
        if (file.size > 25 * 1024 * 1024) { // 25MB limit
            alert(`File "${file.name}" is too large. Maximum file size is 25MB.`);
            continue;
        }
        
        // Check if file already exists
        const exists = uploadedFiles.some(f => f.name === file.name && f.size === file.size);
        if (exists) {
            console.log(`⚠️ Duplicate file skipped: ${file.name}`);
            continue;
        }
        
        uploadedFiles.push(file);
        addedCount++;
        console.log(`✅ Added: ${file.name} (Total files: ${uploadedFiles.length})`);
    }

    console.log(`📊 Successfully added ${addedCount} files. Total files now: ${uploadedFiles.length}`);
    updateFileDisplay();
}

function updateFileDisplay() {
    console.log(`🖼️ updateFileDisplay called - ${uploadedFiles.length} files to display`);
    
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    const fileSummary = document.getElementById('fileSummary');
    
    if (uploadedFiles.length === 0) {
        console.log('No files to display, hiding containers');
        uploadedFilesContainer?.classList.add('hidden');
        fileSummary?.classList.add('hidden');
        return;
    }

    // Show containers
    console.log('Showing file containers');
    uploadedFilesContainer?.classList.remove('hidden');
    fileSummary?.classList.remove('hidden');

    // Update main summary
    const fileCount = document.getElementById('fileCount');
    const totalSize = document.getElementById('totalSize');
    
    if (fileCount) fileCount.textContent = uploadedFiles.length;
    if (totalSize) {
        const total = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
        totalSize.textContent = formatFileSize(total);
    }

    // Update type breakdown
    updateTypeBreakdown();
    
    // Display file categories
    displayFilesByCategory();
}

function updateTypeBreakdown() {
    const categories = {
        image: { count: 0, element: 'imageCounter' },
        document: { count: 0, element: 'documentCounter' },
        design: { count: 0, element: 'designCounter' },
        other: { count: 0, element: 'otherCounter' }
    };

    uploadedFiles.forEach(file => {
        const category = getFileCategory(file);
        if (categories[category]) {
            categories[category].count++;
        } else {
            categories.other.count++; // Default to other
        }
    });

    // Update individual counters
    Object.values(categories).forEach(cat => {
        const element = document.getElementById(cat.element);
        if (element) element.textContent = cat.count;
    });
    
    // Update total file count
    const totalFileCount = document.getElementById('totalFileCount');
    if (totalFileCount) totalFileCount.textContent = uploadedFiles.length;
}

function displayFilesByCategory() {
    // Show the file summary display if there are files
    const fileSummaryDisplay = document.getElementById('fileSummaryDisplay');
    if (fileSummaryDisplay) {
        const hasFiles = uploadedFiles.length > 0;
        fileSummaryDisplay.classList.toggle('hidden', !hasFiles);
    }
    
    console.log('📂 File summary display updated for', uploadedFiles.length, 'files');
}

function displayImageFiles(files, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    files.forEach((file, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative group bg-gray-900 rounded-lg overflow-hidden aspect-square';
        
        const img = document.createElement('img');
        img.className = 'w-full h-full object-cover';
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'bg-red-600 hover:bg-red-700 text-white p-2 rounded-full';
        removeBtn.innerHTML = '<i class="fas fa-trash text-sm"></i>';
        removeBtn.onclick = () => removeFile(file);
        
        overlay.appendChild(removeBtn);
        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);
        grid.appendChild(imageContainer);
    });
}

function displayListFiles(files, listId) {
    const list = document.getElementById(listId);
    if (!list) return;
    
    list.innerHTML = '';
    
    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-3 bg-gray-900 rounded-lg';
        
        item.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="${getFileIcon(file)} text-lg"></i>
                <div>
                    <div class="text-sm font-medium text-white">${file.name}</div>
                    <div class="text-xs text-gray-400">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button onclick="removeFile(arguments[0])" class="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors">
                <i class="fas fa-trash text-sm"></i>
            </button>
        `;
        
        // Store file reference for removal
        item.querySelector('button').fileRef = file;
        
        list.appendChild(item);
    });
}

function getFileIcon(file) {
    const type = file.type.toLowerCase();
    if (type.includes('pdf')) return 'fas fa-file-pdf text-red-400';
    if (type.includes('word')) return 'fas fa-file-word text-blue-400';
    if (type.includes('image')) return 'fas fa-file-image text-green-400';
    if (type.includes('video')) return 'fas fa-file-video text-purple-400';
    if (type.includes('zip')) return 'fas fa-file-archive text-yellow-400';
    return 'fas fa-file text-gray-400';
}

window.removeFile = function(file) {
    const index = uploadedFiles.indexOf(file);
    if (index > -1) {
        uploadedFiles.splice(index, 1);
        console.log(`🗑️ Removed file: ${file.name}`);
        updateFileDisplay();
        
        // Update the simple test display
        const testDiv = document.getElementById('testFileDisplay');
        if (testDiv && uploadedFiles.length === 0) {
            testDiv.remove();
        }
    }
};

// Export functions for use in other modules
window.wizardFunctions = {
    goToStep,
    nextStep,
    prevStep,
    selectRadioOption,
    toggleCheckboxOption,
    submitForm,
    downloadSummary,
    triggerFileSelect: window.triggerFileSelect,
    handleFileSelect: window.handleFileSelect,
    clearAllFiles: window.clearAllFiles,
    getUploadedFiles: window.getUploadedFiles
}; 

function createUnifiedConsultationDashboard() {
    const businessName = formData.contactName || 'Your Business';
    const projectName = formData.projectName || `${businessName} Website Project`;
    const businessType = formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business';
    const goals = formData.goals || [];
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    const timeline = formData.timeline || 'Not specified';
    
    const totalPages = [...pagesCore, ...pagesEngage, ...pagesTrust].length;
    const totalFeatures = features.length;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Consultation Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            display: flex;
            align-items: center;
            color: white;
        }
        .logo-icon {
            width: 40px;
            height: 40px;
            background: #007bff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-weight: bold;
            color: white;
        }
        .nav-tabs {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0 2rem;
            overflow-x: auto;
        }
        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 2rem;
        }
        .tab-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            padding: 1rem 0;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 500;
        }
        .tab-btn:hover, .tab-btn.active {
            color: white;
            border-bottom-color: #007bff;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .section {
            display: none;
            animation: fadeIn 0.3s ease-in;
        }
        .section.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .grid {
            display: grid;
            gap: 2rem;
        }
        .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
        .grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        .metric {
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 0.5rem;
        }
        .metric-label {
            color: #6c757d;
            font-size: 0.9rem;
            font-weight: 500;
        }
        .list-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #e9ecef;
        }
        .list-item:last-child { border-bottom: none; }
        .list-icon {
            width: 8px;
            height: 8px;
            background: #007bff;
            border-radius: 50%;
            margin-right: 12px;
        }
        .timeline {
            position: relative;
            padding-left: 2rem;
        }
        .timeline:before {
            content: '';
            position: absolute;
            left: 12px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #007bff;
        }
        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
        }
        .timeline-item:before {
            content: '';
            position: absolute;
            left: -30px;
            top: 8px;
            width: 16px;
            height: 16px;
            background: #007bff;
            border-radius: 50%;
            border: 3px solid white;
        }
        .timeline-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 0.5rem;
        }
        .timeline-desc {
            color: #6c757d;
            font-size: 0.9rem;
        }
        .highlight-box {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 4px solid #2196f3;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1.5rem 0;
        }
        .highlight-title {
            font-weight: bold;
            color: #1565c0;
            margin-bottom: 0.5rem;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        .table th, .table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }
        .table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #495057;
        }
        .priority-high { color: #dc3545; font-weight: 600; }
        .priority-medium { color: #ffc107; font-weight: 600; }
        .priority-low { color: #28a745; font-weight: 600; }
        .feature-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        .feature-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        .competive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        .swot-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            border-top: 4px solid #007bff;
        }
        .swot-title {
            font-weight: bold;
            margin-bottom: 1rem;
            color: #333;
        }
        .print-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        .print-btn:hover {
            background: #0056b3;
        }
        @media print {
            .header, .nav-tabs { display: none; }
            .section { display: block !important; }
            .card { break-inside: avoid; }
            body { background: white; }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="header-content">
            <div class="logo">
                <div class="logo-icon">T&H</div>
                <div>
                    <h1>${projectName}</h1>
                    <p style="opacity: 0.8; font-size: 0.9rem;">Professional Consultation Dashboard</p>
                </div>
            </div>
            <button class="print-btn" onclick="window.print()">📄 Print/Save PDF</button>
        </div>
    </div>

    <!-- Navigation -->
    <div class="nav-tabs">
        <div class="nav-content">
            <button class="tab-btn active" onclick="showSection('overview')">📊 Overview</button>
            <button class="tab-btn" onclick="showSection('requirements')">📋 Requirements</button>
            <button class="tab-btn" onclick="showSection('technical')">⚙️ Technical</button>
            <button class="tab-btn" onclick="showSection('timeline')">📅 Timeline</button>
            <button class="tab-btn" onclick="showSection('competitive')">🎯 Market Analysis</button>
            <button class="tab-btn" onclick="showSection('quality')">✅ Quality Standards</button>
            <button class="tab-btn" onclick="showSection('success')">📈 Success Metrics</button>
        </div>
    </div>

    <div class="container">
        <!-- Overview Section -->
        <div id="overview" class="section active">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Project Overview</h2>
                <div class="grid grid-4">
                    <div class="metric">
                        <div class="metric-value">${totalPages}</div>
                        <div class="metric-label">Total Pages</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${totalFeatures}</div>
                        <div class="metric-label">Advanced Features</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${timeline}</div>
                        <div class="metric-label">Timeline</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${businessType}</div>
                        <div class="metric-label">Business Type</div>
                    </div>
                </div>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h3 style="margin-bottom: 1.5rem; color: #333;">Primary Goals</h3>
                    ${goals.map(goal => `
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>${goal}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="card">
                    <h3 style="margin-bottom: 1.5rem; color: #333;">Advanced Features</h3>
                    ${features.map(feature => `
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 1.5rem; color: #333;">Executive Summary</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.6; color: #555;">
                    This comprehensive digital strategy assessment for <strong>${businessName}</strong> outlines a targeted approach to establishing a strong online presence and achieving measurable business growth through strategic web development.
                </p>
                <div class="highlight-box">
                    <div class="highlight-title">Key Opportunity</div>
                    <p>${businessType} businesses that establish a professional online presence typically see a <strong>40-60% increase in customer inquiries</strong> and <strong>25-35% revenue growth</strong> within the first 6 months.</p>
                </div>
            </div>
        </div>

        <!-- Requirements Section -->
        <div id="requirements" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Detailed Requirements</h2>
                
                <h3 style="margin-bottom: 1rem; color: #333;">Page Structure & Content</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Page</th>
                            <th>Priority</th>
                            <th>Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pagesCore.map(page => `
                            <tr>
                                <td><strong>${page}</strong></td>
                                <td><span class="priority-high">High</span></td>
                                <td>Core functionality, responsive design, SEO optimized</td>
                            </tr>
                        `).join('')}
                        ${pagesEngage.map(page => `
                            <tr>
                                <td><strong>${page}</strong></td>
                                <td><span class="priority-medium">Medium</span></td>
                                <td>Engagement features, interactive content</td>
                            </tr>
                        `).join('')}
                        ${pagesTrust.map(page => `
                            <tr>
                                <td><strong>${page}</strong></td>
                                <td><span class="priority-medium">Medium</span></td>
                                <td>Trust building, social proof elements</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <h3 style="margin: 2rem 0 1rem; color: #333;">Features & Functionality</h3>
                <div class="feature-list">
                    ${features.map(feature => `
                        <div class="feature-item">
                            <strong>${feature}</strong>
                            <p style="margin-top: 0.5rem; color: #6c757d; font-size: 0.9rem;">Professional implementation with best practices</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Technical Section -->
        <div id="technical" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Technical Specifications</h2>
                
                <div class="grid grid-2">
                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Technology Stack</h3>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>HTML5, CSS3, JavaScript (ES6+)</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Responsive design framework</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>SEO optimization</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Security implementation</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Performance optimization</span>
                        </div>
                    </div>

                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Quality Standards</h3>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>PageSpeed Score > 90</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>WCAG 2.1 AA accessibility</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Cross-browser compatibility</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Mobile responsiveness</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Security hardening</span>
                        </div>
                    </div>
                </div>

                <div class="highlight-box" style="margin-top: 2rem;">
                    <div class="highlight-title">Design Requirements</div>
                    <p><strong>Style:</strong> ${formData.designStyle || 'Modern & Clean'}<br>
                    <strong>Primary Color:</strong> ${formData.primaryColor || 'Professional blue'}<br>
                    <strong>Secondary Color:</strong> ${formData.secondaryColor || 'Complementary accent'}</p>
                </div>
            </div>
        </div>

        <!-- Timeline Section -->
        <div id="timeline" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Implementation Timeline</h2>
                
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-title">Phase 1: Discovery & Planning (Week 1)</div>
                        <div class="timeline-desc">Project scope finalization, content strategy development, technical architecture planning, design direction establishment</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-title">Phase 2: Design & Development (${timeline.includes('2-4') ? '2-3 weeks' : timeline.includes('1-2') ? '2-3 weeks' : '3-4 weeks'})</div>
                        <div class="timeline-desc">Professional design creation, responsive development, feature implementation, content integration</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-title">Phase 3: Testing & Optimization (1 week)</div>
                        <div class="timeline-desc">Cross-browser testing, performance optimization, SEO implementation, security validation</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-title">Phase 4: Launch & Support (1 week)</div>
                        <div class="timeline-desc">Domain and hosting setup, final testing and deployment, client training, post-launch support</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Competitive Section -->
        <div id="competitive" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Market Analysis</h2>
                
                <p style="margin-bottom: 2rem; line-height: 1.6; color: #555;">
                    This competitive analysis provides strategic insights into your market position and identifies key opportunities for differentiation in the ${businessType} industry.
                </p>

                <div class="highlight-box">
                    <div class="highlight-title">Key Insight</div>
                    <p>${businessType} businesses that leverage digital tools effectively see <strong>3-5x higher customer engagement</strong> and <strong>40-60% increase in lead generation</strong> compared to traditional approaches.</p>
                </div>

                <div class="competive-grid">
                    <div class="swot-card">
                        <div class="swot-title">💪 Strengths</div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Professional service delivery</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Industry expertise</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Client relationship management</span>
                        </div>
                    </div>

                    <div class="swot-card">
                        <div class="swot-title">🎯 Opportunities</div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #007bff;"></div>
                            <span>Digital transformation</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #007bff;"></div>
                            <span>Online service delivery</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #007bff;"></div>
                            <span>Automated processes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quality Section -->
        <div id="quality" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Quality Assurance Standards</h2>
                
                <div class="grid grid-2">
                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Testing Protocol</h3>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Cross-browser compatibility testing</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Mobile device testing</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Performance optimization</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Security vulnerability scanning</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon"></div>
                            <span>Accessibility compliance verification</span>
                        </div>
                    </div>

                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Performance Standards</h3>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Page load speed < 3 seconds</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>99.9% uptime guarantee</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Mobile responsiveness: 100%</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>SEO score > 90/100</span>
                        </div>
                        <div class="list-item">
                            <div class="list-icon" style="background: #28a745;"></div>
                            <span>Security score: A+ rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Section -->
        <div id="success" class="section">
            <div class="card">
                <h2 style="margin-bottom: 2rem; color: #333;">Success Metrics & Outcomes</h2>
                
                <div class="grid grid-2">
                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Technical Success</h3>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">< 3s</div>
                            <div class="metric-label">Page Load Speed</div>
                        </div>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">99.9%</div>
                            <div class="metric-label">Uptime Guarantee</div>
                        </div>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">>90</div>
                            <div class="metric-label">SEO Score</div>
                        </div>
                    </div>

                    <div>
                        <h3 style="margin-bottom: 1rem; color: #333;">Business Impact</h3>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">40-60%</div>
                            <div class="metric-label">Lead Generation Increase</div>
                        </div>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">50-100%</div>
                            <div class="metric-label">Traffic Growth</div>
                        </div>
                        <div class="metric" style="margin-bottom: 1rem;">
                            <div class="metric-value" style="font-size: 1.5rem;">3-5x</div>
                            <div class="metric-label">User Engagement</div>
                        </div>
                    </div>
                </div>

                <div class="highlight-box" style="margin-top: 2rem;">
                    <div class="highlight-title">Success Timeline</div>
                    <p><strong>30 Days:</strong> Website launched and optimized<br>
                    <strong>60 Days:</strong> Initial traffic and engagement improvements visible<br>
                    <strong>90 Days:</strong> Measurable increase in leads and conversions<br>
                    <strong>6 Months:</strong> Full ROI achievement and business growth</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }
    </script>
</body>
</html>`;
}

function createExecutiveSummaryHTML() {
    const businessName = formData.contactName || 'Your Business';
    const businessType = formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business';
    const budget = formData.budget || 'Not specified';
    const timeline = formData.timeline || 'Not specified';
    const goals = formData.goals ? formData.goals.join(', ') : 'Not specified';
    
    // Calculate estimated project value
    const baseValue = 2500;
    const featureMultiplier = formData.features ? formData.features.length * 0.3 : 1;
    const pageMultiplier = formData.pagesCore ? formData.pagesCore.length * 0.2 : 1;
    const estimatedValue = Math.round(baseValue * featureMultiplier * pageMultiplier);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Summary - ${businessName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #007bff; padding-bottom: 20px; }
        .logo { font-size: 2.5em; margin-bottom: 10px; }
        .title { color: #007bff; font-size: 2.2em; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #6c757d; font-size: 1.2em; }
        .section { margin-bottom: 30px; }
        .section-title { color: #007bff; font-size: 1.5em; font-weight: bold; margin-bottom: 15px; border-left: 4px solid #007bff; padding-left: 15px; }
        .highlight-box { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .metric { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
        .metric-label { font-weight: bold; color: #495057; }
        .metric-value { color: #007bff; font-weight: bold; }
        .roi-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 10px; margin: 20px 0; }
        .roi-title { font-size: 1.3em; font-weight: bold; margin-bottom: 15px; }
        .roi-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .roi-metric { text-align: center; }
        .roi-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .roi-label { font-size: 0.9em; opacity: 0.9; }
        .timeline { display: flex; justify-content: space-between; margin: 20px 0; }
        .timeline-item { text-align: center; flex: 1; }
        .timeline-dot { width: 20px; height: 20px; background: #007bff; border-radius: 50%; margin: 0 auto 10px; }
        .timeline-label { font-size: 0.9em; color: #6c757d; }
        .next-steps { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 5px; margin-top: 30px; }
        .next-steps-title { color: #155724; font-weight: bold; margin-bottom: 15px; }
        .next-steps-list { list-style: none; padding: 0; }
        .next-steps-list li { margin: 10px 0; padding-left: 20px; position: relative; }
        .next-steps-list li:before { content: "✓"; color: #28a745; font-weight: bold; position: absolute; left: 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">📊</div>
            <div class="title">Executive Summary</div>
            <div class="subtitle">${businessName} - Digital Transformation Strategy</div>
            <div style="margin-top: 20px; color: #6c757d;">Generated by T&H WebWorks | ${new Date().toLocaleDateString()}</div>
        </div>

        <div class="section">
            <div class="section-title">Project Overview</div>
            <p>This comprehensive digital strategy assessment for <strong>${businessName}</strong> outlines a targeted approach to establishing a strong online presence and achieving measurable business growth through strategic web development.</p>
            
            <div class="highlight-box">
                <strong>Key Opportunity:</strong> ${businessType} businesses that establish a professional online presence typically see a <strong>40-60% increase in customer inquiries</strong> and <strong>25-35% revenue growth</strong> within the first 6 months.
            </div>
        </div>

        <div class="section">
            <div class="section-title">Strategic Objectives</div>
            <div class="metric">
                <span class="metric-label">Primary Goals:</span>
                <span class="metric-value">${goals}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Business Type:</span>
                <span class="metric-value">${businessType}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Budget Range:</span>
                <span class="metric-value">${budget}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Timeline:</span>
                <span class="metric-value">${timeline}</span>
            </div>
        </div>

        <div class="roi-section">
            <div class="roi-title">Projected Return on Investment</div>
            <div class="roi-metrics">
                <div class="roi-metric">
                    <div class="roi-number">$${estimatedValue.toLocaleString()}</div>
                    <div class="roi-label">Estimated Project Value</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">40-60%</div>
                    <div class="roi-label">Expected Lead Increase</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">25-35%</div>
                    <div class="roi-label">Revenue Growth</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">6-12</div>
                    <div class="roi-label">Months to ROI</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Implementation Strategy</div>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Discovery & Planning</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Design & Development</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Testing & Launch</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Optimization</div>
                </div>
            </div>
        </div>

        <div class="next-steps">
            <div class="next-steps-title">Recommended Next Steps</div>
            <ul class="next-steps-list">
                <li>Review detailed requirements and technical specifications</li>
                <li>Schedule project kickoff meeting</li>
                <li>Begin asset collection and content preparation</li>
                <li>Establish project timeline and milestones</li>
                <li>Set up analytics and tracking systems</li>
            </ul>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #6c757d; font-size: 0.9em;">
            <p>This executive summary is part of a comprehensive consultation package designed to maximize your digital success.</p>
            <p><strong>T&H WebWorks</strong> - Transforming businesses through strategic web development</p>
        </div>
    </div>
</body>
</html>`;
}

function createInvestmentAnalysisHTML() {
    const businessName = formData.contactName || 'Your Business';
    const budget = formData.budget || 'Not specified';
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    
    // Calculate detailed cost breakdown
    const baseCost = 1500;
    const featureCosts = {
        'Analytics': 300,
        'Live Chat': 200,
        'Payment Processing': 500,
        'Online Scheduler': 400,
        'Newsletter Integration': 150,
        'SEO Optimization': 400,
        'Mobile Optimization': 300,
        'Social Media Integration': 200,
        'Contact Forms': 100,
        'Blog/Content Management': 350,
        'E-commerce': 800,
        'User Authentication': 250,
        'Multi-language Support': 400,
        'Advanced Search': 200,
        'API Integration': 600
    };
    
    const pageCosts = {
        'Home': 200,
        'Services': 300,
        'About': 150,
        'Contact': 100,
        'Portfolio': 250,
        'Resources': 200,
        'Events': 300,
        'Newsletter': 150,
        'Testimonials': 100,
        'FAQ': 150,
        'Case Studies': 200,
        'Team': 200,
        'Blog': 300,
        'Pricing': 200,
        'Support': 250
    };
    
    let totalFeatureCost = 0;
    features.forEach(feature => {
        totalFeatureCost += featureCosts[feature] || 200;
    });
    
    let totalPageCost = 0;
    [...pagesCore, ...pagesEngage, ...pagesTrust].forEach(page => {
        totalPageCost += pageCosts[page] || 150;
    });
    
    const designCost = 500;
    const developmentCost = 800;
    const testingCost = 300;
    const deploymentCost = 200;
    const totalCost = baseCost + totalFeatureCost + totalPageCost + designCost + developmentCost + testingCost + deploymentCost;
    
    // Calculate ROI metrics
    const monthlyValue = Math.round(totalCost * 0.15); // 15% monthly value
    const annualROI = Math.round((monthlyValue * 12 - totalCost) / totalCost * 100);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Investment Analysis - ${businessName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #28a745; padding-bottom: 20px; }
        .logo { font-size: 2.5em; margin-bottom: 10px; }
        .title { color: #28a745; font-size: 2.2em; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #6c757d; font-size: 1.2em; }
        .section { margin-bottom: 30px; }
        .section-title { color: #28a745; font-size: 1.5em; font-weight: bold; margin-bottom: 15px; border-left: 4px solid #28a745; padding-left: 15px; }
        .cost-breakdown { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .cost-item { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #28a745; }
        .cost-label { font-weight: bold; color: #495057; }
        .cost-value { color: #28a745; font-weight: bold; }
        .total-cost { background: #28a745; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; font-size: 1.2em; font-weight: bold; }
        .roi-section { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 25px; border-radius: 10px; margin: 20px 0; }
        .roi-title { font-size: 1.3em; font-weight: bold; margin-bottom: 15px; }
        .roi-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .roi-metric { text-align: center; }
        .roi-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .roi-label { font-size: 0.9em; opacity: 0.9; }
        .comparison { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
        .comparison-card { background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #e9ecef; }
        .comparison-title { font-weight: bold; color: #495057; margin-bottom: 15px; }
        .comparison-list { list-style: none; padding: 0; }
        .comparison-list li { margin: 8px 0; padding-left: 20px; position: relative; }
        .comparison-list li:before { content: "✓"; color: #28a745; font-weight: bold; position: absolute; left: 0; }
        .comparison-list li.cross:before { content: "✗"; color: #dc3545; }
        .highlight-box { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .timeline { display: flex; justify-content: space-between; margin: 20px 0; }
        .timeline-item { text-align: center; flex: 1; }
        .timeline-dot { width: 20px; height: 20px; background: #28a745; border-radius: 50%; margin: 0 auto 10px; }
        .timeline-label { font-size: 0.9em; color: #6c757d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰</div>
            <div class="title">Investment Analysis</div>
            <div class="subtitle">${businessName} - Cost-Benefit Analysis & ROI Projections</div>
            <div style="margin-top: 20px; color: #6c757d;">Generated by T&H WebWorks | ${new Date().toLocaleDateString()}</div>
        </div>

        <div class="section">
            <div class="section-title">Investment Overview</div>
            <p>This comprehensive investment analysis demonstrates the strategic value of your web development project and provides detailed cost breakdown with projected returns.</p>
            
            <div class="highlight-box">
                <strong>Key Insight:</strong> Professional websites typically generate <strong>$${monthlyValue.toLocaleString()}</strong> in monthly value, resulting in a <strong>${annualROI}% annual ROI</strong> after the initial investment.
            </div>
        </div>

        <div class="section">
            <div class="section-title">Detailed Cost Breakdown</div>
            <div class="cost-breakdown">
                <div class="cost-item">
                    <span class="cost-label">Base Website Development</span>
                    <span class="cost-value">$${baseCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Advanced Features (${features.length} features)</span>
                    <span class="cost-value">$${totalFeatureCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Page Development (${[...pagesCore, ...pagesEngage, ...pagesTrust].length} pages)</span>
                    <span class="cost-value">$${totalPageCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Custom Design & Branding</span>
                    <span class="cost-value">$${designCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Development & Programming</span>
                    <span class="cost-value">$${developmentCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Testing & Quality Assurance</span>
                    <span class="cost-value">$${testingCost.toLocaleString()}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Deployment & Launch</span>
                    <span class="cost-value">$${deploymentCost.toLocaleString()}</span>
                </div>
                <div class="total-cost">
                    Total Investment: $${totalCost.toLocaleString()}
                </div>
            </div>
        </div>

        <div class="roi-section">
            <div class="roi-title">Return on Investment Projections</div>
            <div class="roi-metrics">
                <div class="roi-metric">
                    <div class="roi-number">$${monthlyValue.toLocaleString()}</div>
                    <div class="roi-label">Monthly Value Generated</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">$${(monthlyValue * 12).toLocaleString()}</div>
                    <div class="roi-label">Annual Value Generated</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">${annualROI}%</div>
                    <div class="roi-label">Annual ROI</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-number">8-12</div>
                    <div class="roi-label">Months to Break Even</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Value Comparison</div>
            <div class="comparison">
                <div class="comparison-card">
                    <div class="comparison-title">DIY Website Builder</div>
                    <ul class="comparison-list">
                        <li>Low initial cost ($10-30/month)</li>
                        <li>Limited customization</li>
                        <li>Generic templates</li>
                        <li>Basic SEO capabilities</li>
                        <li class="cross">No professional support</li>
                        <li class="cross">Limited scalability</li>
                        <li class="cross">Generic branding</li>
                    </ul>
                </div>
                <div class="comparison-card">
                    <div class="comparison-title">Professional Development</div>
                    <ul class="comparison-list">
                        <li>Custom design & branding</li>
                        <li>Advanced functionality</li>
                        <li>SEO optimized</li>
                        <li>Mobile responsive</li>
                        <li>Professional support</li>
                        <li>Scalable architecture</li>
                        <li>Competitive advantage</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Investment Timeline</div>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Initial Investment</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Launch & Go-Live</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Traffic Growth</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">ROI Achievement</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #6c757d; font-size: 0.9em;">
            <p>This investment analysis demonstrates the strategic value of professional web development for your business growth.</p>
            <p><strong>T&H WebWorks</strong> - Maximizing your digital investment returns</p>
        </div>
    </div>
</body>
</html>`;
}

function createCompetitiveAnalysisHTML() {
    const businessName = formData.contactName || 'Your Business';
    const businessType = formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business';
    const goals = formData.goals || [];
    const features = formData.features || [];
    
    // Generate competitive insights based on business type and goals
    const competitiveInsights = {
        'service-business': {
            strengths: ['Professional service delivery', 'Client relationship management', 'Industry expertise'],
            opportunities: ['Online booking systems', 'Client portals', 'Automated invoicing'],
            threats: ['DIY website builders', 'Large competitors with bigger budgets', 'Changing client expectations'],
            recommendations: ['Implement client self-service features', 'Focus on local SEO', 'Develop case study content']
        },
        'trades': {
            strengths: ['Local market knowledge', 'Hands-on expertise', 'Reliable service delivery'],
            opportunities: ['Online scheduling', 'Before/after galleries', 'Customer reviews platform'],
            threats: ['National service companies', 'DIY market growth', 'Economic downturns'],
            recommendations: ['Showcase work quality through galleries', 'Implement online booking', 'Build review system']
        },
        'consulting': {
            strengths: ['Expert knowledge', 'Strategic thinking', 'Problem-solving approach'],
            opportunities: ['Thought leadership content', 'Online consultation booking', 'Resource libraries'],
            threats: ['Large consulting firms', 'AI-powered solutions', 'Market saturation'],
            recommendations: ['Create educational content', 'Implement consultation booking', 'Build resource center']
        },
        'education': {
            strengths: ['Educational expertise', 'Student relationships', 'Curriculum knowledge'],
            opportunities: ['Online course platforms', 'Student portals', 'Resource libraries'],
            threats: ['Online learning platforms', 'Traditional education decline', 'Technology adoption barriers'],
            recommendations: ['Develop online learning features', 'Create student resources', 'Implement progress tracking']
        },
        'real-estate': {
            strengths: ['Local market knowledge', 'Client relationships', 'Property expertise'],
            opportunities: ['Property search tools', 'Virtual tours', 'Client portals'],
            threats: ['Large real estate platforms', 'Market fluctuations', 'Technology disruption'],
            recommendations: ['Implement property search', 'Add virtual tour capabilities', 'Create client dashboard']
        },
        'tech': {
            strengths: ['Technical expertise', 'Innovation focus', 'Problem-solving skills'],
            opportunities: ['Product demos', 'Technical documentation', 'API integrations'],
            threats: ['Large tech companies', 'Rapid technology changes', 'High competition'],
            recommendations: ['Showcase technical capabilities', 'Create demo environments', 'Build developer resources']
        }
    };
    
    const insights = competitiveInsights[formData.businessType] || competitiveInsights['service-business'];
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Competitive Analysis - ${businessName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #ff6b35; padding-bottom: 20px; }
        .logo { font-size: 2.5em; margin-bottom: 10px; }
        .title { color: #ff6b35; font-size: 2.2em; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #6c757d; font-size: 1.2em; }
        .section { margin-bottom: 30px; }
        .section-title { color: #ff6b35; font-size: 1.5em; font-weight: bold; margin-bottom: 15px; border-left: 4px solid #ff6b35; padding-left: 15px; }
        .swot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
        .swot-card { background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #e9ecef; }
        .swot-title { font-weight: bold; color: #495057; margin-bottom: 15px; font-size: 1.1em; }
        .swot-list { list-style: none; padding: 0; }
        .swot-list li { margin: 8px 0; padding-left: 20px; position: relative; }
        .swot-list li:before { content: "✓"; color: #28a745; font-weight: bold; position: absolute; left: 0; }
        .swot-list li.threat:before { content: "⚠"; color: #ffc107; }
        .swot-list li.weakness:before { content: "✗"; color: #dc3545; }
        .market-analysis { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .recommendations { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .recommendations-title { color: #155724; font-weight: bold; margin-bottom: 15px; }
        .recommendations-list { list-style: none; padding: 0; }
        .recommendations-list li { margin: 10px 0; padding-left: 20px; position: relative; }
        .recommendations-list li:before { content: "→"; color: #28a745; font-weight: bold; position: absolute; left: 0; }
        .competitive-matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
        .matrix-card { background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; text-align: center; }
        .matrix-title { font-weight: bold; color: #495057; margin-bottom: 10px; }
        .matrix-score { font-size: 2em; font-weight: bold; color: #ff6b35; }
        .highlight-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎯</div>
            <div class="title">Competitive Analysis</div>
            <div class="subtitle">${businessName} - Market Positioning & Strategic Insights</div>
            <div style="margin-top: 20px; color: #6c757d;">Generated by T&H WebWorks | ${new Date().toLocaleDateString()}</div>
        </div>

        <div class="section">
            <div class="section-title">Market Overview</div>
            <p>This competitive analysis provides strategic insights into your market position and identifies key opportunities for differentiation in the ${businessType} industry.</p>
            
            <div class="highlight-box">
                <strong>Key Insight:</strong> ${businessType} businesses that leverage digital tools effectively see <strong>3-5x higher customer engagement</strong> and <strong>40-60% increase in lead generation</strong> compared to traditional approaches.
            </div>
        </div>

        <div class="section">
            <div class="section-title">SWOT Analysis</div>
            <div class="swot-grid">
                <div class="swot-card">
                    <div class="swot-title">💪 Strengths</div>
                    <ul class="swot-list">
                        ${insights.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card">
                    <div class="swot-title">🎯 Opportunities</div>
                    <ul class="swot-list">
                        ${insights.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card">
                    <div class="swot-title">⚠️ Threats</div>
                    <ul class="swot-list">
                        ${insights.threats.map(threat => `<li class="threat">${threat}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card">
                    <div class="swot-title">📊 Market Position</div>
                    <ul class="swot-list">
                        <li>Digital transformation opportunity</li>
                        <li>Customer experience focus</li>
                        <li>Technology adoption gap</li>
                        <li>Local market advantage</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Digital Competitive Matrix</div>
            <div class="competitive-matrix">
                <div class="matrix-card">
                    <div class="matrix-title">Website Quality</div>
                    <div class="matrix-score">8.5/10</div>
                    <div style="font-size: 0.9em; color: #6c757d;">Professional design & functionality</div>
                </div>
                <div class="matrix-card">
                    <div class="matrix-title">SEO Performance</div>
                    <div class="matrix-score">7.8/10</div>
                    <div style="font-size: 0.9em; color: #6c757d;">Optimized for local search</div>
                </div>
                <div class="matrix-card">
                    <div class="matrix-title">User Experience</div>
                    <div class="matrix-score">9.2/10</div>
                    <div style="font-size: 0.9em; color: #6c757d;">Intuitive navigation & design</div>
                </div>
                <div class="matrix-card">
                    <div class="matrix-title">Conversion Rate</div>
                    <div class="matrix-score">8.7/10</div>
                    <div style="font-size: 0.9em; color: #6c757d;">Optimized for lead generation</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Market Analysis</div>
            <div class="market-analysis">
                <h4 style="color: #2196f3; margin-bottom: 15px;">Industry Trends</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 8px 0; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: #2196f3;">→</span>
                        <strong>Digital Transformation:</strong> 73% of businesses are prioritizing digital presence
                    </li>
                    <li style="margin: 8px 0; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: #2196f3;">→</span>
                        <strong>Mobile-First:</strong> 68% of customers research on mobile before contacting
                    </li>
                    <li style="margin: 8px 0; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: #2196f3;">→</span>
                        <strong>Local SEO:</strong> 46% of searches have local intent
                    </li>
                    <li style="margin: 8px 0; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: #2196f3;">→</span>
                        <strong>Customer Experience:</strong> 88% of customers won't return after poor experience
                    </li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Strategic Recommendations</div>
            <div class="recommendations">
                <div class="recommendations-title">Digital Strategy Priorities</div>
                <ul class="recommendations-list">
                    ${insights.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    <li>Implement analytics and tracking systems</li>
                    <li>Develop content marketing strategy</li>
                    <li>Optimize for mobile user experience</li>
                    <li>Build customer review and testimonial system</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Competitive Advantages</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 10px;">🎨</div>
                    <div style="font-weight: bold; color: #495057; margin-bottom: 10px;">Custom Design</div>
                    <div style="color: #6c757d; font-size: 0.9em;">Professional branding that stands out from template-based competitors</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 10px;">⚡</div>
                    <div style="font-weight: bold; color: #495057; margin-bottom: 10px;">Performance</div>
                    <div style="color: #6c757d; font-size: 0.9em;">Fast loading times and optimized user experience</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 10px;">🔍</div>
                    <div style="font-weight: bold; color: #495057; margin-bottom: 10px;">SEO Optimized</div>
                    <div style="color: #6c757d; font-size: 0.9em;">Built for search engines and local visibility</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 10px;">📱</div>
                    <div style="font-weight: bold; color: #495057; margin-bottom: 10px;">Mobile-First</div>
                    <div style="color: #6c757d; font-size: 0.9em;">Responsive design that works on all devices</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #6c757d; font-size: 0.9em;">
            <p>This competitive analysis provides the foundation for strategic digital positioning and market differentiation.</p>
            <p><strong>T&H WebWorks</strong> - Positioning your business for digital success</p>
        </div>
    </div>
</body>
</html>`;
}

function createImplementationRoadmap() {
    const businessName = formData.contactName || 'Your Business';
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    const timeline = formData.timeline || '2-4 weeks';
    
    // Calculate project phases based on complexity
    const totalPages = [...pagesCore, ...pagesEngage, ...pagesTrust].length;
    const totalFeatures = features.length;
    const complexity = totalPages + (totalFeatures * 0.5);
    
    let phaseDuration = '2-3 weeks';
    if (complexity > 15) phaseDuration = '3-4 weeks';
    if (complexity > 25) phaseDuration = '4-6 weeks';
    
    return `# Implementation Roadmap
## ${businessName} - Digital Transformation Journey

Generated by T&H WebWorks | ${new Date().toLocaleDateString()}

---

## 📋 Project Overview

This implementation roadmap outlines the strategic phases for developing your professional website, ensuring a smooth transition from concept to launch.

**Project Complexity:** ${complexity.toFixed(1)}/30 (${complexity > 20 ? 'High' : complexity > 10 ? 'Medium' : 'Low'})
**Estimated Timeline:** ${timeline}
**Total Pages:** ${totalPages}
**Advanced Features:** ${totalFeatures}

---

## 🚀 Phase 1: Discovery & Planning (Week 1)

### Objectives
- Define project scope and requirements
- Establish design direction and branding
- Create technical architecture plan
- Set up project management tools

### Deliverables
- [ ] Detailed project brief
- [ ] Design mood board and wireframes
- [ ] Technical specifications document
- [ ] Content strategy outline
- [ ] SEO keyword research

### Key Activities
- Client consultation and requirements gathering
- Competitive analysis and market research
- Design system development
- Content audit and planning
- Technical stack selection

---

## 🎨 Phase 2: Design & Development (${phaseDuration})

### Objectives
- Create professional, responsive design
- Develop core functionality
- Implement SEO best practices
- Ensure mobile-first approach

### Deliverables
- [ ] Complete website design mockups
- [ ] Responsive HTML/CSS implementation
- [ ] Core functionality development
- [ ] SEO optimization
- [ ] Mobile responsiveness testing

### Key Activities
- Custom design creation
- Frontend development
- Backend functionality implementation
- Content integration
- Performance optimization

---

## 🔧 Phase 3: Advanced Features (${totalFeatures > 5 ? '2-3 weeks' : '1-2 weeks'})

### Objectives
- Implement advanced functionality
- Integrate third-party services
- Set up analytics and tracking
- Configure security measures

### Deliverables
- [ ] Advanced feature implementation
- [ ] Third-party integrations
- [ ] Analytics and tracking setup
- [ ] Security configuration
- [ ] Performance optimization

### Key Activities
${features.map(feature => `- ${feature} implementation`).join('\n')}
- Analytics and tracking setup
- Security hardening
- Performance optimization
- Cross-browser testing

---

## 🧪 Phase 4: Testing & Quality Assurance (1-2 weeks)

### Objectives
- Comprehensive testing across devices
- Performance optimization
- Security validation
- User experience validation

### Deliverables
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness validation
- [ ] Performance optimization
- [ ] Security audit
- [ ] User acceptance testing

### Key Activities
- Functional testing
- Performance testing
- Security testing
- User experience testing
- Accessibility compliance

---

## 🚀 Phase 5: Launch & Deployment (1 week)

### Objectives
- Deploy to production environment
- Configure domain and hosting
- Set up monitoring and backups
- Launch marketing initiatives

### Deliverables
- [ ] Production deployment
- [ ] Domain configuration
- [ ] SSL certificate setup
- [ ] Backup system configuration
- [ ] Launch announcement

### Key Activities
- Server configuration
- Domain setup and DNS
- SSL certificate installation
- Backup system setup
- Launch monitoring

---

## 📈 Phase 6: Post-Launch Optimization (Ongoing)

### Objectives
- Monitor performance and analytics
- Implement user feedback
- Optimize conversion rates
- Maintain and update content

### Deliverables
- [ ] Analytics dashboard setup
- [ ] Performance monitoring
- [ ] Content update schedule
- [ ] Maintenance plan
- [ ] Growth strategy

### Key Activities
- Analytics monitoring
- Performance tracking
- Content updates
- SEO maintenance
- User feedback integration

---

## 🎯 Success Metrics

### Technical Metrics
- Page load speed: < 3 seconds
- Mobile responsiveness: 100%
- SEO score: > 90/100
- Security score: A+ rating

### Business Metrics
- Lead generation increase: 40-60%
- User engagement: 3-5x improvement
- Conversion rate: 15-25% improvement
- Search visibility: 50-70% increase

---

## 📞 Support & Maintenance

### Launch Support (First 30 Days)
- Daily monitoring and support
- Performance optimization
- Bug fixes and adjustments
- User feedback integration

### Ongoing Maintenance
- Monthly performance reviews
- Quarterly SEO updates
- Annual security audits
- Content updates as needed

---

## 💡 Pro Tips

1. **Content First:** Prepare all content before development begins
2. **Mobile Priority:** Design for mobile first, then desktop
3. **SEO Integration:** Build SEO into the development process
4. **Performance Focus:** Optimize for speed from day one
5. **User Testing:** Get feedback early and often

---

*This roadmap is designed to ensure your website launch is successful and positions your business for digital growth.*

**T&H WebWorks** - Your partner in digital transformation`;
}

function createQualityAssurancePlan() {
    const businessName = formData.contactName || 'Your Business';
    const features = formData.features || [];
    const pagesCore = formData.pagesCore || [];
    const pagesEngage = formData.pagesEngage || [];
    const pagesTrust = formData.pagesTrust || [];
    
    const totalPages = [...pagesCore, ...pagesEngage, ...pagesTrust].length;
    const totalFeatures = features.length;
    
    return `# Quality Assurance Plan
## ${businessName} - Professional Standards & Testing Protocol

Generated by T&H WebWorks | ${new Date().toLocaleDateString()}

---

## 🎯 Quality Assurance Overview

This comprehensive QA plan ensures your website meets the highest professional standards for performance, security, accessibility, and user experience.

**Project Scope:** ${totalPages} pages, ${totalFeatures} advanced features
**QA Level:** Professional Grade
**Testing Protocol:** Multi-phase validation

---

## 📋 Phase 1: Functional Testing

### Core Functionality Validation
- [ ] **Navigation Testing**
  - All menu links functional
  - Breadcrumb navigation working
  - Mobile menu responsive
  - Cross-page navigation smooth

- [ ] **Content Validation**
  - All text content properly displayed
  - Images loading correctly
  - Videos and media functioning
  - Contact forms operational

- [ ] **Feature Testing**
${features.map(feature => `  - [ ] ${feature} functionality verified`).join('\n')}
  - [ ] All interactive elements working
  - [ ] Form submissions successful
  - [ ] Error handling implemented

### Browser Compatibility
- [ ] **Desktop Browsers**
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

- [ ] **Mobile Browsers**
  - iOS Safari
  - Chrome Mobile
  - Samsung Internet
  - Firefox Mobile

---

## 📱 Phase 2: Responsive Design Testing

### Device Testing Matrix
- [ ] **Desktop (1920x1080)**
  - Full layout display
  - Navigation functionality
  - Content readability

- [ ] **Tablet (768x1024)**
  - Responsive breakpoints
  - Touch interactions
  - Content scaling

- [ ] **Mobile (375x667)**
  - Mobile-first design
  - Touch-friendly buttons
  - Readable text size

- [ ] **Large Screens (2560x1440)**
  - Content scaling
  - Layout optimization
  - Performance maintained

### Responsive Checklist
- [ ] No horizontal scrolling on mobile
- [ ] Touch targets minimum 44px
- [ ] Text readable without zooming
- [ ] Images scale properly
- [ ] Forms usable on mobile

---

## ⚡ Phase 3: Performance Testing

### Speed Optimization
- [ ] **Page Load Times**
  - Homepage: < 3 seconds
  - Internal pages: < 2 seconds
  - Image optimization: WebP format
  - CSS/JS minification

- [ ] **Core Web Vitals**
  - Largest Contentful Paint: < 2.5s
  - First Input Delay: < 100ms
  - Cumulative Layout Shift: < 0.1

- [ ] **Performance Metrics**
  - Google PageSpeed Score: > 90
  - GTmetrix Grade: A
  - Pingdom Speed Test: < 2s

### Optimization Checklist
- [ ] Images optimized and compressed
- [ ] CSS and JavaScript minified
- [ ] Gzip compression enabled
- [ ] Browser caching configured
- [ ] CDN implementation (if applicable)

---

## 🔒 Phase 4: Security Testing

### Security Validation
- [ ] **SSL Certificate**
  - HTTPS enabled
  - Valid SSL certificate
  - Mixed content resolved
  - Security headers configured

- [ ] **Form Security**
  - CSRF protection implemented
  - Input validation active
  - SQL injection prevention
  - XSS protection enabled

- [ ] **Security Headers**
  - Content Security Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security

### Security Checklist
- [ ] All forms have CSRF tokens
- [ ] Input fields properly validated
- [ ] Error messages don't expose system info
- [ ] Admin areas protected
- [ ] Regular security updates scheduled

---

## ♿ Phase 5: Accessibility Testing

### WCAG 2.1 Compliance
- [ ] **Perceivable**
  - Alt text for all images
  - Color contrast ratio > 4.5:1
  - Text resizable up to 200%
  - Audio/video alternatives

- [ ] **Operable**
  - Keyboard navigation possible
  - No keyboard traps
  - Sufficient time for tasks
  - No auto-playing content

- [ ] **Understandable**
  - Clear navigation structure
  - Consistent design patterns
  - Error identification
  - Help and documentation

- [ ] **Robust**
  - Compatible with assistive technology
  - Valid HTML markup
  - ARIA labels where needed
  - Screen reader friendly

### Accessibility Checklist
- [ ] All images have alt text
- [ ] Color is not the only way to convey information
- [ ] Focus indicators visible
- [ ] Headings properly structured
- [ ] Form labels associated with inputs

---

## 🔍 Phase 6: SEO Testing

### Search Engine Optimization
- [ ] **Technical SEO**
  - XML sitemap generated
  - Robots.txt configured
  - Meta tags implemented
  - Schema markup added

- [ ] **On-Page SEO**
  - Title tags optimized
  - Meta descriptions written
  - Header tags structured
  - Internal linking strategy

- [ ] **Performance SEO**
  - Mobile-friendly design
  - Fast loading times
  - Core Web Vitals optimized
  - HTTPS implementation

### SEO Checklist
- [ ] Each page has unique title and meta description
- [ ] Header tags (H1, H2, H3) properly used
- [ ] Images have descriptive alt text
- [ ] Internal links are descriptive
- [ ] URL structure is clean and logical

---

## 🧪 Phase 7: User Experience Testing

### UX Validation
- [ ] **User Flow Testing**
  - Clear call-to-action buttons
  - Logical information architecture
  - Intuitive navigation
  - Conversion path optimization

- [ ] **Content Testing**
  - Readable typography
  - Appropriate content hierarchy
  - Engaging visual design
  - Clear value proposition

- [ ] **Interaction Testing**
  - Smooth animations
  - Responsive feedback
  - Error handling
  - Success confirmations

### UX Checklist
- [ ] Users can complete main tasks easily
- [ ] Information is easy to find
- [ ] Design is visually appealing
- [ ] Branding is consistent
- [ ] User feedback is positive

---

## 📊 Phase 8: Analytics & Tracking

### Implementation Validation
- [ ] **Google Analytics**
  - Tracking code installed
  - Goals configured
  - E-commerce tracking (if applicable)
  - Event tracking set up

- [ ] **Conversion Tracking**
  - Form submissions tracked
  - Phone calls tracked
  - Email clicks tracked
  - Social media engagement

- [ ] **Performance Monitoring**
  - Real User Monitoring (RUM)
  - Error tracking
  - Uptime monitoring
  - Speed monitoring

### Analytics Checklist
- [ ] Google Analytics properly installed
- [ ] Goals and conversions configured
- [ ] Privacy policy updated
- [ ] Cookie consent implemented
- [ ] Data accuracy verified

---

## ✅ Final Quality Assurance Sign-off

### Pre-Launch Checklist
- [ ] All functional tests passed
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Accessibility compliance verified
- [ ] SEO optimization finished
- [ ] User experience validated
- [ ] Analytics tracking confirmed

### Launch Readiness
- [ ] **Technical Readiness**
  - All tests completed successfully
  - Performance optimized
  - Security hardened
  - Backup systems in place

- [ ] **Content Readiness**
  - All content reviewed and approved
  - Images optimized
  - Links tested
  - Contact information verified

- [ ] **Business Readiness**
  - Stakeholder approval received
  - Launch plan prepared
  - Support team briefed
  - Monitoring systems active

---

## 📈 Post-Launch Quality Monitoring

### Ongoing QA Schedule
- **Weekly:** Performance monitoring and analytics review
- **Monthly:** Security updates and accessibility checks
- **Quarterly:** Comprehensive SEO audit and UX review
- **Annually:** Full security audit and performance optimization

### Quality Metrics
- Page load speed maintained < 3 seconds
- 99.9% uptime achieved
- Zero security vulnerabilities
- WCAG 2.1 AA compliance maintained
- Google PageSpeed score > 90

---

*This QA plan ensures your website meets professional standards and provides an excellent user experience.*

**T&H WebWorks** - Delivering quality that exceeds expectations`;
}

function createMaintenancePlan() {
    const businessName = formData.contactName || 'Your Business';
    const features = formData.features || [];
    
    return `# Website Maintenance Plan
## ${businessName} - Ongoing Success & Growth Strategy

Generated by T&H WebWorks | ${new Date().toLocaleDateString()}

---

## 🎯 Maintenance Overview

This comprehensive maintenance plan ensures your website continues to perform optimally, remains secure, and grows with your business needs.

**Maintenance Level:** Professional Grade
**Update Frequency:** Proactive & Continuous
**Support Coverage:** 24/7 Monitoring

---

## 📅 Monthly Maintenance Schedule

### Week 1: Performance & Analytics Review
- [ ] **Performance Monitoring**
  - Page load speed analysis
  - Core Web Vitals review
  - Server response time check
  - CDN performance optimization

- [ ] **Analytics Review**
  - Traffic pattern analysis
  - Conversion rate optimization
  - User behavior insights
  - Goal completion tracking

- [ ] **Security Updates**
  - WordPress core updates (if applicable)
  - Plugin security patches
  - SSL certificate validation
  - Security scan execution

### Week 2: Content & SEO Optimization
- [ ] **Content Updates**
  - Fresh content creation
  - Blog post optimization
  - Image optimization
  - Meta description updates

- [ ] **SEO Maintenance**
  - Keyword performance review
  - Backlink analysis
  - Technical SEO audit
  - Local SEO optimization

- [ ] **User Experience**
  - Navigation optimization
  - Call-to-action testing
  - Form performance review
  - Mobile experience check

### Week 3: Technical Maintenance
- [ ] **Backup & Recovery**
  - Full site backup
  - Database backup
  - File system backup
  - Recovery testing

- [ ] **Database Optimization**
  - Database cleanup
  - Query optimization
  - Cache management
  - Performance tuning

- [ ] **Security Hardening**
  - Firewall rule updates
  - Malware scanning
  - Vulnerability assessment
  - Access log review

### Week 4: Growth & Optimization
- [ ] **Feature Enhancements**
  - New functionality implementation
  - User feedback integration
  - A/B testing analysis
  - Conversion optimization

- [ ] **Marketing Integration**
  - Social media updates
  - Email marketing optimization
  - PPC landing page review
  - Lead generation analysis

---

## 🔧 Quarterly Deep Maintenance

### Q1: Comprehensive Security Audit
- [ ] **Security Assessment**
  - Penetration testing
  - Vulnerability scanning
  - Access control review
  - Security policy updates

- [ ] **Performance Optimization**
  - Code optimization
  - Image compression
  - Caching strategy review
  - CDN optimization

### Q2: SEO & Content Strategy
- [ ] **SEO Audit**
  - Technical SEO review
  - Content gap analysis
  - Competitor analysis
  - Local SEO optimization

- [ ] **Content Strategy**
  - Content calendar planning
  - Keyword research update
  - Content performance analysis
  - User engagement review

### Q3: User Experience Enhancement
- [ ] **UX Analysis**
  - User journey mapping
  - Conversion funnel analysis
  - A/B testing implementation
  - User feedback integration

- [ ] **Feature Development**
  - New feature planning
  - User request implementation
  - Technology stack updates
  - Integration enhancements

### Q4: Annual Review & Planning
- [ ] **Annual Assessment**
  - Year-over-year performance
  - Goal achievement review
  - ROI analysis
  - Strategic planning

- [ ] **Technology Updates**
  - Platform updates
  - Security enhancements
  - Performance improvements
  - Feature roadmap planning

---

## 🛡️ Security Maintenance

### Daily Security Monitoring
- [ ] **Automated Scans**
  - Malware detection
  - Vulnerability scanning
  - File integrity monitoring
  - Access log analysis

### Weekly Security Tasks
- [ ] **Security Updates**
  - Software updates
  - Plugin updates
  - Security patch application
  - Backup verification

### Monthly Security Review
- [ ] **Security Assessment**
  - Security audit
  - Access control review
  - SSL certificate check
  - Security policy updates

---

## 📊 Performance Monitoring

### Real-Time Monitoring
- [ ] **Uptime Monitoring**
  - 99.9% uptime target
  - Response time tracking
  - Error rate monitoring
  - Performance alerts

### Weekly Performance Review
- [ ] **Performance Metrics**
  - Page load speed
  - Core Web Vitals
  - Server response time
  - User experience metrics

### Monthly Optimization
- [ ] **Performance Enhancement**
  - Code optimization
  - Image compression
  - Caching improvements
  - CDN optimization

---

## 📈 Analytics & Reporting

### Weekly Analytics Review
- [ ] **Traffic Analysis**
  - Visitor statistics
  - Traffic sources
  - Page performance
  - User behavior

### Monthly Performance Report
- [ ] **Comprehensive Report**
  - Traffic growth
  - Conversion rates
  - SEO performance
  - User engagement

### Quarterly Strategy Review
- [ ] **Strategic Analysis**
  - Goal achievement
  - ROI analysis
  - Competitive analysis
  - Growth opportunities

---

## 🔄 Content Management

### Weekly Content Tasks
- [ ] **Content Updates**
  - Blog post creation
  - Image optimization
  - Meta description updates
  - Social media content

### Monthly Content Strategy
- [ ] **Content Planning**
  - Content calendar
  - Keyword research
  - Topic planning
  - Content performance review

### Quarterly Content Audit
- [ ] **Content Optimization**
  - Content gap analysis
  - Performance review
  - SEO optimization
  - User engagement analysis

---

## 🚀 Feature Enhancement

### Monthly Feature Review
- [ ] **Feature Analysis**
  - User feedback review
  - Performance analysis
  - Enhancement planning
  - Implementation scheduling

### Quarterly Feature Development
- [ ] **Feature Implementation**
  - New feature development
  - User request fulfillment
  - Technology updates
  - Integration enhancements

---

## 📞 Support & Communication

### Support Response Times
- **Critical Issues:** 2 hours
- **High Priority:** 4 hours
- **Medium Priority:** 24 hours
- **Low Priority:** 48 hours

### Communication Channels
- [ ] **Support Channels**
  - Email support
  - Phone support
  - Live chat (if applicable)
  - Emergency contact

### Reporting Schedule
- **Weekly:** Performance summary
- **Monthly:** Comprehensive report
- **Quarterly:** Strategic review
- **Annually:** Full assessment

---

## 💰 Maintenance Investment

### Monthly Maintenance Value
- **Performance Optimization:** $500/month value
- **Security Protection:** $300/month value
- **SEO Maintenance:** $400/month value
- **Content Updates:** $600/month value
- **Technical Support:** $400/month value

**Total Monthly Value:** $2,200
**ROI:** 300-500% return on maintenance investment

---

## 🎯 Success Metrics

### Performance Targets
- **Uptime:** 99.9%
- **Page Load Speed:** < 3 seconds
- **Security Score:** A+ rating
- **SEO Score:** > 90/100

### Business Impact
- **Traffic Growth:** 25-40% annually
- **Conversion Rate:** 15-25% improvement
- **Lead Generation:** 40-60% increase
- **Customer Engagement:** 3-5x improvement

---

*This maintenance plan ensures your website remains a powerful business asset that grows with your success.*

**T&H WebWorks** - Your partner in ongoing digital success`;
}

function createSuccessMetrics() {
    const businessName = formData.contactName || 'Your Business';
    const businessType = formData.businessType ? formData.businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Business';
    const goals = formData.goals || [];
    const features = formData.features || [];
    
    return `# Success Metrics & KPIs
## ${businessName} - Measurable Digital Success

Generated by T&H WebWorks | ${new Date().toLocaleDateString()}

---

## 🎯 Success Overview

This comprehensive success metrics framework provides clear, measurable outcomes to track your website's performance and business impact.

**Business Type:** ${businessType}
**Primary Goals:** ${goals.join(', ')}
**Advanced Features:** ${features.length} features

---

## 📊 Key Performance Indicators (KPIs)

### Traffic & Visibility Metrics
- [ ] **Organic Traffic Growth**
  - Target: 40-60% increase in 6 months
  - Measurement: Google Analytics organic sessions
  - Frequency: Monthly review
  - Benchmark: Industry average + 25%

- [ ] **Search Engine Rankings**
  - Target: Top 3 positions for primary keywords
  - Measurement: Google Search Console
  - Frequency: Weekly monitoring
  - Benchmark: Page 1 rankings

- [ ] **Local Search Visibility**
  - Target: Top 5 local search results
  - Measurement: Google My Business insights
  - Frequency: Monthly review
  - Benchmark: Local market leadership

### Engagement & User Experience
- [ ] **Page Load Speed**
  - Target: < 3 seconds
  - Measurement: Google PageSpeed Insights
  - Frequency: Weekly monitoring
  - Benchmark: Industry standard

- [ ] **Mobile Usability**
  - Target: 100% mobile-friendly score
  - Measurement: Google Mobile-Friendly Test
  - Frequency: Monthly review
  - Benchmark: Mobile-first standard

- [ ] **User Engagement**
  - Target: 3-5x increase in engagement
  - Measurement: Time on site, pages per session
  - Frequency: Weekly analysis
  - Benchmark: Industry average + 50%

### Conversion & Business Impact
- [ ] **Lead Generation**
  - Target: 40-60% increase in qualified leads
  - Measurement: Form submissions, phone calls
  - Frequency: Weekly tracking
  - Benchmark: Pre-launch baseline

- [ ] **Conversion Rate**
  - Target: 15-25% improvement
  - Measurement: Goal completion rate
  - Frequency: Monthly analysis
  - Benchmark: Industry average

- [ ] **Revenue Impact**
  - Target: 25-35% revenue growth
  - Measurement: Sales attribution
  - Frequency: Monthly review
  - Benchmark: Digital transformation ROI

---

## 🎯 Goal-Specific Metrics

### Lead Generation Goals
${goals.includes('Generate Leads') ? `
- [ ] **Contact Form Submissions**
  - Target: 50+ submissions/month
  - Measurement: Form completion tracking
  - Success Rate: > 80% completion

- [ ] **Phone Call Tracking**
  - Target: 30+ calls/month
  - Measurement: Call tracking system
  - Quality Score: Qualified leads

- [ ] **Email Newsletter Signups**
  - Target: 100+ subscribers/month
  - Measurement: Email list growth
  - Engagement Rate: > 25% open rate
` : ''}

### E-commerce Goals
${goals.includes('Sell Products') ? `
- [ ] **Online Sales**
  - Target: $10,000+ monthly revenue
  - Measurement: E-commerce tracking
  - Conversion Rate: > 2%

- [ ] **Shopping Cart Abandonment**
  - Target: < 60% abandonment rate
  - Measurement: Cart tracking
  - Recovery Rate: > 15%

- [ ] **Average Order Value**
  - Target: $150+ per order
  - Measurement: Transaction tracking
  - Growth Rate: 10% monthly
` : ''}

### Brand Awareness Goals
${goals.includes('Build Brand') ? `
- [ ] **Social Media Engagement**
  - Target: 500+ monthly interactions
  - Measurement: Social media analytics
  - Growth Rate: 20% monthly

- [ ] **Brand Mentions**
  - Target: 50+ monthly mentions
  - Measurement: Brand monitoring tools
  - Sentiment Score: > 80% positive

- [ ] **Direct Traffic**
  - Target: 30% of total traffic
  - Measurement: Google Analytics
  - Brand Recognition: 60% increase
` : ''}

---

## 📈 Monthly Success Dashboard

### Week 1: Traffic & Visibility
- [ ] **Organic Traffic Report**
  - Sessions: Target vs Actual
  - Growth Rate: Month-over-month
  - Top Performing Pages
  - Keyword Rankings

- [ ] **Search Performance**
  - Click-through rates
  - Impressions
  - Average position
  - Featured snippets

### Week 2: Engagement & Experience
- [ ] **User Behavior Analysis**
  - Time on site
  - Pages per session
  - Bounce rate
  - Exit pages

- [ ] **Performance Metrics**
  - Page load speed
  - Core Web Vitals
  - Mobile usability
  - Technical SEO score

### Week 3: Conversion & Leads
- [ ] **Lead Generation Report**
  - Form submissions
  - Phone calls
  - Email signups
  - Lead quality score

- [ ] **Conversion Analysis**
  - Goal completion rates
  - Funnel analysis
  - A/B test results
  - ROI calculation

### Week 4: Business Impact
- [ ] **Revenue Impact**
  - Sales attribution
  - Customer acquisition cost
  - Lifetime value
  - ROI analysis

- [ ] **Competitive Analysis**
  - Market position
  - Competitor performance
  - Industry benchmarks
  - Growth opportunities

---

## 🎯 Quarterly Success Review

### Q1: Foundation & Launch
- [ ] **Launch Success Metrics**
  - Website performance
  - Initial traffic growth
  - User feedback
  - Technical optimization

### Q2: Growth & Optimization
- [ ] **Growth Analysis**
  - Traffic expansion
  - Engagement improvement
  - Conversion optimization
  - SEO progress

### Q3: Scale & Expansion
- [ ] **Scaling Metrics**
  - Traffic scaling
  - Lead generation growth
  - Revenue expansion
  - Market penetration

### Q4: Annual Assessment
- [ ] **Annual Review**
  - Goal achievement
  - ROI analysis
  - Competitive position
  - Strategic planning

---

## 📊 Success Measurement Tools

### Analytics Platforms
- [ ] **Google Analytics 4**
  - Traffic analysis
  - User behavior
  - Conversion tracking
  - Goal measurement

- [ ] **Google Search Console**
  - Search performance
  - Indexing status
  - Technical issues
  - Mobile usability

- [ ] **Google PageSpeed Insights**
  - Performance metrics
  - Core Web Vitals
  - Optimization opportunities
  - Mobile experience

### Conversion Tracking
- [ ] **Form Analytics**
  - Submission tracking
  - Completion rates
  - Field analysis
  - A/B testing

- [ ] **Call Tracking**
  - Phone call attribution
  - Call quality scoring
  - ROI measurement
  - Campaign tracking

### SEO Monitoring
- [ ] **Ranking Tracking**
  - Keyword positions
  - SERP features
  - Competitor analysis
  - Local search

---

## 🎯 Success Benchmarks

### Industry Standards
- **Bounce Rate:** < 40%
- **Page Load Speed:** < 3 seconds
- **Mobile Usability:** 100%
- **SEO Score:** > 90/100
- **Conversion Rate:** > 2%

### Business Impact Targets
- **Traffic Growth:** 40-60% annually
- **Lead Generation:** 50-100% increase
- **Revenue Growth:** 25-35% annually
- **Customer Engagement:** 3-5x improvement
- **Brand Recognition:** 60% increase

---

## 📈 Success Reporting

### Weekly Reports
- Traffic summary
- Performance metrics
- Conversion highlights
- Action items

### Monthly Reports
- Comprehensive analysis
- Goal progress
- ROI calculation
- Strategic recommendations

### Quarterly Reviews
- Deep performance analysis
- Competitive assessment
- Strategic planning
- Goal adjustment

---

*These success metrics provide clear, measurable outcomes to track your digital transformation success.*

**T&H WebWorks** - Measuring success, delivering results`;
}