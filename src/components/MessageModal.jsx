import React from 'react';
import { X, Heart } from 'lucide-react';

export default function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        backgroundColor: 'rgba(5, 6, 15, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out forwards',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
      
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          maxHeight: '85dvh',
          overflowY: 'auto',
          padding: '30px 24px 28px 24px',
          textAlign: 'center',
          position: 'relative',
          animation: 'scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold Wax Seal header */}
        <div style={{
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffe066 0%, #d4af37 60%, #aa7c11 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5px',
          border: '3px double rgba(255, 215, 0, 0.8)',
          boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35), inset 0 0 10px rgba(0,0,0,0.4)',
          transform: 'rotate(-5deg)',
        }}>
          <Heart size={26} color="#c53030" fill="#c53030" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-romantic)',
          fontSize: '1.8rem',
          color: '#ffffff',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          {message.title || "Điều ngọt ngào..."}
        </h3>

        {/* Message Content */}
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#e5e7eb',
          fontWeight: '400',
          whiteSpace: 'pre-line'
        }}>
          {message.content}
        </p>

        {/* Footer/Close Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '15px',
            padding: '12px 35px',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(90deg, #ff5e7e 0%, #ff285a 100%)',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 94, 126, 0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Nhận lấy 💖
        </button>

        {/* Close absolute button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
