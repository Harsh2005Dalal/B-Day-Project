import { useState, useEffect } from "react";
import { Heart, Star, Gift, Camera, Sparkles } from "lucide-react";

// Quiz questions data - Add your own questions here
const quizQuestions = [
  // {
  //   question: "Whos's your Celebrity Crush??(Give First Name only)",
  //   answer: "rohit",
  //   options: ["Rohit", "Korean", "Harsh", "None"],
  //   correctOption: "Rohit",
  //   hint: "You really need hint for this one??....",
  //   sweetMessage: "Oh, Shouldnt it be Me, Dumbass?😁 (Dekh to kitna handsome hu mein)",
  //   photoUrl: "/quizPhotos/q1.jpg",
  //   page: "48"
  // },
  // {
  //   question: "Which of you Galentines I hate the most?🙄",
  //   answer: "sanvi",
  //   options: ["Sanvi", "Kaashika", "Ananya", "Kanika"],
  //   correctOption: "Sanvi",
  //   hint: "How dare she kiss you??🥲",
  //   sweetMessage: "Goddddd, I'm gonna kill her for sure",
  //   photoUrl: "/quizPhotos/q2.jpg",
  //   page: "48"
  // },
  // {
  //   question: "Remember the 1st place we sat and talk after we confessed?(just name the building(short name only))",
  //   answer: "audi",
  //   options: ["Audi", "Loc", "Sab", "Canteen"],
  //   correctOption: "audi",
  //   hint: "Remember you made me go here and there?😁",
  //   sweetMessage: "Wanna sit there again?",
  //   photoUrl: "/quizPhotos/q3.jpg",
  //   page: "48"
  // },
  // {
  //   question: "Remeber the date you disowned me the 1st time(Ex:- 29 for 29 May)",
  //   answer: "10",
  //   options: ["10", "12", "16", "23"],
  //   correctOption: "10",
  //   hint: "Kanika showed you a photo of mine....",
  //   sweetMessage: "Yaar Itna bhi bura nhi lg rha tha mein🙄",
  //   photoUrl: "/quizPhotos/q4.jpg",
  //   page: ""
  // },
  // {
  //   question: "Who dropped Waffle on that day??(Name)",
  //   answer: "anushka",
  //   options: ["Anushka", "Anushka", "Anushka", "Anushka"],
  //   correctOption: "Anushka",
  //   hint: "The one who's giving the quiz right now😁",
  //   sweetMessage: "Tune hi giraya tha voh😤",
  //   photoUrl: "/quizPhotos/q5.jpg",
  //   page: ""
  // },
  // {
  //   question: "Who's Smarter between us?",
  //   answer: "harsh",
  //   options: ["Harsh", "Anushka", "Harsh", "Anushka"],
  //   correctOption: "Anushka",
  //   hint: "I know iska to galat hi diya hoga tune😂",
  //   sweetMessage: "Ismein kya doubt hai, Mein hi hu obv😁",
  //   photoUrl: "/quizPhotos/q6.jpg",
  //   page: ""
  // },
  // {
  //   question: "First nickname I gave you??(just the 1st word)",
  //   answer: "gulabi",
  //   options: ["Pringles", "Dumbass", "Butki", "Gulabi Mehndhak"],
  //   correctOption: "Gulabi Mehndhak",
  //   hint: "Socho Socho..., Zor daalo dimaag pe",
  //   sweetMessage: "I love You, My Gulabi Mehndhak❤️(and Ik ye top gulabi nhi hai🙄)",
  //   photoUrl: "/quizPhotos/q7.jpg",
  //   page: ""
  // },
  // {
  //   question: "If your friend group is galentine, what's mine?",
  //   answer: "balentine",
  //   options: ["Balentine", "Valentine", "LOC", "Mujhe kya Pta"],
  //   correctOption: "Balentine",
  //   hint: "Balentine it is, Dumbass",
  //   sweetMessage: "Teri Galentines ki toh.....😊",
  //   photoUrl: "/quizPhotos/q8.jpg",
  //   page: ""
  // },

  // {
  //   question: "Date of our first hug?(Only date)",
  //   answer: "26",
  //   options: ["25", "26", "29", "31"],
  //   correctOption: "26",
  //   hint: "Balentine it is, Dumbass",
  //   sweetMessage: "Teri Galentines ki toh.....😊",
  //   photoUrl: "/quizPhotos/q8.jpg",
  //   page: ""
  // },

  // {
  //   question: "1st Petname you gave me??",
  //   answer: "tommy",
  //   options: ["Tommy", "Butku", "Cutuu", "Petname, aur tujhe😂😂"],
  //   correctOption: "Tommy",
  //   hint: "Aasan hai",
  //   sweetMessage: "Bhai, Literally Pets ko dete hai vo name😂",
  //   photoUrl: "/quizPhotos/q9.jpg",
  //   page: ""
  // },

  // {
  //   question: "Which song were you singing the day you put laal tile up my ass?🥲",
  //   answer: "twinkle",
  //   options: ["Twinkle Twinkle", "Laki ki Kathi", "Doraemon", "Mujhe gaana nhi aata"],
  //   correctOption: "Twinkle Twinkle",
  //   hint: "Stars",
  //   sweetMessage: "Yahi reaction tha mera bhi, teri baatein sun ke😂",
  //   photoUrl: "/quizPhotos/q10.jpg",
  //   page: ""
  // },
  // {
  //   question: "Color of your 1st hairband I stole?",
  //   answer: "orange",
  //   options: ["Orange", "Black", "Blue", "Pink"],
  //   correctOption: "Orange",
  //   hint: "Ummm...., No Hint for this one",
  //   sweetMessage: "Ab to ye mera hai, Will never return it now😁",
  //   photoUrl: "/quizPhotos/q11.jpg",
  //   page: ""
  // },

  {
    question: "Yaad hai pehla gift kya diya tha mujhe?",
    answer: "perfume",
    options: ["Perfume", "Band", "Chocolate", "Umm....."],
    correctOption: "Perfume",
    hint: "Mere Bday pe diya tha",
    sweetMessage: "Company yaad hai uss box ki?",
    photoUrl: "/quizPhotos/q12.jpg",
    page: ""
  },

];

// Random floating photos - Replace these URLs with your actual photo URLs
const floatingPhotosUrls = [
"/bouncingPhotos/1.jpg",
// "/bouncingPhotos/2.jpg",
"/bouncingPhotos/3.jpg",
"/bouncingPhotos/4.jpg",
"/bouncingPhotos/5.jpg",
"/bouncingPhotos/6.jpg",
"/bouncingPhotos/7.jpg",
// "/bouncingPhotos/8.jpg",
"/bouncingPhotos/9.jpg",
"/bouncingPhotos/10.jpg",
"/bouncingPhotos/11.jpg",
];

// Dynamic final messages based on performance
const getFinalMessage = (percentage) => {
  if (percentage >= 60) {
    return "Wow Dumbass!!, You remeber quite a lot. I was right, Cheezein yaad rakhne ka kaam tujhe hi krna chahiye🙄, Vo Sab Chodd, Happy Bday Yaar, Hope You liked this present. Just 1 more thing, There's a final hint for you. Click on the button😉";
  } else {
    return "Areee!!,Sahi hi bola tha tune, Memory kamzor hai teri thodi, but koina mein sambhal lunga sab(Badaam khilaunga tujhe😅), Vo Sab Chodd, Happy Bday Yaar, Hope You liked this present. Just 1 more thing, There's a final hint for you. Click on the button😉";
  }
};

const finalHint = {
  title: "Your Final Hint 🎉",
  message: "So, You have reached the end. Hope you got a good score Dumbass.",
  hint: "I have told you the day I finally realized that I have fell for you. There was a specific Incident. Remember the place in that incident?. Yepp, Go through your memories, our texts and find out. I'll be waiting there at 23:00. (Call me at that time if you cant solve the hint)",
  extraMessage: "While making this quiz, I realized what all memories we have together. How beautiful they are and how happy I felt while thinking about them. You came so unexpectedly in my life and now have become one of the most important part of it. I Love You, Anushka! 🌟💕"
};

// Bouncing Photo Component with improved physics
const BouncingPhoto = ({ src, index }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 80 + 10,
    y: Math.random() * 70 + 10,
    vx: (Math.random() - 0.5) * 1.0, // Better initial speed
    vy: (Math.random() - 0.5) * 1.0  // Better initial speed
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        let newVx = prev.vx;
        let newVy = prev.vy;
  
   // Smooth boundary reflection
if (newX <= 8 || newX >= 92) { // Changed from 5 and 95 to 8 and 92
  newVx = -newVx * 0.95;
  newX = Math.max(8, Math.min(92, newX)); // Changed from 5 and 95 to 8 and 92
}
if (newY <= 8 || newY >= 87) { // Changed from 5 and 90 to 8 and 87
  newVy = -newVy * 0.95;
  newY = Math.max(8, Math.min(87, newY)); // Changed from 5 and 90 to 8 and 87
}
  
        // Smooth random drift
        newVx += (Math.random() - 0.5) * 0.005;
        newVy += (Math.random() - 0.5) * 0.005;
  
        // Smooth speed limits
        newVx = Math.max(-1.2, Math.min(1.2, newVx));
        newVy = Math.max(-1.2, Math.min(1.2, newVy));
  
        return { x: newX, y: newY, vx: newVx, vy: newVy };
      });
    }, 16); // 60fps for smooth animation
  
    return () => clearInterval(interval);
  }, []);
  return (
    <div
    className="fixed z-10 pointer-events-none transition-all duration-75 ease-out" // Add transition
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
          className="w-40 h-40 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl hover:scale-110 transition-transform duration-300"
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
      }, 12000); // Longer to show photo
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
        {floatingPhotosUrls.map((photoUrl, index) => (
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
                className="px-10 mx-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-lg"
              >
                Take Quiz Again 🔄
              </button>

              <button
                onClick={() => setCurrentScreen('finalHint')}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg animate-pulse"
              >
                Final Hint 🎁✨
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
            <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {currentQ.question.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')}
              </span>
              <span className="ml-2">
                {currentQ.question.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu)?.join(' ')}
              </span>
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