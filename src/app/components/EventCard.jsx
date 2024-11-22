"use client";

import React, { useEffect, useRef, useState } from "react";
import Trianglify from "trianglify";

const EventCard = ({ eventName,selectedYear }) => {
  const svgRef = useRef(null);
  const cardRef = useRef(null);
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  function generatePattern() {
    return Trianglify({
      width: dimension.width,
      height: dimension.height,
      cellSize: 45,
      variance: 0.85,
      xColors: ["#140A0A", "#1D0F0F", "#261414", "#2F1919", "#FF5555", "#FFAA00"],
      yColors: "match",
      strokeWidth: 1.5,
      colorSpace: "lab",
      seed: eventName,
    });
  }

  useEffect(() => {
    if (selectedYear !== currentYear) {
      setIsVisible(false);
      setCurrentYear(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (cardRef.current) {
      const { clientWidth, clientHeight } = cardRef.current;
      setDimension({ width: clientWidth, height: clientHeight });
    }
  }, []);



  useEffect(() => {
    if (dimension.width && dimension.height && svgRef.current) {
      svgRef.current.innerHTML = "";
      svgRef.current.appendChild(generatePattern().toSVG());
      setIsVisible(true); // Trigger the visibility animation
    }
  }, [dimension,window.innerWidth]);

  return (
    <div
      className={`relative 
        min-w-[40%] sm:min-w-[10%] md:min-w-[24%] lg:min-w-[18%] px-2
        h-[40vh] sm:h-[250px] lg:h-full 
        overflow-hidden transform 
        transition-opacity duration-200 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      ref={cardRef}
    >
      <div ref={svgRef} className="absolute inset-0 w-full h-full"></div>
      <div className="absolute inset-0 flex items-center justify-center border-2 border-red">
        <div
          className={`text-white font-bold 
            text-xl sm:text-2xl lg:text-4xl 
            transform -rotate-90`}
        >
          {String(eventName).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
