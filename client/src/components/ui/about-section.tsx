import { Brain, Leaf, MessageCircle, Eye, ServerCog, Target, Microscope, Award, Sparkles } from "lucide-react";
import InteractiveSkillOrbs from "@/components/ui/interactive-skill-orbs";
import { useState } from "react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("research");

  const tabs = [
    { id: "research", label: "Research", icon: Microscope },
    { id: "skills", label: "Skills", icon: Brain },
    { id: "recognition", label: "Recognition", icon: Award },
    { id: "vision", label: "Vision", icon: Sparkles }
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-orb w-32 h-32 top-10 right-10 animate-float shadow-2xl shadow-purple-500/30" style={{animationDelay: '1s'}}></div>
        <div className="floating-orb w-20 h-20 bottom-20 left-20 animate-float shadow-2xl shadow-cyan-400/30" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 animate-pulse-slow">
            THE RESEARCHER
          </h2>
          
          {/* Interactive Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="glassmorphism p-2 rounded-full flex space-x-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - 3D Interactive Skills */}
            <div className="space-y-8">
              <InteractiveSkillOrbs className="w-full" />
              
              {activeTab === "skills" && (
                <div className="glassmorphism p-6 rounded-2xl animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4 cyber-blue">Technical Arsenal</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-400">Languages</h4>
                      <div className="text-sm text-gray-300">Python, JavaScript, TypeScript, R, Julia</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-400">Frameworks</h4>
                      <div className="text-sm text-gray-300">TensorFlow, PyTorch, React, Node.js</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-yellow-400">Cloud</h4>
                      <div className="text-sm text-gray-300">AWS, GCP, Azure, Docker, Kubernetes</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-pink-400">Research</h4>
                      <div className="text-sm text-gray-300">MLflow, Weights & Biases, Jupyter</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Dynamic Content */}
            <div className="space-y-8">
              {activeTab === "research" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="glassmorphism p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 cyber-blue">Building the Future of AI</h3>
                    <p className="text-gray-300 leading-relaxed">
                      I'm an AI/ML Research Engineer with production experience at world's top institutions. 
                      My work spans climate AI, conversational systems, and computer vision - with real-world 
                      impact and recognition from global leaders.
                    </p>
                  </div>
                  
                  <div className="glassmorphism p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-4 neon-purple flex items-center">
                      <Microscope className="mr-3" />RESEARCH EXPERTISE
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                        <Leaf className="cyber-green mr-3" />Climate AI & Environmental Modeling
                      </div>
                      <div className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                        <MessageCircle className="cyber-blue mr-3" />Conversational AI & Natural Language Processing
                      </div>
                      <div className="flex items-center text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                        <Eye className="neon-purple mr-3" />Computer Vision & Image Processing
                      </div>
                      <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                        <ServerCog className="electric-yellow mr-3" />MLOps & Production AI Systems
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "recognition" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="glassmorphism p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 cyber-green flex items-center">
                      <Award className="mr-3" />ACHIEVEMENTS & RECOGNITION
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg border border-cyan-400/30">
                        <div className="font-semibold text-cyan-400">Harvard HPAIR Top 0.0012%</div>
                        <div className="text-sm text-gray-300">Selected from 83,000+ global applicants</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-green-400/10 rounded-lg border border-purple-500/30">
                        <div className="font-semibold text-purple-400">MIT CSAIL Research Fellow</div>
                        <div className="text-sm text-gray-300">First undergraduate to develop production framework</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-400/10 to-yellow-400/10 rounded-lg border border-green-400/30">
                        <div className="font-semibold text-green-400">CBSE Board Topper</div>
                        <div className="text-sm text-gray-300">99.2% - Delhi Region Excellence</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "vision" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="glassmorphism p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 cyber-blue flex items-center">
                      <Sparkles className="mr-3" />FUTURE VISION
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>My mission is to bridge the gap between cutting-edge AI research and real-world applications that solve humanity's greatest challenges.</p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-6">
                        <div className="p-4 glassmorphism rounded-lg">
                          <div className="font-semibold text-green-400 mb-2">Climate Tech Revolution</div>
                          <div className="text-sm">Developing AI systems that can predict, mitigate, and adapt to climate change impacts</div>
                        </div>
                        <div className="p-4 glassmorphism rounded-lg">
                          <div className="font-semibold text-purple-400 mb-2">Human-AI Collaboration</div>
                          <div className="text-sm">Creating intuitive AI interfaces that augment human capabilities rather than replace them</div>
                        </div>
                        <div className="p-4 glassmorphism rounded-lg">
                          <div className="font-semibold text-cyan-400 mb-2">Democratizing AI</div>
                          <div className="text-sm">Making advanced AI tools accessible to researchers and developers worldwide</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Focus - Always visible */}
              <div className="glassmorphism p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 cyber-green flex items-center">
                  <Target className="mr-3" />CURRENT FOCUS
                </h4>
                <div className="space-y-2 text-gray-300">
                  <div className="hover:text-green-400 transition-colors cursor-pointer">• DTU Computer Science (9.2/10 CGPA)</div>
                  <div className="hover:text-cyan-400 transition-colors cursor-pointer">• MIT CSAIL Research Fellow</div>
                  <div className="hover:text-purple-400 transition-colors cursor-pointer">• Cambridge Climate AI Researcher</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">• Harvard Impact Challenge Winner</div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="glassmorphism p-6 rounded-2xl border-l-4 border-cyan-400 hover:border-purple-500 transition-colors">
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
