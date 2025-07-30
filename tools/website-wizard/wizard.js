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
    console.log('selectRadioOption called with:', name, value);
    formData[name] = value;
    console.log('formData after update:', formData);
    console.log('window.formData after update:', window.formData);
    
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
        // Remove from array
        formData[name] = formData[name].filter(v => v !== value);
        checkbox.checked = false;
        optionDiv.classList.remove('selected');
    } else {
        // Add to array
        formData[name].push(value);
        checkbox.checked = true;
        optionDiv.classList.add('selected');
    }
    
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
        if (idx === 8) { // Step 9 (index 8)
            populateSummary();
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
    if (!summaryContent) return;
    
    let summary = '';
    
    if (formData.businessType) {
        summary += `<div><strong>Business Type:</strong> ${formData.businessType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>`;
    }
    
    if (formData.goals && formData.goals.length > 0) {
        summary += `<div><strong>Goals:</strong> ${formData.goals.join(', ')}</div>`;
    }
    
    if (formData.pagesCore && formData.pagesCore.length > 0) {
        summary += `<div><strong>Core Pages:</strong> ${formData.pagesCore.join(', ')}</div>`;
    }
    
    if (formData.features && formData.features.length > 0) {
        summary += `<div><strong>Features:</strong> ${formData.features.join(', ')}</div>`;
    }
    
    if (formData.designStyle) {
        summary += `<div><strong>Design Style:</strong> ${formData.designStyle}</div>`;
    }
    
    if (formData.primaryColor) {
        summary += `<div><strong>Primary Color:</strong> <span style="color: ${formData.primaryColor}">${formData.primaryColor}</span></div>`;
    }
    
    if (formData.budget) {
        summary += `<div><strong>Budget:</strong> ${formData.budget}</div>`;
    }
    
    if (formData.timeline) {
        summary += `<div><strong>Timeline:</strong> ${formData.timeline}</div>`;
    }
    
    summaryContent.innerHTML = summary || '<div class="text-text-muted">No data available</div>';
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
    // Clear any existing data to start fresh
    localStorage.removeItem('consultationWizardData');
    
    // Initialize form data
    initializeFormData();
    
    // Load saved data if exists
    const savedData = localStorage.getItem('consultationWizardData');
    if (savedData) {
        try {
            const loadedData = JSON.parse(savedData);
            formData = { ...formData, ...loadedData };
            
            // Clear business type to prevent pre-selection
            formData.businessType = '';
            
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
            formData[name] = value;
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
        
        // Backend endpoint configuration
        const BACKEND_URL = window.BACKEND_URL || 'http://localhost:3001';
        
        // Submit to backend endpoint
        const response = await fetch(`${BACKEND_URL}/create-package`, {
            method: 'POST',
            body: submissionData
        });

        if (response.ok) {
            const result = await response.json();
            
            // Add completion celebration
            addCompletionCelebration();
            
            // Show success message with download link if provided
            showSubmissionSuccess(result);
            
            console.log('Form submitted successfully:', result);
        } else {
            throw new Error(`Submission failed: ${response.status}`);
        }
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
    if (result.downloadUrl) {
        downloadSection = `
            <div class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p class="text-green-400 font-medium mb-3">Your handoff package is ready!</p>
                <a href="${result.downloadUrl}" 
                   class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    <i class="fas fa-download mr-2"></i>Download Package
                </a>
            </div>
        `;
    }
    
    successDiv.innerHTML = `
        <div class="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-white mb-4">Consultation Submitted!</h3>
            <p class="text-gray-300 mb-6">Your consultation has been submitted successfully and a handoff package has been created for our development team.</p>
            ${downloadSection}
            <div class="mt-6">
                <p class="text-sm text-gray-400 mb-4">We'll get back to you within 24 hours with a custom proposal.</p>
                <button onclick="location.reload()" 
                        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Start New Consultation
                </button>
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

// Global file upload functions
window.triggerFileSelect = function() {
    console.log('🚀 triggerFileSelect called');
    const input = document.getElementById('assetUpload');
    if (input) {
        input.click();
    } else {
        console.error('❌ File input not found!');
    }
};

window.handleFileSelect = function(files) {
    console.log('📂 handleFileSelect called with', files.length, 'files');
    if (files.length > 0) {
        showUploadFeedback(files.length);
        showSimpleFileList(files);
        handleFiles(files);
    }
};

window.handleDragOver = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('🔥 Drag over detected');
    const uploadArea = event.currentTarget;
    uploadArea.style.borderColor = '#3abbfa';
    uploadArea.style.backgroundColor = 'rgba(58, 187, 250, 0.1)';
};

window.handleDragLeave = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('👋 Drag leave detected');
    const uploadArea = event.currentTarget;
    uploadArea.style.borderColor = '';
    uploadArea.style.backgroundColor = '';
};

window.handleDrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('📂 Drop detected with', event.dataTransfer.files.length, 'files');
    
    const uploadArea = event.currentTarget;
    uploadArea.style.borderColor = '';
    uploadArea.style.backgroundColor = '';
    
    if (event.dataTransfer.files.length > 0) {
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
};

function showUploadFeedback(count) {
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        // Flash green border to show files were selected
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        
        // Reset after a moment
        setTimeout(() => {
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
        }, 1000);
    }
    
    // Show a temporary message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    message.innerHTML = `<i class="fas fa-check mr-2"></i>Processing ${count} file${count > 1 ? 's' : ''}...`;
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

function showSimpleFileList(files) {
    // Create a simple test display to prove files are being received
    let testDiv = document.getElementById('testFileDisplay');
    if (!testDiv) {
        testDiv = document.createElement('div');
        testDiv.id = 'testFileDisplay';
        testDiv.className = 'bg-green-900 border border-green-600 rounded-lg p-4 mb-4';
        
        // Insert after upload area
        const uploadArea = document.querySelector('.upload-area');
        if (uploadArea) {
            uploadArea.parentNode.insertBefore(testDiv, uploadArea.nextSibling);
        }
    }
    
    testDiv.innerHTML = `
        <h4 class="text-green-400 font-bold mb-2">🎉 Files Selected Successfully!</h4>
        ${Array.from(files).map(file => `
            <div class="text-sm text-white mb-1">
                📁 ${file.name} (${formatFileSize(file.size)})
            </div>
        `).join('')}
        <p class="text-xs text-green-300 mt-2">Processing for full display...</p>
    `;
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
        image: { count: 0, element: 'imageCount' },
        document: { count: 0, element: 'documentCount' },
        design: { count: 0, element: 'designCount' },
        video: { count: 0, element: 'videoCount' }
    };

    uploadedFiles.forEach(file => {
        const category = getFileCategory(file);
        if (categories[category]) {
            categories[category].count++;
        } else {
            categories.video.count++; // Default to video/other
        }
    });

    Object.values(categories).forEach(cat => {
        const element = document.getElementById(cat.element);
        if (element) element.textContent = cat.count;
    });
}

function displayFilesByCategory() {
    const categories = {
        image: { files: [], container: 'imageFiles', grid: 'imageGrid', counter: 'imageCounter' },
        document: { files: [], container: 'documentFiles', list: 'documentList', counter: 'documentCounter' },
        design: { files: [], container: 'designFiles', list: 'designList', counter: 'designCounter' },
        other: { files: [], container: 'otherFiles', list: 'otherList', counter: 'otherCounter' }
    };

    // Categorize files
    uploadedFiles.forEach(file => {
        const category = getFileCategory(file);
        if (categories[category]) {
            categories[category].files.push(file);
        } else {
            categories.other.files.push(file);
        }
    });

    // Display each category
    Object.entries(categories).forEach(([categoryName, category]) => {
        const container = document.getElementById(category.container);
        const counter = document.getElementById(category.counter);
        
        if (category.files.length > 0) {
            container?.classList.remove('hidden');
            if (counter) counter.textContent = category.files.length;
            
            if (categoryName === 'image') {
                displayImageFiles(category.files, category.grid);
            } else {
                displayListFiles(category.files, category.list);
            }
        } else {
            container?.classList.add('hidden');
        }
    });
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