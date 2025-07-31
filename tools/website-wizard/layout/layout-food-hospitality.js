// === FOOD & HOSPITALITY LAYOUT GENERATOR ===
// Dedicated layout for food & hospitality businesses

window.renderFoodHospitalityPreview = function(state) {
    console.log('renderFoodHospitalityPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating food & hospitality layout...');
    
    const template = getPreviewTemplate('food-hospitality');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#e67e22'
    };
    
    const businessName = state.contactName ? `${state.contactName} Restaurant` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateFoodHospitalityLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated food & hospitality layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Food & hospitality layout applied to preview content');
    
    // Add interactive elements
    addFoodHospitalityInteractions();
};

function generateFoodHospitalityLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getFoodHospitalityFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        ${state.pagesCore && state.pagesCore.includes('Home') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Home</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Menu') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Menu</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('About') ? '<a href="#" class="text-gray-600 hover:text-gray-900">About</a>' : ''}
                        ${state.pagesCore && state.pagesCore.includes('Contact') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Gallery') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Gallery</a>' : ''}
                        ${state.pagesEngage && state.pagesEngage.includes('Blog') ? '<a href="#" class="text-gray-600 hover:text-gray-900">Blog</a>' : ''}
                        ${state.features && state.features.includes('Live Chat') ? '<a href="#" class="text-gray-600 hover:text-gray-900 flex items-center gap-2"><i class="fas fa-comments"></i> Chat</a>' : ''}
                    </div>
                    <div class="flex items-center space-x-4">
                        ${hasBooking ? `
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Make Reservation
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-orange-600 to-red-600 py-16 px-6 text-white">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: white;">
                        Exceptional Dining Experience
                    </h1>
                    <p class="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                        Fresh ingredients, authentic flavors, and warm hospitality. 
                        Every dish tells a story of passion and tradition.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            View Menu
                        </button>
                        <button class="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold">
                            Make Reservation
                        </button>
                    </div>
                </div>
            </section>

            <!-- Featured Menu Section -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Specialties</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Discover our signature dishes crafted with care and the finest ingredients.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🍽️</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Signature Dishes</h3>
                            <p class="text-gray-600">Chef's special creations that showcase our culinary expertise.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🍷</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Fine Dining</h3>
                            <p class="text-gray-600">Elegant atmosphere with exceptional service and wine pairings.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🎉</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Private Events</h3>
                            <p class="text-gray-600">Perfect venues for celebrations, corporate events, and special occasions.</p>
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
                            We're passionate about creating memorable dining experiences.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🥘</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Fresh Ingredients</h3>
                            <p class="text-gray-600">Locally sourced, seasonal ingredients</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">👨‍🍳</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Expert Chefs</h3>
                            <p class="text-gray-600">Experienced culinary professionals</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🌟</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Quality Service</h3>
                            <p class="text-gray-600">Attentive and professional staff</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🏆</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Award Winning</h3>
                            <p class="text-gray-600">Recognized for excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            ${hasTestimonials ? `
            <!-- Testimonials -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our satisfied guests.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Jennifer Smith</h4>
                                    <p class="text-gray-600 text-sm">Regular Guest</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Amazing food and atmosphere! Perfect for date night."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Michael Brown</h4>
                                    <p class="text-gray-600 text-sm">Business Client</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Great venue for our corporate events. Professional service!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Lisa Johnson</h4>
                                    <p class="text-gray-600 text-sm">Wedding Client</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Our wedding reception was perfect. The food was incredible!"</p>
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
                                Exceptional dining experiences with fresh ingredients and warm hospitality.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Menu</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Appetizers</a></li>
                                <li><a href="#" class="hover:text-white">Main Courses</a></li>
                                <li><a href="#" class="hover:text-white">Desserts</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Services</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Dining</a></li>
                                <li><a href="#" class="hover:text-white">Catering</a></li>
                                <li><a href="#" class="hover:text-white">Private Events</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Restaurant Row, City, State</li>
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

function getFoodHospitalityFontFamily(designStyle) {
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

function addFoodHospitalityInteractions() {
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