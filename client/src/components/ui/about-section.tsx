import { Brain, Leaf, MessageCircle, Eye, ServerCog, Target, Microscope } from "lucide-react";

const skills = [
  { icon: Leaf, color: "cyber-green", label: "Climate AI" },
  { icon: MessageCircle, color: "cyber-blue", label: "Conversational AI" },
  { icon: Eye, color: "neon-purple", label: "Computer Vision" },
  { icon: ServerCog, color: "electric-yellow", label: "MLOps" },
];

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            THE RESEARCHER
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Section */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="AI/ML research lab with computer screens and data visualization" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
              
              {/* Floating Skill Orbs */}
              {skills.map((skill, index) => {
                const positions = [
                  { top: '-1rem', right: '-1rem' },
                  { top: '50%', left: '-1rem', transform: 'translateY(-50%)' },
                  { bottom: '-1rem', left: '50%', transform: 'translateX(-50%)' },
                  { top: '20%', right: '20%' }
                ];
                
                return (
                  <div 
                    key={skill.label}
                    className={`absolute skill-orb glassmorphism ${index % 2 === 0 ? 'w-16 h-16' : 'w-12 h-12'} rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform`}
                    style={positions[index]}
                  >
                    <skill.icon className={`${skill.color} ${index % 2 === 0 ? 'text-xl' : 'text-lg'}`} />
                  </div>
                );
              })}
            </div>
            
            {/* Content */}
            <div className="space-y-8">
              <div className="glassmorphism p-6 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 cyber-blue">Building the Future of AI</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm an AI/ML Research Engineer with production experience at world's top institutions. 
                  My work spans climate AI, conversational systems, and computer vision - with real-world 
                  impact and recognition from global leaders.
                </p>
              </div>
              
              {/* Research Expertise */}
              <div className="glassmorphism p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 neon-purple flex items-center">
                  <Microscope className="mr-3" />RESEARCH EXPERTISE
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-gray-300">
                    <Leaf className="cyber-green mr-3" />Climate AI & Environmental Modeling
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MessageCircle className="cyber-blue mr-3" />Conversational AI & Natural Language Processing
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Eye className="neon-purple mr-3" />Computer Vision & Image Processing
                  </div>
                  <div className="flex items-center text-gray-300">
                    <ServerCog className="electric-yellow mr-3" />MLOps & Production AI Systems
                  </div>
                </div>
              </div>
              
              {/* Current Focus */}
              <div className="glassmorphism p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 cyber-green flex items-center">
                  <Target className="mr-3" />CURRENT FOCUS
                </h4>
                <div className="space-y-2 text-gray-300">
                  <div>• DTU Computer Science (9.2/10 CGPA)</div>
                  <div>• MIT CSAIL Research Fellow</div>
                  <div>• Cambridge Climate AI Researcher</div>
                  <div>• Harvard Impact Challenge Winner</div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="glassmorphism p-6 rounded-2xl border-l-4 border-cyan-400">
                <p className="text-gray-300 italic mb-4">
                  "Avika is a leading exponent in her field with exceptional technical skills"
                </p>
                <div className="text-sm cyber-blue">
                  - Dr. Peter Murray-Rust, University of Cambridge
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
