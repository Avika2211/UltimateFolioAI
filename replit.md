# Avika Joshi AI/ML Research Portfolio

## Overview

This is a sophisticated portfolio website for Avika Joshi, an AI/ML Research Engineer with credentials from MIT CSAIL, Cambridge University, and Harvard. The application showcases cutting-edge research projects, professional experience, and provides a contact system for potential collaborations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe development
- **Styling**: Tailwind CSS with custom design system featuring cyberpunk/futuristic aesthetics
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **3D Graphics**: Three.js for interactive particle systems and geometric visualizations
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture  
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful endpoints with structured JSON responses
- **Request Handling**: Express middleware for logging, error handling, and request parsing

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL database
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Fallback**: In-memory storage implementation for development/testing

## Key Components

### Contact System
- **Form Validation**: Zod schema validation with React Hook Form integration
- **Data Models**: Structured contact messages with name, email, type, and message fields
- **API Endpoints**: 
  - `POST /api/contact` - Submit contact form
  - `GET /api/contacts` - Retrieve all contacts (admin)

### Interactive UI Elements
- **Particle System**: Dynamic Three.js particle effects with mouse interaction
- **Floating Navigation**: Smooth scrolling navigation with active section detection
- **Scroll Progress**: Visual progress indicator for page scrolling
- **Glassmorphism Effects**: Modern translucent UI components

### Portfolio Sections
- **Hero Section**: Animated typewriter effect with dynamic statistics counters
- **About Section**: Research background with interactive skill visualization
- **Work Section**: Project showcase with detailed technical descriptions
- **Contact Section**: Professional contact form with validation and success handling

## Data Flow

1. **Client Interaction**: User interacts with React components
2. **Form Submission**: Contact form data validated client-side with Zod
3. **API Request**: React Query handles API communication with automatic retries
4. **Server Processing**: Express middleware processes and validates requests
5. **Database Operation**: Drizzle ORM executes type-safe database queries
6. **Response Handling**: Structured JSON responses with success/error states
7. **UI Updates**: React Query updates UI state and displays toast notifications

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem with TypeScript support
- **Database**: PostgreSQL via Neon serverless platform
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icon library
- **3D Graphics**: Three.js for WebGL-based visualizations
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns for timestamp formatting

### Development Tools
- **Build System**: Vite with ESBuild for fast compilation
- **Type Checking**: TypeScript compiler with strict mode
- **Code Quality**: ESLint and Prettier for consistent code style
- **Development Server**: Hot module replacement with Vite dev server

## Deployment Strategy

### Build Process
- **Client Build**: Vite compiles React app to optimized static assets
- **Server Build**: ESBuild bundles Node.js server code
- **Asset Optimization**: Automatic minification and tree-shaking
- **Type Checking**: Full TypeScript compilation verification

### Production Environment
- **Platform**: Replit with autoscale deployment
- **Port Configuration**: Server runs on port 5000, external port 80
- **Environment Variables**: Database URL and other secrets via environment
- **Process Management**: PM2 or similar for production process supervision

### Database Management
- **Schema Deployment**: Drizzle push commands for schema updates
- **Connection Pooling**: Neon serverless handles connection management
- **Backup Strategy**: Automated backups via Neon platform
- **Migration Strategy**: Version-controlled schema changes

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 19, 2025. Initial setup