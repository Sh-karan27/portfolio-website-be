// Seed values — mirror the text currently hardcoded in the frontend
// components. Used once, the first time GET /api/v1/content runs and no
// document exists yet in the database.
export const DEFAULT_CONTENT = {
  hero: {
    sectionNumber: "01",
    sectionLabel: "Frontend Developer",
    heading: "Karan Shukla converts caffeine into clean, production-grade code.",
    description:
      "1+ year of production experience in React.js and TypeScript — shipping features across an HRMS platform, a multi-role clinic dashboard, and a React Native mobile app. Comfortable with the full component lifecycle, from REST API integration to signed APK release.",
    email: "shuklakaran107@gmail.com",
    location: "New Delhi, India",
  },
  about: {
    sectionNumber: "02",
    sectionLabel: "About",
    heading: "Full component lifecycle, end to end.",
    quote: "Comfortable from REST API integration to signed APK release.",
    bio: "I've built and maintained a shared component library across 3 client configurations of a production HRMS, written a custom Intersection Observer hook to cut network requests on heavy dashboards, and independently handled keystore setup and signed APK release for a company's first production mobile app. I write clean, testable code and adapt quickly in Agile teams.",
    stats: [
      { value: "1+", label: "yrs in production" },
      { value: "3", label: "role-based dashboards" },
      { value: "77", label: "Lighthouse, from low-60s" },
      { value: "15+", label: "bugs fixed" },
    ],
  },
  skills: {
    sectionNumber: "03",
    sectionLabel: "Skills",
    heading: "The stack behind the work.",
    groups: [
      {
        category: "Languages / Frontend",
        items:
          "JavaScript (ES6+), TypeScript, React.js, Next.js, React Native, Tailwind CSS, HTML5, CSS3, Responsive Design",
      },
      {
        category: "State & Architecture",
        items: "Context API, React Hooks (custom & built-in), RBAC, Protected Routes",
      },
      {
        category: "Backend / APIs",
        items: "REST API Integration, Node.js, Express.js, JWT Authentication, bcrypt, MongoDB",
      },
      {
        category: "Performance",
        items: "SSR, Lazy Loading, Code Splitting, Lighthouse Optimization, Intersection Observer API",
      },
      {
        category: "Testing / Tools",
        items:
          "Unit Testing, Manual QA, Postman, Chrome DevTools, Git, GitHub, Vite, VS Code, Gradle, APK Build & Release, Agile / Scrum",
      },
    ],
  },
  experience: {
    sectionNumber: "04",
    sectionLabel: "Experience",
    heading: "Where I've worked.",
    jobs: [
      {
        role: "Frontend Developer · Engage HRMS",
        period: "Mar 2025 — Present",
        points: [
          "Built and maintained a shared React.js + TypeScript component library across 3 client configurations of a production HRMS.",
          "Wrote a custom useObserver hook (Intersection Observer API) to defer REST API calls until components enter the viewport.",
          "Added background GPS tracking to a React Native (WebView) app, removing a third-party SDK dependency.",
          "Optimized a Next.js marketing site with SSR and lazy loading; Lighthouse improved from low-60s to high-70s.",
          "Fixed 15+ bugs across parallel feature branches, adding prop-type contracts to prevent regressions.",
          "Handled keystore setup, Gradle config, and signed APK generation for the first production mobile release.",
        ],
      },
      {
        role: "React Developer Intern · Vidya Intern Hub",
        period: "Dec 2024 — Mar 2025",
        points: [
          "Built a clinic management system with 3 role-based dashboards (Admin / Doctor / Patient).",
          "Implemented route-level RBAC using Context API auth state and React Router guards.",
          "Extracted repeated UI patterns into an atomic component library across 10+ dashboard views.",
          "Replaced CRA with Vite, reducing cold-start dev server time and enabling HMR.",
        ],
      },
    ],
  },
  projects: {
    sectionNumber: "05",
    sectionLabel: "Projects",
    heading: "Selected work.",
    items: [
      {
        number: "01",
        title: "Tour & Travel Website",
        slug: "tour-and-travel-website",
        description:
          "Responsive travel-booking site with destinations, services, and testimonials, animated with GSAP — built during my Vidya Intern Hub internship.",
        stack: "React · Tailwind CSS · GSAP",
        coverImage: "",
        githubUrl: "https://github.com/Sh-karan27/tour-and-travel-vidyahubintern",
        liveUrl: "https://tour-and-travel-vidyahubintern.vercel.app/",
        hasBeforeAfter: false,
        beforeImages: [],
        afterImages: [],
      },
    ],
  },
  education: {
    sectionNumber: "06",
    sectionLabel: "Education",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Guru Gobind Singh Indraprastha University",
    coursework: "Data Structures · Web Development · Databases · Software Engineering",
    period: "Jul 2020 — Jul 2023",
    score: "7.9",
    scoreScale: "/ 10",
  },
  contact: {
    sectionNumber: "07",
    sectionLabel: "Contact",
    heading: "Let's write the next chapter together.",
    description: "Open to frontend roles. Email is fastest — I usually reply within a day.",
    email: "shuklakaran107@gmail.com",
    phone: "+91 93543 36427",
    location: "New Delhi, India",
  },
  footer: {
    name: "Karan Shukla",
    copyrightText: "© 2026 · Built with React & TypeScript",
  },
  socialLinks: [
    { platform: "github", url: "https://github.com/Sh-karan27" },
    { platform: "linkedin", url: "https://linkedin.com/in/shkaran27" },
  ],
};
