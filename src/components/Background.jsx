import React, { useMemo } from 'react';

export default function Background({ children }) {
  // Generate random positions for 70 stars
  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 3 + 2 + 's',
    }));
  }, []);

  // Generate 4 shooting star specifications
  const shootingStars = useMemo(() => {
    return [
      { id: 1, top: '10%', right: '-50px', delay: '2s', duration: '5s' },
      { id: 2, top: '25%', right: '-80px', delay: '7s', duration: '6s' },
      { id: 3, top: '5%', right: '-40px', delay: '12s', duration: '4s' },
      { id: 4, top: '40%', right: '-100px', delay: '16s', duration: '7s' },
    ];
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100dvw',
      height: '100dvh',
      background: 'var(--bg-gradient)',
      overflow: 'hidden',
    }}>
      
      {/* Twinkling Stars Layer */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 8px #ffffff',
            opacity: 0.7,
            animation: `twinkle ${star.duration} infinite ease-in-out`,
            animationDelay: star.delay,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Shooting Stars Layer */}
      {shootingStars.map((sStar) => (
        <div
          key={sStar.id}
          style={{
            position: 'absolute',
            top: sStar.top,
            right: sStar.right,
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-45deg)',
            transformOrigin: 'right center',
            animation: `shooting-star ${sStar.duration} infinite ease-in-out`,
            animationDelay: sStar.delay,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Nebula subtle glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 94, 126, 0.12) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '0%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123, 97, 255, 0.12) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* Content wrapper */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  );
}
