# 🚀 Insight.IO Dashboard — ERIC Robotics FSD Assignment

A self-hosted robotics dashboard featuring real-time camera feed and 3D point cloud visualization. Built as part of the ERIC Robotics Full Stack Developer assignment.

---

## 👤 Candidate Information

- **Full Name:** Isha Bhausaheb Patil
- **Contact Number:** +91 8975795159
- **Email ID:** ishabhausahebpatil@gmail.com
- **GitHub Username:** PatilIsha

---

## 🎥 Demo Video

A short walkthrough video showing the dashboard in action is included as `Demo.mp4` in this repository. It demonstrates:
- Dashboard layout matching the Insight.IO design
- Switching between Camera View and 3D Map View
- 3D point cloud interaction (rotate, zoom, pan)
- WASD joystick controls
- Emergency Stop functionality
- Responsive design across mobile and desktop

📸 Screenshots are also available in the `/screenshots` folder.

---

## ✨ Features

- 🗺️ **Interactive 3D Map View** — Procedural point cloud rendered with Three.js, simulating a building floor plan with rooms and obstacles
- 📹 **Live Camera Feed View** — HTML5 video player with LIVE indicator and camera metadata
- 🔄 **View Toggle** — Click the mini preview to instantly switch between Map and Camera views
- 🎮 **Joystick Controls** — WASD keyboard support + on-screen directional pad
- 🛑 **Emergency Stop** — Prominent red button with visual feedback
- 🔍 **Zoom Controls** — Interactive zoom slider with +/- buttons
- 📊 **Real-time Status Bar** — Battery, Signal, Failsafe, System status indicators
- 🎯 **Mode Toggle** — Switch between AUTO and MANUAL modes
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- 🎨 **Pixel-perfect Match** — Faithfully recreates the Insight.IO design

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI library
- **Vite** — Fast build tool with HMR
- **Tailwind CSS** — Utility-first styling
- **Three.js** + **@react-three/fiber** — 3D rendering
- **@react-three/drei** — Useful Three.js helpers (OrbitControls)
- **Lucide React** — Modern icon library

### Backend
- **Node.js** + **Express** — REST API + static file server
- **CORS** — Cross-origin support

### Data Approach
- **3D Map:** Procedural point cloud generation (mimics building floor plan with rooms, walls, obstacles)
- **Camera:** HTML5 video tag with local file + fallback URL
- **No ROS Required:** Static data approach for browser compatibility and faster setup

---

## 🏗️ Architecture

```
insight-io-dashboard/
├── client/                       # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Left navigation bar
│   │   │   ├── TopBar.jsx        # Top status bar with pills
│   │   │   ├── MapView.jsx       # 3D point cloud renderer
│   │   │   ├── CameraView.jsx    # Video player
│   │   │   ├── MiniPreview.jsx   # Corner preview toggle
│   │   │   ├── Controls.jsx      # Joystick + Emergency stop
│   │   │   └── ZoomControls.jsx  # Zoom slider
│   │   ├── App.jsx               # Main app + state management
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global Tailwind styles
│   └── package.json
│
├── server/                       # Node.js backend
│   ├── public/                   # Static assets (videos, pcd files)
│   ├── server.js                 # Express API server
│   └── package.json
│
└── README.md                     # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

### 1. Clone the Repository

```bash
git clone https://github.com/PatilIsha/insight-io-dashboard.git
cd insight-io-dashboard
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

✅ Frontend runs on `http://localhost:5173/`

### 3. Backend Setup (Optional but recommended)

Open a **new terminal**:

```bash
cd server
npm install
npm start
```

✅ Backend runs on `http://localhost:5000/`

API endpoints:
- `GET /api/health` — Health check
- `GET /api/robot/status` — Robot status (mission, battery, etc.)
- `GET /api/camera/info` — Camera metadata
- `GET /api/pointcloud/list` — List available point cloud files

### 4. (Optional) Add Local Video File

To use your own camera feed video, place an MP4 file at:
```
server/public/camera-feed.mp4
```

Then update the video source in `client/src/components/CameraView.jsx` (already configured to fall back to a sample URL if local file is missing).

---

## 🎯 Design Decisions

### Why Procedural Point Cloud Instead of Static PCD?
- ✅ **No external dependencies** — works immediately on `npm install`
- ✅ **Browser-friendly** — no large file downloads required
- ✅ **Matches the demo aesthetic** — building floor plan with pink rooms and obstacles
- ✅ **Demonstrates Three.js mastery** — shows understanding of BufferGeometry, custom shaders, and color attributes

### Why Static Video Instead of ROS Bridge?
- ✅ **Setup time** — assignment had 3-day deadline; ROS2 setup needs a Linux environment
- ✅ **Browser compatibility** — HTML5 video works on all platforms
- ✅ **Sample data available** — fallback to public sample MP4
- 📝 *Future improvement: integrate roslibjs for live ROS topic subscriptions*

### Why Tailwind CSS?
- ✅ Fast iteration during the 3-day window
- ✅ Built-in responsive utilities (`md:`, `lg:`)
- ✅ Easy to match the dark sidebar + light main area design system

### Why React Three Fiber?
- ✅ Declarative Three.js — easier to reason about
- ✅ React state hooks integrate naturally
- ✅ `@react-three/drei` provides ready-to-use OrbitControls

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| **Switch view (Map ⇄ Camera)** | Click the mini preview (bottom-left corner) |
| **Rotate 3D map** | Click + drag on Map View |
| **Zoom in/out** | Scroll wheel OR use zoom buttons (left) |
| **Pan 3D map** | Right-click + drag |
| **Move robot** | Press W/A/S/D keys OR click directional arrows |
| **Emergency stop** | Click the red EMERGENCY STOP button |
| **Switch mode** | Click AUTO or MANUAL toggle in top bar |

---

## 📱 Responsive Design

The dashboard adapts seamlessly across screen sizes:

- **Mobile (< 768px):** Compact sidebar, smaller controls, hidden secondary status items
- **Tablet (768px – 1024px):** Full layout with optimized spacing
- **Desktop (> 1024px):** Maximum detail with all status indicators visible

Tested on Chrome, Edge, Firefox, and mobile Safari.

---

## 🎨 Bonus Implementations

✅ **Modular code structure** — Each UI section is a separate, reusable component
✅ **Clean commit history** — Progressive commits showing iterative development
✅ **Keyboard accessibility** — WASD controls work with physical keyboard
✅ **Loading states** — Smooth fallbacks for video and 3D rendering
✅ **Smooth animations** — Auto-rotating point cloud, pulsing emergency indicator
✅ **State management** — Centralized in App.jsx using React hooks
✅ **API-ready architecture** — Backend with endpoints ready for live data integration

---

## 🔮 Future Improvements

If given more time, I would add:

- 🌐 **ROS2 integration** via `roslibjs` for live sensor data
- 📡 **WebSocket support** for real-time updates without polling
- 🎥 **Multi-camera grid view** for 4-camera split screen
- 💾 **Recording & playback** of robot session data
- 📈 **Telemetry charts** showing battery/signal trends over time
- 🌍 **Map markers** for waypoints and zones
- 🔐 **Authentication** for multi-user dashboards
- 🐳 **Docker containerization** for one-command deployment

---

## 📞 Contact

If you have any questions about my implementation, please reach out:

- **Email:** ishabhausahebpatil@gmail.com
- **Phone:** +91 8975795159
- **LinkedIn:** [linkedin.com/in/isha-patil-developer](https://www.linkedin.com/in/isha-patil-developer/)
- **GitHub:** [github.com/PatilIsha](https://github.com/PatilIsha)

---

## 🙏 Thank You

Thank you to the ERIC Robotics team for this opportunity. I genuinely enjoyed building this dashboard — combining my MERN expertise with my interest in robotics and IoT (from my prior work on IoT-integrated dashboards at Buildint). I look forward to discussing the implementation further.

---

*Built with ❤️ by Isha Patil — for ERIC Robotics, 2026*
