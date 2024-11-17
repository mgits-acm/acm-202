import React, { useEffect, useRef } from 'react';
import Trianglify from 'trianglify';

const EventCard = ({ eventName}) => {
  const svgRef = useRef(null);

  const pattern = Trianglify({
    width: 800,
    height: 800,
    cellSize: 45,  // Slightly smaller triangles
    variance: 0.85, // More variance for interesting patterns
    xColors: ['#140A0A', '#1D0F0F', '#261414', '#2F1919', '#FF5555', '#FFAA00'],
    yColors: 'match',
    strokeWidth: 1.5, // Slightly thicker edges for more prominent highlights
    colorSpace: 'lab',
    seed: eventName,
  });

  useEffect(() => {
    svgRef.current.appendChild(pattern.toSVG());
  }, []);

  return (
    <div className="relative min-w-52 w-1/4 h-full overflow-hidden">
      <div ref={svgRef} className="absolute inset-0 w-full h-full"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-4xl font-bold -rotate-90">
          {String(eventName).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default EventCard;