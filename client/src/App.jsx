import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MapView from './components/MapView';
import CameraView from './components/CameraView';
import MiniPreview from './components/MiniPreview';
import Controls from './components/Controls';
import ZoomControls from './components/ZoomControls';

function App() {
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'camera'
  const [operationMode, setOperationMode] = useState('auto'); // 'auto' | 'manual'
  const [emergency, setEmergency] = useState(false);
  const [zoom, setZoom] = useState(50);

  const switchView = () => {
    setViewMode(viewMode === 'map' ? 'camera' : 'map');
  };

  return (
    <div className="h-screen w-screen flex bg-eric-light overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Status Bar */}
        <TopBar
          viewMode={viewMode}
          operationMode={operationMode}
          setOperationMode={setOperationMode}
        />

        {/* Main View Area */}
        <div className="flex-1 relative">
          {viewMode === 'map' ? (
            <MapView zoom={zoom} />
          ) : (
            <CameraView />
          )}

          {/* Mini Preview - clickable to switch */}
          <MiniPreview
            type={viewMode === 'map' ? 'camera' : 'map'}
            onClick={switchView}
          />

          {/* Zoom Controls (left side) */}
          <ZoomControls zoom={zoom} setZoom={setZoom} />

          {/* Joystick + Emergency Stop (right side) */}
          <Controls emergency={emergency} setEmergency={setEmergency} />

          {/* Hand cursor indicator (decorative) */}
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 pointer-events-none opacity-40">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>
        </div>
      </div>

      {/* Emergency Overlay */}
      {emergency && (
        <div className="absolute inset-0 border-4 border-red-500 pointer-events-none animate-pulse z-40" />
      )}
    </div>
  );
}

export default App;
