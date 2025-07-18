// === REAL ESTATE LAYOUT GENERATOR ===
// Dedicated layout for real estate agencies

window.renderRealEstatePreview = function(state) {
    console.log('renderRealEstatePreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating real estate layout...');
    
    const template = getPreviewTemplate('real-estate-agency');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName} Real Estate` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateRealEstateLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated real estate layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Real estate layout applied to preview content');
    
    // Add interactive elements
    addRealEstateInteractions();
};

function generateRealEstateLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    const hasNewsletter = state.features && state.features.includes('Newsletter Signup');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getRealEstateFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Properties</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Agents</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
                        ${hasContact ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                    </div>
                    ${hasBooking ? `
                        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Schedule Viewing
                        </button>
                    ` : ''}
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-red-50 to-orange-50 py-16 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Find Your Dream Home
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover exceptional properties in the most desirable locations. 
                        Expert agents ready to help you find the perfect home.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                            Search Properties
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                            Meet Our Agents
                        </button>
                    </div>
                </div>
            </section>

            <!-- Featured Properties -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Explore our handpicked selection of premium properties in prime locations.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div class="h-48 bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-500">Property Image</span>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-semibold mb-2">Modern Downtown Condo</h3>
                                <p class="text-gray-600 mb-4">2 bed, 2 bath • 1,200 sq ft</p>
                                <p class="text-2xl font-bold text-red-600 mb-4">$450,000</p>
                                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div class="h-48 bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-500">Property Image</span>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-semibold mb-2">Family Home in Suburbs</h3>
                                <p class="text-gray-600 mb-4">4 bed, 3 bath • 2,500 sq ft</p>
                                <p class="text-2xl font-bold text-red-600 mb-4">$750,000</p>
                                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div class="h-48 bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-500">Property Image</span>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-semibold mb-2">Luxury Waterfront Villa</h3>
                                <p class="text-gray-600 mb-4">5 bed, 4 bath • 4,000 sq ft</p>
                                <p class="text-2xl font-bold text-red-600 mb-4">$1,200,000</p>
                                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                                    View Details
                                </button>
                            </div>
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
                            We're the trusted name in real estate with decades of experience.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🏠</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Expert Agents</h3>
                            <p class="text-gray-600">Licensed professionals with local expertise</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">📱</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">24/7 Support</h3>
                            <p class="text-gray-600">Always here when you need us</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Best Deals</h3>
                            <p class="text-gray-600">Competitive pricing and market insights</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🤝</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Trusted Partner</h3>
                            <p class="text-gray-600">Your success is our priority</p>
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
                            Hear from satisfied clients about their experience with us.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Emily Rodriguez</h4>
                                    <p class="text-gray-600 text-sm">Home Buyer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Found our perfect home within weeks. The agent was incredibly helpful!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Michael Thompson</h4>
                                    <p class="text-gray-600 text-sm">Property Seller</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Sold my house above asking price in just 5 days. Excellent service!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Lisa Chen</h4>
                                    <p class="text-gray-600 text-sm">Investor</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Professional team that understands the market. Highly recommended!"</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasNewsletter ? `
            <!-- Newsletter Signup -->
            <section class="py-16 px-6 bg-red-600">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p class="text-red-100 mb-8 max-w-2xl mx-auto">
                        Get the latest property listings and market insights delivered to your inbox.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white">
                        <button class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
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
                                Your trusted partner in finding the perfect property. Licensed and experienced real estate professionals.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Properties</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">For Sale</a></li>
                                <li><a href="#" class="hover:text-white">For Rent</a></li>
                                <li><a href="#" class="hover:text-white">New Listings</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Company</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Agents</a></li>
                                <li><a href="#" class="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Real Estate Ave, City, State</li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ${businessName}. All rights reserved. | Licensed Real Estate Broker</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function getRealEstateFontFamily(designStyle) {
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

function addRealEstateInteractions() {
    // Add hover effects to property cards
    const propertyCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md');
    propertyCards.forEach(card => {
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