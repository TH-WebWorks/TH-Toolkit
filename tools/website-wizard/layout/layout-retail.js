// === RETAIL & E-COMMERCE LAYOUT GENERATOR ===
// Dedicated layout for retail & e-commerce businesses

window.renderRetailPreview = function(state) {
    console.log('renderRetailPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating retail layout...');
    
    const template = getPreviewTemplate('retail');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#9b59b6'
    };
    
    const businessName = state.contactName ? `${state.contactName} Store` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateRetailLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated retail layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Retail layout applied to preview content');
    
    // Add interactive elements
    addRetailInteractions();
};

function generateRetailLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getRetailFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        ${state.pagesCore && state.pagesCore.includes('Home') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Home</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Shop') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Shop</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('About') ? '<a href="#" class="text-gray-600 hover:text-gray-900">About</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Contact') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Gallery') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Gallery</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Blog') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Blog</a>' : ''}
                        ${state.features && state.features.includes('Live Chat') ? '<a href="#" class="text-gray-600 hover:text-gray-900 flex items-center gap-2"><i class="fas fa-comments"></i> Chat</a>' : ''}
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="text-gray-600 hover:text-gray-900">
                            <i class="fas fa-search text-lg"></i>
                        </button>
                        <button class="text-gray-600 hover:text-gray-900 relative">
                            <i class="fas fa-shopping-cart text-lg"></i>
                            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-purple-600 to-pink-600 py-16 px-6 text-white">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: white;">
                        Discover Amazing Products
                    </h1>
                    <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Quality products, exceptional service, and unbeatable prices. 
                        Shop with confidence and style.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Shop Now
                        </button>
                        <button class="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold">
                            View Collections
                        </button>
                    </div>
                </div>
            </section>

            <!-- Featured Products -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Discover our most popular items and latest arrivals.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <span class="text-gray-400 text-4xl">📦</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Premium Product</h3>
                            <p class="text-gray-600 mb-4">High-quality item with excellent features and design.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-gray-900">$99.99</span>
                                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <span class="text-gray-400 text-4xl">🎁</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Special Edition</h3>
                            <p class="text-gray-600 mb-4">Limited edition item with unique characteristics.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-gray-900">$149.99</span>
                                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <span class="text-gray-400 text-4xl">⭐</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Best Seller</h3>
                            <p class="text-gray-600 mb-4">Our most popular product with rave reviews.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-gray-900">$79.99</span>
                                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Add to Cart
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
                            We're committed to providing the best shopping experience.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🚚</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Fast Shipping</h3>
                            <p class="text-gray-600">Quick delivery to your doorstep</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🛡️</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Quality Guarantee</h3>
                            <p class="text-gray-600">Premium products with warranty</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💰</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Best Prices</h3>
                            <p class="text-gray-600">Competitive pricing and deals</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">💬</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">24/7 Support</h3>
                            <p class="text-gray-600">Always here to help you</p>
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
                            Don't just take our word for it - hear from our satisfied customers.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Emily Davis</h4>
                                    <p class="text-gray-600 text-sm">Regular Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Amazing quality products and fast shipping. Highly recommend!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">David Wilson</h4>
                                    <p class="text-gray-600 text-sm">First-time Buyer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Great customer service and excellent product selection."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Sarah Johnson</h4>
                                    <p class="text-gray-600 text-sm">Loyal Customer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Best prices and quality. I shop here all the time!"</p>
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
                                Quality products, exceptional service, and unbeatable prices for all your needs.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Shop</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">New Arrivals</a></li>
                                <li><a href="#" class="hover:text-white">Best Sellers</a></li>
                                <li><a href="#" class="hover:text-white">Clearance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Customer Service</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Contact Us</a></li>
                                <li><a href="#" class="hover:text-white">Shipping Info</a></li>
                                <li><a href="#" class="hover:text-white">Returns</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>shop@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Shopping Center, City, State</li>
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

function getRetailFontFamily(designStyle) {
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

function addRetailInteractions() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.bg-white.p-6.rounded-lg.shadow-md');
    productCards.forEach(card => {
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