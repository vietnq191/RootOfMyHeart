import React from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHeart({ heart, onClick, isJarOpened }) {
  const { top, left, size, delay, duration, isOpened } = heart;

  // If jar is closed, huddle all hearts as glowing warm dots inside the jar
  const finalTop = isJarOpened ? top : '75%';
  const finalLeft = isJarOpened ? left : '50%';
  const finalScale = isJarOpened ? 1 : 0.25;
  const finalOpacity = isJarOpened ? 0.8 : 1;

  return (
    <div
      onClick={() => isJarOpened && onClick(heart)}
      style={{
        position: 'absolute',
        top: finalTop,
        left: finalLeft,
        cursor: isJarOpened ? 'pointer' : 'default',
        transform: `translate3d(-50%, -50%, 0) scale(${finalScale})`,
        opacity: finalOpacity,
        transition: 'top 1.4s cubic-bezier(0.34, 1.56, 0.64, 1), left 1.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease',
        willChange: 'top, left, transform, opacity',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isJarOpened ? 'auto' : 'none',
      }}
      className="heart-container"
    >
      {/* Nested container for floating animation to prevent conflicts with coordinates transition */}
      <div
        style={{
          animation: isJarOpened ? `float-slow ${duration} infinite ease-in-out` : 'none',
          animationDelay: delay,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: isOpened 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'radial-gradient(circle, rgba(255,94,126,0.8) 0%, rgba(255,40,90,0.5) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isOpened ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 94, 126, 0.6)',
            boxShadow: isOpened 
              ? '0 0 10px rgba(255, 255, 255, 0.2)' 
              : '0 0 20px var(--color-primary-glow), inset 0 0 10px rgba(255,255,255,0.3)',
            animation: isOpened ? 'none' : 'pulse-glow 3s infinite ease-in-out',
            animationDelay: delay,
            transition: 'all 0.5s ease',
          }}
        >
          <Heart 
            size={size * 0.45} 
            color={isOpened ? '#ffb3c1' : '#ffffff'} 
            fill={isOpened ? '#ffb3c1' : '#ffffff'} 
            style={{
              filter: isOpened ? 'none' : 'drop-shadow(0 0 3px rgba(255,255,255,0.8))',
              transition: 'all 0.5s ease'
            }}
          />
        </div>
        
        {/* Visual pulse trail */}
        {!isOpened && (
          <span style={{
            position: 'absolute',
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: '50%',
            border: '1px solid rgba(255, 94, 126, 0.3)',
            animation: 'twinkle 2s infinite ease-in-out',
            animationDelay: delay,
            pointerEvents: 'none'
          }} />
        )}
      </div>
    </div>
  );
}
