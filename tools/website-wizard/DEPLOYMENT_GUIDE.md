# 🚀 Consultation Wizard Deployment Guide

Complete step-by-step guide to deploy your consultation wizard with backend functionality.

## 📋 Overview

Your consultation wizard now includes:
- ✅ **Frontend**: Complete 10-step wizard with file uploads
- ✅ **Backend**: Node.js server with PDF generation and ZIP packaging
- ✅ **Email Integration**: Automatic project handoff to developers
- ✅ **Professional Output**: PDF briefs, README files, onboarding docs

## 🔥 Quick Start (5 Minutes)

### 1. Deploy Backend to Render (Free)

**Step 1:** Push your code to GitHub (if not already)

**Step 2:** Go to [render.com](https://render.com) and sign up

**Step 3:** Click "New +" → "Web Service"

**Step 4:** Connect your GitHub repository

**Step 5:** Configure the service:
- **Name**: `consultation-wizard-backend`
- **Root Directory**: `tools/website-wizard/backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Step 6:** Add Environment Variables:
```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@thwebworks.com
```

**Step 7:** Click "Deploy"

Your backend will be available at: `https://consultation-wizard-backend-xxxx.onrender.com`

### 2. Update Frontend Configuration

**Step 1:** Open `tools/website-wizard/consult.html`

**Step 2:** Find this section:
```javascript
// Configure backend URL (change this when you deploy your backend)
window.BACKEND_URL = 'http://localhost:3001'; // Local development
// window.BACKEND_URL = 'https://your-app.render.com'; // Production (uncomment and update)
```

**Step 3:** Update to your deployed URL:
```javascript
// Configure backend URL (change this when you deploy your backend)
// window.BACKEND_URL = 'http://localhost:3001'; // Local development
window.BACKEND_URL = 'https://consultation-wizard-backend-xxxx.onrender.com'; // Production
```

### 3. Deploy Frontend to GitHub Pages

Your frontend can stay on GitHub Pages since it's all static files.

**Step 1:** Commit your changes:
```bash
git add .
git commit -m "Add backend integration and deployment config"
git push origin main
```

**Step 2:** Enable GitHub Pages in your repository settings

## 📧 Email Setup (Recommended)

### Gmail Configuration

**Step 1:** Enable 2-Factor Authentication on your Google account

**Step 2:** Generate App Password:
- Go to Google Account → Security → App passwords
- Select "Mail" and generate password
- Copy the 16-character password

**Step 3:** Add to Render Environment Variables:
```
SMTP_USER=your.email@gmail.com
SMTP_PASS=abcd-efgh-ijkl-mnop (the app password)
```

### Test Email Functionality

1. Submit a test consultation
2. Check that emails are sent successfully
3. Verify ZIP attachments work properly

## 🧪 Testing Your Deployment

### 1. Backend Health Check
Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### 2. Complete Consultation Test
1. Fill out entire consultation wizard
2. Upload some test files
3. Submit the form
4. Verify:
   - ✅ Success message appears
   - ✅ Download link works
   - ✅ ZIP contains all files
   - ✅ Email is sent (if configured)

### 3. Download Package Test
The generated ZIP should contain:
- `project-brief.pdf` - Professional PDF
- `README.md` - Project overview
- `onboarding-checklist.md` - Developer guide
- `/assets/` - All uploaded files

## 🚀 Alternative Deployment Options

### Railway (Alternative to Render)

**Pros**: Automatic deployments, simple setup
**Cons**: Limited free tier

1. Connect repo to [railway.app](https://railway.app)
2. Select backend folder
3. Add environment variables
4. Deploy automatically

### Fly.io (More Advanced)

**Pros**: Global edge deployment, generous free tier
**Cons**: Requires Docker knowledge

1. Install Fly CLI
2. Create `fly.toml` config
3. Deploy with `fly deploy`

### Vercel (Serverless)

**Pros**: Serverless, automatic scaling
**Cons**: File upload limitations, cold starts

1. Install Vercel CLI
2. Deploy with `vercel`
3. Configure as Node.js function

## 🔧 Production Optimizations

### 1. Security Enhancements
```javascript
// Add CORS protection in server.js
app.use(cors({
  origin: ['https://your-github-pages-url.github.io'],
  credentials: true
}));
```

### 2. Rate Limiting
```bash
npm install express-rate-limit
```

### 3. File Size Monitoring
- Monitor storage usage on Render
- Set up cleanup cron jobs for old files
- Consider cloud storage (AWS S3) for large volumes

### 4. Error Monitoring
- Add Sentry for error tracking
- Set up health check monitoring
- Configure log aggregation

## 📊 Analytics & Monitoring

### Track Consultations
Add Google Analytics or Plausible to track:
- Consultation completions
- Step abandonment rates
- Popular business types
- Average file upload sizes

### Server Monitoring
Monitor your backend for:
- Response times
- Error rates
- Memory usage
- Disk space

## 🔥 Going Live Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend updated with production URL
- [ ] Email sending working
- [ ] Test consultation completed successfully
- [ ] ZIP download working
- [ ] PDF generation working
- [ ] All environment variables set
- [ ] HTTPS enabled
- [ ] Error monitoring set up
- [ ] Backup strategy in place

## 🚨 Troubleshooting

### Common Issues:

**"Failed to fetch" errors:**
- Check CORS configuration
- Verify backend URL in frontend
- Ensure backend is running

**Email not sending:**
- Verify SMTP credentials
- Check app password (not regular password)
- Look for emails in spam folder

**PDF generation fails:**
- Increase memory allocation on Render
- Check for missing dependencies
- Verify Puppeteer installation

**File uploads fail:**
- Check file size limits (25MB)
- Verify multer configuration
- Ensure sufficient disk space

### Debug Commands:
```bash
# Check backend logs
curl https://your-backend-url.onrender.com/health

# Test file upload locally
cd tools/website-wizard/backend
npm run dev
```

## 🎯 Success Metrics

Your deployment is successful when:
- ✅ Wizard completes all 10 steps
- ✅ Files upload properly
- ✅ PDF brief generates correctly
- ✅ ZIP package downloads
- ✅ Email sends to developer
- ✅ Package contains all materials

## 🚀 Next Steps

After successful deployment:
1. **Marketing**: Share your consultation wizard URL
2. **Analytics**: Set up conversion tracking
3. **Feedback**: Collect user feedback for improvements
4. **Scaling**: Monitor usage and upgrade hosting as needed
5. **Features**: Add integrations (CRM, project management tools)

---

**🎉 Congratulations! Your consultation wizard is now live and ready to streamline your project handoffs to Fiverr developers!**

*Generated by T&H WebWorks Consultation Wizard*