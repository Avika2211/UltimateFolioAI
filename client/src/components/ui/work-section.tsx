import { Bot, FlaskRound, Globe, Eye, Heart, GraduationCap, ExternalLink, Github, FileText, Play, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "AIRA Platform",
    icon: Bot,
    color: "cyber-blue",
    description: "Advanced conversational AI system serving 500+ concurrent users",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Python", "LangChain", "AWS"],
    metrics: { primary: "$15K+ pilot interest", secondary: "96% accuracy" },
    actions: [ExternalLink, Github]
  },
  {
    id: 2,
    title: "MIT Production Framework",
    icon: FlaskRound,
    color: "neon-purple",
    description: "First undergraduate to develop production framework for Prof. Kellis' lab",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Python", "Distributed Systems", "Cloud"],
    metrics: { primary: "MIT Adopted", secondary: "Production Ready" },
    actions: [FileText, Github]
  },
  {
    id: 3,
    title: "Climate AI Research",
    icon: Globe,
    color: "cyber-green",
    description: "Large-scale environmental data processing for climate modeling",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["MLOps", "15K+ Datasets", "Distributed"],
    metrics: { primary: "International Impact", secondary: "Petabyte Scale" },
    actions: [BarChart3, Download]
  },
  {
    id: 4,
    title: "SmartCV Suite",
    icon: Eye,
    color: "electric-yellow",
    description: "Multi-domain CV solution with 98.5% accuracy across 5 industries",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["OpenCV", "Deep Learning", "Docker"],
    metrics: { primary: "300+ Users", secondary: "12 Countries" },
    actions: [Play, BarChart3]
  },
  {
    id: 5,
    title: "BioAI Diagnostics",
    icon: Heart,
    color: "neon-pink",
    description: "AI-powered medical image analysis with 97.8% diagnostic accuracy",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["TensorFlow", "Medical Imaging", "Cloud"],
    metrics: { primary: "97.8% Accuracy", secondary: "Multi-modal" },
    actions: [Play, FileText]
  },
  {
    id: 6,
    title: "EduAI Tutor",
    icon: GraduationCap,
    color: "cyber-blue",
    description: "AI tutor that adapts to student emotions and learning patterns",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Computer Vision", "NLP", "Emotion AI"],
    metrics: { primary: "40% Improvement", secondary: "Learning Outcomes" },
    actions: [Play, BarChart3]
  }
];

const timeline = [
  {
    year: "2024",
    title: "Harvard Impact Challenge Winner",
    description: "Top 0.0012% of 83,000+ applicants",
    color: "cyber-blue"
  },
  {
    year: "2023",
    title: "MIT CSAIL Research Fellowship",
    description: "First undergraduate production framework",
    color: "neon-purple"
  },
  {
    year: "2023",
    title: "Cambridge Climate AI Research",
    description: "International research contribution",
    color: "cyber-green"
  }
];

export default function WorkSection() {
  return (
    <section id="work" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">
            PROJECT SHOWCASE
          </h2>
          
          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <div key={project.id} className="project-card glassmorphism p-6 rounded-2xl group hover:scale-105 transition-all duration-300">
                <img 
                  src={project.image} 
                  alt={project.description}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center mb-3">
                  <project.icon className={`${project.color} text-2xl mr-3 w-6 h-6`} />
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className={`text-xs bg-${project.color}/20 text-${project.color} px-2 py-1 rounded`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <div className={`${project.color} font-semibold`}>{project.metrics.primary}</div>
                    <div className="text-gray-400">{project.metrics.secondary}</div>
                  </div>
                  <div className="flex space-x-2">
                    {project.actions.map((Action, index) => (
                      <Button key={index} size="sm" variant="ghost" className={`${project.color} hover:text-white transition-colors p-2`}>
                        <Action className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Achievement Timeline */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-8 cyber-blue">Recognition Timeline</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-1/2 text-right pr-8">
                          <div className={`font-semibold ${item.color}`}>{item.year}</div>
                          <div className="text-sm text-gray-300">{item.title}</div>
                        </div>
                        <div className={`w-4 h-4 bg-${item.color} rounded-full border-4 border-black relative z-10`}></div>
                        <div className="w-1/2 pl-8">
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 text-right pr-8">
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                        <div className={`w-4 h-4 bg-${item.color} rounded-full border-4 border-black relative z-10`}></div>
                        <div className="w-1/2 pl-8">
                          <div className={`font-semibold ${item.color}`}>{item.year}</div>
                          <div className="text-sm text-gray-300">{item.title}</div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
