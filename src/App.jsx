import React, { useState, useEffect, useMemo } from 'react';
import Background from './components/Background';
import FloatingHeart from './components/FloatingHeart';
import MessageModal from './components/MessageModal';
import FinalCelebration from './components/FinalCelebration';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

const ROMANTIC_REASONS = [
  { id: 1, title: "Nụ cười của em", content: "Mỗi khi nhìn thấy em cười, mọi mệt mỏi trong ngày của anh dường như tan biến hết. Nụ cười ấy là liều thuốc ngọt ngào nhất thế gian." },
  { id: 2, title: "Sự thấu hiểu", content: "Cảm ơn em đã luôn kiên nhẫn lắng nghe, thấu hiểu cả những lúc anh bướng bỉnh hay áp lực nhất. Có em bên cạnh, anh luôn được là chính mình." },
  { id: 3, title: "Những cái ôm bình yên", content: "Cái ôm của em có siêu năng lực xua tan đi mọi mệt mỏi và bão giông ngoài kia. Đó là nơi bình yên nhất anh luôn muốn trở về." },
  { id: 4, title: "Ánh mắt biết nói", content: "Cách em nhìn anh đầy tin tưởng và yêu thương luôn làm tim anh lỡ nhịp. Trong mắt em, anh tìm thấy cả một bầu trời tương lai của hai đứa." },
  { id: 5, title: "Sự nỗ lực của em", content: "Anh luôn ngưỡng mộ sự chăm chỉ, nỗ lực cho tương lai của em mỗi ngày. Em chính là động lực to lớn giúp anh hoàn thiện bản thân hơn." },
  { id: 6, title: "Vì em là chính em", content: "Không cần hoàn hảo theo quy chuẩn của ai cả. Chỉ cần em là chính em - cô gái đáng yêu, bướng bỉnh nhưng ngập tràn tình yêu của anh. Anh yêu em vì tất cả!" }
];

export default function App() {
  const [hearts, setHearts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isCelebration, setIsCelebration] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isJarOpened, setIsJarOpened] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [audio] = useState(() => new Audio("/music.mp3")); // Custom local Vietnamese love song in public/music.mp3

  // Generate 16 glowing fireflies with random placements and delay speeds
  const fireflies = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 5}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 6}s`,
    }));
  }, []);

  // Initialize hearts with smart, balanced layout to prevent overlaps with main text & jar
  useEffect(() => {
    const generatedHearts = ROMANTIC_REASONS.map((reason, index) => {
      // Alternate placing hearts on the left or right side of the screen
      const isLeft = index % 2 === 0;
      const verticalSegment = Math.floor(index / 2); // 3 segments (0 to 2) for 6 hearts
      
      // Evenly distribute vertically from 36% to 78% of screen height to avoid header popup overlap
      const topVal = 36 + verticalSegment * 19 + Math.random() * 5;
      
      // Distribute horizontally to keep center (header/jar) clear
      let leftVal;
      if (isLeft) {
        leftVal = 10 + Math.random() * 18; // 10% to 28%
      } else {
        leftVal = 72 + Math.random() * 18; // 72% to 90%
      }

      return {
        ...reason,
        top: `${topVal}%`,
        left: `${leftVal}%`,
        size: Math.floor(Math.random() * 10) + 50, // Responsive size between 50px and 60px
        delay: `${Math.random() * 3}s`,
        duration: `${Math.random() * 4 + 6}s`, // Smooth floating duration 6s to 10s
        isOpened: false,
      };
    });
    setHearts(generatedHearts);
  }, []);

  // Handle Music playing & autoplay bypass on first gesture
  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;

    // Try to play immediately on mount (if browser allows autoplay)
    audio.play()
      .then(() => {
        setIsPlayingMusic(true);
      })
      .catch(err => {
        console.log("Immediate autoplay blocked, waiting for gesture...", err);
      });

    const startAudioOnGesture = () => {
      audio.play()
        .then(() => {
          setIsPlayingMusic(true);
          // Remove listener once playing successfully
          window.removeEventListener('click', startAudioOnGesture);
          window.removeEventListener('touchstart', startAudioOnGesture);
        })
        .catch(err => {
          console.log("Autoplay waiting for active interaction...", err);
        });
    };

    window.addEventListener('click', startAudioOnGesture);
    window.addEventListener('touchstart', startAudioOnGesture);

    return () => {
      audio.pause();
      window.removeEventListener('click', startAudioOnGesture);
      window.removeEventListener('touchstart', startAudioOnGesture);
    };
  }, [audio]);

  const startGiftApp = () => {
    setIsStarted(true);
    audio.play()
      .then(() => {
        setIsPlayingMusic(true);
      })
      .catch(err => {
        console.log("Audio play failed on gesture entry: ", err);
      });
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Audio play blocked by browser. Needs user click first."));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  const handleOpenJar = () => {
    if (isJarOpened) return;
    setIsJarOpened(true);
    // Play sweet music instantly upon opening the bottle
    audio.play().catch(() => {});
    setIsPlayingMusic(true);
  };

  const handleHeartClick = (clickedHeart) => {
    setSelectedMessage(clickedHeart);
    
    setHearts(prevHearts => 
      prevHearts.map(h => h.id === clickedHeart.id ? { ...h, isOpened: true } : h)
    );
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    
    // Check if all hearts have been opened
    const allOpened = hearts.every(h => h.isOpened || h.id === selectedMessage?.id);
    if (allOpened) {
      setTimeout(() => {
        setIsCelebration(true);
      }, 500);
    }
  };

  const openedCount = useMemo(() => {
    return hearts.filter(h => h.isOpened).length;
  }, [hearts]);

  return (
    <Background>
      {/* Welcome Screen Overlay to unlock browser audio sandbox */}
      {!isStarted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          backgroundColor: 'rgba(5, 6, 15, 0.85)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}>
          {/* Glowing pulsing welcome heart */}
          <div 
            className="pulse-heart-final"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 94, 126, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              border: '2px solid var(--color-primary)',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(255, 94, 126, 0.4)',
            }}
            onClick={startGiftApp}
          >
            <Heart size={40} color="var(--color-primary)" fill="var(--color-primary)" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: '1.8rem',
            color: '#ffffff',
            fontWeight: '700',
            lineHeight: '1.4',
            marginBottom: '15px',
            textShadow: '0 0 10px rgba(255,255,255,0.2)',
          }}>
            Gửi người con gái anh thương nhất... ❤️
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            fontWeight: '500',
            maxWidth: '300px',
            lineHeight: '1.6',
            marginBottom: '35px',
          }}>
            Một món quà nhỏ ngọt ngào nhân ngày sinh nhật rực rỡ của em.
          </p>

          <button
            onClick={startGiftApp}
            style={{
              padding: '16px 36px',
              borderRadius: '35px',
              border: 'none',
              background: 'linear-gradient(90deg, #ff5e7e 0%, #ff285a 100%)',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255, 94, 126, 0.5)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Sparkles size={20} /> Mở Hộp Yêu Thương
          </button>
        </div>
      )}

      {/* Drifting Fireflies Layer */}
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          style={{
            position: 'absolute',
            top: fly.top,
            left: fly.left,
            width: fly.size,
            height: fly.size,
            borderRadius: '50%',
            backgroundColor: '#ffd700',
            boxShadow: '0 0 10px #ffd700, 0 0 20px rgba(255, 215, 0, 0.6)',
            opacity: 0,
            animation: `drift ${fly.duration} infinite ease-in-out`,
            animationDelay: fly.delay,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Floating Music Controller */}
      <button
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 50,
          transition: 'all 0.3s ease',
        }}
      >
        {isPlayingMusic ? <Volume2 size={20} className="pulse-heart-final" /> : <VolumeX size={20} />}
      </button>

      {isCelebration ? (
        <FinalCelebration />
      ) : (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Header Progress panel */}
          <div 
            className="glass-panel"
            style={{
              marginTop: '30px',
              padding: '15px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              maxWidth: '90%',
              zIndex: 10,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: '1.4rem',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600'
            }}>
              <Sparkles size={16} color="var(--color-gold)" /> 
              Chiếc Lọ Yêu Thương 
              <Sparkles size={16} color="var(--color-gold)" />
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: '500', textAlign: 'center' }}>
              {isJarOpened 
                ? `Hãy chạm vào ${ROMANTIC_REASONS.length} trái tim lấp lánh để tìm câu trả lời...` 
                : "Chạm vào Chiếc Lọ thủy tinh để mở ra điều kỳ diệu... 💖"}
            </p>
            {/* Progress counter */}
            {isJarOpened && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                <Heart size={14} color="var(--color-primary)" fill="var(--color-primary)" />
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  {openedCount} / {ROMANTIC_REASONS.length}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Glowing Heart-Shaped Glass Jar */}
          <div
            onClick={handleOpenJar}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '210px', // Matches heart body height
              cursor: isJarOpened ? 'default' : 'pointer',
              zIndex: 3,
              animation: 'jar-glow 4s infinite ease-in-out',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Cork / Lid plugging the seamless neck */}
            <div style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '46px',
              height: '16px',
              background: '#b07d62',
              borderRadius: '3px 3px 1px 1px',
              boxShadow: 'inset 0 -3px 5px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.2)',
              transformOrigin: 'bottom center',
              animation: isJarOpened ? 'pop-cork-animation 1.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards' : 'none',
              transition: 'all 0.3s ease',
              zIndex: 6,
            }} />

            {/* Ribbon tied around the neck */}
            <div style={{
              position: 'absolute',
              top: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '42px',
              height: '8px',
              background: 'linear-gradient(90deg, #ff285a 0%, #ff5e7e 50%, #ff285a 100%)',
              boxShadow: '0 2px 5px rgba(255,94,126,0.4)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--color-gold)',
                borderRadius: '50%',
                boxShadow: '0 0 6px var(--color-gold)',
              }} />
            </div>

            {/* Heart Glass Body with Built-in Seamless Neck */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 2,
            }}>
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                  {/* Glass Gradient */}
                  <linearGradient id="heartGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
                    <stop offset="40%" stopColor="rgba(255, 255, 255, 0.04)" />
                    <stop offset="100%" stopColor="rgba(255, 94, 126, 0.15)" />
                  </linearGradient>
                  
                  {/* Liquid Glowing Gradient */}
                  <radialGradient id="innerLiquidGrad" cx="50%" cy="55%" r="50%">
                    <stop offset="0%" stopColor={isJarOpened ? "rgba(255, 94, 126, 0.3)" : "rgba(255, 40, 90, 0.85)"} />
                    <stop offset="70%" stopColor={isJarOpened ? "rgba(255, 94, 126, 0.08)" : "rgba(255, 94, 126, 0.4)"} />
                    <stop offset="100%" stopColor="rgba(255, 94, 126, 0)" />
                  </radialGradient>
                </defs>

                {/* Outer Glass Shell (Unified Neck + Heart Body) */}
                <path 
                  d="M80,10 L80,35 C40,15 10,35 10,85 C10,135 100,185 100,185 C100,185 190,135 190,85 C190,35 160,15 120,35 L120,10 Z" 
                  fill="url(#heartGlassGrad)" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="3.5" 
                  filter="drop-shadow(0 10px 25px rgba(0,0,0,0.5))"
                />

                {/* Glowing Liquid core (Unified Neck + Heart Body) */}
                <path 
                  d="M85,25 L85,42 C50,23 20,40 20,85 C20,128 100,172 100,172 C100,172 180,128 180,85 C180,40 150,23 115,42 L115,25 Z" 
                  fill="url(#innerLiquidGrad)" 
                  style={{
                    transition: 'all 1s ease',
                    animation: isJarOpened ? 'none' : 'twinkle 2s infinite ease-in-out'
                  }}
                />
                
                {/* Gloss/Reflection highlight on glass */}
                <path 
                  d="M40,65 C30,75 25,90 27,105" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
          </div>

          {/* Floating Hearts Layer - emerging dynamically */}
          {hearts.map((heart) => (
            <FloatingHeart 
              key={heart.id} 
              heart={heart} 
              onClick={handleHeartClick} 
              isJarOpened={isJarOpened}
            />
          ))}

          {/* Detailed sweet Message Popup */}
          <MessageModal 
            message={selectedMessage} 
            onClose={handleCloseModal} 
          />
        </div>
      )}
    </Background>
  );
}
