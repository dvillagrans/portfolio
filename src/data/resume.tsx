import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "Diego Villagran Salazar",
  initials: "DV",
  url: "https://dillion.io",
  location: "Mexico City, MX",
  locationLink: "",
  description:
    "Data Scientist with a passion for solving complex problems. I have experience in developing machine learning models, data analysis, and data visualization.",
  summary:
    "I am a developer and data scientist with experience in predictive projects, large-scale data analysis, algorithm optimization, and creating scalable solutions. I specialize in transforming complex data into actionable insights for business decision-making. My goal is to continue growing at the intersection of technology and data, adding value through innovative solutions.",
  avatarUrl: "/me.jpg",
  skills: [
    "Python", 
    "Pandas",
    "Numpy", 
    "Matplotlib", 
    "Seaborn",
    "anaconda",
    "Scikit-learn", 
    "Tensorflow", 
    "Keras", 
    "PyTorch", 
    "Yolo",
    "PostgreSQL", 
    "SQL",
    "Git", 
    "GitHub",
    "Docker", 
    "Kubernetes", 
    "AmazonAWS", 
    "Azure", 
    "googlecloud",
    "HTML5", 
    "CSS3", 
    "JavaScript", 
    "TypeScript", 
    "React", 
    "Astro", 
    "Vercel",
    "googlecolab"
  ],
  navbar: [
    { href: "#", icon: HomeIcon, label: "Home" },
    { href: "#skills", icon: NotebookIcon, label: "Skills" },
    { href: "#projects", icon: CodeIcon, label: "Projects" },
    { href: "#contact", icon: PencilLine, label: "Contact" },
  ],
  contact: {
    email: "diegovillasal@gmail.com",
    tel: "+525572071183",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/dvillagrans",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/dvillagrans",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  
  projects: [
    {
      title: "Prediction of passengers for mexican airlines",
      href: "#",
      dates: "September 2023 - November 2023",
      active: true,
      description:
        "Analisys of the number of passengers that mexican airlines have had in the last 36 years, and prediction of the number of passengers for the next 5 years.",
      technologies: [
        "Python",
        "Pandas",
        "Numpy",
        "Matplotlib",
        "Seaborn",
        "Sarima Models",
      ],
      links: [
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "https://i.postimg.cc/C1WGbtNq/Airlines-Pre.png",
        width: 600,
        height: 400
      },
      video: "",
    },
    {
      title: "Melari Spa",
      href: "https://melarispa.com",
      dates: "September 2023 -  July 2024",
      active: true,
      description:
      "Creation of a website for a spa in Mexico City, with the purpose of increasing the number of clients and the visibility of the spa.",
      technologies: [
        "Astro",
        "React",
        "Vercel",
        "HTML5",
        "CSS3",
        "TailwindCSS",
        "TypeScript",
      ],
      links: [
        {
          type: "Website",
          href: "https://melarispa.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src:"https://i.postimg.cc/y817VNHD/melari-spa.png",
      width: 600,
      height: 400
    },
      video: "",
    },
    {
      title: "Dashboard Financial",
      href: "#",
      dates: "February 2024 -  March 2024",
      active: false,
      description:
      "Creation of a dashboard for a financial company in Mexico, with the purpose of visualizing the company's financial data.",
      technologies: [
        "Excel",
        "Macros",
        "VBA",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src:"https://i.postimg.cc/P5n0R86g/Dasboard.png",
      width: 600,
      height: 400
    },
      video: "",
    },
    {
      title: "Prediction of the price of houses in Mexico City",
      href: "#",
      dates: "June 2024",
      active: false,
      description:
        "Analisys of the price of houses in Mexico City, and prediction of the price of houses for the next 5 years.",
      technologies: [
        "Python",
        "Pandas",
        "Numpy",
        "Matplotlib",
        "Seaborn",
        "Scikit-learn",
        "Random Forest",
      ],
      links: [
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src:"/output_houses.png",
      width: 600,
      height: 400
    },
      video: "",

      }
  ],

  work: [
    {
      company: "Spa & Wellness",
      href: "https://www.melarispa.com/",
      badges: ["Freelance", "Remote", "Part-time" ],
      location: "Remote",
      title: "Web Developer",
      logoUrl: "/melari.png",
      start: "Nov 2023",
      end: "July 2024",
      description:
        "Creation of a website for a spa in Mexico City, with the purpose of increasing the number of clients and the visibility of the spa.",
    },

  ],
  education: [
    {
      school: "Escuela Superior de Computo",
      href: "https://www.escom.ipn.mx/",
      degree: "Data Science",
      logoUrl: "/escom.png",
      start: "2022",
      end: "Expected 2026",
    },
    {
      school: "Centro de Estudios Cientificos y Tecnologicos No. 9 Juan de Dios Batiz",
      href: "https://www.cecyt9.ipn.mx/",
      degree: "Technician in Programming",
      logoUrl: "/batiz.png",
      start: "2019",
      end: "2022",
    },
  ],
  
} as const;
