import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { storage } from "./storage";

const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  context: z.object({
    visitorType: z.enum(['recruiter', 'student', 'researcher', 'general']).optional(),
    interests: z.array(z.string()).default([]),
    hasSeenProjects: z.boolean().default(false),
    hasSeenResearch: z.boolean().default(false),
    hasContactInfo: z.boolean().default(false)
  }).optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.json({ 
        success: true, 
        message: "Message sent successfully!",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatMessageSchema.parse(req.body);
      const { message, context } = validatedData;

      // Simple intent detection and response generation
      const lowerMessage = message.toLowerCase();
      let response = "";
      let quickReplies: string[] = [];
      
      if (lowerMessage.includes('research') || lowerMessage.includes('mit') || lowerMessage.includes('cambridge')) {
        response = "Avika's research credentials are exceptional. She's a MIT CSAIL Fellow and Cambridge researcher with real production impact. Her work spans climate AI, conversational systems, and computer vision with measurable results.";
        quickReplies = ["MIT Details", "Cambridge Work", "Production Systems", "Contact Info"];
      } else if (lowerMessage.includes('project') || lowerMessage.includes('aira') || lowerMessage.includes('production')) {
        response = "Avika has built impressive production systems: AIRA Platform serves 500+ users with $15K+ pilot interest, Computer Vision Suite with 98.5% accuracy across 5 industries, and Climate AI tools processing 15K+ datasets.";
        quickReplies = ["AIRA Details", "Computer Vision", "Climate AI", "Technical Skills"];
      } else if (lowerMessage.includes('hire') || lowerMessage.includes('why')) {
        response = "Three key differentiators: 1) Research credibility at MIT/Cambridge/Harvard, 2) Production impact with real commercial value, 3) Proven results from competitions to 1,200+ PyPI downloads. She combines world-class research with practical delivery.";
        quickReplies = ["Technical Skills", "Availability", "Contact Info", "Resume"];
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        response = "Best ways to reach Avika: Email: avika.joshi@gmail.com, LinkedIn: linkedin.com/in/avikajoshi, GitHub: github.com/avikajoshi. She responds within 24 hours and loves discussing AI opportunities.";
        quickReplies = ["Schedule Call", "LinkedIn Profile", "GitHub Code", "Send Message"];
      } else {
        response = "Hi! I'm here to help you learn about Avika Joshi - an exceptional AI/ML researcher with production experience at MIT, Cambridge, and Harvard. I can share details about her research, projects, achievements, or how to contact her. What interests you most?";
        quickReplies = ["Research Work", "Production Projects", "Why Hire Avika", "Contact Info"];
      }

      // Log conversation for analytics
      console.log(`Chat: ${message} -> ${response.substring(0, 50)}...`);

      res.json({
        success: true,
        response,
        quickReplies,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid chat message format",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to process chat message"
        });
      }
    }
  });

  // Chatbot analytics endpoint
  app.get("/api/chat/analytics", async (req, res) => {
    try {
      // Basic analytics - in production this would query a proper analytics store
      res.json({
        success: true,
        data: {
          totalConversations: 150,
          averageLength: 5.2,
          topQuestions: [
            "Tell me about her research",
            "What projects has she built?", 
            "Why should we hire her?",
            "How can I contact her?"
          ],
          conversionRate: 23.5
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch analytics"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
