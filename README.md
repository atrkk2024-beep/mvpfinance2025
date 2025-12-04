# MVP Finance 2025 - Landing Page

A modern, responsive landing page for an IT payments and contracts service targeting IT specialists and companies with foreign income and expenses in Russia.

## 🚀 Features

- **Responsive Design**: Fully responsive from 320px to 2560px
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Interactive Components**:
  - Sticky navigation with mobile menu
  - Tab-based solutions section
  - Animated statistics counters
  - FAQ accordion
  - Interactive calculator
  - Multi-step forms with validation
- **SEO Optimized**: Meta tags, structured data, semantic HTML
- **Performance Optimized**: Fast loading, efficient animations
- **Accessibility**: WCAG AA compliant

## 📁 Project Structure

```
mvpfinance2025/
├── src/
│   ├── index.html          # Main HTML file
│   ├── styles/
│   │   └── main.css        # All styles and components
│   ├── scripts/
│   │   └── main.js         # JavaScript functionality
│   └── assets/
│       ├── images/
│       └── icons/
├── dist/                   # Production build (generated)
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── CLAUDE.md              # AI assistant guide
```

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Inter (Google Fonts)
- **Icons**: Inline SVG
- **No frameworks**: Pure vanilla JavaScript for maximum performance

## 📋 Prerequisites

- Node.js 16+ and npm/yarn/pnpm

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/atrkk2024-beep/mvpfinance2025.git

# Navigate to project directory
cd mvpfinance2025

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build
# or
yarn build
```

The production files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
# or
yarn preview
```

## 🎨 Design System

### Colors

- **Primary Background**: `#050509` (Dark)
- **Alt Background**: `#0f1419` (Dark Alt)
- **Surface**: `#ffffff` (White)
- **Accent**: `#2563eb` (Blue)
- **Text Primary**: `#e5e7eb` (Light Gray)
- **Text Secondary**: `#9ca3af` (Gray)

### Typography

- **Font Family**: Inter
- **H1**: 48px (32px mobile)
- **H2**: 32px (24px mobile)
- **H3**: 24px (20px mobile)
- **Body**: 16px (14px mobile)

### Spacing

- **Section Gap Large**: 120px
- **Section Gap Medium**: 80px
- **Section Gap Small**: 60px (mobile)
- **Grid Gap**: 24px

## 📝 Sections

1. **Header/Navigation**: Sticky header with smooth scroll
2. **Hero**: Main value proposition with lead capture form
3. **For Whom**: Target audience (companies, specialists, agencies)
4. **Benefits**: 6 key advantages
5. **How It Works**: 4-step process
6. **Solutions**: Tab-based solutions for different audiences
7. **Stats**: Animated counters with key metrics
8. **Security**: Compliance and security features
9. **Payments Scheme**: Visual explanation of payment flow
10. **Calculator**: Interactive commission calculator
11. **FAQ**: Accordion with common questions
12. **Final CTA**: Contact form
13. **Footer**: Links and contact information

## 🔧 Configuration

### Forms

Forms are currently configured to work with Formspree. To connect your own backend:

1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Update the form endpoint in `src/scripts/main.js`:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
});
```

### Analytics

To add Google Analytics:

1. Add your tracking code in `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the contents of the dist/ folder to your web server
```

## 🧪 Testing

### Browser Compatibility

- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

### Lighthouse Targets

- Performance: 80+
- Accessibility: 90+
- Best Practices: 85+
- SEO: 95+

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🤝 Contributing

This is a private project. For internal development:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

Copyright © 2025 MVP Finance. All rights reserved.

## 📞 Support

For technical support or questions:

- Email: hello@mvpfinance2025.com
- Phone: +7 (999) 123-45-67

## 🗺️ Roadmap

- [ ] Add blog section
- [ ] Implement multi-language support (EN, RU)
- [ ] Add client testimonials with photos
- [ ] Integrate with CRM (HubSpot, Airtable)
- [ ] Add live chat support
- [ ] Create admin dashboard for leads

## 📊 Performance Optimization

- Minified CSS and JS
- Lazy loading for images
- Optimized fonts (subset)
- Efficient animations (GPU-accelerated)
- No external dependencies (except fonts)

## 🔐 Security

- No sensitive data in frontend code
- Form validation on both client and server
- HTTPS enforced in production
- Content Security Policy headers
- Regular dependency updates

---

**Built with ❤️ for MVP Finance 2025**
