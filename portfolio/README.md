# ⚡ Manav Gawas // Systems Architecture & Portfolio

> **Status:** `ONLINE`  |  **Version:** `2.0.4`  |  **Deployment:** `Production-Ready`

An interactive, high-performance portfolio and terminal interface engineered to showcase enterprise-grade architectural patterns, distributed systems, and AI automation orchestration.

Built with Next.js and Framer Motion, this repository serves as both a visual portfolio and an interactive Command Line Interface (CLI).

---

## 🏗️ System Architecture & Features

This codebase is designed around a "Systems Architect" aesthetic—eschewing generic boilerplate for 3D spatial interfaces, glassmorphism, and functional terminal logic.

### 1. Global Command Palette & CLI (`Ctrl + K`)
- A fully functional, globally accessible command palette.
- **Interactive Shell:** Users can type actual bash-like commands (`help`, `status`, `network`, `sudo`, `matrix`) to interact with the portfolio.
- **Live Diagnostics:** Simulates real-time system readouts, CPU/Memory telemetry, and server ping responses.
- **Strict Viewport Control:** Bounded Flexbox architecture with locked background scrolling and zero-overflow boundaries.

### 2. Encrypted Payload Drop (Web3Forms API)
- Backend-less secure message transmission.
- Visual payload scrambling/encryption simulation before API dispatch.
- Direct routing to isolated inboxes based on context (Personal vs. Syncora Systems B2B).

### 3. Spatial 3D Rendering Engine
- **Framer Motion Parallax:** Project nodes react to `clientX/Y` mouse coordinates, creating a dynamic 3D tilt effect across the Z-axis (`translateZ`).
- **Dynamic Backgrounds:** SVG-based geometric grid patterns with ambient, blur-injected light nodes (`bg-cyan-500/10 blur-[120px]`).

### 4. Syncora Systems Operator Intake
- A dedicated sub-routing layer (`/syncora`) acting as a B2B landing page and highly specialized engineering recruitment terminal.

---

## 🛠️ Technology Stack

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Core** | Next.js 14, React | Server-side rendering, routing, core framework |
| **Language** | TypeScript | Strict type safety and interface definitions |
| **Styling** | Tailwind CSS | Utility-first styling, glassmorphism, precise UI scaling |
| **Animation** | Framer Motion | Physics-based spring animations, 3D spatial tilting |
| **Backend** | Web3Forms API | Serverless POST routing for encrypted terminal payloads |
| **Icons** | Lucide-React | Lightweight, scalable vector iconography |

---

## 📂 Featured Deployments (Project Nodes)

The portfolio dynamically renders architectural breakdowns for the following active systems:
* **Autonomous Agent Architectures:** Decoupled cognitive workflows (n8n, Voiceflow, Vapi, PostgreSQL).
* **Spatial Ride Sharing Engine:** High-concurrency spatial routing backend with WebSockets.
* **CyberSecurity Assessment:** Automated vulnerability scanning and compliance reporting engine.
* **ForeFitness Architecture:** Hypertrophy progressive overload tracker with dynamic split scheduling.
* **ImpactLoop Volunteer App:** Algorithmic scheduling and resource allocation platform.
* **Viva Computech Portal:** Corporate lead-capture portal optimized for sub-100ms LCP.

---

## 🚀 Local Deployment Instructions

To spin up this environment locally:

```bash
# 1. Clone the repository
git clone [https://github.com/ManavGawas/Portfolio.git](https://github.com/ManavGawas/Portfolio.git)

# 2. Navigate to the directory
cd Portfolio

# 3. Install dependencies
npm install

# 4. Initialize the development server
npm run dev

The system will be accessible at http://localhost:3000.

Note on Environment Variables: > For the terminal contact forms to function locally, you must supply your own Web3Forms Access Keys in the respective fetch requests.

```
## 📡 Let's Connect

Manav Gawas Founder, Syncora Systems

LinkedIn: linkedin.com/in/manavgawas

GitHub: github.com/ManavGawas

Email: gawasmanav469@gmail.com

Business Mail : manav@syncora.systems
