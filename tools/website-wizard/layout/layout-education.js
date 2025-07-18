// === EDUCATION LAYOUT GENERATOR ===
// Dedicated layout for education businesses

window.renderEducationPreview = function(state) {
    console.log('renderEducationPreview called with state:', state);
    const previewContent = document.querySelector('.preview-content');
    if (!previewContent) {
        console.log('No preview content found');
        return;
    }
    console.log('Found preview content, generating education layout...');
    
    const template = getPreviewTemplate('education');
    const colors = {
        primary: state.primaryColor || template.color,
        secondary: state.secondaryColor || '#f39c12',
        accent: '#2ecc71'
    };
    
    const businessName = state.contactName ? `${state.contactName} Academy` : template.name;
    const designStyle = state.designStyle || 'Modern & Clean';
    
    // Generate the layout
    const layout = generateEducationLayout(template, colors, designStyle, businessName, state);
    
    console.log('Generated education layout length:', layout.length);
    console.log('Layout preview:', layout.substring(0, 200) + '...');
    
    previewContent.innerHTML = layout;
    console.log('Education layout applied to preview content');
    
    // Add interactive elements
    addEducationInteractions();
};

function generateEducationLayout(template, colors, designStyle, businessName, state) {
    const hasBooking = state.features && state.features.includes('Online Scheduler');
    const hasPayment = state.features && state.features.includes('Payment Processing');
    const hasTestimonials = state.pagesTrust && state.pagesTrust.includes('Testimonials');
    const hasContact = state.pagesCore && state.pagesCore.includes('Contact');
    const hasNewsletter = state.features && state.features.includes('Newsletter Signup');
    
    return `
        <div class="w-full max-w-6xl mx-auto" style="font-family: ${getEducationFontFamily(designStyle)};">
            <!-- Navigation -->
            <nav class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 rounded-full" style="background: ${colors.primary};"></div>
                        <span class="font-semibold text-gray-900">${businessName}</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Courses</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
                        <a href="#" class="text-gray-600 hover:text-gray-900">Faculty</a>
                        ${hasContact ? '<a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>' : ''}
                    </div>
                    ${hasBooking ? `
                        <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Enroll Now
                        </button>
                    ` : ''}
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-green-50 to-blue-50 py-16 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color: ${colors.primary};">
                        Unlock Your Potential
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transform your future with our comprehensive educational programs. 
                        Expert instructors, flexible learning, and proven results.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                            Explore Courses
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                            Meet Our Faculty
                        </button>
                    </div>
                </div>
            </section>

            <!-- Courses Grid -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Discover our most popular programs designed to accelerate your learning journey.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">💻</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Web Development</h3>
                            <p class="text-gray-600">Master modern web technologies and build amazing websites.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">📊</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Data Science</h3>
                            <p class="text-gray-600">Learn to analyze data and make informed business decisions.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-xl">🎨</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Digital Design</h3>
                            <p class="text-gray-600">Create stunning visuals and user experiences.</p>
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
                            We're committed to providing the best educational experience for our students.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">👨‍🏫</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Expert Instructors</h3>
                            <p class="text-gray-600">Industry professionals with real-world experience</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">📱</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Flexible Learning</h3>
                            <p class="text-gray-600">Online and in-person options available</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🎓</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Certification</h3>
                            <p class="text-gray-600">Industry-recognized certificates upon completion</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center" style="background: ${colors.primary};">
                                <span class="text-white text-2xl">🤝</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Support</h3>
                            <p class="text-gray-600">24/7 support and mentorship</p>
                        </div>
                    </div>
                </div>
            </section>

            ${hasTestimonials ? `
            <!-- Testimonials -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Hear from our graduates about their learning experience and career growth.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Alex Johnson</h4>
                                    <p class="text-gray-600 text-sm">Web Developer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"The web development course changed my career. I'm now working at a top tech company!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">Maria Garcia</h4>
                                    <p class="text-gray-600 text-sm">Data Analyst</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"Excellent instructors and practical projects. Highly recommended!"</p>
                        </div>
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 class="font-semibold">David Kim</h4>
                                    <p class="text-gray-600 text-sm">UX Designer</p>
                                </div>
                            </div>
                            <p class="text-gray-700">"The design course gave me the skills and confidence to start my own business."</p>
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            ${hasNewsletter ? `
            <!-- Newsletter Signup -->
            <section class="py-16 px-6 bg-green-600">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p class="text-green-100 mb-8 max-w-2xl mx-auto">
                        Get the latest course updates and educational resources delivered to your inbox.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white">
                        <button class="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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
                                Empowering students with quality education and practical skills for the modern workforce.
                            </p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Courses</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">Web Development</a></li>
                                <li><a href="#" class="hover:text-white">Data Science</a></li>
                                <li><a href="#" class="hover:text-white">Digital Design</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">School</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">About</a></li>
                                <li><a href="#" class="hover:text-white">Faculty</a></li>
                                <li><a href="#" class="hover:text-white">Resources</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li>info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                                <li>(555) 123-4567</li>
                                <li>123 Education St, City, State</li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ${businessName}. All rights reserved. | Accredited Institution</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function getEducationFontFamily(designStyle) {
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

function addEducationInteractions() {
    // Add hover effects to course cards
    const courseCards = document.querySelectorAll('.bg-white.p-6.rounded-lg.shadow-md');
    courseCards.forEach(card => {
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