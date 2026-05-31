const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (video, point cloud data) from public folder
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Insight.IO Backend',
    timestamp: new Date().toISOString()
  });
});

// Robot status endpoint (mock data)
app.get('/api/robot/status', (req, res) => {
  res.json({
    mission: 'On Mission 1234',
    battery: 100,
    signal: 'Strong',
    failsafe: 'Okay',
    system: 'Okay',
    mode: 'AUTO'
  });
});

// Camera stream metadata
app.get('/api/camera/info', (req, res) => {
  res.json({
    id: 'CAM-01',
    resolution: '1920x1080',
    fps: 30,
    status: 'live'
  });
});

// Point cloud data endpoint (could serve PCD files)
app.get('/api/pointcloud/list', (req, res) => {
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    return res.json({ files: [] });
  }
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.pcd'));
  res.json({ files });
});

// In production, serve the built frontend
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀 Insight.IO Backend Server`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
