import { useEffect, useState, useCallback } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import img1 from './assets/homePhotos/1.png'
import img2 from './assets/homePhotos/2.png'
import img3 from './assets/homePhotos/3.png'
import img4 from './assets/homePhotos/4.png'
import img5 from './assets/homePhotos/5.png'
import img6 from './assets/homePhotos/6.png'
import img7 from './assets/homePhotos/7.png'

const photos = [
  img1, img2, img3, img4, img5, img6, img7
];

const messages = [
  "Happy Birthday, My Love! 🎂❤️",
  "Every moment with you is a celebration...",
  "Let's see how well you remember our journey 💌"
];

const photoAnimations = [
  'animate-slideInLeft', 'animate-slideInRight', 'animate-slideInTop', 'animate-slideInBottom',
  'animate-bounceIn', 'animate-spiralIn', 'animate-scaleIn', 'animate-flipIn',
  'animate-floatIn', 'animate-zoomBounce'
];


 

function App() {
  const [floatingPhotos, setFloatingPhotos] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(1);

  const getRandomPosition = useCallback((existingPhotos = []) => {
    const minDistance = 200; // Slightly reduced for better placement
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * (Math.min(window.innerWidth, 1400) - 200);
      const y = Math.random() * (Math.min(window.innerHeight, 900) - 200);
      
      // Check if this position conflicts with existing photos
      const tooClose = existingPhotos.some(photo => {
        const distance = Math.sqrt(Math.pow(x - photo.x, 2) + Math.pow(y - photo.y, 2));
        return distance < minDistance;
      });
      
      if (!tooClose) {
        return { x, y };
      }
      attempts++;
    }
    
    // Fallback to a safe position if no good spot found
    return {
      x: Math.random() * (Math.min(window.innerWidth, 1400) - 200),
      y: Math.random() * (Math.min(window.innerHeight, 900) - 200)
    };
  }, []);

  const getRandomAnimation = useCallback(() => {
    return photoAnimations[Math.floor(Math.random() * photoAnimations.length)];
  }, []);

  // Initial photos to ensure page is never empty
  useEffect(() => {
    // Add initial photos immediately - start with 6 photos
    const initialPhotos = [];
    for (let i = 0; i < 6; i++) {
      const position = getRandomPosition(initialPhotos);
      const newPhoto = {
        id: Date.now() + Math.random() + i,
        src: photos[Math.floor(Math.random() * photos.length)],
        ...position,
        animation: getRandomAnimation(),
        createdAt: Date.now()
      };
      initialPhotos.push(newPhoto);
    }
    setFloatingPhotos(initialPhotos);
  }, [getRandomPosition, getRandomAnimation]);

  // Faster continuous photo floating effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingPhotos(prev => {
        // Maintain 5-8 photos on screen
        if (prev.length >= 8) return prev;
        
        // Much higher probability of adding photos, especially after initial batch
        const shouldAdd = prev.length < 6 || Math.random() > 0.3; // Increased from 0.7 to 0.3
        
        if (!shouldAdd) return prev;
        
        const position = getRandomPosition(prev);
        const newPhoto = {
          id: Date.now() + Math.random(),
          src: photos[Math.floor(Math.random() * photos.length)],
          ...position,
          animation: getRandomAnimation(),
          createdAt: Date.now()
        };
        
        return [...prev, newPhoto];
      });
    }, 1200); // Much faster interval - from 2000ms to 1200ms

    return () => clearInterval(interval);
  }, [getRandomPosition, getRandomAnimation]);

  // Cleanup photos with better timing
  useEffect(() => {
    const timeouts = floatingPhotos.map((photo, index) => 
      setTimeout(() => {
        setFloatingPhotos(prev => {
          // Don't remove if it would leave us with less than 5 photos
          if (prev.length <= 5) return prev;
          return prev.filter(p => p.id !== photo.id);
        });
      }, 12000 + (index * 800)) // Reduced display time and stagger for faster cycling
    );

    return () => timeouts.forEach(clearTimeout);
  }, [floatingPhotos]);

  const handleStartQuiz = () => {
    setCurrentQuiz(1);
    // In a real app, you'd navigate to the quiz route
    console.log('Starting quiz...');
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          0% { 
            opacity: 0; 
            transform: translateX(-100vw) scale(0.8) rotate(-10deg); 
          }
          60% { 
            opacity: 1; 
            transform: translateX(20px) scale(1.1) rotate(5deg); 
          }
          80% { 
            opacity: 1; 
            transform: translateX(-10px) scale(1) rotate(-2deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotate(0deg); 
          }
        }

        @keyframes slideInRight {
          0% { 
            opacity: 0; 
            transform: translateX(100vw) scale(0.8) rotate(10deg); 
          }
          60% { 
            opacity: 1; 
            transform: translateX(-20px) scale(1.1) rotate(-5deg); 
          }
          80% { 
            opacity: 1; 
            transform: translateX(10px) scale(1) rotate(2deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotate(0deg); 
          }
        }

        @keyframes slideInTop {
          0% { 
            opacity: 0; 
            transform: translateY(-100vh) scale(0.9) rotate(-5deg); 
          }
          70% { 
            opacity: 1; 
            transform: translateY(15px) scale(1.05) rotate(3deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
        }

        @keyframes slideInBottom {
          0% { 
            opacity: 0; 
            transform: translateY(100vh) scale(0.9) rotate(5deg); 
          }
          70% { 
            opacity: 1; 
            transform: translateY(-15px) scale(1.05) rotate(-3deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
        }

        @keyframes bounceIn {
          0% { 
            opacity: 0; 
            transform: scale(0.3) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2) rotate(5deg); 
          }
          65% { 
            transform: scale(0.9) rotate(-3deg); 
          }
          80% { 
            transform: scale(1.1) rotate(2deg); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }

        @keyframes spiralIn {
          0% { 
            opacity: 0; 
            transform: scale(0.1) rotate(-360deg); 
          }
          70% { 
            opacity: 1; 
            transform: scale(1.1) rotate(20deg); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }

        @keyframes scaleIn {
          0% { 
            opacity: 0; 
            transform: scale(0.1); 
          }
          60% { 
            opacity: 1; 
            transform: scale(1.3); 
          }
          80% { 
            transform: scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        @keyframes flipIn {
          0% { 
            opacity: 0; 
            transform: perspective(400px) rotateY(-90deg) scale(0.8); 
          }
          40% { 
            transform: perspective(400px) rotateY(-20deg) scale(1.1); 
          }
          60% { 
            opacity: 1; 
            transform: perspective(400px) rotateY(10deg) scale(1); 
          }
          80% { 
            transform: perspective(400px) rotateY(-5deg) scale(1); 
          }
          100% { 
            opacity: 1; 
            transform: perspective(400px) rotateY(0deg) scale(1); 
          }
        }

        @keyframes floatIn {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.8); 
          }
          60% { 
            opacity: 1; 
            transform: translateY(-10px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        @keyframes zoomBounce {
          0% { 
            opacity: 0; 
            transform: scale(0.3) translateY(0px); 
          }
          40% { 
            opacity: 1; 
            transform: scale(1.3) translateY(-30px); 
          }
          60% { 
            opacity: 1; 
            transform: scale(0.9) translateY(10px); 
          }
          80% { 
            transform: scale(1.1) translateY(-5px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0px); 
          }
        }

        @keyframes fadeOutSlow {
          0% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
          70% { 
            opacity: 0.8; 
            transform: scale(1.05) rotate(2deg); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0.8) rotate(-5deg); 
          }
        }

        @keyframes gentleHover {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(1deg); 
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(10px) translateY(-10px);
          }
          50% {
            transform: translateX(-5px) translateY(-20px);
          }
          75% {
            transform: translateX(-10px) translateY(-5px);
          }
        }

        .animate-slideInLeft { 
          animation: slideInLeft 2s ease-out forwards, gentleHover 4s ease-in-out infinite 2s, fadeOutSlow 2s ease-in-out 6s forwards; 
        }
        .animate-slideInRight { 
          animation: slideInRight 2s ease-out forwards, gentleHover 4s ease-in-out infinite 2s, fadeOutSlow 2s ease-in-out 6s forwards; 
        }
        .animate-slideInTop { 
          animation: slideInTop 1.8s ease-out forwards, gentleHover 4s ease-in-out infinite 1.8s, fadeOutSlow 2s ease-in-out 6.2s forwards; 
        }
        .animate-slideInBottom { 
          animation: slideInBottom 1.8s ease-out forwards, gentleHover 4s ease-in-out infinite 1.8s, fadeOutSlow 2s ease-in-out 6.2s forwards; 
        }
        .animate-bounceIn { 
          animation: bounceIn 2.5s ease-out forwards, gentleHover 4s ease-in-out infinite 2.5s, fadeOutSlow 2s ease-in-out 5.5s forwards; 
        }
        .animate-spiralIn { 
          animation: spiralIn 3s ease-out forwards, gentleHover 4s ease-in-out infinite 3s, fadeOutSlow 2s ease-in-out 5s forwards; 
        }
        .animate-scaleIn { 
          animation: scaleIn 2s ease-out forwards, gentleHover 4s ease-in-out infinite 2s, fadeOutSlow 2s ease-in-out 6s forwards; 
        }
        .animate-flipIn { 
          animation: flipIn 2.2s ease-out forwards, gentleHover 4s ease-in-out infinite 2.2s, fadeOutSlow 2s ease-in-out 5.8s forwards; 
        }
        .animate-floatIn { 
          animation: floatIn 1.5s ease-out forwards, gentleHover 4s ease-in-out infinite 1.5s, fadeOutSlow 2s ease-in-out 6.5s forwards; 
        }
        .animate-zoomBounce { 
          animation: zoomBounce 2.8s ease-out forwards, gentleHover 4s ease-in-out infinite 2.8s, fadeOutSlow 2s ease-in-out 5.2s forwards; 
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-drift { animation: drift 8s ease-in-out infinite; }

        .bg-gradient-romantic {
          background: linear-gradient(135deg, 
            #fce7f3 0%, 
            #fdf2f8 25%, 
            #fef3c7 50%, 
            #ecfdf5 75%, 
            #ede9fe 100%
          );
        }

        .backdrop-blur-gentle {
          backdrop-filter: blur(3px);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .floating-hearts::before {
          content: '💕';
          position: absolute;
          animation: float 4s ease-in-out infinite;
          font-size: 2rem;
          top: -20px;
          left: -20px;
          opacity: 0.7;
        }

        .floating-hearts::after {
          content: '💖';
          position: absolute;
          animation: float 4s ease-in-out infinite 2s;
          font-size: 1.5rem;
          bottom: -15px;
          right: -15px;
          opacity: 0.6;
        }

        .photo-crisp {
          filter: sepia(15%) saturate(1.3) brightness(1.1) contrast(1.15) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25), 0 0 20px rgba(255,255,255,0.4), inset 0 0 0 2px rgba(255,255,255,0.3) !important;
        }
      `}</style>

      <div className="relative min-h-screen bg-gradient-romantic overflow-hidden">
        {/* Floating Photos with Enhanced Clarity */}
        {floatingPhotos.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.src}
            alt="Beautiful memories"
            className={`absolute w-36 h-36 md:w-48 md:h-48 object-cover rounded-full shadow-2xl border-4 border-white/90 photo-crisp ${photo.animation}`}
            style={{
              top: photo.y,
              left: photo.x,
              pointerEvents: 'none',
              zIndex: index % 2 === 0 ? 1 : 2, // Alternating z-index for layered effect
            }}
            loading="lazy"
          />
        ))}

        {/* Enhanced Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-drift">🌹</div>
        <div className="absolute top-20 right-20 text-4xl opacity-35 animate-twinkle" style={{ animationDelay: '1s' }}>💕</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-30 animate-float" style={{ animationDelay: '2s' }}>🎂</div>
        <div className="absolute bottom-40 right-40 text-3xl opacity-40 animate-drift" style={{ animationDelay: '3s' }}>✨</div>
        <div className="absolute top-1/3 left-5 text-3xl opacity-25 animate-twinkle" style={{ animationDelay: '4s' }}>🎈</div>
        <div className="absolute top-1/2 right-5 text-4xl opacity-30 animate-float" style={{ animationDelay: '5s' }}>🎀</div>
        <div className="absolute bottom-1/3 left-1/4 text-2xl opacity-35 animate-drift" style={{ animationDelay: '2.5s' }}>💖</div>
        <div className="absolute top-3/4 right-1/3 text-3xl opacity-25 animate-twinkle" style={{ animationDelay: '1.5s' }}>🌟</div>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <div className="backdrop-blur-gentle rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto floating-hearts relative">
            <h1 className="text-3xl md:text-6xl font-bold text-rose-700 mb-6 text-shadow animate-pulse-slow">
              <Typewriter 
                words={messages} 
                loop={0} 
                cursor 
                cursorStyle="_" 
                typeSpeed={70} 
                deleteSpeed={50} 
                delaySpeed={2000} 
              />
            </h1>

            <div className="space-y-4 mb-8">
              <p className="text-lg md:text-2xl text-rose-600 font-medium animate-float">
                On this special day, I just want to remind you how much you mean to me... 🌹
              </p>
              <p className="text-base md:text-lg text-rose-500 opacity-90" style={{ animationDelay: '1s' }}>
                Every moment with you is etched in my heart forever. 💖
              </p>
            </div>

            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full text-lg md:text-xl shadow-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 animate-pulse-slow"
              aria-label="Start the romantic birthday quiz"
            >
              Start Our Journey Quiz 🎉✨
            </button>

            <p className="mt-4 text-sm text-rose-400 opacity-75">
              Let's relive our beautiful memories together...
            </p>
          </div>
        </div>

        {/* Enhanced Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: ['#f43f5e', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Floating heart particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-pink-400 opacity-20 animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;