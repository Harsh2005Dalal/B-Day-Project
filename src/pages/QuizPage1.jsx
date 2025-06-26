import { useState, useEffect } from "react";
import { Heart, Star, Gift, Camera, Sparkles } from "lucide-react";

// Quiz questions data - Add your own questions here
const quizQuestions = [
  {
    question: "Whos's your Celebrity Crush??(Give First Name only)",
    answer: "rohit",
    options: ["rohit", "korean", "harsh", "None"],
    correctOption: "rohit",
    hint: "You really need hint for this one??....",
    sweetMessage: "Oh, Dumbass, Shouldnt it be Me, Dumbass?😁 (Dekh to kitna handsome hu mein)",
    photoUrl: "/src/assets/quizPhotos/q1.jpg",
    page:"48"
  },
  {
    question: "Where did we have our first kiss?",
    answer: "park",
    options: ["At the park", "In the car", "At my place", "At the beach"],
    correctOption: "at the park",
    hint: "Under the stars, surrounded by nature... 🌟",
    sweetMessage: "That moment is forever etched in my heart. Time stopped and all I could see was you. 💋",
    photoUrl: "https://via.placeholder.com/400x300/ff9999/ffffff?text=First+Kiss+Moment"
  }
];

// Random floating photos - Replace these URLs with your actual photo URLs
const floatingPhotosUrls = [
  "/src/assets/homePhotos/1.png",
  // "/src/assets/homePhotos/2.png",
  // "/src/assets/homePhotos/3.png",
  // "/src/assets/homePhotos/4.png",
  // "/src/assets/homePhotos/5.png",
  // "/src/assets/homePhotos/6.png",
  // "/src/assets/homePhotos/7.png",
];

// Dynamic final messages based on performance
const getFinalMessage = (percentage) => {
  if (percentage === 100) {
    return "WOW! You're absolutely PERFECT! 🌟 You remember everything about us - you're not just my lover, you're my soulmate who pays attention to every beautiful detail of our journey together! Your memory of our love story is as perfect as you are! 💕✨";
  } else if (percentage >= 80) {
    return "You're AMAZING! 💖 You remember almost everything about our love story. You have such a beautiful heart and mind that treasures our moments together! Your love shines through in how well you remember us! 🌟";
  } else if (percentage >= 60) {
    return "You're so SWEET! 💕 You remember the important moments that matter most. Your love shines through even when details get fuzzy - and that's what makes you perfect for me! Our connection goes beyond memory! 💫";
  } else if (percentage >= 40) {
    return "You're absolutely ADORABLE! 💝 Even when you can't remember every detail, your love for me is so clear and beautiful. That's all that truly matters, my love! Your heart remembers what's important! 🥰";
  } else if (percentage >= 20) {
    return "You're so CUTE trying your best! 💕 I love how you tried to remember our precious moments. Don't worry, we'll make so many more unforgettable memories together! Your effort means everything to me! 😘";
  } else {
    return "You're HILARIOUS and I love you so much! 💖 Maybe you were too busy looking into my eyes to remember the details - and honestly, that's the sweetest thing ever! Being present with me is worth more than perfect memory! 😂💕";
  }
};

const finalHint = {
  title: "Your Final Birthday Surprise! 🎉",
  message: "My dearest love, this quiz was just the beginning of your birthday surprises...",
  hint: "Check under your pillow tonight for something special that will make your heart skip a beat! 💝",
  extraMessage: "Every question in this quiz reminded me of why I fall in love with you more each day. You are my greatest adventure, my sweetest dream, and my forever person. Happy Birthday, beautiful! 🌟💕"
};

// Bouncing Photo Component with improved physics
const BouncingPhoto = ({ src, index }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 80 + 10, // Start between 10-90% from left
    y: Math.random() * 70 + 10, // Start between 10-80% from top
    vx: (Math.random() - 0.5) * 1.5, // Velocity X (-1.5 to 1.5)
    vy: (Math.random() - 0.5) * 1.5  // Velocity Y (-1.5 to 1.5)
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        let newVx = prev.vx;
        let newVy = prev.vy;

        // Bounce off walls with some energy retention
        if (newX <= 5 || newX >= 95) {
          newVx = -newVx; // Slight energy loss on bounce
          newX = Math.max(5, Math.min(95, newX));
        }
        if (newY <= 5 || newY >= 90) {
          newVy = -newVy; // Slight energy loss on bounce
          newY = Math.max(5, Math.min(90, newY));
        }

        // Add slight gravity effect
        newVy += 0.02;

        // Limit maximum velocity
        newVx = Math.max(-4, Math.min(4, newVx));
        newVy = Math.max(-4, Math.min(4, newVy));

        return { x: newX, y: newY, vx: newVx, vy: newVy };
      });
    }, 16); // Update every 50ms for smooth movement

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed z-10 pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative">
        <img
          src={src}
          alt={`Memory ${index + 1}`}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-2xl hover:scale-110 transition-transform duration-300"
          style={{
            animationDuration: `${1.5 + Math.random()}s`,
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))'
          }}
        />
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 animate-spin" style={{
            animationDuration: `${2 + Math.random()}s`
          }} />
        </div>
      </div>
    </div>
  );
};

// Enhanced Romantic Background Effects
const RomanticBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating hearts */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-400 fill-current" />
        </div>
      ))}

      {/* Floating stars */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-pulse opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2.5 + Math.random() * 1.5}s`
          }}
        >
          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
        </div>
      ))}
    </div>
  );
};

function QuizApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, quiz, results, finalHint
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showMCQ, setShowMCQ] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSweetMessage, setShowSweetMessage] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuestionPhoto, setShowQuestionPhoto] = useState(false);
  const [mcqCorrect, setmcqCorrect] = useState(true);

  const currentQ = quizQuestions[currentQuestion];

  // Show question photo after sweet message
  useEffect(() => {
    if (showSweetMessage) {
      const timer = setTimeout(() => {
        setShowQuestionPhoto(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSweetMessage]);

  const handleInputSubmit = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correctAnswer = currentQ.answer.toLowerCase().trim();

    if (normalizedAnswer === correctAnswer) {
      // Correct answer
      setCorrectAnswers(prev => prev + 1);
      setTotalAttempted(prev => prev + 1);
      setShowSweetMessage(true);

      setTimeout(() => {
        nextQuestion();
      }, 8000); // Longer to show photo
    } else {
      // Wrong answer
      setWrongAttempts(prev => prev + 1);

      if (wrongAttempts + 1 >= 2) {
        // Show MCQ after 2 wrong attempts
        setShowMCQ(true);
        setShowHint(true);
        setTotalAttempted(prev => prev + 1);
      }
    }
  };

  const handleMCQSubmit = (selectedOption, currentQuestion) => {
    const normalizedAnswer = selectedOption.toLowerCase().trim();
    const correctAnswer = currentQ.correctOption.toLowerCase().trim();

    if (normalizedAnswer === correctAnswer) {
      setmcqCorrect(true)
      setShowSweetMessage(true);
      setTimeout(() => {
        nextQuestion();
      }, 8000); // Longer to show photo

    }

    else {
      setmcqCorrect(false)
    }



    // MCQ answers are always considered wrong for scoring

  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setWrongAttempts(0);
      setShowMCQ(false);
      setShowHint(false);
      setShowSweetMessage(false);
      setShowQuestionPhoto(false);
    } else {
      setCurrentScreen('results');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setWrongAttempts(0);
    setShowMCQ(false);
    setShowHint(false);
    setShowSweetMessage(false);
    setShowQuestionPhoto(false);
    setCorrectAnswers(0);
    setTotalAttempted(0);
    setCurrentScreen('welcome');
  };

  const HeartMeter = () => {
    return (
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-pink-700 font-bold text-lg">Progress:</span>
        <div className="flex gap-2">
          {quizQuestions.length <= 10 ? (
            // Show individual hearts for 10 or fewer questions
            Array.from({ length: quizQuestions.length }, (_, i) => (
              <Heart
                key={i}
                className={`w-8 h-8 transition-all duration-300 ${i < totalAttempted
                  ? 'fill-pink-500 text-pink-500 scale-110'
                  : 'text-pink-200 hover:text-pink-300'
                  }`}
              />
            ))
          ) : (
            // Show progress bar for more than 10 questions
            <div className="bg-pink-200 rounded-full h-4 w-64 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(totalAttempted / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentScreen === 'finalHint') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
        <RomanticBackground />

        {/* Bouncing photos */}
        {floatingPhotosUrls.map((photoUrl, index) => (
          <BouncingPhoto key={index} src={photoUrl} index={index} />
        ))}

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 text-3xl animate-pulse">🎁</div>
            <div className="absolute top-6 right-6 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-6 left-6 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>💕</div>
            <div className="absolute bottom-6 right-6 text-3xl animate-pulse" style={{ animationDelay: '1.5s' }}>🌟</div>

            <div className="relative z-10">
              <Gift className="w-32 h-32 text-purple-500 mx-auto mb-8 animate-bounce" />

              <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {finalHint.title}
              </h1>

              <div className="space-y-8 mb-10">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200 shadow-lg">
                  <p className="text-xl text-purple-700 leading-relaxed mb-4">
                    {finalHint.message}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-pink-200 shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Star className="w-8 h-8 text-yellow-500 fill-current animate-spin" />
                    <h3 className="text-2xl font-bold text-pink-700">Your Final Hint</h3>
                    <Star className="w-8 h-8 text-yellow-500 fill-current animate-spin" />
                  </div>
                  <p className="text-xl text-pink-700 font-semibold">
                    {finalHint.hint}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-8 rounded-3xl border-2 border-rose-200 shadow-lg">
                  <Heart className="w-10 h-10 text-rose-500 mx-auto mb-6 fill-current animate-pulse" />
                  <p className="text-lg text-pink-700 leading-relaxed">
                    {finalHint.extraMessage}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setCurrentScreen('results')}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Back to Results 💝
                </button>

                <button
                  onClick={resetQuiz}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-lg"
                >
                  Start Over 🔄
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
        <RomanticBackground />

        {/* Bouncing photos */}
        {floatingPhotosUrls.slice(0, 6).map((photoUrl, index) => (
          <BouncingPhoto key={index} src={photoUrl} index={index} />
        ))}

        <div className="max-w-3xl mx-auto text-center relative z-20">
          <div className="bg-white/10 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
            <div className="mb-8">
              <div className="relative mb-6">
                <Gift className="w-20 h-20 text-pink-500 mx-auto animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-pink-700 mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Happy Birthday, Dumbass 🎂
              </h1>
              <p className="text-xl text-pink-600 mb-3">
                I've prepared a special quiz just for you...
              </p>
              <p className="text-lg text-pink-500">
                Let's see how well you remember our beautiful journey together! 💕
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-3xl border-2 border-pink-200 shadow-lg">
                <h3 className="font-bold text-pink-700 mb-4 text-lg">How it works:</h3>
                <ul className="text-pink-600 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Type your answer in the text box
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    If you get it wrong twice, multiple choices will appear
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    You'll get a sweet hint to help you ✨
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Answer given using mcq wont be treated as correct 📸
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Each answer is one word, and make sure all alphabets are in smallcase
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Each question comes with a special message and photo just for you 💌
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Watch for bouncing memories around the page! 📸
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('quiz')}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-2xl shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
            >
              Start The Quiz 💖
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    const finalMessage = getFinalMessage(percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden py-8">
        <RomanticBackground />

        {/* Bouncing photos */}
        {floatingPhotosUrls.map((photoUrl, index) => (
          <BouncingPhoto key={index} src={photoUrl} index={index} />
        ))}

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
            <div className="relative mb-8">
              <Star className="w-32 h-32 text-yellow-500 mx-auto animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-pink-700 mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Complete! 🎉
            </h1>

            <div className="space-y-8 mb-10">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-pink-200 shadow-lg">
                <h3 className="text-3xl font-bold text-pink-700 mb-6">Your Score</h3>
                <div className="text-8xl font-bold text-pink-600 mb-4">
                  {correctAnswers}/{quizQuestions.length}
                </div>
                <div className="text-6xl font-bold text-pink-500 mb-4">
                  {percentage}%
                </div>
                <p className="text-lg text-pink-600 mb-2">
                  You got {correctAnswers} questions right from direct answers!
                </p>
                <p className="text-pink-500">
                  (MCQ answers don't count towards the score 😉)
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-pink-200 shadow-lg">
                <h3 className="text-2xl font-bold text-pink-700 mb-6">
                  Final Message 💕
                </h3>
                <p className="text-pink-600 text-xl leading-relaxed">
                  {finalMessage}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <button
                onClick={resetQuiz}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-lg"
              >
                Take Quiz Again 🔄
              </button>

              <button
                onClick={() => setCurrentScreen('finalHint')}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg animate-pulse"
              >
                Final Surprise 🎁✨
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-4 relative overflow-hidden">
      <RomanticBackground />

      {/* Bouncing photos */}
      {floatingPhotosUrls.map((photoUrl, index) => (
        <BouncingPhoto key={index} src={photoUrl} index={index} />
      ))}

      <div className="min-h-screen flex items-center justify-center max-w-2xl mx-auto relative z-20 w-full px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-200 relative overflow-hidden max-w-lg mx-auto">
          {/* Enhanced decorative corner elements */}
          <div className="absolute top-4 left-4 text-2xl animate-pulse">💖</div>
          <div className="absolute top-4 right-4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>💕</div>

          <HeartMeter />

          <div className="mb-10 text-center">
            <h2 className="text-lg text-pink-500 mb-3 font-semibold bg-pink-100 inline-block px-4 py-2 rounded-full">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-8 leading-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {currentQ.question}
            </h1>
          </div>

          {showSweetMessage ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-pink-200 shadow-lg">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 fill-current animate-pulse" />
                  <p className="text-pink-700 text-xl leading-relaxed mb-6">
                    {currentQ.sweetMessage}
                  </p>
                  <p className="text-pink-500 text-lg font-semibold">
                    Moving to next question... 💕
                  </p>
                </div>
              </div>

              {showQuestionPhoto && (
                <div className="text-center animate-fade-in">
                  <div className="relative inline-block">
                    <img
                      src={currentQ.photoUrl}
                      alt="Special Memory"
                      className="rounded-3xl shadow-2xl w-56 max-h-96 object-contain border-4 border-pink-200 mx-auto"
                    />
                    <div className="absolute -top-4 -right-4">
                      <Camera className="w-12 h-12 text-pink-500 bg-white rounded-full p-2 shadow-xl animate-bounce" />
                      <span>{currentQ.page}</span>
                    </div>
                  </div>
                  <p className="text-pink-600 mt-6 font-bold text-lg">A special memory just for you! 📸💕</p>
                </div>
              )}
            </div>
          ) : !showMCQ ? (
            <div className="space-y-6">
              {wrongAttempts > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-600 text-center">
                    Not quite right! Try again... 💭
                  </p>
                  <p className="text-red-500 text-sm text-center">
                    ({wrongAttempts}/2 attempts)
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:border-pink-400 focus:outline-none text-lg"
                // onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                />

                <button
                  onClick={handleInputSubmit}
                  disabled={!userAnswer.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  Submit Answer 💖
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {showHint && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-700">Hint:</span>
                  </div>
                  <p className="text-yellow-700">{currentQ.hint}</p>
                </div>
              )}


              <div className="space-y-3">
                <p className="text-pink-600 font-semibold mb-4">
                  Choose the correct answer:
                </p>
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMCQSubmit(option)}
                    className="w-full p-4 text-left border-2 border-pink-200 rounded-2xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-pink-700 transform hover:scale-105"
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>


                ))}
                {!mcqCorrect && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-yellow-700">That's not the right answer Dumbass</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default QuizApp;