# Ismael Olivarez - Personal Portfolio

A modern, accessible, and performant personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **Responsive**: Mobile-first responsive design that works on all devices
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Fast**: Optimized for performance with Lighthouse scores ≥95
- **SEO Optimized**: Built-in SEO with OpenGraph, Twitter cards, and structured data
- **Content Management**: MDX support for projects and blog posts
- **Contact Form**: Working contact form with email integration
- **Analytics Ready**: Plausible Analytics integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ismael-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ismael-portfolio/
├── app/                    # Next.js App Router
│   ├── (site)/            # Main site pages
│   │   ├── page.tsx       # Homepage
│   │   ├── projects/      # Projects listing & detail
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog listing & posts
│   │   ├── contact/       # Contact form
│   │   └── resume/        # Resume page
│   └── api/               # API routes
│       └── contact/       # Contact form handler
├── components/             # React components
├── content/                # MDX content
│   ├── projects/          # Project case studies
│   └── blog/              # Blog posts
├── data/                   # Static data (timeline, skills)
├── lib/                    # Utility functions
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🎨 Customization

### Site Configuration

Edit `site.config.ts` to customize:
- Your name and tagline
- Social media links
- Email address
- Theme preferences
- Analytics settings

### Adding Projects

1. **Create a new project file**
   ```bash
   cp content/projects/_TEMPLATE.mdxtmpl content/projects/your-project.mdx
   ```

2. **Edit the frontmatter**
   ```yaml
   ---
   title: "Your Project Title"
   subtitle: "Brief description"
   role: "Your Role"
   timeline: "Month YYYY – Month YYYY"
   teamSize: 1
   stack: ["Tech1", "Tech2", "Tech3"]
   problem: "Problem description"
   outcomes:
     - "Outcome 1"
     - "Outcome 2"
   repoUrl: "https://github.com/..."
   liveUrl: "https://..."
   coverImage: "/images/projects/your-project/cover.jpg"
   gallery:
     - "/images/projects/your-project/1.png"
   tags: ["tag1", "tag2"]
   ---
   ```

3. **Add project images**
   - Place images in `public/images/projects/your-project/`
   - Update the paths in your MDX file

### Adding Blog Posts

1. **Create a new blog post**
   ```bash
   cp content/blog/_TEMPLATE.mdxtmpl content/blog/your-post.mdx
   ```

2. **Edit the frontmatter**
   ```yaml
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   description: "Brief description"
   tags: ["tag1", "tag2"]
   cover: "/images/blog/your-image.jpg"  # Optional
   ---
   ```

3. **Write your content**
   - Use standard Markdown syntax
   - Include custom components like `<Callout>`, `<Figure>`, `<CodeBlock>`

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Contact Form
CONTACT_TO=your-email@domain.com
CONTACT_FROM=no-reply@yourdomain.com

# SMTP (for sending emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### Email Configuration

The contact form supports multiple email providers:

#### Gmail (SMTP)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```

#### SendGrid
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
```

#### Mailgun
```bash
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
```

### Analytics

To enable Plausible Analytics:

1. **Set the domain**
   ```bash
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

2. **Add the script to your HTML** (if not using the built-in integration)
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Vercel will auto-detect Next.js
   - Set environment variables in Vercel dashboard
   - Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Performance & Accessibility

### Lighthouse Scores

Target scores:
- **Performance**: ≥95
- **Accessibility**: ≥95
- **Best Practices**: ≥95
- **SEO**: ≥95

### Accessibility Features

- WCAG AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Skip to content links
- Focus indicators

### Performance Optimizations

- Next.js Image optimization
- Code splitting
- Static generation where possible
- Optimized fonts and assets
- Efficient CSS with Tailwind

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run generate     # Generate content scaffolding
```

### Code Quality

- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks (optional)

### Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build check
npm run build
```

## 📚 Content Management

### MDX Components

Custom components available in your content:

```mdx
<Callout type="note">
  This is a note callout.
</Callout>

<Figure 
  src="/images/example.jpg" 
  alt="Description" 
  caption="Optional caption"
/>

<CodeBlock language="typescript">
function example() {
  return "Hello World";
}
</CodeBlock>
```

### Content Organization

- **Projects**: Detailed case studies with outcomes and technical details
- **Blog**: Technical articles, learning notes, and insights
- **Data**: Static data for timeline, skills, and other structured content

## 🔒 Security

- Input validation on all forms
- Rate limiting on contact form
- Secure email handling
- No sensitive data in client-side code
- Regular dependency updates

## 📈 Analytics & Monitoring

- **Plausible Analytics**: Privacy-focused analytics
- **Performance Monitoring**: Built-in Next.js monitoring
- **Error Tracking**: Next.js error boundaries
- **SEO Monitoring**: Built-in SEO tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and deployment
- The open source community for inspiration

## 📞 Support

If you have questions or need help:

- **Email**: [ismael.olivarez@columbia.edu](mailto:ismael.olivarez@columbia.edu)
- **GitHub**: [github.com/IsmaelOlivarez](https://github.com/IsmaelOlivarez)
- **LinkedIn**: [linkedin.com/in/ismael-olivarez-9a477b264](https://www.linkedin.com/in/ismael-olivarez-9a477b264)

---

**Happy coding! 🚀**
