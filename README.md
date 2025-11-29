# Trip AI Planner

An intelligent AI-powered trip planning application that helps users create personalized travel itineraries with ease.

## 📋 Overview

Trip AI Planner is a modern web application that leverages artificial intelligence to create customized travel plans. Users can input their preferences, budget, group size, and destination, and the AI generates detailed itineraries complete with hotel recommendations, attractions, and daily schedules. The application also features an interactive map view and a comprehensive admin panel for managing user inquiries.


## Live Demo  
> <a href="https://travai.vercel.app/"> travai.vercel.app</a>

## ✨ Key Features

- **AI-Powered Itinerary Generation** - Intelligent trip planning based on user preferences, budget, and travel dates
- **Interactive Maps** - View destinations and attractions using Leaflet maps
- **Hotel Recommendations** - Curated hotel suggestions based on user preferences and budget
- **User Authentication** - Secure sign-in/sign-up with Clerk
- **Trip Management** - Save, view, and manage your trips
- **Contact & Messaging** - Built-in contact form for user inquiries with admin dashboard
- **Popular Destinations** - Discover trending travel destinations
- **Responsive Design** - Fully responsive UI optimized for all devices
- **Rate Limiting & Security** - Protected endpoints with Arcjet security

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.5.0](https://nextjs.org)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components + Magic UI
- **Icons**: Lucide React, React Icons, Tabler Icons
- **Maps**: Leaflet & React Leaflet

### Backend & Services
- **Database**: [Convex](https://www.convex.dev) - Backend as a Service
- **Authentication**: [Clerk](https://clerk.com)
- **AI/LLM**: OpenAI
- **HTTP Client**: Axios
- **Image Source**: Unsplash API
- **Security**: Arcjet

### Dev Tools
- **Build Tool**: Tailwind CSS PostCSS
- **Type Safety**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Clerk account for authentication
- Convex account for backend
- OpenAI API key
- Arcjet account (optional, for rate limiting)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/anu-pama-pr/trippalnner.git
   cd trip-ai-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret

   # Convex Configuration
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_key

   # Arcjet Configuration
   ARCJET_KEY=your_arcjet_key

   # Unsplash Configuration
   UNSPLASH_ACCESS_KEY=your_unsplash_key
   ```

4. **Set up Convex** (if not already done)
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## 📁 Project Structure

```
trip-ai-2/
├── app/                      # Next.js app directory
│   ├── _components/         # Reusable components
│   ├── (auth)/              # Authentication pages
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── create-new-trip/     # Trip creation page
│   ├── my-trips/            # User's saved trips
│   ├── view-trip/           # Trip detail view
│   ├── map/                 # Map visualization
│   ├── pricing/             # Pricing page
│   ├── contact-us/          # Contact form
│   └── page.tsx             # Home page
├── components/              # Shared UI components
├── context/                 # React context providers
├── convex/                  # Convex backend schema & queries
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
├── utils/                   # Helper utilities
├── middleware.ts            # Next.js middleware
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Dependencies & scripts
```

## 🔑 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero section and popular destinations |
| Create Trip | `/create-new-trip` | AI-powered trip planning interface |
| My Trips | `/my-trips` | View and manage saved trips |
| Trip Details | `/view-trip/[tripid]` | Detailed view of planned itinerary |
| Map View | `/map` | Interactive map of destinations |
| Contact Us | `/contact-us` | Contact form |
| Sign In | `/sign-in` | User authentication |
| Sign Up | `/sign-up` | User registration |
| Admin | `/admin/contact-messages` | Admin panel for managing inquiries |

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `NEXT_PUBLIC_CONVEX_URL` | Convex backend URL | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `ARCJET_KEY` | Arcjet rate limiting key | ❌ |
| `UNSPLASH_ACCESS_KEY` | Unsplash API key | ✅ |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
## Contributors

![habeeb](https://avatars.githubusercontent.com/u/112330090)


## 📄 License

This project is private. All rights reserved.

## 👤 Author

**Anupama P R**
- GitHub: [@anu-pama-pr](https://github.com/anu-pama-pr)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Clerk](https://clerk.com) - Authentication
- [Convex](https://www.convex.dev) - Backend platform
- [OpenAI](https://openai.com) - AI models
- [Arcjet](https://arcjet.com) - Security & rate limiting
- [Unsplash](https://unsplash.com) - Image API

## 📞 Support

For issues or questions, please open a GitHub issue or contact the project maintainer.

---

**Last Updated**: November 2025
