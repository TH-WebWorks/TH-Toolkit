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
        designStyle: '',
        primaryColor: '#3abbfa',
        secondaryColor: '#f39c12',
        contactName: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '',
        additionalNotes: '',
        exampleSites: '',
        sendEmailCopy: true
    };
    
    // Update local reference
    formData = window.formData;
    
    // Ensure all array fields are properly initialized
    const arrayFields = ['goals', 'pagesCore', 'pagesTrust', 'pagesEngage', 'pagesCommerce', 'features'];
    arrayFields.forEach(field => {
        if (!Array.isArray(formData[field])) {
            formData[field] = [];
        }
    });
    
    console.log('Form data initialized:', formData);
}

// Reset wizard state
function resetWizard() {
    window.formData = {};
    formData = window.formData;
    currentStep = 0;
    previewEnabled = false;
    initializeFormData();
    renderStep(currentStep);
    updatePreviewVisibility();
    // Reset progress bar and label
    document.getElementById('progressStep').textContent = 1;
    document.getElementById('progressTotal').textContent = wizardSteps.length;
    document.getElementById('progressLabel').textContent = wizardSteps[0].title || 'Welcome';
    document.getElementById('progressBar').style.width = `${(1/wizardSteps.length)*100}%`;
}

// Update preview visibility based on current step
function updatePreviewVisibility() {
    const previewPanel = document.getElementById('previewPanel');
    if (previewPanel) {
        // Only show preview from step 2 onwards (index 1+)
        if (currentStep >= 1) {
            previewPanel.style.display = 'block';
            previewPanel.classList.remove('hidden');
        } else {
            previewPanel.style.display = 'none';
            previewPanel.classList.add('hidden');
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
            const optionDiv = option.closest('.input-option');
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
    if (checkbox.checked) {
        // Uncheck
        checkbox.checked = false;
        optionDiv.classList.remove('selected');
        formData[name] = formData[name].filter(v => v !== value);
    } else {
        // Check
        checkbox.checked = true;
        optionDiv.classList.add('selected');
        formData[name].push(value);
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
        'summary'
    ];
    return slugs[idx] || 'welcome';
}

function populateFormData() {
    // Populate form fields with existing data
    Object.keys(formData).forEach(key => {
        const element = document.querySelector(`[name="${key}"]`);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = formData[key] === true || (Array.isArray(formData[key]) && formData[key].includes(element.value));
            } else if (element.type === 'radio') {
                element.checked = formData[key] === element.value;
            } else {
                element.value = formData[key] || '';
            }
            
            // Update visual state for input options
            const optionDiv = element.closest('.input-option');
            if (optionDiv) {
                if (element.checked || (element.type === 'radio' && formData[key] === element.value)) {
                    optionDiv.classList.add('selected');
                } else {
                    optionDiv.classList.remove('selected');
                }
            }
        }
    });
    
    // Update color previews
    updateColorPreviews();
}

function updateColorPreviews() {
    const primaryPreview = document.getElementById('primaryColorPreview');
    const secondaryPreview = document.getElementById('secondaryColorPreview');
    
    if (primaryPreview && formData.primaryColor) {
        primaryPreview.style.backgroundColor = formData.primaryColor;
    }
    if (secondaryPreview && formData.secondaryColor) {
        secondaryPreview.style.backgroundColor = formData.secondaryColor;
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
        if (target.closest('.input-option') && target.closest('.input-option').querySelector('input[type="radio"]')) {
            const optionDiv = target.closest('.input-option');
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
            
            toggleCheckboxOption(name, value);
            saveFormData();
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
function submitForm() {
    // Validate final step
    if (!validateStep(currentStep)) {
        alert('Please complete all required fields before submitting.');
        return;
    }
    
    // Add completion celebration
    addCompletionCelebration();
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', formData);
    
    // Clear saved data
    localStorage.removeItem('consultationWizardData');
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
    summary += `Additional Notes: ${formData.additionalNotes}\n`;
    
    return summary;
}

// Export functions for use in other modules
window.wizardFunctions = {
    goToStep,
    nextStep,
    prevStep,
    selectRadioOption,
    toggleCheckboxOption,
    submitForm,
    downloadSummary
}; 