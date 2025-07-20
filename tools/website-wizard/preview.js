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
    
    // Handle live chat widget
    handleLiveChatWidget();
    
    // Apply current design style
    const currentFormData = window.formData || {};
    if (currentFormData.designStyle) {
        applyDesignStyleImmediately(currentFormData.designStyle);
    }
    
    // Apply current colors
    if (currentFormData.primaryColor) {
        updateColorsImmediately('primaryColor', currentFormData.primaryColor);
    }
    if (currentFormData.secondaryColor) {
        updateColorsImmediately('secondaryColor', currentFormData.secondaryColor);
    }
    if (currentFormData.backgroundColor) {
        updateColorsImmediately('backgroundColor', currentFormData.backgroundColor);
    }
    if (currentFormData.textColor) {
        updateColorsImmediately('textColor', currentFormData.textColor);
    }
    if (currentFormData.footerBackgroundColor) {
        updateColorsImmediately('footerBackgroundColor', currentFormData.footerBackgroundColor);
    }
    if (currentFormData.footerTextColor) {
        updateColorsImmediately('footerTextColor', currentFormData.footerTextColor);
    }
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
    } else if (name === 'primaryColor' || name === 'secondaryColor' || name === 'backgroundColor' || name === 'headingTextColor' || name === 'bodyTextColor' || name === 'footerBackgroundColor' || name === 'footerTextColor') {
        // Color changed - update preview colors
        updateColorsImmediately(name, value);
    } else if (name === 'pagesCore' || name === 'pagesTrust' || name === 'pagesEngage') {
        // Page selections changed - update preview immediately
        setTimeout(() => updatePreview(), 100);
    } else if (name === 'features') {
        // Features changed - handle live chat widget
        handleLiveChatWidget(value);
    }
}

function handleLiveChatWidget(value) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    // Get current formData to check if Live Chat is selected
    const formData = window.formData || {};
    const hasLiveChat = formData.features && formData.features.includes('Live Chat');
    
    // Remove existing chat widget if any
    const existingWidget = previewContent.querySelector('.live-chat-widget');
    if (existingWidget) {
        existingWidget.remove();
    }
    
    // Add chat button to header navigation if Live Chat is selected
    if (hasLiveChat) {
        // Find the navigation area in the preview
        const nav = previewContent.querySelector('nav');
        if (nav) {
            const navLinks = nav.querySelector('.hidden.md\\:flex.items-center.space-x-6');
            if (navLinks) {
                // Check if chat button already exists
                const existingChatBtn = navLinks.querySelector('.chat-nav-button');
                if (!existingChatBtn) {
                    const chatButton = document.createElement('a');
                    chatButton.href = '#';
                    chatButton.className = 'chat-nav-button text-gray-600 hover:text-gray-900 flex items-center gap-2';
                    chatButton.innerHTML = '<i class="fas fa-comments"></i> Chat';
                    chatButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        alert('Live chat feature coming soon! Please call us for immediate assistance.');
                    });
                    navLinks.appendChild(chatButton);
                }
            }
        }
    }
}

function applyDesignStyleImmediately(style) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    // Remove all existing theme classes
    previewContent.classList.remove(
        'theme-modern-clean',
        'theme-bold-creative',
        'theme-professional-corporate',
        'theme-warm-friendly',
        'theme-minimalist',
        'theme-luxury-premium'
    );
    
    // Apply the appropriate theme class based on design style
    switch (style) {
        case 'Modern & Clean':
            previewContent.classList.add('theme-modern-clean');
            break;
        case 'Bold & Creative':
            previewContent.classList.add('theme-bold-creative');
            break;
        case 'Professional & Corporate':
            previewContent.classList.add('theme-professional-corporate');
            break;
        case 'Warm & Friendly':
            previewContent.classList.add('theme-warm-friendly');
            break;
        case 'Minimalist':
            previewContent.classList.add('theme-minimalist');
            break;
        case 'Luxury & Premium':
            previewContent.classList.add('theme-luxury-premium');
            break;
        default:
            // No theme class for default
            break;
    }
}

function updateColorsImmediately(colorType, color) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    // Handle bulk color update
    if (colorType === 'all' && typeof color === 'object') {
        Object.keys(color).forEach(key => {
            updateColorsImmediately(key, color[key]);
        });
        return;
    }
    
    // Get current formData to access all colors
    const formData = window.formData || {};
    const primaryColor = formData.primaryColor || '#3abbfa';
    const secondaryColor = formData.secondaryColor || '#f39c12';
    const backgroundColor = formData.backgroundColor || '#ffffff';
    const headingTextColor = formData.headingTextColor || '#333333';
    const bodyTextColor = formData.bodyTextColor || '#666666';
    const footerBackgroundColor = formData.footerBackgroundColor || '#2c3e50';
    const footerTextColor = formData.footerTextColor || '#ffffff';
    
    // Update CSS custom properties for immediate color changes
    if (colorType === 'primaryColor') {
        previewContent.style.setProperty('--theme-primary', color);
        previewContent.style.setProperty('--theme-accent', color);
    } else if (colorType === 'secondaryColor') {
        previewContent.style.setProperty('--theme-secondary', color);
    } else if (colorType === 'backgroundColor') {
        previewContent.style.setProperty('--theme-background', color);
    } else if (colorType === 'textColor') {
        previewContent.style.setProperty('--theme-text', color);
    } else if (colorType === 'footerBackgroundColor') {
        previewContent.style.setProperty('--theme-footer-bg', color);
    } else if (colorType === 'footerTextColor') {
        previewContent.style.setProperty('--theme-footer-text', color);
    }
    
    // Apply colors to specific elements based on color type
    if (colorType === 'primaryColor') {
        // Update primary color elements
        const primaryElements = previewContent.querySelectorAll('.bg-blue-600, .bg-blue-700, [style*="background: #3abbfa"], [style*="background-color: #3abbfa"]');
        primaryElements.forEach(element => {
            element.style.background = color;
            element.style.backgroundColor = color;
        });
        
        // Update icons and buttons
        const iconElements = previewContent.querySelectorAll('.w-8.h-8.rounded-full, .w-12.h-12.rounded-lg, .w-16.h-16.rounded-full, .w-20.h-20.rounded-full');
        iconElements.forEach(element => {
            element.style.background = color;
            element.style.backgroundColor = color;
        });
        
    } else if (colorType === 'secondaryColor') {
        // Update secondary color elements
        const secondaryElements = previewContent.querySelectorAll('[style*="background: #f39c12"], [style*="background-color: #f39c12"]');
        secondaryElements.forEach(element => {
            element.style.background = color;
            element.style.backgroundColor = color;
        });
        
    } else if (colorType === 'backgroundColor') {
        // Update background color
        previewContent.style.background = color;
        previewContent.style.backgroundColor = color;
        
        // Update body background
        const body = previewContent.querySelector('body') || previewContent;
        body.style.background = color;
        body.style.backgroundColor = color;
        
    } else if (colorType === 'headingTextColor') {
        // Update heading text color
        const headingElements = previewContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headingElements.forEach(element => {
            element.style.color = color;
        });
    } else if (colorType === 'bodyTextColor') {
        // Update body text color
        const bodyElements = previewContent.querySelectorAll('p, span, div');
        bodyElements.forEach(element => {
            // Don't override elements that should keep their specific colors
            if (!element.style.color || element.style.color === '#666666' || element.style.color === 'rgb(102, 102, 102)') {
                element.style.color = color;
            }
        });
    } else if (colorType === 'footerBackgroundColor') {
        // Update footer background color
        const footerElements = previewContent.querySelectorAll('footer, .footer, [class*="footer"], .bg-gray-900, .bg-gray-800');
        footerElements.forEach(element => {
            element.style.background = color;
            element.style.backgroundColor = color;
        });
    } else if (colorType === 'footerTextColor') {
        // Update footer text color
        const footerElements = previewContent.querySelectorAll('footer, .footer, [class*="footer"]');
        footerElements.forEach(element => {
            const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, li');
            textElements.forEach(textElement => {
                // Don't override elements that should keep their specific colors (like links)
                if (!textElement.style.color || textElement.style.color === '#ffffff' || textElement.style.color === 'rgb(255, 255, 255)') {
                    textElement.style.color = color;
                }
            });
        });
    }
    
    // Update color preview swatches in the wizard
    const primaryPreview = document.getElementById('primaryColorPreview');
    const secondaryPreview = document.getElementById('secondaryColorPreview');
    const backgroundPreview = document.getElementById('backgroundColorPreview');
    const textPreview = document.getElementById('textColorPreview');
    const footerBackgroundPreview = document.getElementById('footerBackgroundColorPreview');
    const footerTextPreview = document.getElementById('footerTextColorPreview');
    
    if (primaryPreview && colorType === 'primaryColor') {
        primaryPreview.style.backgroundColor = color;
    }
    if (secondaryPreview && colorType === 'secondaryColor') {
        secondaryPreview.style.backgroundColor = color;
    }
    if (backgroundPreview && colorType === 'backgroundColor') {
        backgroundPreview.style.backgroundColor = color;
    }
    if (textPreview && colorType === 'textColor') {
        textPreview.style.backgroundColor = color;
    }
    if (footerBackgroundPreview && colorType === 'footerBackgroundColor') {
        footerBackgroundPreview.style.backgroundColor = color;
    }
    if (footerTextPreview && colorType === 'footerTextColor') {
        footerTextPreview.style.backgroundColor = color;
    }
    
    // Update color input fields to match
    const colorInputs = {
        primaryColor: document.querySelector('input[name="primaryColor"][type="text"]'),
        secondaryColor: document.querySelector('input[name="secondaryColor"][type="text"]'),
        backgroundColor: document.querySelector('input[name="backgroundColor"][type="text"]'),
        textColor: document.querySelector('input[name="textColor"][type="text"]'),
        footerBackgroundColor: document.querySelector('input[name="footerBackgroundColor"][type="text"]'),
        footerTextColor: document.querySelector('input[name="footerTextColor"][type="text"]')
    };
    
    const colorPickers = {
        primaryColor: document.querySelector('input[name="primaryColor"][type="color"]'),
        secondaryColor: document.querySelector('input[name="secondaryColor"][type="color"]'),
        backgroundColor: document.querySelector('input[name="backgroundColor"][type="color"]'),
        textColor: document.querySelector('input[name="textColor"][type="color"]'),
        footerBackgroundColor: document.querySelector('input[name="footerBackgroundColor"][type="color"]'),
        footerTextColor: document.querySelector('input[name="footerTextColor"][type="color"]')
    };
    
    if (colorInputs[colorType]) {
        colorInputs[colorType].value = color;
    }
    if (colorPickers[colorType]) {
        colorPickers[colorType].value = color;
    }
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