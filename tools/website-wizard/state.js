// === WIZARD STATE MANAGEMENT ===
// Form data, wizard steps, and state management

// === WIZARD STEPS CONFIGURATION ===
window.wizardSteps = [
    // 0. Welcome & Introduction
    {
        id: 'welcome',
        title: 'Let\'s Get Started',
        subtitle: 'Professional Website Consultation',
        icon: 'home',
        description: 'We\'ll guide you through a few quick questions to help build the perfect website for your business.',
        fields: [
            { 
                type: 'branding', 
                logo: '../../Images/THLogo_trans.webp', 
                mission: 'Premium web development for businesses that want to stand out.', 
                subheader: 'Your business, our expertise, exceptional results.' 
            },
            { 
                type: 'intro', 
                description: 'We\'ll walk through your requirements step by step, and you\'ll see your website take shape in real-time as we discuss your needs.' 
            }
        ]
    },
    
    // 1. Business Type Selection
    {
        id: 'business-type',
        title: 'What Type of Business Are You?',
        subtitle: 'Select your business category',
        icon: 'building',
        description: 'This helps us create a website layout that\'s perfect for your industry.',
        fields: [
            { 
                type: 'radio', 
                name: 'businessType', 
                label: 'Business Type', 
                description: 'Choose the category that best describes your business',
                options: [
                    { value: 'service-business', label: 'Service Business', icon: 'wrench', description: 'Professional services (consulting, legal, etc.)' },
                    { value: 'trades', label: 'Trades', icon: 'hammer', description: 'Construction, plumbing, electrical, etc.' },
                    { value: 'consulting', label: 'Consulting', icon: 'lightbulb', description: 'Business consulting & advisory' },
                    { value: 'education', label: 'Education', icon: 'graduation-cap', description: 'Schools, training, courses' },
                    { value: 'real-estate-agency', label: 'Real Estate Agency', icon: 'home', description: 'Real estate agencies & agents' },
                    { value: 'other', label: 'Other', icon: 'plus', description: 'Other business type' }
                ], 
                required: true,
                showOtherInput: true
            }
        ]
    },
    
    // 2. Website Goals
    {
        id: 'goals',
        title: 'What Are Your Website Goals?',
        subtitle: 'Define your primary objectives',
        icon: 'target',
        description: 'Understanding your goals helps us prioritize features and design elements that will drive results.',
        fields: [
            { 
                type: 'checkbox-group', 
                name: 'goals', 
                label: 'Primary Goals', 
                description: 'Select all that apply to your business',
                options: [
                    { value: 'Lead Generation', icon: 'users', description: 'Generate new leads and inquiries' },
                    { value: 'Online Booking', icon: 'calendar', description: 'Allow customers to book appointments' },
                    { value: 'Selling Products', icon: 'shopping-cart', description: 'Sell products or services online' },
                    { value: 'Portfolio Display', icon: 'image', description: 'Showcase your work or products' },
                    { value: 'Event Promotion', icon: 'calendar-days', description: 'Promote events and activities' },
                    { value: 'Content Marketing', icon: 'file-text', description: 'Share valuable content and insights' },
                    { value: 'SEO Visibility', icon: 'search', description: 'Improve search engine rankings' },
                    { value: 'Brand Trust', icon: 'shield', description: 'Build credibility and trust' },
                    { value: 'Client Login', icon: 'user-check', description: 'Provide client portal access' },
                    { value: 'Other', icon: 'plus', description: 'Other specific goals' }
                ], 
                vertical: true, 
                required: true,
                showOtherInput: true,
                maxSelections: 5
            }
        ]
    },
    
    // 3. Website Pages
    {
        id: 'pages',
        title: 'What Pages Do You Need?',
        subtitle: 'Structure your website content',
        icon: 'layout',
        description: 'Choose the pages that will make up your website. We\'ll organize them for optimal user experience.',
        fields: [
            { 
                type: 'checkbox-group', 
                name: 'pagesCore', 
                label: 'Core Pages', 
                description: 'Essential pages every business needs',
                options: [
                    { value: 'Home', icon: 'home', description: 'Main landing page' },
                    { value: 'About', icon: 'info', description: 'About your business' },
                    { value: 'Services', icon: 'settings', description: 'Your services or products' },
                    { value: 'Contact', icon: 'phone', description: 'Contact information' }
                ], 
                vertical: true 
            },
            { 
                type: 'checkbox-group', 
                name: 'pagesTrust', 
                label: 'Trust Building', 
                description: 'Pages that build credibility',
                options: [
                    { value: 'Testimonials', icon: 'star', description: 'Customer reviews' },
                    { value: 'FAQ', icon: 'help-circle', description: 'Frequently asked questions' },
                    { value: 'Case Studies', icon: 'folder-open', description: 'Success stories' },
                    { value: 'Team', icon: 'users', description: 'Meet your team' }
                ], 
                vertical: true 
            },
            { 
                type: 'checkbox-group', 
                name: 'pagesEngage', 
                label: 'Engagement', 
                description: 'Pages to keep visitors engaged',
                options: [
                    { value: 'Resources', icon: 'book-open', description: 'Helpful resources' },
                    { value: 'Events', icon: 'calendar', description: 'Upcoming events' },
                    { value: 'Newsletter', icon: 'mail', description: 'Email signup' }
                ], 
                vertical: true 
            }
        ]
    },
    
    // 4. Features & Functionality
    {
        id: 'features',
        title: 'What Features Do You Need?',
        subtitle: 'Choose your website functionality',
        icon: 'settings',
        description: 'Select the features that will help you achieve your goals and provide value to your visitors.',
        fields: [
            { 
                type: 'checkbox-group', 
                name: 'features', 
                label: 'Website Features', 
                description: 'Select the features you need',
                options: [
                    { value: 'Contact Forms', icon: 'mail', description: 'Contact and inquiry forms' },
                    { value: 'Online Scheduler', icon: 'calendar-plus', description: 'Appointment booking system' },
                    { value: 'Payment Processing', icon: 'credit-card', description: 'Online payments' },
                    { value: 'Newsletter Signup', icon: 'mail', description: 'Email marketing integration' },
                    { value: 'Google Maps', icon: 'map-pin', description: 'Location and directions' },
                    { value: 'Client Dashboard', icon: 'user', description: 'Client portal access' },
                    { value: 'Live Chat', icon: 'message-circle', description: 'Real-time customer support' },
                    { value: 'Social Media Integration', icon: 'share-2', description: 'Social media feeds' },
                    { value: 'Analytics', icon: 'bar-chart', description: 'Website analytics' }
                ], 
                vertical: true,
                showOtherInput: true
            }
        ]
    },
    
    // 5. Design Preferences
    {
        id: 'design',
        title: 'What Design Style Appeals to You?',
        subtitle: 'Choose your visual direction',
        icon: 'palette',
        description: 'Your design style will influence the overall look and feel of your website.',
        fields: [
            { 
                type: 'radio', 
                name: 'designStyle', 
                label: 'Design Style', 
                description: 'Select the style that best represents your brand',
                options: [
                    { value: 'Modern & Clean', icon: 'zap', description: 'Minimal, contemporary design' },
                    { value: 'Bold & Creative', icon: 'sparkles', description: 'Eye-catching, artistic design' },
                    { value: 'Professional & Corporate', icon: 'briefcase', description: 'Trustworthy, business-focused' },
                    { value: 'Warm & Friendly', icon: 'heart', description: 'Approachable, welcoming design' },
                    { value: 'Minimalist', icon: 'minus', description: 'Simple, focused design' },
                    { value: 'Luxury & Premium', icon: 'crown', description: 'Sophisticated, high-end design' }
                ], 
                required: true 
            }
        ]
    },
    
    // 6. Color & Branding
    {
        id: 'colors',
        title: 'Color & Branding Preferences',
        subtitle: 'Define your visual identity',
        icon: 'droplets',
        description: 'Colors play a crucial role in brand recognition and user experience.',
        fields: [
            { 
                type: 'color', 
                name: 'primaryColor', 
                label: 'Primary Brand Color', 
                description: 'Your main brand color',
                placeholder: '#3abbfa or blue', 
                required: true,
                icon: 'palette'
            },
            { 
                type: 'color', 
                name: 'secondaryColor', 
                label: 'Secondary Color', 
                description: 'Accent color for highlights',
                placeholder: '#f39c12 or gold', 
                required: true,
                icon: 'palette'
            },
            { 
                type: 'text', 
                name: 'exampleSites', 
                label: 'Example Websites You Like', 
                description: 'Share URLs of websites whose design you admire',
                placeholder: 'Paste URLs separated by commas (e.g., example.com, another-site.com)',
                icon: 'link'
            }
        ]
    },
    
    // 7. Contact & Project Details
    {
        id: 'contact',
        title: 'Contact Details & Project Scope',
        subtitle: 'Let\'s get in touch',
        icon: 'mail',
        description: 'Provide your contact information and project preferences so we can create a custom proposal.',
        fields: [
            { 
                type: 'text', 
                name: 'contactName', 
                label: 'Contact Name', 
                placeholder: 'Your full name',
                required: true,
                icon: 'user'
            },
            { 
                type: 'email', 
                name: 'email', 
                label: 'Business Email', 
                placeholder: 'your@email.com',
                required: true,
                icon: 'mail'
            },
            { 
                type: 'tel', 
                name: 'phone', 
                label: 'Phone Number', 
                placeholder: '(555) 123-4567',
                required: true,
                icon: 'phone'
            },
            { 
                type: 'radio', 
                name: 'budget', 
                label: 'Budget Range', 
                description: 'Help us provide the right solution for your budget',
                options: [
                    { value: '<$500', icon: 'dollar-sign', description: 'Basic website package' },
                    { value: '$500–$1000', icon: 'dollar-sign', description: 'Standard website package' },
                    { value: '$1000–$2000', icon: 'dollar-sign', description: 'Premium website package' },
                    { value: '$2000+', icon: 'dollar-sign', description: 'Custom enterprise solution' }
                ], 
                required: true 
            },
            { 
                type: 'dropdown', 
                name: 'timeline', 
                label: 'Project Timeline', 
                description: 'When do you need your website completed?',
                options: ['ASAP', '1 week', '2–4 weeks', '1–2 months', '2+ months'],
                icon: 'clock'
            },
            { 
                type: 'textarea', 
                name: 'additionalNotes', 
                label: 'Additional Notes', 
                description: 'Any specific requirements, preferences, or questions?',
                placeholder: 'Tell us anything else we should know about your project...',
                rows: 4,
                icon: 'file-text'
            }
        ]
    },
    
    // 8. Summary & Submission
    {
        id: 'summary',
        title: 'Review Your Website Vision',
        subtitle: 'Almost there!',
        icon: 'check-circle',
        description: 'Review your selections and submit your project request. We\'ll get back to you with a custom proposal within 24 hours.',
        fields: [
            { type: 'summary' },
            { 
                type: 'toggle', 
                name: 'sendEmailCopy', 
                label: 'Send me a copy of this summary', 
                description: 'Receive a copy of your project summary via email',
                default: true
            },
            { 
                type: 'button-group', 
                buttons: [
                    { 
                        label: 'Download Summary', 
                        action: 'download', 
                        icon: 'download',
                        classes: 'bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300' 
                    },
                    { 
                        label: 'Submit Project Request', 
                        action: 'submit', 
                        icon: 'send',
                        classes: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105' 
                    }
                ]
            }
        ]
    }
];

// === PREVIEW TEMPLATES ===
window.previewTemplates = {
    'service-business': {
        name: 'ProFix Solutions',
        tagline: 'Professional Services You Can Trust',
        features: ['Service showcase', 'Booking system', 'Testimonials', 'Contact forms', 'Service areas', 'Emergency calls'],
        color: '#2ecc71',
        heroImage: '🔧',
        icons: ['⚙️', '📞', '💬', '📍'],
        specialties: ['24/7 Support', 'Guaranteed Work', 'Free Estimates'],
        layout: 'service',
        sections: ['hero', 'services-grid', 'why-choose-us', 'testimonials', 'service-areas', 'emergency-contact']
    },
    'trades': {
        name: 'MasterCraft Trades',
        tagline: 'Quality Workmanship & Reliable Service',
        features: ['Service areas', 'Project gallery', 'Free quotes', 'Emergency contact', 'Licensed & insured', 'Warranty'],
        color: '#f39c12',
        heroImage: '🔨',
        icons: ['🏠', '🛠️', '📋', '🚨'],
        specialties: ['Residential', 'Commercial', 'Emergency Repairs'],
        layout: 'trades',
        sections: ['hero', 'services-showcase', 'project-gallery', 'certifications', 'service-areas', 'emergency-contact']
    },
    'consulting': {
        name: 'Strategic Growth Partners',
        tagline: 'Expert Solutions for Business Success',
        features: ['Case studies', 'Expert team', 'Services overview', 'Client testimonials', 'Strategy sessions', 'ROI tracking'],
        color: '#9b59b6',
        heroImage: '📊',
        icons: ['📈', '👥', '💼', '🎯'],
        specialties: ['Business Strategy', 'Digital Transformation', 'Growth Consulting'],
        layout: 'consulting',
        sections: ['hero', 'expertise-areas', 'case-studies', 'team', 'process', 'results']
    },
    'education': {
        name: 'Innovation Academy',
        tagline: 'Empowering Minds, Building Futures',
        features: ['Course catalog', 'Student portal', 'Faculty directory', 'Events calendar', 'Alumni network', 'Online learning'],
        color: '#34495e',
        heroImage: '🎓',
        icons: ['📚', '👨‍🏫', '🎯', '🌐'],
        specialties: ['Higher Education', 'Professional Development', 'Online Courses'],
        layout: 'education',
        sections: ['hero', 'programs-overview', 'faculty', 'student-life', 'admissions', 'alumni-network']
    },
    'real-estate-agency': {
        name: 'Premier Real Estate Group',
        tagline: 'Find Your Dream Home',
        features: ['Property listings', 'Virtual tours', 'Mortgage calculator', 'Agent profiles', 'Market insights', 'Contact forms'],
        color: '#8e44ad',
        heroImage: '🏠',
        icons: ['🔑', '📊', '👥', '📞'],
        specialties: ['Residential', 'Commercial', 'Investment Properties'],
        layout: 'real-estate',
        sections: ['hero', 'featured-properties', 'search-tools', 'agents', 'market-insights', 'mortgage-calculator']
    },
    'tech-startup': {
        name: 'TechFlow Solutions',
        tagline: 'Innovation at Your Fingertips',
        features: ['Product demos', 'API documentation', 'Support portal', 'Case studies', 'Developer resources', 'Pricing plans'],
        color: '#2c3e50',
        heroImage: '💻',
        icons: ['🚀', '🔧', '📱', '☁️'],
        specialties: ['SaaS Solutions', 'Mobile Apps', 'Cloud Services'],
        layout: 'technology',
        sections: ['hero', 'products-showcase', 'features', 'pricing', 'case-studies', 'developer-hub']
    },
    'other': {
        name: 'Your Business',
        tagline: 'Professional Solutions for Your Needs',
        features: ['Custom solutions', 'Professional service', 'Quality work', 'Customer support', 'Flexible options', 'Reliable results'],
        color: '#3abbfa',
        heroImage: '💼',
        icons: ['🎯', '⚡', '💡', '🤝'],
        specialties: ['Custom Solutions', 'Professional Service', 'Quality Work'],
        layout: 'default',
        sections: ['hero', 'services', 'about', 'contact']
    }
};

// === STATE MANAGEMENT FUNCTIONS ===

// Initialize form data with default values
function initializeFormData() {
    return {
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
}

// Save form data to localStorage
function saveFormData(formData) {
    localStorage.setItem('consultationWizardData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('consultationWizardData');
    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (e) {
            console.warn('Failed to load saved form data');
            return initializeFormData();
        }
    }
    return initializeFormData();
}

// Clear saved form data
function clearFormData() {
    localStorage.removeItem('consultationWizardData');
}

// Get current step configuration
function getCurrentStep(currentStepIndex) {
    return wizardSteps[currentStepIndex] || null;
}

// Get step by ID
function getStepById(stepId) {
    return wizardSteps.find(step => step.id === stepId) || null;
}

// Get preview template for business type
function getPreviewTemplate(businessType) {
    return previewTemplates[businessType] || previewTemplates['other'];
}

// Make function globally accessible
window.getPreviewTemplate = getPreviewTemplate;

// Validate step data
function validateStepData(stepIndex, formData) {
    const step = wizardSteps[stepIndex];
    if (!step) return { isValid: true, errors: [] };
    
    const errors = [];
    const requiredFields = step.fields.filter(field => field.required);
    
    requiredFields.forEach(field => {
        const value = formData[field.name];
        if (field.type === 'radio' && (!value || value === '')) {
            errors.push(`${field.label} is required`);
        } else if (field.type === 'checkbox-group' && (!value || value.length === 0)) {
            errors.push(`Please select at least one ${field.label.toLowerCase()}`);
        } else if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
            if (!value || value.trim() === '') {
                errors.push(`${field.label} is required`);
            }
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Export for use in other modules
window.wizardState = {
    wizardSteps,
    previewTemplates,
    initializeFormData,
    saveFormData,
    loadFormData,
    clearFormData,
    getCurrentStep,
    getStepById,
    getPreviewTemplate,
    validateStepData
}; 