import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Rocket, ServerCog, Leaf, Mail, Linkedin, Github, Calendar, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  type: z.string().min(1, "Please select a message type"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
            LET'S BUILD THE FUTURE
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Available for Summer 2025 AI/ML Internships
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glassmorphism p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 cyber-blue">Looking For</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center">
                    <Rocket className="cyber-blue mr-3 w-5 h-5" />AI Research Positions
                  </div>
                  <div className="flex items-center">
                    <ServerCog className="neon-purple mr-3 w-5 h-5" />ML Engineering Roles
                  </div>
                  <div className="flex items-center">
                    <Leaf className="cyber-green mr-3 w-5 h-5" />Climate Tech Opportunities
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 neon-purple">Connect</h3>
                <div className="space-y-4">
                  <a href="mailto:avika.joshi@gmail.com" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                    <Mail className="cyber-blue mr-3 w-5 h-5" />avika.joshi@gmail.com
                  </a>
                  <a href="#" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                    <Linkedin className="cyber-blue mr-3 w-5 h-5" />linkedin.com/in/avikajoshi
                  </a>
                  <a href="#" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                    <Github className="cyber-blue mr-3 w-5 h-5" />github.com/avikajoshi
                  </a>
                </div>
              </div>
              
              <div className="glassmorphism p-6 rounded-2xl border-l-4 border-green-400">
                <p className="text-gray-300 italic">
                  "I'm passionate about building AI systems that solve real-world problems. 
                  Let's discuss how I can contribute to your team's success."
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glassmorphism p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 cyber-green">Send Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Your Email" 
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400">
                              <SelectValue placeholder="Select message type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="internship">Internship Opportunity</SelectItem>
                            <SelectItem value="research">Research Collaboration</SelectItem>
                            <SelectItem value="speaking">Speaking Engagement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Your Message" 
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition-transform"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Button variant="outline" className="glassmorphism px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform border-cyan-400">
              <Calendar className="mr-2 w-4 h-4" />
              Schedule Call
            </Button>
            <Button variant="outline" className="glassmorphism px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform border-purple-500">
              <Download className="mr-2 w-4 h-4" />
              Download Resume
            </Button>
            <Button variant="outline" className="glassmorphism px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform border-green-400">
              <FileText className="mr-2 w-4 h-4" />
              View Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
