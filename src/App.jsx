import { useEffect, useState, useCallback } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom"

// Mock images for demo - replace with your actual imports
const photos = [
"/1stPagePhotos/1.jpg",
//1stPageingPhotos/2.jpg",
"/1stPagePhotos/3.jpg",
"/1stPagePhotos/4.jpg",
"/1stPagePhotos/5.jpg",
"/1stPagePhotos/6.jpg",
"/1stPagePhotos/7.jpg",
//1stPageingPhotos/8.jpg",
"/1stPagePhotos/9.jpg",
"/1stPagePhotos/10.jpg",
"/1stPagePhotos/11.jpg",
"/1stPagePhotos/12.jpg",
"/1stPagePhotos/13.jpg",
"/1stPagePhotos/14.jpg",
"/1stPagePhotos/15.jpg",
"/1stPagePhotos/16.jpg",
"/1stPagePhotos/17.jpg",
"/1stPagePhotos/18.jpg",
"/1stPagePhotos/19.jpg",
"/1stPagePhotos/20.jpg",
"/1stPagePhotos/21.jpg",
"/1stPagePhotos/22.jpg",
// "/bouncingPhotos/11.jpg",
// "/bouncingPhotos/11.jpg",
];

const messages = [
  "Happy Birthday, My Pringles! 🎂❤️",
  "Every moment with you is a celebration...",
  "Let's see how sharp is your memory😁",
];

const photoAnimations = [
  "animate-slideInLeft",
  "animate-slideInRight", 
  "animate-slideInTop",
  "animate-slideInBottom",
  "animate-bounceIn",
  "animate-spiralIn",
  "animate-scaleIn",
  "animate-flipIn",
  "animate-floatIn",
  "animate-zoomBounce",
];

const photoShapes = [
  "rounded-full",
  "rounded-none rotate-45",
  "rounded-3xl",
  "rounded-tl-full rounded-br-full",
  "rounded-full border-8 border-white",
  "rounded-lg transform rotate-12",
  "clip-path-hexagon",
  "clip-path-heart", 
  "rounded-2xl transform -rotate-12",
  "rounded-full border-4 border-dashed border-pink-300",
];

function App() {
  const [floatingPhotos, setFloatingPhotos] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [fadingPhotos, setFadingPhotos] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = photos.map((src, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, src]));
            setPreloadProgress(prev => Math.min(prev + (100 / photos.length), 100));
            resolve(src);
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            // Still resolve to continue with other images
            setPreloadProgress(prev => Math.min(prev + (100 / photos.length), 100));
            resolve(src);
          };
          img.src = src;
        });
      });

      try {
        await Promise.allSettled(imagePromises);
        // Small delay to show completion
        setTimeout(() => {
          setIsPreloading(false);
        }, 500);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsPreloading(false);
      }
    };

    preloadImages();
  }, []);

  const getRandomPosition = useCallback((existingPhotos = []) => {
    const minDistance = 150;
    const maxAttempts = 20;
    let attempts = 0;
    
    const maxWidth = Math.min(window.innerWidth - 200, 1200);
    const maxHeight = Math.min(window.innerHeight - 200, 800);

    while (attempts < maxAttempts) {
      const x = 50 + Math.random() * (maxWidth - 100);
      const y = 50 + Math.random() * (maxHeight - 100);

      const tooClose = existingPhotos.some((photo) => {
        const distance = Math.sqrt(
          Math.pow(x - photo.x, 2) + Math.pow(y - photo.y, 2)
        );
        return distance < minDistance;
      });

      if (!tooClose) {
        return { x, y };
      }
      attempts++;
    }

    return {
      x: 50 + Math.random() * (maxWidth - 100),
      y: 50 + Math.random() * (maxHeight - 100),
    };
  }, []);

  const getRandomAnimation = useCallback(() => {
    return photoAnimations[Math.floor(Math.random() * photoAnimations.length)];
  }, []);

  const getRandomShape = useCallback(() => {
    return photoShapes[Math.floor(Math.random() * photoShapes.length)];
  }, []);

  const createNewPhoto = useCallback((existingPhotos = []) => {
    // Only create photos from loaded images
    const availablePhotos = photos.filter(src => loadedImages.has(src));
    if (availablePhotos.length === 0) return null;

    const position = getRandomPosition(existingPhotos);
    return {
      id: Date.now() + Math.random(),
      src: availablePhotos[Math.floor(Math.random() * availablePhotos.length)],
      ...position,
      animation: getRandomAnimation(),
      shape: getRandomShape(),
      createdAt: Date.now(),
    };
  }, [getRandomPosition, getRandomAnimation, getRandomShape, loadedImages]);

  // Initialize with photos only after preloading
  useEffect(() => {
    if (isPreloading || loadedImages.size === 0) return;

    const initialPhotos = [];
    for (let i = 0; i < 6; i++) {
      const newPhoto = createNewPhoto(initialPhotos);
      if (newPhoto) {
        newPhoto.id = `initial-${i}-${Date.now()}`;
        initialPhotos.push(newPhoto);
      }
    }
    setFloatingPhotos(initialPhotos);
  }, [createNewPhoto, isPreloading, loadedImages.size]);

  // Add new photos periodically (only after preloading)
  useEffect(() => {
    if (isPreloading) return;

    const addPhotoInterval = setInterval(() => {
      setFloatingPhotos(prev => {
        if (prev.length >= 8) return prev;
        
        const newPhoto = createNewPhoto(prev);
        return newPhoto ? [...prev, newPhoto] : prev;
      });
    }, 2000);

    return () => clearInterval(addPhotoInterval);
  }, [createNewPhoto, isPreloading]);

  // Remove old photos with fade out animation
  useEffect(() => {
    if (isPreloading) return;

    const cleanupInterval = setInterval(() => {
      setFloatingPhotos(prev => {
        const now = Date.now();
        const minPhotos = 4;
        const maxAge = 8000;
        
        const photosToFade = prev.filter(photo => {
          const age = now - photo.createdAt;
          return age > maxAge && prev.length > minPhotos;
        });
        
        if (photosToFade.length > 0) {
          setFadingPhotos(prevFading => {
            const newFading = new Set(prevFading);
            photosToFade.forEach(photo => newFading.add(photo.id));
            return newFading;
          });
          
          photosToFade.forEach(photo => {
            setTimeout(() => {
              setFloatingPhotos(currentPhotos => 
                currentPhotos.filter(p => p.id !== photo.id)
              );
              setFadingPhotos(prevFading => {
                const newFading = new Set(prevFading);
                newFading.delete(photo.id);
                return newFading;
              });
            }, 2000);
          });
        }
        
        return prev;
      });
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, [isPreloading]);

  // Safety check to ensure we always have minimum photos
  useEffect(() => {
    if (isPreloading) return;

    const safetyInterval = setInterval(() => {
      setFloatingPhotos(prev => {
        const minPhotos = 4;
        if (prev.length < minPhotos) {
          const photosToAdd = minPhotos - prev.length;
          const newPhotos = [];
          
          for (let i = 0; i < photosToAdd; i++) {
            const newPhoto = createNewPhoto([...prev, ...newPhotos]);
            if (newPhoto) {
              newPhoto.id = `safety-${i}-${Date.now()}`;
              newPhotos.push(newPhoto);
            }
          }
          
          return [...prev, ...newPhotos];
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(safetyInterval);
  }, [createNewPhoto, isPreloading]);

  // Loading screen component
  if (isPreloading) {
    return (
      <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-6 animate-bounce">💕</div>
          <h2 className="text-3xl font-bold text-rose-700 mb-4">
            Loading Beautiful Memories...
          </h2>
          <div className="w-80 bg-rose-200 rounded-full h-4 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
          <p className="text-rose-600 text-lg">
            {Math.round(preloadProgress)}% loaded
          </p>
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

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

        .animate-slideInLeft {
          animation: slideInLeft 2s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2s;
        }
        .animate-slideInRight {
          animation: slideInRight 2s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2s;
        }
        .animate-slideInTop {
          animation: slideInTop 1.8s ease-out forwards,
            gentleHover 4s ease-in-out infinite 1.8s;
        }
        .animate-slideInBottom {
          animation: slideInBottom 1.8s ease-out forwards,
            gentleHover 4s ease-in-out infinite 1.8s;
        }
        .animate-bounceIn {
          animation: bounceIn 2.5s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2.5s;
        }
        .animate-spiralIn {
          animation: spiralIn 3s ease-out forwards,
            gentleHover 4s ease-in-out infinite 3s;
        }
        .animate-scaleIn {
          animation: scaleIn 2s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2s;
        }
        .animate-flipIn {
          animation: flipIn 2.2s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2.2s;
        }
        .animate-floatIn {
          animation: floatIn 1.5s ease-out forwards,
            gentleHover 4s ease-in-out infinite 1.5s;
        }
        .animate-zoomBounce {
          animation: zoomBounce 2.8s ease-out forwards,
            gentleHover 4s ease-in-out infinite 2.8s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }

        .animate-fadeOut {
          animation: fadeOutSlow 2s ease-in-out forwards;
        }

        .bg-gradient-romantic {
          background: linear-gradient(
            135deg,
            #fce7f3 0%,
            #fdf2f8 25%,
            #fef3c7 50%,
            #ecfdf5 75%,
            #ede9fe 100%
          );
        }

        .backdrop-light {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .floating-hearts::before {
          content: "💕";
          position: absolute;
          animation: float 4s ease-in-out infinite;
          font-size: 2rem;
          top: -20px;
          left: -20px;
          opacity: 0.7;
        }

        .floating-hearts::after {
          content: "💖";
          position: absolute;
          animation: float 4s ease-in-out infinite 2s;
          font-size: 1.5rem;
          bottom: -15px;
          right: -15px;
          opacity: 0.6;
        }

        .photo-crisp {
          filter: sepia(15%) saturate(1.3) brightness(1.1) contrast(1.15) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25),
            0 0 20px rgba(255, 255, 255, 0.4),
            inset 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
        }

        .clip-path-hexagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }

        .clip-path-heart {
          clip-path: path('M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z');
          transform: scale(0.8);
        }
      `}</style>

      <div className="relative min-h-screen bg-gradient-romantic overflow-hidden">
        {/* Debug Info */}
        <div className="absolute top-4 left-4 bg-black/20 text-white p-2 rounded z-50 text-sm">
          Photos: {floatingPhotos.length} | Loaded: {loadedImages.size}
        </div>

        {/* Floating Photos */}
        {floatingPhotos.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.src}
            alt="Beautiful memories"
            className={`absolute w-32 h-32 md:w-40 md:h-40 object-cover shadow-2xl border-4 border-white/90 photo-crisp ${photo.animation} ${photo.shape} ${
              fadingPhotos.has(photo.id) ? 'animate-fadeOut' : ''
            }`}
            style={{
              top: photo.y,
              left: photo.x,
              pointerEvents: "none",
              zIndex: index % 2 === 0 ? 1 : 2,
            }}
            loading="eager"
          />
        ))}

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-drift">
          🌹
        </div>
        <div
          className="absolute top-20 right-20 text-4xl opacity-35 animate-twinkle"
          style={{ animationDelay: "1s" }}
        >
          💕
        </div>
        <div
          className="absolute bottom-20 left-20 text-5xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-40 right-40 text-3xl opacity-40 animate-drift"
          style={{ animationDelay: "3s" }}
        >
          ✨
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <div className="backdrop-light rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto floating-hearts relative">
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
                On this special day, I just want to remind you how much you mean
                to me... 🌹
              </p>
              <p
                className="text-base md:text-lg text-rose-500 opacity-90"
                style={{ animationDelay: "1s" }}
              >
                Every Moment we spent together was something very special 🌹
              </p>
            </div>

          <Link to="/1">
            <button
              onClick={() => console.log('Navigate to /quiz/1')}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full text-lg md:text-xl shadow-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 animate-pulse-slow"
              aria-label="Start the romantic birthday quiz"
            >
              Start Our Journey Quiz 🎉✨
            </button>
            </Link>

            <p className="mt-4 text-sm text-rose-400 opacity-75">
              Let's relive our beautiful memories together...
            </p>
          </div>
        </div>

        {/* Ambient Particles */}
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
                backgroundColor: [
                  "#f43f5e",
                  "#ec4899",
                  "#8b5cf6",
                  "#06b6d4",
                  "#10b981",
                ][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-pink-400 opacity-20 animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
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