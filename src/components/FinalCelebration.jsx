import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Mic, MicOff } from 'lucide-react';

export default function FinalCelebration() {
  const [isCandlesBlown, setIsCandlesBlown] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [micError, setMicError] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const triggerFireworks = () => {
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Initial school pride blast
    const end = Date.now() + (2.5 * 1000);
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff5e7e', '#ffd700', '#ffb3c1']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff5e7e', '#ffd700', '#ffb3c1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Start microphone analysis
  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      setIsMicEnabled(true);
      setMicError(false);

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (isCandlesBlown) return;
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume in the frequency array
        let total = 0;
        for (let i = 0; i < bufferLength; i++) {
          total += dataArray[i];
        }
        const average = total / bufferLength;

        // Blow threshold: A strong puff creates high low-frequency energy (average > 65)
        if (average > 65) {
          handleBlowOut();
        } else {
          animationFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access denied or unsupported:", err);
      setMicError(true);
      setIsMicEnabled(false);
    }
  };

  const handleBlowOut = () => {
    setIsCandlesBlown(true);
    triggerFireworks();
    
    // Clean up mic streams
    cleanupMic();
  };

  const cleanupMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
  };

  // Auto request mic on mount
  useEffect(() => {
    startMic();
    return () => {
      cleanupMic();
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <style>{`
        /* Cake drawing using standard modern CSS */
        .cake-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
          margin-bottom: 25px;
          cursor: pointer;
          transition: all 0.5s ease;
          animation: float-slow 4s infinite ease-in-out;
        }

        .cake-plate {
          width: 220px;
          height: 12px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          z-index: 1;
        }

        .cake-tier-bottom {
          width: 180px;
          height: 70px;
          background: linear-gradient(to right, #ffb3c1, #ff85a1);
          border-radius: 15px 15px 0 0;
          position: relative;
          margin-bottom: -4px;
          z-index: 2;
          box-shadow: inset 0 -10px 20px rgba(0,0,0,0.15);
        }

        .cake-tier-top {
          width: 130px;
          height: 60px;
          background: linear-gradient(to right, #ffe5ec, #ffb3c1);
          border-radius: 12px 12px 0 0;
          position: relative;
          margin-bottom: -4px;
          z-index: 3;
          box-shadow: inset 0 -8px 15px rgba(0,0,0,0.15);
        }

        /* Frosting drips */
        .drips {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 15px;
          display: flex;
          justify-content: space-around;
        }

        .drip {
          width: 14px;
          height: 14px;
          background: #ffffff;
          border-radius: 50%;
          margin-top: -2px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .candle {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 35px;
          background: linear-gradient(to right, #ffd700, #ffb3c1);
          border-radius: 3px 3px 0 0;
          z-index: 4;
        }

        .candle-wax {
          position: absolute;
          top: -2px;
          left: 2px;
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
        }

        /* Candle Flame */
        .flame {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 22px;
          background: radial-gradient(circle at bottom, #ffea00 20%, #ff5e00 70%, rgba(255,0,0,0) 100%);
          border-radius: 50% 50% 20% 20%;
          animation: flicker 0.15s infinite alternate ease-in-out;
          box-shadow: 0 0 15px #ffea00, 0 0 30px rgba(255, 94, 0, 0.6);
          transition: all 0.4s ease;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) rotate(-1deg) scale(0.95); }
          100% { transform: translateX(-50%) rotate(2deg) scale(1.05); }
        }

        .puff-smoke {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 25px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          filter: blur(4px);
          animation: smoke-rise 1.5s forwards ease-out;
        }

        @keyframes smoke-rise {
          0% { transform: translateX(-50%) scale(0.2); opacity: 1; }
          50% { transform: translateX(-60%) translateY(-25px) scale(1.2); opacity: 0.5; }
          100% { transform: translateX(-40%) translateY(-50px) scale(2); opacity: 0; }
        }

        .celebration-card-v2 {
          width: 100%;
          max-width: 450px;
          max-height: 85dvh;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
          padding: 30px 20px;
          text-align: center;
          border: 1px solid rgba(255, 215, 0, 0.3);
          background: rgba(18, 20, 45, 0.55);
          animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .celebration-card-v2::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        @keyframes scaleUp {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {!isCandlesBlown ? (
        // Cake & Blowing Screen
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          
          <h2 style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: '1.8rem',
            color: '#ffffff',
            fontWeight: '700',
            textShadow: '0 0 10px rgba(255,255,255,0.2)',
            maxWidth: '320px',
            lineHeight: '1.4'
          }}>
            Chúc Mừng Sinh Nhật Em! 🎂
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            fontWeight: '500',
            maxWidth: '300px',
            lineHeight: '1.6'
          }}>
            Nhắm mắt lại, ước một điều ước ngọt ngào nhất...
          </p>

          {/* Render Cake */}
          <div className="cake-container" onClick={handleBlowOut}>
            {/* Top Tier with Candles standing perfectly on top */}
            <div className="cake-tier-top">
              <div className="drips">
                <div className="drip" />
                <div className="drip" />
                <div className="drip" />
                <div className="drip" />
              </div>
              <div className="candle" style={{ left: '25%' }}>
                <div className="candle-wax" />
                <div className="flame" />
              </div>
              <div className="candle" style={{ left: '50%' }}>
                <div className="candle-wax" />
                <div className="flame" />
              </div>
              <div className="candle" style={{ left: '75%' }}>
                <div className="candle-wax" />
                <div className="flame" />
              </div>
            </div>

            {/* Bottom Tier */}
            <div className="cake-tier-bottom">
              <div className="drips">
                <div className="drip" style={{ background: '#ffe5ec' }} />
                <div className="drip" style={{ background: '#ffe5ec' }} />
                <div className="drip" style={{ background: '#ffe5ec' }} />
                <div className="drip" style={{ background: '#ffe5ec' }} />
                <div className="drip" style={{ background: '#ffe5ec' }} />
              </div>
            </div>

            {/* Plate */}
            <div className="cake-plate" />
          </div>

          {/* Interactive Mic Status Display */}
          <div 
            className="glass-panel"
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '25px',
              maxWidth: '90%'
            }}
          >
            {isMicEnabled ? (
              <>
                <Mic size={18} color="var(--color-gold)" className="pulse-heart-final" />
                <span style={{ fontSize: '0.85rem', color: '#e5e7eb', fontWeight: '600' }}>
                  Hệ thống sẵn sàng! Thổi vào Micro điện thoại để tắt nến...
                </span>
              </>
            ) : (
              <>
                <MicOff size={18} color="var(--color-primary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>
                  {micError 
                    ? "Microphone bị chặn. Hãy CHẠM VÀO BÁNH KEM để thổi nến nhé! 👇"
                    : "Đang yêu cầu quyền sử dụng Micro..."}
                </span>
              </>
            )}
          </div>
          
          {/* Easy bypass hint */}
          <span 
            onClick={handleBlowOut}
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '5px'
            }}
          >
            Chạm vào bánh để thổi nến trực tiếp
          </span>
        </div>
      ) : (
        // Candle Blown -> Display Letter & Confetti
        <div className="glass-panel celebration-card-v2">
          {/* Puff of Smoke animation placeholders */}
          <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="puff-smoke" style={{ animationDelay: '0.1s' }} />
            <div className="puff-smoke" style={{ animationDelay: '0.3s' }} />
          </div>

          {/* Glowing Heart Icon */}
          <div 
            className="pulse-heart-final"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 94, 126, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              border: '2px solid var(--color-primary)',
            }}
          >
            <Heart size={36} color="var(--color-primary)" fill="var(--color-primary)" />
          </div>

          {/* Golden Subtitle */}
          <p style={{
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: '0.85rem',
            fontWeight: '700',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} /> My Whole World <Sparkles size={14} />
          </p>

          {/* Main Title */}
          <h1 style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: '2rem',
            color: '#ffffff',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '20px',
            textShadow: '0 0 15px rgba(255,255,255,0.2)'
          }}>
            Chúc Mừng Sinh Nhật Em Yêu! 🎉
          </h1>

          {/* Romantic Letter Content */}
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#e5e7eb',
            marginBottom: '25px',
            textAlign: 'justify',
            textJustify: 'inter-word',
            fontStyle: 'italic',
          }}>
            Gửi em, <br /><br />
            Hôm nay là một ngày vô cùng đặc biệt - ngày mà thế giới này được đón chào một cô gái tuyệt vời và ngọt ngào nhất. Cảm ơn em đã xuất hiện và tô điểm cho cuộc sống của anh thêm ngàn sắc màu hạnh phúc. <br /><br />
            Mỗi đốm sáng trong chiếc lọ này chính là một lý do bé nhỏ làm nên tình yêu to lớn mà anh dành cho em mỗi ngày. Chúc em tuổi mới luôn rực rỡ, hạnh phúc và luôn có anh bên cạnh đồng hành trên mọi nẻo đường! ❤️
          </p>

          {/* Action button to fire again */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={triggerFireworks}
              style={{
                padding: '14px 28px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(90deg, #ffd700 0%, #ffa500 100%)',
                color: '#05060f',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} /> Pháo hoa ngọt ngào!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
