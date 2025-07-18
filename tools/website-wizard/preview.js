// === PREVIEW RENDERING SYSTEM ===
// Handles dynamic preview updates only

// === PREVIEW UPDATE SYSTEM ===
// Make updatePreview globally accessible
window.updatePreview = function() {
    console.log('updatePreview called');
    // Get formData from the global scope
    const formData = window.formData || {};
    const businessType = formData.businessType;
    console.log('Business type:', businessType);
    console.log('Full formData:', formData);
    if (!businessType) {
        console.log('No business type, showing default preview');
        showDefaultPreview();
        return;
    }
    
    console.log('About to render preview for business type:', businessType);
    console.log('Available render functions:', {
        renderServiceBusinessPreview: typeof renderServiceBusinessPreview,
        renderTradesPreview: typeof renderTradesPreview,
        renderConsultingPreview: typeof renderConsultingPreview,
        renderEducationPreview: typeof renderEducationPreview,
        renderRealEstatePreview: typeof renderRealEstatePreview,
        renderOtherPreview: typeof renderOtherPreview
    });
    
    // Update preview based on business type
    switch (businessType) {
        case 'service-business':
            if (typeof renderServiceBusinessPreview === 'function') {
                renderServiceBusinessPreview(formData);
            } else {
                console.error('renderServiceBusinessPreview function not found');
                showDefaultPreview();
            }
            break;
        case 'trades':
            if (typeof renderTradesPreview === 'function') {
                renderTradesPreview(formData);
            } else {
                console.error('renderTradesPreview function not found');
                showDefaultPreview();
            }
            break;
        case 'consulting':
            if (typeof renderConsultingPreview === 'function') {
                renderConsultingPreview(formData);
            } else {
                console.error('renderConsultingPreview function not found');
                showDefaultPreview();
            }
            break;
        case 'education':
            if (typeof renderEducationPreview === 'function') {
                renderEducationPreview(formData);
            } else {
                console.error('renderEducationPreview function not found');
                showDefaultPreview();
            }
            break;
        case 'real-estate-agency':
            if (typeof renderRealEstatePreview === 'function') {
                renderRealEstatePreview(formData);
            } else {
                console.error('renderRealEstatePreview function not found');
                showDefaultPreview();
            }
            break;
        default:
            if (typeof renderOtherPreview === 'function') {
                renderOtherPreview(formData);
            } else {
                console.error('renderOtherPreview function not found');
                showDefaultPreview();
            }
            break;
    }
    
    // Update preview details
    updatePreviewDetails();
};

function showDefaultPreview() {
    const previewContent = document.querySelector('.preview-content');
    if (previewContent) {
        previewContent.innerHTML = `
            <div class="preview-placeholder">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎨</div>
                    <div class="text-lg font-medium">Start building your site</div>
                    <div class="text-sm text-gray-500 mt-2">Select your business type to begin</div>
                </div>
            </div>
        `;
    }
}

function updatePreviewDetails() {
    const previewDetails = document.getElementById('previewDetails');
    if (!previewDetails) return;
    
    // Get formData from the global scope
    const formData = window.formData || {};
    
    let details = [];
    
    if (formData.businessType) {
        details.push(`<strong>Business Type:</strong> ${formData.businessType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
    }
    
    if (formData.goals && formData.goals.length > 0) {
        details.push(`<strong>Goals:</strong> ${formData.goals.join(', ')}`);
    }
    
    if (formData.designStyle) {
        details.push(`<strong>Design Style:</strong> ${formData.designStyle}`);
    }
    
    if (formData.primaryColor) {
        details.push(`<strong>Primary Color:</strong> <span style="color: ${formData.primaryColor}">${formData.primaryColor}</span>`);
    }
    
    if (formData.features && formData.features.length > 0) {
        details.push(`<strong>Features:</strong> ${formData.features.slice(0, 3).join(', ')}${formData.features.length > 3 ? '...' : ''}`);
    }
    
    previewDetails.innerHTML = details.map(detail => `<p>${detail}</p>`).join('');
}

// === UTILITY FUNCTIONS ===
function generateSummaryHTML() {
    // Get formData from the global scope
    const formData = window.formData || {};
    
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
    
    return summary;
}

// === IMMEDIATE VISUAL CHANGES ===
function handleImmediateVisualChanges(change) {
    const { name, value } = change;
    
    // Handle specific field changes
    if (name === 'businessType') {
        // Business type changed - update preview immediately
        setTimeout(() => updatePreview(), 100);
    } else if (name === 'designStyle') {
        // Design style changed - update preview styling
        applyDesignStyleImmediately(value);
    } else if (name === 'primaryColor' || name === 'secondaryColor') {
        // Color changed - update preview colors
        updateColorsImmediately(name, value);
    }
}

function applyDesignStyleImmediately(style) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    // Apply design style changes to preview
    switch (style) {
        case 'Modern & Clean':
            previewContent.style.fontFamily = "'Inter', sans-serif";
            break;
        case 'Bold & Creative':
            previewContent.style.fontWeight = 'bold';
            break;
        case 'Professional & Corporate':
            previewContent.style.fontFamily = "'Georgia', serif";
            break;
        // Add more style applications as needed
    }
}

function updateColorsImmediately(colorType, color) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    // Update CSS custom properties for immediate color changes
    document.documentElement.style.setProperty(`--${colorType.replace('Color', '')}`, color);
}

// === PREVIEW RENDERING FUNCTIONS ===
// These functions are implemented in separate layout files
// The layout files will override these functions with actual implementations

function renderServiceBusinessPreview(state) {
    // This is implemented in layout-service.js
    console.log('Rendering service business preview with state:', state);
}

function renderTradesPreview(state) {
    // This is implemented in layout-service.js (can be extended for trades)
    console.log('Rendering trades preview with state:', state);
    renderServiceBusinessPreview(state); // Use service layout as base
}

function renderConsultingPreview(state) {
    // This is implemented in layout-service.js (can be extended for consulting)
    console.log('Rendering consulting preview with state:', state);
    renderServiceBusinessPreview(state); // Use service layout as base
}

function renderEducationPreview(state) {
    // This is implemented in layout-service.js (can be extended for education)
    console.log('Rendering education preview with state:', state);
    renderServiceBusinessPreview(state); // Use service layout as base
}

function renderRealEstatePreview(state) {
    // This is implemented in layout-service.js (can be extended for real estate)
    console.log('Rendering real estate preview with state:', state);
    renderServiceBusinessPreview(state); // Use service layout as base
}

function renderOtherPreview(state) {
    // This is implemented in layout-service.js (can be extended for other)
    console.log('Rendering other preview with state:', state);
    renderServiceBusinessPreview(state); // Use service layout as base
}

// Make functions globally accessible
window.updatePreview = updatePreview;
window.showDefaultPreview = showDefaultPreview;
window.updatePreviewDetails = updatePreviewDetails;
window.generateSummaryHTML = generateSummaryHTML;
window.handleImmediateVisualChanges = handleImmediateVisualChanges;

// Export functions for use in other modules
window.previewFunctions = {
    updatePreview,
    showDefaultPreview,
    updatePreviewDetails,
    generateSummaryHTML,
    handleImmediateVisualChanges
}; 