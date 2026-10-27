# 📱 Apple iPhone 15 Pro Showcase (3D & WebGL)

A production-grade landing page recreating the Apple iPhone 15 Pro announcement experience. Built with React 19, Three.js, and GSAP, this project showcases high-fidelity 3D model interaction, scroll-bound cinematography, full mobile responsiveness, and performance monitoring.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 🎯 Features

- **Interactive 3D Phone Models:** Fully rotatable 360° textured models of the iPhone 15 Pro with realistic titanium materials, studio lighting, camera reset, and mobile scroll-lock toggle.
- **Dynamic Size & Color Switching:** Seamless GSAP-animated toggling between device sizes (`6.1"` Pro and `6.7"` Pro Max) and official colorways (*Natural, Blue, White, and Black Titanium*).
- **GSAP Timelines & ScrollTrigger:** Custom scroll-driven video players, interactive highlight carousel with clickable progress indicators, and staggered typography animations.
- **Mobile-First Responsiveness:** Sticky frosted-glass navigation with mobile drawer menu, adaptive `100svh` hero layout, responsive 3D model scaling, and touch-friendly controls.
- **Error Tracking & Telemetry:** Sentry integration configured for production exception handling and user session performance monitoring.

---

## 🛠 Tech Stack

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vite.dev/)
- **3D Engine:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation:** [GSAP (GreenSock)](https://gsap.com/) & ScrollTrigger
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Monitoring:** [@sentry/react](https://sentry.io/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (`v18.0.0` or higher)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hvostenko-dev/iphonewebsite_three_js.git
   cd iphonewebsite_three_js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
