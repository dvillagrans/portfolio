# 🚀 Diego Villagran - Data Scientist & Full-Stack Developer Portfolio

A modern, responsive portfolio website showcasing my work in data science, machine learning, and web development. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Live Demo

[**View Portfolio →**](https://www.dvillagrans.dev/)

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with dark/light mode support
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **⚡ Performance Optimized**: Built with Next.js 14 App Router for lightning-fast loading
- **🎭 Smooth Animations**: Framer Motion animations with blur fade effects
- **📊 Interactive Components**: Dynamic project showcases and skill visualizations
- **🔍 Project Filtering**: Advanced filtering system for project exploration
- **📝 MDX Blog Support**: Ready for technical articles and case studies
- **🌐 SEO Optimized**: Meta tags, structured data, and sitemap included

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
