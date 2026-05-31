import { useRef, useEffect, useState } from 'react';

const CameraView = () => {
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState('local');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked; user will need to interact
      });
    }
  }, [videoSource]);

  const handleError = () => {
    // If local video fails to load, fall back to online sample
    if (videoSource === 'local') {
      setVideoSource('fallback');
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden">
      <video
        key={videoSource}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onError={handleError}
        className="w-full h-full object-cover"
      >
        {videoSource === 'local' ? (
          <>
            {/* Local file served by Express backend */}
            <source src="http://localhost:5000/assets/camera-feed.mp4" type="video/mp4" />
            {/* Also try public folder if backend unavailable */}
            <source src="/camera-feed.mp4" type="video/mp4" />
          </>
        ) : (
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        )}
      </video>

      {/* LIVE indicator overlay */}
      <div className="absolute top-24 left-6 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 z-10">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        <span className="text-white text-xs font-semibold tracking-wider">LIVE</span>
      </div>

      {/* Camera info overlay */}
      <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs z-10">
        <div className="font-mono">CAM-01 | 1920x1080 | 30fps</div>
      </div>
    </div>
  );
};

export default CameraView;
