// === OTHER BUSINESS LAYOUT GENERATOR ===
// Dedicated layout for other business types

window.renderOtherPreview = function(state) {
    console.log('renderOtherPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating other business layout...');
    
    const template = getPreviewTemplate('other');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName}'s Business` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateOtherLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated other business layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Other business layout applied to preview content');
    
    // Add interactive elements
    addOtherInteractions();
};

function generateOtherLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    // Newsletter is now handled in Step 4 (pagesEngage), not in features
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getOtherFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Services</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
                        ${hasContact ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                    </div>
                    <div class="flex items-center space-x-4">
                        ${hasBooking ? `
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Get Started
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Welcome to ${businessName}
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        We provide exceptional services tailored to meet your unique needs. 
                        Quality, reliability, and customer satisfaction are our priorities.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            Learn More
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                            Contact Us
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
                            Comprehensive solutions designed to meet your business needs.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">⭐</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Service 1</h3>
                            <p class="text-gray-600">Professional service with attention to detail and quality results.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">⚡</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Service 2</h3>
                            <p class="text-gray-600">Fast and efficient service delivery with guaranteed satisfaction.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🎯</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Service 3</h3>
                            <p class="text-gray-600">Targeted solutions that address your specific needs and goals.</p>
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
                            We stand out from the competition with our commitment to excellence.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">⭐</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Quality Work</h3>
                            <p class="text-gray-600">We never compromise on quality</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">⏰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">On Time</h3>
                            <p class="text-gray-600">We respect your time</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Fair Pricing</h3>
                            <p class="text-gray-600">Transparent and competitive rates</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🤝</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Support</h3>
                            <p class="text-gray-600">We're here when you need us</p>
                        </div>
                    </div>
                </div>
            </section>

            ${hasTestimonials ? `
            <!-- Testimonials -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our satisfied clients.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">John Smith</h4>
                                    <p class="text-gray-600 text-sm">Satisfied Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Exceptional service and outstanding results. Highly recommended!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Sarah Johnson</h4>
                                    <p class="text-gray-600 text-sm">Happy Client</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Professional, reliable, and delivers exactly what they promise."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Mike Davis</h4>
                                    <p class="text-gray-600 text-sm">Business Owner</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"The best investment we've made for our business growth."</p>
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
                                Professional services you can trust. We're committed to delivering exceptional results.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Services</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Service 1</a></li>
                                <li><a href="#" class="hover:text-white">Service 2</a></li>
                                <li><a href="#" class="hover:text-white">Service 3</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Company</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Team</a></li>
                                <li><a href="#" class="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Business St, City, State</li>
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

function getOtherFontFamily(designStyle) {
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

function addOtherInteractions() {
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