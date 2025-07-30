# Consultation Wizard Backend

A complete Node.js backend for the T&H WebWorks consultation wizard that handles form submissions, file uploads, PDF generation, and creates downloadable project packages for developers.

## 🚀 Features

- **File Upload Handling**: Supports images, documents, videos, design files (25MB limit)
- **PDF Generation**: Creates professional project briefs using Puppeteer
- **ZIP Package Creation**: Bundles all project materials into downloadable packages
- **Email Delivery**: Sends project packages to developers via SMTP
- **Developer Onboarding**: Includes checklists and documentation

## 📦 What Gets Generated

Each consultation creates a downloadable ZIP package containing:

- `project-brief.pdf` - Professional PDF with all consultation details
- `README.md` - Developer-friendly project overview
- `onboarding-checklist.md` - Step-by-step developer guide
- `/assets/` folder - All uploaded client files and resources

## 🛠 Installation & Setup

### 1. Install Dependencies
```bash
cd tools/website-wizard/backend
npm install
```

### 2. Environment Configuration
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your settings
```

### 3. Required Environment Variables
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- Email settings (optional but recommended):
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

### 4. Start Development Server
```bash
npm run dev
```

### 5. Start Production Server
```bash
npm start
```

## 🌐 Deployment Options

### Option 1: Render (Recommended - Free Tier)
1. Push your code to GitHub
2. Connect your repo to [Render.com](https://render.com)
3. Create a new Web Service
4. Set build command: `cd tools/website-wizard/backend && npm install`
5. Set start command: `cd tools/website-wizard/backend && npm start`
6. Add environment variables in Render dashboard

### Option 2: Railway
1. Connect your GitHub repo to [Railway.app](https://railway.app)
2. Select the backend folder as root
3. Railway auto-detects Node.js and installs dependencies
4. Add environment variables in Railway dashboard

### Option 3: Fly.io
1. Install Fly CLI
2. Create `fly.toml` in backend directory
3. Run `fly deploy`

### Option 4: Vercel (Serverless)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in backend directory
3. Configure as Node.js function

## 📧 Email Setup

### Gmail Setup (Recommended)
1. Enable 2-factor authentication
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use your Gmail address as `SMTP_USER`
5. Use the generated app password as `SMTP_PASS`

### Environment Variables for Gmail:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=noreply@thwebworks.com
```

## 🔧 API Endpoints

### POST `/create-package`
Handles consultation form submission and file uploads.

**Request:**
- `multipart/form-data`
- `consultationData`: JSON string with form data
- `assets`: Multiple file uploads

**Response:**
```json
{
  "success": true,
  "sessionId": "uuid",
  "downloadUrl": "/download/filename.zip",
  "packageInfo": {
    "filename": "project-handoff.zip",
    "projectName": "Client Website",
    "clientName": "John Doe",
    "fileCount": 5
  }
}
```

### GET `/download/:filename`
Downloads generated project packages.

### GET `/health`
Health check endpoint.

## 📁 File Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── env.example            # Environment template
├── README.md              # This file
├── uploads/               # Temporary file uploads
├── temp/                  # Processing directory
└── output/                # Generated ZIP files
```

## 🚀 Updating Frontend

After deploying your backend, update the frontend to use the real endpoint:

1. Open `tools/website-wizard/wizard.js`
2. Find the line: `fetch('https://example-backend.com/create-package'`
3. Replace with your deployed URL: `fetch('https://your-app.render.com/create-package'`

## 🐛 Troubleshooting

### Common Issues:

**"Module not found" errors:**
```bash
npm install
```

**PDF generation fails:**
- Ensure you have enough memory (Puppeteer needs ~100MB)
- For Render/Railway, use at least 512MB memory

**File uploads fail:**
- Check file size (25MB limit)
- Verify multer configuration
- Check disk space

**Email not sending:**
- Verify SMTP credentials
- Check spam/junk folders
- Ensure app passwords are used (not regular passwords)

### Debug Mode:
```bash
NODE_ENV=development npm run dev
```

## 🔒 Security Notes

- Never commit `.env` files
- Use app passwords, not regular passwords
- Set appropriate CORS origins for production
- Consider rate limiting for production deployments

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Test endpoints individually
4. Contact T&H WebWorks support

---

**Generated by T&H WebWorks Consultation Wizard**