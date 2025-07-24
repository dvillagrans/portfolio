# Portfolio - Diego Villagran

🚀 **Modern Portfolio Website** built with cutting-edge technologies and optimized for performance, SEO, and user experience.

## ✨ Features

### 🎨 **Design & UX**
- Modern, responsive design with dark/light theme support
- Smooth animations and micro-interactions using Framer Motion
- Interactive components with hover effects and transitions
- Mobile-first responsive design

### 🔧 **Technical Features**
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom animations
- **Magic UI** components for enhanced interactions
- **Optimized Performance** with image optimization and lazy loading

### 📈 **SEO & Analytics**
- Complete SEO optimization with meta tags, Open Graph, and Twitter Cards
- Structured data and sitemap generation
- Google Analytics integration ready
- Performance monitoring and tracking

### 📧 **Contact & Interaction**
- Interactive contact form with validation
- Toast notifications for user feedback
- Social media integration
- Email integration ready

### 🛠 **Developer Experience**
- TypeScript for better development experience
- ESLint and Prettier configuration
- Component-based architecture
- Reusable UI components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Content & Data
- **Content**: MDX for blog posts
- **Data Management**: Static JSON configuration
- **Image Optimization**: Next.js Image component

### Development & Deployment
- **Package Manager**: pnpm
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions + Vercel
- **Code Quality**: ESLint + TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/dvillagrans/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (home)/         # Home page layout
│   │   └── projects/       # Projects showcase page
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   └── magicui/       # Custom animated components
│   ├── data/              # Portfolio data and configuration
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── content/               # MDX blog posts
├── public/               # Static assets (images, icons)
└── docs/                # Documentation
```

## 🎯 Key Sections

### 🏠 Hero Section
- Professional introduction with animated text
- Avatar with personal branding
- Clear value proposition

### 💼 Work Experience
- Timeline of professional roles
- Key achievements and metrics
- Technology stack for each position

### 🚀 Featured Projects
- **Machine Learning**: Passenger prediction (92% accuracy), House price prediction
- **Data Engineering**: ETL pipelines processing 2M+ daily records
- **Web Development**: Full-stack applications with performance optimizations
- **Data Visualization**: Interactive Power BI dashboards

### 🛠️ Technical Skills
- **Data Science**: Python, Pandas, Scikit-learn, TensorFlow
- **Cloud Platforms**: AWS, Azure, Google Cloud
- **Web Technologies**: React, Next.js, TypeScript
- **Databases**: PostgreSQL, SQL

## 📊 Project Highlights

### 🛩️ Aviation Passenger Prediction
- **Impact**: 92% forecasting accuracy for 5-year demand planning
- **Tech**: SARIMA modeling, 36 years of historical data analysis
- **Result**: Enabled capacity optimization for major carriers

### 🏠 Real Estate Price Prediction
- **Impact**: 88% R² score for property valuation
- **Tech**: Random Forest, geospatial feature engineering
- **Result**: Deployed as Flask API for real-time estimates

### 🌐 Full-Stack Web Applications
- **Impact**: 40% conversion rate improvement for wellness platform
- **Tech**: Astro/React, SEO optimization, CI/CD pipeline
- **Result**: 99.9% uptime with Vercel deployment

## 🔧 Customization

### Adding New Projects
Edit `src/data/resume.tsx` to add new projects:

```typescript
{
  title: "Your Project Name",
  href: "https://github.com/username/repo",
  dates: "Jan 2024 - Current",
  description: "Project description with impact metrics",
  technologies: ["React", "Python", "PostgreSQL"],
  links: [
    {
      type: "Source",
      href: "https://github.com/username/repo",
      icon: <Icons.github className="size-3" />,
    }
  ],
  image: { src: "/img/project-image.webp" }
}
```

### Updating Personal Information
Modify the `DATA` object in `src/data/resume.tsx` with your:
- Personal details and contact information
- Work experience and education
- Skills and technologies
- Social media links

## 📈 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All metrics in green
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Image Optimization**: WebP format with responsive loading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Diego Villagran Salazar**
- 🌐 Portfolio: [https://portfolio-pi-vert-92.vercel.app/](https://portfolio-pi-vert-92.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/dvillagrans](https://linkedin.com/in/dvillagrans)
- 📧 Email: diegovillasal@gmail.com
- 🐱 GitHub: [github.com/dvillagrans](https://github.com/dvillagrans)

---

⭐ **If you found this portfolio helpful, please consider giving it a star!**

*Built with ❤️ using Next.js, TypeScript, and modern web technologies*
