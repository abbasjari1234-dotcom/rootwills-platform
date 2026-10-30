'use client';

import React, { useEffect, useRef, useState } from 'react';

export type FlourishVariant = 
  | 'underline-wave'
  | 'underline-loop'
  | 'circle-sketch'
  | 'sketch-star'
  | 'sketch-arrow'
  | 'double-underline'
  | 'sparkle-burst';

interface DoodleFlourishProps {
  variant?: FlourishVariant;
  color?: string;
  strokeWidth?: number;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
}

export function DoodleFlourish({
  variant = 'underline-wave',
  color = '#BA8E4E',
  strokeWidth = 3.5,
  className = '',
  delay = 100,
  duration = 750,
}: DoodleFlourishProps) {
  const [isVisible, setIsVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number>(300);

  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setPathLength(len);
        }
      } catch {
        // Fallback length
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const transitionStyle: React.CSSProperties = {
    strokeDasharray: pathLength,
    strokeDashoffset: isVisible ? 0 : pathLength,
    transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  switch (variant) {
    case 'underline-wave':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 280 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 4 13 C 55 5, 115 17, 175 7 C 215 1, 245 14, 276 9"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={transitionStyle}
          />
        </svg>
      );

    case 'underline-loop':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 320 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 5 18 C 75 7, 160 21, 230 11 C 265 6, 290 14, 310 10 C 316 9, 318 4, 312 3 C 304 2, 292 9, 282 18"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={transitionStyle}
          />
        </svg>
      );

    case 'double-underline':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 260 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 4 8 C 65 3, 135 12, 256 6"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={transitionStyle}
          />
          <path
            d="M 18 17 C 80 12, 160 20, 242 15"
            stroke={color}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            opacity={0.7}
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isVisible ? 0 : pathLength,
              transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 120}ms`,
            }}
          />
        </svg>
      );

    case 'circle-sketch':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 220 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 28 50 C 18 24, 62 10, 118 10 C 176 10, 210 26, 206 50 C 201 74, 155 84, 98 83 C 44 82, 14 68, 18 42 C 22 22, 54 14, 88 12"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={transitionStyle}
          />
        </svg>
      );

    case 'sketch-star':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <g
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={transitionStyle}
          >
            <path ref={pathRef} d="M 22 4 L 22 40" />
            <path d="M 4 22 L 40 22" />
            <path d="M 9 9 L 35 35" />
            <path d="M 9 35 L 35 9" />
          </g>
        </svg>
      );

    case 'sparkle-burst':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 25 3 C 25 15, 35 25, 47 25 C 35 25, 25 35, 25 47 C 25 35, 15 25, 3 25 C 15 25, 25 15, 25 3 Z"
            stroke={color}
            strokeWidth={strokeWidth * 0.85}
            fill={isVisible ? `${color}18` : 'transparent'}
            strokeLinejoin="round"
            style={{
              ...transitionStyle,
              transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, fill ${duration}ms ease-out ${delay + 200}ms`,
            }}
          />
        </svg>
      );

    case 'sketch-arrow':
      return (
        <svg
          ref={svgRef}
          viewBox="0 0 90 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`overflow-visible pointer-events-none ${className}`}
        >
          <path
            ref={pathRef}
            d="M 8 12 C 30 22, 58 35, 75 58 M 60 56 L 75 58 L 74 43"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={transitionStyle}
          />
        </svg>
      );

    default:
      return null;
  }
}
