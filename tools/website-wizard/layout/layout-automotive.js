// === AUTOMOTIVE LAYOUT GENERATOR ===
// Dedicated layout for automotive businesses

window.renderAutomotivePreview = function(state) {
    console.log('renderAutomotivePreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating automotive layout...');
    
    const template = getPreviewTemplate('automotive');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#e74c3c'
    };
    
    const businessName = state.contactName ? `${state.contactName} Auto` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateAutomotiveLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated automotive layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Automotive layout applied to preview content');
    
    // Add interactive elements
    addAutomotiveInteractions();
};

function generateAutomotiveLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getAutomotiveFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        ${state.pagesCore && state.pagesCore.includes('Home') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Home</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Services') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Services</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('About') ? '<a href="#" class="text-gray-600 hover:text-gray-900">About</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Contact') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Gallery') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Gallery</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Blog') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Blog</a>' : ''}
                        ${state.features && state.features.includes('Live Chat') ? '<a href="#" class="text-gray-600 hover:text-gray-900 flex items-center gap-2"><i class="fas fa-comments"></i> Chat</a>' : ''}
                    </div>
                    <div class="flex items-center space-x-4">
                        ${hasBooking ? `
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Schedule Service
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-6 text-white">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Expert Auto Care You Can Trust
                    </h1>
                    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Professional automotive services with quality workmanship and honest pricing. 
                        Your vehicle deserves the best care.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            Schedule Service
                        </button>
                        <button class="border border-gray-300 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                            View Services
                        </button>
                    </div>
                </div>
            </section>

            <!-- Services Grid -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive automotive services to keep your vehicle running smoothly.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🔧</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Auto Repair</h3>
                            <p class="text-gray-600">Diagnostic services, engine repair, transmission work, and more.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🛢️</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Maintenance</h3>
                            <p class="text-gray-600">Oil changes, tune-ups, brake service, and preventive maintenance.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🚗</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Custom Work</h3>
                            <p class="text-gray-600">Performance upgrades, custom modifications, and specialty services.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Choose Us -->
            <section class="py-16 px-6 bg-gray-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            We're committed to providing honest, reliable automotive services.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">👨‍🔧</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Expert Technicians</h3>
                            <p class="text-gray-600">Certified professionals with years of experience</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Fair Pricing</h3>
                            <p class="text-gray-600">Honest quotes and transparent pricing</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">⚡</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Quick Service</h3>
                            <p class="text-gray-600">Fast turnaround times</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🛡️</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Warranty</h3>
                            <p class="text-gray-600">Quality work backed by warranty</p>
                        </div>
                    </div>
                </div>
            </section>

            ${hasTestimonials ? `
            <!-- Testimonials -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from satisfied customers.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Mike Johnson</h4>
                                    <p class="text-gray-600 text-sm">Regular Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"They fixed my transmission issue quickly and fairly. Great service!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Sarah Davis</h4>
                                    <p class="text-gray-600 text-sm">First-time Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Honest pricing and quality work. I'll definitely be back."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Tom Wilson</h4>
                                    <p class="text-gray-600 text-sm">Custom Build Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Amazing custom work on my project car. Exceeded expectations!"</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Footer -->
            <footer class="bg-gray-900 text-white py-12 px-6">
                <div class="max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 class="text-lg font-semibold mb-4">${businessName}</h3>
                            <p class="text-gray-400">
                                Professional automotive services with quality workmanship and honest pricing.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Services</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Auto Repair</a></li>
                                <li><a href="#" class="hover:text-white">Maintenance</a></li>
                                <li><a href="#" class="hover:text-white">Custom Work</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Company</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Team</a></li>
                                <li><a href="#" class="hover:text-white">Gallery</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>service@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Auto Lane, City, State</li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ${businessName}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function getAutomotiveFontFamily(designStyle) {
    switch (designStyle) {
        case 'Modern & Clean':
            return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        case 'Professional & Corporate':
            return "'Georgia', 'Times New Roman', serif";
        case 'Bold & Creative':
            return "'Poppins', 'Arial', sans-serif";
        case 'Warm & Friendly':
            return "'Open Sans', 'Arial', sans-serif";
        case 'Minimalist':
            return "'Helvetica Neue', 'Arial', sans-serif";
        case 'Luxury & Premium':
            return "'Playfair Display', 'Georgia', serif";
        default:
            return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
}

function addAutomotiveInteractions() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.bg-white.p-6.rounded-lg.shadow-md');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
} 