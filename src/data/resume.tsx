import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from "lucide-react";

export const DATA = {
  name: "Diego Villagran",
  initials: "DV",
  url: "https://dillion.io",
  location: "Mexico City, MX",
  locationLink: "",
  description:
    "Data Scientist with a passion for solving complex problems. I have experience in developing machine learning models, data analysis, and data visualization.",
  summary:
    "In the past 3 years, I have worked on a variety of proyects that have allowed me to develop my skills in data analysis, machine learning, and data visualization. I have experience working with Python, SQL, and Power BI. I am currently looking for new opportunities to continue growing as a data scientist.",
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
      dates: "September 2024 - November 2024",
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
      dates: "September 2024 -  July 2024",
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
    
  ],

  work: [
    {
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },

  ],
  education: [
    {
      school: "Escuela Superior de Computo",
      href: "https://www.escom.ipn.mx/",
      degree: "Data Science",
      logoUrl: "/escom.png",
      start: "2021",
      end: "Expected 2025",
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
