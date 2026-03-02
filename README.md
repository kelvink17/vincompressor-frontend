# VinCompressor Frontend

**Modern React + Vite application** with industry-level UI for file compression.

## 🎨 Design Highlights

- **Dark Theme**: Professional dark mode design
- **Smooth Animations**: Framer Motion for fluid interactions
- **Responsive Layout**: Mobile-first, works on all devices
- **Real-time Feedback**: Live compression progress and stats
- **Accessibility**: WCAG compliant with semantic HTML

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header
│   ├── FileUploadZone.jsx      # Drag-drop upload area
│   ├── CompressionSettings.jsx # Compression options
│   ├── CompressionResult.jsx   # Results display
│   └── FeaturesSection.jsx     # Features showcase
├── api/
│   └── compressionApi.js       # API client
├── App.jsx                     # Main app component
├── main.jsx                    # React entry point
└── index.css                   # Global styles
```

## 🔧 Configuration

### Environment Variables

```env
VITE_API_URL=http://localhost:5000
```

### Tailwind CSS

Custom theme configuration in `tailwind.config.js`:
- Primary colors: Teal/Cyan
- Dark palette: From 950 to 100
- Custom animations and utilities

## 📦 Components

### Header
Navigation bar with logo and links
- Sticky positioning
- Logo with animation
- GitHub link

### FileUploadZone
Drag-and-drop file upload
- Multi-file support
- Drag-over effects
- File list display
- Remove file functionality

### CompressionSettings
Compression options panel
- Format selection (ZIP, GZIP, Brotli)
- Compression level slider
- Preserve structure toggle
- Real-time descriptions

### CompressionResult
Results and statistics display
- Compression statistics
- Size reduction visualization
- Download button
- New compression button

### FeaturesSection
Feature showcase grid
- 6 feature cards
- Icon animations
- Hover effects

## 🎯 Features

### File Upload
- Drag and drop support
- Click to browse
- Multi-file selection
- File size validation
- Visual file list

### Compression Settings
- 3 format options (ZIP, GZIP, Brotli)
- Adjustable compression level (0-11)
- Real-time descriptions
- Preserve structure option
- Format-specific settings

### Results Display
- Success confirmation
- Size statistics:
  - Original size
  - Compressed size
  - Compression ratio
- Visual progress bar
- Download link
- New compression button

### UI/UX
- Smooth animations
- Loading states
- Error handling
- Real-time feedback
- Mobile responsive
- Dark theme with teal accents

## 🎨 Styling

### Color Palette

```css
Primary: Teal (#14b8a6)
Accent: Cyan (#2dd4bf)
Dark Background: #111827
Dark Lighter: #1f2937
Borders: #374151
Text: #e5e7eb
```

### Tailwind Classes

Custom utilities in `globals.css`:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card component
- `.gradient-text` - Gradient text effect
- `.glow` - Glow effect

## 🔌 API Integration

### compressionApi.js

Methods:
- `getFormats()` - Fetch available formats
- `compressFile(file, format, level, preserveStructure)` - Single file compression
- `compressFiles(files, format, level)` - Batch compression
- `downloadFile(fileId)` - Download compressed file
- `healthCheck()` - API health check

### Error Handling

- Network error handling
- User-friendly error messages
- Retry mechanisms
- Timeout handling (10 minutes)

## 🚀 Production Build

```bash
# Build optimized production bundle
npm run build

# Output in dist/ directory
# Ready to deploy to Vercel
```

### Deployment to Vercel

```bash
# Using Vercel CLI
vercel

# Or connect GitHub repository directly
# https://vercel.com
```

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly.

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🧪 Development

### Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^5.0.8",
  "tailwindcss": "^3.3.6",
  "framer-motion": "^10.16.16",
  "lucide-react": "^0.344.0",
  "axios": "^1.6.2"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16"
}
```

## 🎬 Animations

- Page transitions
- Button hover/tap effects
- File upload drag-over
- Result display animations
- Progress bar animations
- Component entrance animations

## 📊 State Management

Using React hooks:
- `useState` - Component state
- `useRef` - DOM references
- `useEffect` - Side effects

## 🔄 Data Flow

```
User Input (FileUploadZone)
    ↓
State Updates (App.jsx)
    ↓
API Call (compressionApi)
    ↓
Backend Processing
    ↓
Result Display (CompressionResult)
    ↓
Download
```

## 🐛 Troubleshooting

### API Connection Failed
- Check backend is running
- Verify `VITE_API_URL` in `.env`
- Check CORS settings

### Upload Fails
- Check file size (max 500MB)
- Verify file type
- Check disk space

### Slow Performance
- Check network speed
- Monitor browser memory
- Check backend load

## 📈 Performance Optimization

- Code splitting with Vite
- Lazy component loading
- Image optimization
- CSS minimization
- JavaScript minification

## 🚢 Deployment Checklist

- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] `.env` configured correctly
- [ ] API URL points to backend
- [ ] Mobile responsive tested
- [ ] All features working

## 📝 Notes for Developers

1. **API Calls**: Uses Axios with timeout of 10 minutes
2. **File Size**: Limited to 500MB per file
3. **Batch Upload**: Maximum 50 files
4. **Compression**: Processed on backend
5. **Downloads**: Auto-delete after download

## 🎯 Future Enhancements

- [ ] Drag-drop sorting
- [ ] Preview compressed files
- [ ] History/cache
- [ ] Browser storage
- [ ] Advanced filters
- [ ] Team sharing

---

**Built with React, Vite, and Tailwind CSS**
