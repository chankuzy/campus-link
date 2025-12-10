<span style="color: #06b6d4;">C A M P U S - L I N K</span>

ACADEMIC RESOURCE EXCHANGE | KASU MVP

<img alt="Terminal-Style Banner" src="/src/assets/image1.png" />

// 0. PROJECT OVERVIEW: DATA INJECTION SUCCESS

CAMPUS-LINK is a Proof-of-Concept (MVP) for a decentralized academic resource sharing platform, targeting the Kaduna State University (KASU) community. This application is engineered with a high-contrast, terminal-inspired dark theme, prioritizing efficiency, speed, and clear data visualization.

The design adheres strictly to a Hack The Box (HTB) / Cyber-Security aesthetic, using monospaced fonts, cyan accents, and minimalist, structured layouts.

Key System Status

Status Code

Description

Persistence Layer

LOCAL_STORAGE_MVP

User and resource data maintained locally across sessions.

Aesthetic Theme

HTB_COMMITTED

High-contrast dark mode; all UI elements are fully responsive.

Frontend Stack

REACT_VITE_V2.0

Built as a single-page application (SPA).

Core Modules

LIVE

Authentication, Dashboard, Resource Library, and Upload Forms.

<img alt="Terminal-Style Banner" src="/src/assets/image2.png" />


// 1. TECHNOLOGIES & DEPENDENCIES

This project leverages modern frontend tooling for a high-performance and maintainable codebase.

Category

Technology

Purpose

Frontend

<span style="color: #67e8f9;">React</span> (Vite)

Component-based UI structure and rapid development.

Styling

<span style="color: #67e8f9;">Tailwind CSS</span>

Utility-first framework for high-speed, technical theming.

Icons

<span style="color: #67e8f9;">Lucide Icons</span>

Clean, customizable vector icons fitting the terminal aesthetic.

State Management

<span style="color: #67e8f9;">React Context API</span>

Global state for user sessions and resource catalog.

Simulated DB

<span style="color: #67e8f9;">Web Storage</span>

Used for simulating persistent data reads/writes during the MVP phase.

// 2. DEPLOYMENT SEQUENCE (LOCAL HOST)

To initialize a local copy of the application, execute the following in a terminal environment:

# 1. Clone the repository to local directory
$git clone [YOUR_REPO_URL] campus-link-kasu$ cd campus-link-kasu

# 2. Install required dependencies
$ npm install 
# OR
$ yarn install

# 3. Launch the development server
$ npm run dev


The application will be accessible via the address provided by Vite (e.g., http://localhost:5173).

// 3. CORE SYSTEM MODULES

3.1. Authentication Interface (AuthModal)

Simulates user login and registration with username and department assignment.

Uses high-contrast inputs and cyan/yellow accent colors for interactive elements.

3.2. Resource Library (/catalog)

The primary view for resource consumption.

Search/Filter Bar: Allows dynamic filtering by Course Code and Title.

Responsive Grid: Resource cards scale from a single column on mobile (grid-cols-1) up to four columns on desktop for efficient browsing.

3.3. Data Injection Interface (UploadForm)

A modal overlay for resource contribution.

Collects metadata (Course Code, Title, Type) and simulates file processing to inject the resource entry into the local repository.

<span style="color: #facc15;">Status: Only metadata is persisted; actual file upload is simulated.</span>

// SYSTEM SHUTDOWN: END OF DOCUMENTATION