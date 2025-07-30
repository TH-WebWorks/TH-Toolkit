const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const tempDir = path.join(__dirname, 'temp');
const outputDir = path.join(__dirname, 'output');

fs.ensureDirSync(uploadsDir);
fs.ensureDirSync(tempDir);
fs.ensureDirSync(outputDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sessionId = req.body.sessionId || uuidv4();
    const sessionDir = path.join(uploadsDir, sessionId);
    fs.ensureDirSync(sessionDir);
    cb(null, sessionDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename with timestamp prefix
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'application/zip', 'application/x-zip-compressed',
      'video/mp4', 'video/mov', 'video/quicktime'
    ];
    
    const allowedExtensions = ['.ai', '.psd', '.sketch', '.fig'];
    const hasAllowedExtension = allowedExtensions.some(ext => 
      file.originalname.toLowerCase().endsWith(ext)
    );
    
    if (allowedTypes.includes(file.mimetype) || hasAllowedExtension) {
      cb(null, true);
    } else {
      cb(new Error(`File type not supported: ${file.mimetype}`), false);
    }
  }
});

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Generate project brief PDF
async function generateProjectBrief(consultationData, sessionId) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #3abbfa; padding-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
        .subtitle { color: #7f8c8d; font-size: 16px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #2c3e50; margin-bottom: 15px; padding-left: 10px; border-left: 4px solid #3abbfa; }
        .field { margin-bottom: 12px; }
        .field-label { font-weight: 600; color: #34495e; display: inline-block; min-width: 150px; }
        .field-value { color: #2c3e50; }
        .list-item { margin-left: 20px; margin-bottom: 5px; }
        .highlight-box { background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 20px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ecf0f1; text-align: center; color: #7f8c8d; font-size: 14px; }
        .date { color: #7f8c8d; font-size: 14px; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T&H WebWorks</div>
          <div class="subtitle">Professional Website Development Project Brief</div>
          <div class="date">Generated: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Project Overview</div>
          <div class="field">
            <span class="field-label">Project Name:</span>
            <span class="field-value">${consultationData.projectName || 'Website Development Project'}</span>
          </div>
          <div class="field">
            <span class="field-label">Business Type:</span>
            <span class="field-value">${consultationData.businessType}</span>
          </div>
          <div class="field">
            <span class="field-label">Target Completion:</span>
            <span class="field-value">${consultationData.projectDeadline || 'Not specified'}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📞 Client Information</div>
          <div class="field">
            <span class="field-label">Contact Name:</span>
            <span class="field-value">${consultationData.contactName}</span>
          </div>
          <div class="field">
            <span class="field-label">Email:</span>
            <span class="field-value">${consultationData.email}</span>
          </div>
          <div class="field">
            <span class="field-label">Phone:</span>
            <span class="field-value">${consultationData.phone}</span>
          </div>
          <div class="field">
            <span class="field-label">Budget Range:</span>
            <span class="field-value">${consultationData.budget}</span>
          </div>
          <div class="field">
            <span class="field-label">Timeline:</span>
            <span class="field-value">${consultationData.timeline}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🚀 Project Goals</div>
          ${consultationData.goals && consultationData.goals.length > 0 ? 
            consultationData.goals.map(goal => `<div class="list-item">• ${goal}</div>`).join('') :
            '<div class="field-value">No specific goals listed</div>'
          }
        </div>

        <div class="section">
          <div class="section-title">📄 Website Pages & Structure</div>
          <div class="field">
            <span class="field-label">Core Pages:</span>
            <span class="field-value">${consultationData.pagesCore ? consultationData.pagesCore.join(', ') : 'Not specified'}</span>
          </div>
          <div class="field">
            <span class="field-label">Trust Pages:</span>
            <span class="field-value">${consultationData.pagesTrust ? consultationData.pagesTrust.join(', ') : 'None'}</span>
          </div>
          <div class="field">
            <span class="field-label">Engagement Pages:</span>
            <span class="field-value">${consultationData.pagesEngage ? consultationData.pagesEngage.join(', ') : 'None'}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">⚙️ Features & Functionality</div>
          ${consultationData.features && consultationData.features.length > 0 ? 
            consultationData.features.map(feature => `<div class="list-item">• ${feature}</div>`).join('') :
            '<div class="field-value">No specific features listed</div>'
          }
        </div>

        <div class="page-break"></div>

        <div class="section">
          <div class="section-title">🎨 Design Specifications</div>
          <div class="field">
            <span class="field-label">Design Style:</span>
            <span class="field-value">${consultationData.designStyle || 'Modern & Clean'}</span>
          </div>
          <div class="field">
            <span class="field-label">Primary Color:</span>
            <span class="field-value">${consultationData.primaryColor || '#3abbfa'}</span>
          </div>
          <div class="field">
            <span class="field-label">Secondary Color:</span>
            <span class="field-value">${consultationData.secondaryColor || '#f39c12'}</span>
          </div>
          ${consultationData.exampleSites ? `
          <div class="field">
            <span class="field-label">Reference Sites:</span>
            <span class="field-value">${consultationData.exampleSites}</span>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <div class="section-title">🔧 Technical Requirements</div>
          <div class="field">
            <span class="field-label">Domain Status:</span>
            <span class="field-value">${consultationData.hasDomain || 'Not specified'}</span>
          </div>
          ${consultationData.domainName ? `
          <div class="field">
            <span class="field-label">Domain Name:</span>
            <span class="field-value">${consultationData.domainName}</span>
          </div>
          ` : ''}
          <div class="field">
            <span class="field-label">Hosting Preference:</span>
            <span class="field-value">${consultationData.hostingPreference || 'Developer choice'}</span>
          </div>
          <div class="field">
            <span class="field-label">Required Integrations:</span>
            <span class="field-value">${consultationData.integrations ? consultationData.integrations.join(', ') : 'None specified'}</span>
          </div>
          <div class="field">
            <span class="field-label">SEO Requirements:</span>
            <span class="field-value">${consultationData.seoRequirements ? consultationData.seoRequirements.join(', ') : 'None specified'}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📋 Project Management</div>
          <div class="field">
            <span class="field-label">Content Responsibility:</span>
            <span class="field-value">${consultationData.contentResponsibility || 'Client'}</span>
          </div>
          <div class="field">
            <span class="field-label">Communication Methods:</span>
            <span class="field-value">${consultationData.communicationMethods ? consultationData.communicationMethods.join(', ') : 'Fiverr Messages'}</span>
          </div>
          <div class="field">
            <span class="field-label">Post-Launch Support:</span>
            <span class="field-value">${consultationData.postLaunchSupport || 'Basic'}</span>
          </div>
          ${consultationData.developerEmail ? `
          <div class="field">
            <span class="field-label">Developer Email:</span>
            <span class="field-value">${consultationData.developerEmail}</span>
          </div>
          ` : ''}
        </div>

        ${consultationData.handoffNotes ? `
        <div class="section">
          <div class="section-title">📝 Additional Notes</div>
          <div class="highlight-box">
            ${consultationData.handoffNotes.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}

        ${consultationData.additionalNotes ? `
        <div class="section">
          <div class="section-title">💬 Client Notes</div>
          <div class="highlight-box">
            ${consultationData.additionalNotes.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <p><strong>T&H WebWorks</strong> - Professional Website Development</p>
          <p>Session ID: ${sessionId}</p>
          <p>This document was automatically generated from the consultation wizard.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  
  const pdfPath = path.join(tempDir, `project-brief-${sessionId}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
  return pdfPath;
}

// Generate README for developers
function generateReadmeContent(consultationData) {
  return `# ${consultationData.projectName || 'Website Development Project'}

## 📋 Project Overview
**Client:** ${consultationData.contactName}  
**Business Type:** ${consultationData.businessType}  
**Target Completion:** ${consultationData.projectDeadline || 'Not specified'}  
**Budget:** ${consultationData.budget}  

## 🎯 Project Goals
${consultationData.goals && consultationData.goals.length > 0 ? 
  consultationData.goals.map(goal => `- ${goal}`).join('\n') : 
  'No specific goals listed'
}

## 📄 Required Pages
**Core Pages:** ${consultationData.pagesCore ? consultationData.pagesCore.join(', ') : 'Not specified'}  
**Trust Pages:** ${consultationData.pagesTrust ? consultationData.pagesTrust.join(', ') : 'None'}  
**Engagement Pages:** ${consultationData.pagesEngage ? consultationData.pagesEngage.join(', ') : 'None'}  

## ⚙️ Features & Functionality
${consultationData.features && consultationData.features.length > 0 ? 
  consultationData.features.map(feature => `- ${feature}`).join('\n') : 
  'No specific features listed'
}

## 🎨 Design Requirements
- **Style:** ${consultationData.designStyle || 'Modern & Clean'}
- **Primary Color:** ${consultationData.primaryColor || '#3abbfa'}
- **Secondary Color:** ${consultationData.secondaryColor || '#f39c12'}
${consultationData.exampleSites ? `- **Reference Sites:** ${consultationData.exampleSites}` : ''}

## 🔧 Technical Specifications
- **Domain:** ${consultationData.hasDomain || 'Not specified'} ${consultationData.domainName ? `(${consultationData.domainName})` : ''}
- **Hosting:** ${consultationData.hostingPreference || 'Developer choice'}
- **Integrations:** ${consultationData.integrations ? consultationData.integrations.join(', ') : 'None specified'}
- **SEO Requirements:** ${consultationData.seoRequirements ? consultationData.seoRequirements.join(', ') : 'None specified'}

## 📞 Communication & Management
- **Content Responsibility:** ${consultationData.contentResponsibility || 'Client'}
- **Communication:** ${consultationData.communicationMethods ? consultationData.communicationMethods.join(', ') : 'Fiverr Messages'}
- **Post-Launch Support:** ${consultationData.postLaunchSupport || 'Basic'}
${consultationData.developerEmail ? `- **Developer Email:** ${consultationData.developerEmail}` : ''}

## 📝 Additional Notes
${consultationData.handoffNotes ? consultationData.handoffNotes : 'No additional notes provided'}

## 📞 Client Contact
- **Name:** ${consultationData.contactName}
- **Email:** ${consultationData.email}
- **Phone:** ${consultationData.phone}

---
*Generated by T&H WebWorks Consultation Wizard*
*Session: ${new Date().toISOString()}*
`;
}

// Create project ZIP package
async function createProjectPackage(consultationData, sessionId, uploadedFiles) {
  const packageDir = path.join(tempDir, `package-${sessionId}`);
  const assetsDir = path.join(packageDir, 'assets');
  
  // Create package structure
  fs.ensureDirSync(packageDir);
  fs.ensureDirSync(assetsDir);
  
  // Generate PDF brief
  const pdfPath = await generateProjectBrief(consultationData, sessionId);
  const finalPdfPath = path.join(packageDir, 'project-brief.pdf');
  fs.copyFileSync(pdfPath, finalPdfPath);
  
  // Generate README
  const readmeContent = generateReadmeContent(consultationData);
  fs.writeFileSync(path.join(packageDir, 'README.md'), readmeContent);
  
  // Copy uploaded assets
  if (uploadedFiles && uploadedFiles.length > 0) {
    uploadedFiles.forEach(file => {
      const sourcePath = file.path;
      const destPath = path.join(assetsDir, file.originalname);
      fs.copyFileSync(sourcePath, destPath);
    });
  }
  
  // Create onboarding documents
  const onboardingContent = `# Developer Onboarding Checklist

## 🚀 Getting Started
- [ ] Review project brief PDF
- [ ] Check all uploaded assets in /assets folder
- [ ] Confirm technical requirements
- [ ] Set up development environment
- [ ] Create staging repository

## 📞 Communication Protocol
- Primary: ${consultationData.communicationMethods ? consultationData.communicationMethods.join(', ') : 'Fiverr Messages'}
- Client Email: ${consultationData.email}
- Timeline: ${consultationData.timeline}

## ✅ Success Criteria
- Responsive design (mobile + desktop)
- All requested pages implemented
- Required integrations working
- SEO basics implemented
- Performance optimized
- Cross-browser compatible

## 📅 Milestone Suggestions
1. **Week 1:** Wireframes & initial design
2. **Week 2:** Core pages development
3. **Week 3:** Features & integrations
4. **Week 4:** Testing & refinement

---
*T&H WebWorks Developer Package*
`;
  
  fs.writeFileSync(path.join(packageDir, 'onboarding-checklist.md'), onboardingContent);
  
  // Create ZIP
  const zipPath = path.join(outputDir, `${consultationData.contactName?.replace(/[^a-zA-Z0-9]/g, '-') || 'project'}-handoff-${sessionId}.zip`);
  
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => resolve(zipPath));
    archive.on('error', reject);
    
    archive.pipe(output);
    archive.directory(packageDir, false);
    archive.finalize();
  });
}

// Send email to developer/client
async function sendProjectEmail(consultationData, zipPath, sessionId) {
  const filename = path.basename(zipPath);
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@thwebworks.com',
    to: consultationData.developerEmail || consultationData.email,
    subject: `New Project Handoff: ${consultationData.projectName || 'Website Development'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #3abbfa; color: white; padding: 20px; text-align: center;">
          <h1>T&H WebWorks</h1>
          <h2>Project Handoff Package Ready</h2>
        </div>
        
        <div style="padding: 20px;">
          <p>Hi there,</p>
          
          <p>A new website development project is ready for handoff:</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Project:</strong> ${consultationData.projectName || 'Website Development'}<br>
            <strong>Client:</strong> ${consultationData.contactName}<br>
            <strong>Business Type:</strong> ${consultationData.businessType}<br>
            <strong>Target Date:</strong> ${consultationData.projectDeadline || 'TBD'}<br>
            <strong>Budget:</strong> ${consultationData.budget}
          </div>
          
          <p>The complete project package includes:</p>
          <ul>
            <li>📄 Detailed project brief (PDF)</li>
            <li>📁 All client assets and resources</li>
            <li>📋 Developer onboarding checklist</li>
            <li>📞 Client contact information</li>
            <li>⚙️ Technical specifications</li>
          </ul>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Download the attached project package</li>
            <li>Review all documentation</li>
            <li>Set up your development environment</li>
            <li>Contact the client to confirm timeline</li>
          </ol>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>📞 Client Contact:</strong><br>
            Email: ${consultationData.email}<br>
            Phone: ${consultationData.phone}
          </div>
          
          <p>Questions? Reply to this email or contact T&H WebWorks support.</p>
          
          <p>Best regards,<br>
          <strong>T&H WebWorks Team</strong></p>
        </div>
        
        <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          Session ID: ${sessionId} | Generated: ${new Date().toLocaleString()}
        </div>
      </div>
    `,
    attachments: [
      {
        filename: filename,
        path: zipPath
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}

// Main endpoint for handling consultation submissions
app.post('/create-package', upload.array('assets'), async (req, res) => {
  let sessionId = uuidv4();
  
  try {
    // Parse consultation data
    const consultationData = JSON.parse(req.body.consultationData || '{}');
    console.log('Received consultation:', consultationData);
    console.log('Uploaded files:', req.files?.length || 0);
    
    // Generate project package
    const zipPath = await createProjectPackage(consultationData, sessionId, req.files);
    console.log('Package created:', zipPath);
    
    // Send email if configured and email provided
    if (process.env.SMTP_USER && (consultationData.developerEmail || consultationData.sendEmailCopy)) {
      try {
        await sendProjectEmail(consultationData, zipPath, sessionId);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole request if email fails
      }
    }
    
    // Return success response with download link
    res.json({
      success: true,
      message: 'Project package created successfully',
      sessionId: sessionId,
      downloadUrl: `/download/${path.basename(zipPath)}`,
      packageInfo: {
        filename: path.basename(zipPath),
        projectName: consultationData.projectName,
        clientName: consultationData.contactName,
        fileCount: req.files?.length || 0
      }
    });
    
  } catch (error) {
    console.error('Package creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project package',
      details: error.message
    });
  }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(outputDir, filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Download failed');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Consultation wizard backend running on port ${PORT}`);
  console.log(`📧 Email configured: ${process.env.SMTP_USER ? 'Yes' : 'No'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});