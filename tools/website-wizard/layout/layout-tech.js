// === TECHNOLOGY STARTUP LAYOUT GENERATOR ===
// Handles layout generation for technology and startup businesses

// Override the renderTechStartupPreview function
window.renderTechStartupPreview = function(state) {
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) return;
    
    const template = getPreviewTemplate('tech-startup');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName}'s Tech` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateTechLayout(template, colors, designStyle, businessName, state);
    
    previewContent.innerHTML = layout;
    
    // Add interactive elements
    addTechPreviewInteractions();
}

function generateTechLayout(template, colors, designStyle, businessName, state) {
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasAnalytics = state.features && state.features.includes('Analytics');
    const hasLiveChat = state.features && state.features.includes('Live Chat');
    // Newsletter is now handled in Step 4 (pagesEngage), not in features
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getTechFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Products</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Features</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Pricing</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="text-gray-600 hover:text-gray-900">Sign In</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6">
                        Innovation at Your Fingertips
                    </h1>
                    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Cutting-edge technology solutions that transform your business and drive growth.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                            Start Free Trial
                        </button>
                        <button class="border border-gray-400 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="py-20 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to build, scale, and succeed in the digital age.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-12">
                        <div class="text-center">
                            <div class="w-20 h-20 rounded-full mb-6 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-3xl">🚀</span>
                            </div>
                            <h3 class="text-2xl font-semibold mb-4">Lightning Fast</h3>
                            <p class="text-gray-600">Optimized performance that keeps your applications running smoothly.</p>
                        </div>
                        <div class="text-center">
                            <div class="w-20 h-20 rounded-full mb-6 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-3xl">🔒</span>
                            </div>
                            <h3 class="text-2xl font-semibold mb-4">Enterprise Security</h3>
                            <p class="text-gray-600">Bank-level security to protect your data and your customers.</p>
                        </div>
                        <div class="text-center">
                            <div class="w-20 h-20 rounded-full mb-6 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-3xl">📊</span>
                            </div>
                            <h3 class="text-2xl font-semibold mb-4">Advanced Analytics</h3>
                            <p class="text-gray-600">Deep insights into your data to make informed decisions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Showcase -->
            <section class="py-20 px-6 bg-gray-50">
                <div class="max-w-6xl mx-auto">
                    <div class="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 class="text-4xl font-bold text-gray-900 mb-6">Built for the Future</h2>
                            <p class="text-xl text-gray-600 mb-8">
                                Our platform is designed to grow with your business, providing the tools and infrastructure you need to succeed.
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <div class="w-6 h-6 rounded-full mr-4" style="background: ${colors.primary};"></div>
                                    <span class="text-gray-700">Scalable architecture</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-6 h-6 rounded-full mr-4" style="background: ${colors.primary};"></div>
                                    <span class="text-gray-700">Real-time processing</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-6 h-6 rounded-full mr-4" style="background: ${colors.primary};"></div>
                                    <span class="text-gray-700">Global CDN</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white p-8 rounded-lg shadow-lg">
                            <div class="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <span class="text-gray-500 text-lg">Product Demo</span>
                            </div>
                            <p class="text-gray-600 text-center">Interactive product demonstration</p>
                        </div>
                    </div>
                </div>
            </section>

            ${hasTestimonials ? `
            <!-- Testimonials -->
            <section class="py-20 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            See what our customers have to say about their experience.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-8 rounded-lg">
                            <div class="flex items-center mb-6">
                                <div class="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold text-lg">Alex Chen</h4>
                                    <p class="text-gray-600">CTO, TechCorp</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-lg">"This platform has transformed how we handle our data. Incredible performance and reliability."</p>
                        </div>
                        <div class="bg-gray-50 p-8 rounded-lg">
                            <div class="flex items-center mb-6">
                                <div class="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold text-lg">Maria Rodriguez</h4>
                                    <p class="text-gray-600">VP Engineering</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-lg">"The best decision we made for our infrastructure. Scales perfectly with our growth."</p>
                        </div>
                        <div class="bg-gray-50 p-8 rounded-lg">
                            <div class="flex items-center mb-6">
                                <div class="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold text-lg">David Kim</h4>
                                    <p class="text-gray-600">Startup Founder</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-lg">"Game-changing technology that gave us the edge we needed to compete."</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}



            ${state.features && state.features.includes('Online Scheduler') ? `
            <!-- Online Scheduler Feature -->
            <section class="py-16 px-6 bg-green-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-white text-2xl">📅</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Schedule a Demo</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Book a personalized demo of our technology solutions at your convenience.
                        </p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-xl font-semibold mb-4 text-gray-900">Available Demo Slots</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                        <span class="font-medium">9:00 AM - 10:00 AM</span>
                                        <span class="text-green-600 text-sm">Available</span>
                                    </div>
                                    <div class="flex items-center justify-between p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                        <span class="font-medium">2:00 PM - 3:00 PM</span>
                                        <span class="text-green-600 text-sm">Available</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-4 text-gray-900">Schedule Demo</h3>
                                <form class="space-y-4">
                                    <input type="text" placeholder="Company Name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    <input type="email" placeholder="Email Address" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <option>Select Solution</option>
                                        <option>Enterprise Software</option>
                                        <option>Cloud Services</option>
                                    </select>
                                    <button type="button" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                        Book Demo
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
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Subscription & Billing</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Choose your plan and manage your subscription with our secure payment system.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h3 class="text-lg font-semibold mb-4 text-gray-900">Starter</h3>
                            <div class="text-3xl font-bold text-purple-600 mb-2">$29</div>
                            <div class="text-sm text-gray-600 mb-4">per month</div>
                            <button class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                                Choose Plan
                            </button>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-purple-500">
                            <h3 class="text-lg font-semibold mb-4 text-gray-900">Professional</h3>
                            <div class="text-3xl font-bold text-purple-600 mb-2">$99</div>
                            <div class="text-sm text-gray-600 mb-4">per month</div>
                            <button class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                                Choose Plan
                            </button>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <h3 class="text-lg font-semibold mb-4 text-gray-900">Enterprise</h3>
                            <div class="text-3xl font-bold text-purple-600 mb-2">$299</div>
                            <div class="text-sm text-gray-600 mb-4">per month</div>
                            <button class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasAnalytics ? `
            <!-- Analytics Feature -->
            <section class="py-16 px-6 bg-indigo-50">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="w-16 h-16 bg-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-white text-2xl">📊</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Real-Time Analytics Dashboard</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Monitor your system performance and user engagement with advanced analytics.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="text-3xl font-bold text-indigo-600">99.9%</div>
                            <div class="text-sm text-gray-600 mt-1">Uptime</div>
                            <div class="text-xs text-green-500 mt-2">↗ +0.1%</div>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="text-3xl font-bold text-indigo-600">1.2M</div>
                            <div class="text-sm text-gray-600 mt-1">API Calls</div>
                            <div class="text-xs text-green-500 mt-2">↗ +15.3%</div>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="text-3xl font-bold text-indigo-600">2.3s</div>
                            <div class="text-sm text-gray-600 mt-1">Response Time</div>
                            <div class="text-xs text-green-500 mt-2">↗ -12%</div>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div class="text-3xl font-bold text-indigo-600">847</div>
                            <div class="text-sm text-gray-600 mt-1">Active Users</div>
                            <div class="text-xs text-green-500 mt-2">↗ +23%</div>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Footer -->
            <footer class="bg-gray-900 text-white py-16 px-6">
                <div class="max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-4 gap-12">
                        <div>
                            <h3 class="text-xl font-semibold mb-6">${businessName}</h3>
                            <p class="text-gray-400 mb-6">
                                Leading the future of technology with innovative solutions that drive business growth.
                            </p>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-white">Twitter</a>
                                <a href="#" class="text-gray-400 hover:text-white">LinkedIn</a>
                                <a href="#" class="text-gray-400 hover:text-white">GitHub</a>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-6">Product</h4>
                            <ul class="space-y-3 text-gray-400">
                                <li><a href="#" class="hover:text-white">Features</a></li>
                                <li><a href="#" class="hover:text-white">Pricing</a></li>
                                <li><a href="#" class="hover:text-white">API</a></li>
                                <li><a href="#" class="hover:text-white">Documentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-6">Company</h4>
                            <ul class="space-y-3 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Blog</a></li>
                                <li><a href="#" class="hover:text-white">Careers</a></li>
                                <li><a href="#" class="hover:text-white">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-6">Support</h4>
                            <ul class="space-y-3 text-gray-400">
                                <li><a href="#" class="hover:text-white">Help Center</a></li>
                                <li><a href="#" class="hover:text-white">Contact</a></li>
                                <li><a href="#" class="hover:text-white">Status</a></li>
                                <li><a href="#" class="hover:text-white">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ${businessName}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function getTechFontFamily(designStyle) {
    switch (designStyle) {
        case 'Modern & Clean':
            return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        case 'Bold & Creative':
            return "'Poppins', 'Arial', sans-serif";
        case 'Professional & Corporate':
            return "'SF Pro Display', 'Arial', sans-serif";
        case 'Minimalist':
            return "'Helvetica Neue', 'Arial', sans-serif";
        case 'Luxury & Premium':
            return "'SF Pro Display', 'Arial', sans-serif";
        default:
            return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
}

function addTechPreviewInteractions() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.text-center');
    featureCards.forEach(card => {
        if (card.querySelector('.w-20.h-20')) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
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
    
    // Add hover effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.bg-gray-50.p-8.rounded-lg');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Export functions for use in other modules
window.techLayoutFunctions = {
    renderTechStartupPreview,
    generateTechLayout,
    getTechFontFamily,
    addTechPreviewInteractions
}; 