// === SERVICE BUSINESS LAYOUT GENERATOR ===
// Dedicated layout for professional service businesses

// Utility function for color adjustment
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

window.renderServiceBusinessPreview = function(state) {
    console.log('renderServiceBusinessPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating service business layout...');
    
    const template = getPreviewTemplate('service-business');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName}'s Business` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateServiceBusinessLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated service business layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Service business layout applied to preview content');
    
    // Add interactive elements
    addServiceBusinessInteractions();
};

function generateServiceBusinessLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasStore = state.features && state.features.includes('Payment Processing');
    const hasResources = state.pagesEngage && state.pagesEngage.includes('Resources');
    const hasEvents = state.pagesEngage && state.pagesEngage.includes('Events');
    const hasNewsletter = state.pagesEngage && state.pagesEngage.includes('Newsletter');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasFAQ = state.pagesTrust && state.pagesTrust.includes('FAQ');
    const hasCaseStudies = state.pagesTrust && state.pagesTrust.includes('Case Studies');
    const hasTeam = state.pagesTrust && state.pagesTrust.includes('Team');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    const hasAnalytics = state.features && state.features.includes('Analytics');
    const hasLiveChat = state.features && state.features.includes('Live Chat');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasScheduler = state.features && state.features.includes('Online Scheduler');
    // Newsletter is now handled in Step 4 (pagesEngage), not in features
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getServiceBusinessFontFamily(designStyle)};">
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
                        ${hasBooking ? '<a href="#" class="text-gray-600 hover:text-gray-900">Book Now</a>' : ''}
                    </div>
                    ${hasBooking ? `
                        <button class="text-white px-4 py-2 rounded-lg transition-colors font-semibold" style="background: ${colors.primary};" onmouseover="this.style.background='${adjustColor(colors.primary, -20)}'" onmouseout="this.style.background='${colors.primary}'">
                            Book Consultation
                        </button>
                    ` : ''}
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Professional Services You Can Trust
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        We provide exceptional service and deliver results that exceed expectations. 
                        Your success is our priority.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="text-white px-8 py-3 rounded-lg transition-colors font-semibold" style="background: ${colors.primary};" onmouseover="this.style.background='${adjustColor(colors.primary, -20)}'" onmouseout="this.style.background='${colors.primary}'">
                            Get Started
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                            Learn More
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
                            We offer a comprehensive range of professional services designed to meet your needs.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🔧</span>
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
                            We stand out from the competition with our commitment to excellence and customer satisfaction.
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
                                    <p class="text-gray-600 text-sm">CEO, TechCorp</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Exceptional service and outstanding results. Highly recommended!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Sarah Johnson</h4>
                                    <p class="text-gray-600 text-sm">Marketing Director</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Professional, reliable, and delivers exactly what they promise."</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Mike Davis</h4>
                                    <p class="text-gray-600 text-sm">Small Business Owner</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"The best investment we've made for our business growth."</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasFAQ ? `
            <!-- FAQ -->
            <section class="py-16 px-6 bg-gray-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our services and processes.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-3 text-gray-900">What services do you offer?</h3>
                            <p class="text-gray-600">We provide comprehensive professional services tailored to your specific needs and goals.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-3 text-gray-900">How long does a typical project take?</h3>
                            <p class="text-gray-600">Project timelines vary based on complexity, but we always provide clear estimates upfront.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-3 text-gray-900">Do you offer ongoing support?</h3>
                            <p class="text-gray-600">Yes, we provide comprehensive support and maintenance services to ensure your continued success.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-3 text-gray-900">What are your pricing options?</h3>
                            <p class="text-gray-600">We offer flexible pricing plans designed to fit various budgets and project requirements.</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasCaseStudies ? `
            <!-- Case Studies -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Discover how we've helped businesses achieve their goals and drive results.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">📈</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">TechCorp Growth</h3>
                            <p class="text-gray-600 mb-4">Increased revenue by 150% through strategic optimization.</p>
                            <div class="text-sm text-gray-500">Industry: Technology</div>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🎯</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Marketing Success</h3>
                            <p class="text-gray-600 mb-4">Improved conversion rates by 200% with targeted campaigns.</p>
                            <div class="text-sm text-gray-500">Industry: Marketing</div>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🚀</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-900">Startup Launch</h3>
                            <p class="text-gray-600 mb-4">Successfully launched and scaled a new business venture.</p>
                            <div class="text-sm text-gray-500">Industry: Startup</div>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasTeam ? `
            <!-- Team -->
            <section class="py-16 px-6 bg-gray-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Our experienced professionals are dedicated to delivering exceptional results.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">John Smith</h3>
                            <p class="text-gray-600 mb-2">CEO & Founder</p>
                            <p class="text-sm text-gray-500">15+ years of industry experience</p>
                        </div>
                        <div class="text-center">
                            <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Sarah Johnson</h3>
                            <p class="text-gray-600 mb-2">Operations Director</p>
                            <p class="text-sm text-gray-500">Expert in process optimization</p>
                        </div>
                        <div class="text-center">
                            <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-900">Mike Davis</h3>
                            <p class="text-gray-600 mb-2">Lead Consultant</p>
                            <p class="text-sm text-gray-500">Specialist in growth strategies</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasNewsletter ? `
            <!-- Newsletter Signup -->
            <section class="py-16 px-6 text-white" style="background: ${colors.primary};">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p class="text-white opacity-90 mb-8 max-w-2xl mx-auto">
                        Get the latest insights and tips delivered to your inbox.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white">
                        <button class="bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" style="color: ${colors.primary};">
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

function getServiceBusinessFontFamily(designStyle) {
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

function addServiceBusinessInteractions() {
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