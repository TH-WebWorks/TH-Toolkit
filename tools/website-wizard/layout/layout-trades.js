// === TRADES LAYOUT GENERATOR ===
// Dedicated layout for trade businesses (construction, plumbing, electrical, etc.)

window.renderTradesPreview = function(state) {
    console.log('renderTradesPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating trades layout...');
    
    const template = getPreviewTemplate('trades');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName}'s Trades` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateTradesLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated trades layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Trades layout applied to preview content');
    
    // Add interactive elements
    addTradesInteractions();
};

function generateTradesLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasResources = state.pagesEngage && state.pagesEngage.includes('Resources');
    const hasEvents = state.pagesEngage && state.pagesEngage.includes('Events');
    const hasNewsletter = state.pagesEngage && state.pagesEngage.includes('Newsletter');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    // Newsletter is now handled in Step 4 (pagesEngage), not in features
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getTradesFontFamily(designStyle)};">
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
                        ${hasResources ? '<a href="#" class="text-gray-600 hover:text-gray-900">Resources</a>' : ''}
                        ${hasEvents ? '<a href="#" class="text-gray-600 hover:text-gray-900">Events</a>' : ''}
                    </div>
                    <div class="flex items-center space-x-4">
                        ${hasBooking ? `
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Get Quote
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Professional Trade Services You Can Trust
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        We provide exceptional trade services and deliver results that exceed expectations. 
                        Your project success is our priority.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            Get Started
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                            View Projects
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
                            Comprehensive trade services for residential and commercial projects.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🔨</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Construction</h3>
                            <p class="text-gray-600">Full construction services from foundation to finish.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🔌</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Electrical</h3>
                            <p class="text-gray-600">Professional electrical work and installations.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🚿</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Plumbing</h3>
                            <p class="text-gray-600">Expert plumbing services and repairs.</p>
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
                            We're the trusted choice for quality trade work in the area.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">⭐</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Licensed & Insured</h3>
                            <p class="text-gray-600">Fully licensed and insured for your protection</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">⏰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">On Time</h3>
                            <p class="text-gray-600">We respect your schedule</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Fair Pricing</h3>
                            <p class="text-gray-600">Competitive rates, no hidden fees</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🛠️</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Quality Work</h3>
                            <p class="text-gray-600">Built to last, guaranteed</p>
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
                            Don't just take our word for it - hear from our satisfied customers.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Tom Wilson</h4>
                                    <p class="text-gray-600 text-sm">Homeowner</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Excellent work on our kitchen renovation. Professional and reliable!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Lisa Chen</h4>
                                    <p class="text-gray-600 text-sm">Property Manager</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"They handle all our maintenance needs efficiently and professionally."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Mike Johnson</h4>
                                    <p class="text-gray-600 text-sm">Business Owner</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"The best trade service we've worked with. Highly recommended!"</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasNewsletter ? `
            <!-- Newsletter Signup -->
            <section class="py-16 px-6 bg-blue-600">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Get tips and updates about home maintenance and improvements.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white">
                        <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
            ` : ''}



            ${hasBooking ? `
            <!-- Online Scheduler Feature -->
            <section class="py-16 px-6 bg-green-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-white text-2xl">📅</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Schedule Your Service</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Book your appointment online for fast, reliable service at your convenience.
                        </p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-xl font-semibold mb-4 text-gray-900">Available Time Slots</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                        <span class="font-medium">8:00 AM - 10:00 AM</span>
                                        <span class="text-green-600 text-sm">Available</span>
                                    </div>
                                    <div class="flex items-center justify-between p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                        <span class="font-medium">1:00 PM - 3:00 PM</span>
                                        <span class="text-green-600 text-sm">Available</span>
                                    </div>
                                    <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <span class="font-medium text-gray-500">4:00 PM - 6:00 PM</span>
                                        <span class="text-gray-500 text-sm">Booked</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-4 text-gray-900">Book Service</h3>
                                <form class="space-y-4">
                                    <input type="text" placeholder="Your Name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    <input type="text" placeholder="Address" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <option>Select Service</option>
                                        <option>Plumbing</option>
                                        <option>Electrical</option>
                                        <option>HVAC</option>
                                    </select>
                                    <button type="button" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                        Book Appointment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasPayment ? `
            <!-- Payment Processing Feature -->
            <section class="py-16 px-6 bg-purple-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-white text-2xl">💳</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Easy Online Payment</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Pay securely online after service completion. Multiple payment options available.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span class="text-purple-600 text-xl">🔒</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Secure Payments</h3>
                            <p class="text-gray-600 text-sm">Bank-level security for all transactions</p>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span class="text-purple-600 text-xl">📧</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Digital Receipts</h3>
                            <p class="text-gray-600 text-sm">Instant email receipts and invoices</p>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span class="text-purple-600 text-xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Flexible Options</h3>
                            <p class="text-gray-600 text-sm">Credit, debit, and digital wallet payments</p>
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
                                Quality trade services you can trust. Licensed, insured, and experienced.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Services</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Construction</a></li>
                                <li><a href="#" class="hover:text-white">Electrical</a></li>
                                <li><a href="#" class="hover:text-white">Plumbing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Company</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Team</a></li>
                                <li><a href="#" class="hover:text-white">Licenses</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Trade St, City, State</li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ${businessName}. All rights reserved. | Licensed & Insured</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function getTradesFontFamily(designStyle) {
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

function addTradesInteractions() {
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