type WorkType = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  featured: boolean;
};

export const DesignWorks: WorkType[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Application",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Modern e-commerce platform with advanced filtering, real-time inventory, and seamless checkout experience.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Design & Development",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Creative portfolio website with 3D animations, parallax effects, and responsive design.",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind"],
    featured: false,
  },
  {
    id: 3,
    title: "Task Management App",
    category: "Mobile Application",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    featured: true,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    category: "Data Visualization",
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Interactive weather dashboard with detailed forecasts, maps, and historical data visualization.",
    technologies: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    featured: false,
  },
  {
    id: 5,
    title: "Learning Platform",
    category: "Educational Technology",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Interactive learning platform with video streaming, progress tracking, and assessment tools.",
    technologies: ["React", "Video.js", "WebRTC", "PostgreSQL"],
    featured: true,
  },
];
