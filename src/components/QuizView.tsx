import React, { useState, useEffect } from 'react';
import { ALL_ITEMS, DAYS_OF_WEEK, SINO_NUMBERS, NATIVE_NUMBERS } from '../data/koreanData';
import { FlashcardItem, QuizQuestion } from '../types';
import { AudioButton } from './AudioButton';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Volume2, 
  ArrowRight,
  Sparkles,
  Keyboard,
  ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizViewProps {
  onAddMasteryScore?: (cardId: string, isCorrect: boolean) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onAddMasteryScore }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'days' | 'sino' | 'native'>('all');
  const [quizType, setQuizType] = useState<'multiple' | 'spelling'>('multiple');
  const [isQuizActive, setIsQuizActive] = useState(false);
  
  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userTypedAns, setUserTypedAns] = useState('');
  const [scrambledSyllables, setScrambledSyllables] = useState<string[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [failuresLog, setFailuresLog] = useState<{ question: string; correct: string; user: string }[]>([]);

  // Sound play helper on question loading
  const currentQuestion = questions[currentQuestionIdx];

  // TTS prompt on load of new listening question
  useEffect(() => {
    if (isQuizActive && currentQuestion?.audioText && !isAnswered) {
      // Auto say aloud if it's the audio test
      try {
        const utterance = new SpeechSynthesisUtterance(currentQuestion.audioText);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.9;
        window.speechSynthesis?.speak(utterance);
      } catch (err) {
        // ignore speech issues
      }
    }
  }, [currentQuestionIdx, isQuizActive, isAnswered]);

  // Generate scrambled syllables for Spelling mode
  useEffect(() => {
    if (isQuizActive && quizType === 'spelling' && currentQuestion) {
      const correctText = currentQuestion.correctAnswer; // e.g., "월요일"
      const correctChars = correctText.split(''); // ["월", "요", "일"]
      
      // Select 4 dummy characters from other cards of the same category
      let candidatesList = ALL_ITEMS;
      if (activeCategory === 'days') candidatesList = DAYS_OF_WEEK;
      else if (activeCategory === 'sino') candidatesList = SINO_NUMBERS;
      else if (activeCategory === 'native') candidatesList = NATIVE_NUMBERS;

      const dummyPool = candidatesList
        .map(i => i.korean)
        .join('')
        .split('')
        .filter(c => !correctChars.includes(c));

      // Unique and shuffle
      const uniqueDummies = Array.from(new Set(dummyPool)).slice(0, 4);
      const syllablesToScramble = [...correctChars, ...uniqueDummies]
        .sort(() => Math.random() - 0.5);

      setScrambledSyllables(syllablesToScramble);
      setUserTypedAns('');
    }
  }, [currentQuestionIdx, isQuizActive, quizType, activeCategory]);

  const generateQuiz = () => {
    let sourcePool: FlashcardItem[] = [];
    if (activeCategory === 'all') sourcePool = [...ALL_ITEMS];
    else if (activeCategory === 'days') sourcePool = [...DAYS_OF_WEEK];
    else if (activeCategory === 'sino') sourcePool = [...SINO_NUMBERS];
    else if (activeCategory === 'native') sourcePool = [...NATIVE_NUMBERS];

    if (sourcePool.length < 4) {
      alert("Not enough cards inside this study list to make a quiz!");
      return;
    }

    // Shuffle pool
    const shuffledPool = [...sourcePool].sort(() => Math.random() - 0.5);
    // Standard 10 questions or total pool size
    const totalQCount = Math.min(10, shuffledPool.length);
    const selectedCards = shuffledPool.slice(0, totalQCount);

    const generatedQuestions: QuizQuestion[] = selectedCards.map((card, idx) => {
      // Determine question type: 
      // 0: Korean -> English, 1: English -> Korean, 2: Listening (Only for multiple choice)
      let qTypeSelection = Math.floor(Math.random() * 3);
      if (quizType === 'spelling') {
        qTypeSelection = 1; // spelling must always ask for Hangeul
      }

      let questionText = '';
      let correctAnswer = '';
      let audioText: string | undefined = undefined;
      let romanization = card.romanization;
      let koreanSymbol = card.korean;

      // Make decoys
      const incorrectPool = sourcePool.filter(i => i.id !== card.id);
      
      if (qTypeSelection === 0) {
        // Translation choice: Korean word -> guess English
        questionText = `What is the meaning of "${card.korean}"?`;
        correctAnswer = card.english;
        const decoys = incorrectPool
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(d => d.english);

        return {
          id: `q-${idx}-${card.id}`,
          questionText,
          correctAnswer,
          options: [correctAnswer, ...decoys].sort(() => Math.random() - 0.5),
          romanization,
          category: card.category
        };
      } else if (qTypeSelection === 1) {
        // Hangeul choice: English definition -> guess Hangeul spelling
        questionText = `What is the spelling/Hangeul for "${card.english}"?`;
        correctAnswer = card.korean;
        const decoys = incorrectPool
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(d => d.korean);

        return {
          id: `q-${idx}-${card.id}`,
          questionText,
          correctAnswer,
          options: [correctAnswer, ...decoys].sort(() => Math.random() - 0.5),
          romanization,
          category: card.category
        };
      } else {
        // Listening choice: hear audio -> guess Hangeul or english
        questionText = `Listen carefully. Which word did you hear?`;
        correctAnswer = card.korean;
        audioText = card.korean;
        const decoys = incorrectPool
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(d => d.korean);

        return {
          id: `q-${idx}-${card.id}`,
          questionText,
          correctAnswer,
          options: [correctAnswer, ...decoys].sort(() => Math.random() - 0.5),
          audioText,
          romanization,
          koreanSymbol,
          category: card.category
        };
      }
    });

    setQuestions(generatedQuestions);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAns(null);
    setIsAnswered(false);
    setUserTypedAns('');
    setQuizComplete(false);
    setFailuresLog([]);
    setIsQuizActive(true);
  };

  const handleMultipleChoiceSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAns(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setFailuresLog((prev) => [
        ...prev,
        {
          question: currentQuestion.questionText,
          correct: currentQuestion.correctAnswer,
          user: answer,
        },
      ]);
    }

    // Trigger update progress to dashboard if callback present
    if (onAddMasteryScore) {
      // Find matching item
      const matchedItem = ALL_ITEMS.find(
        (i) => i.korean === currentQuestion.correctAnswer || i.english === currentQuestion.correctAnswer
      );
      if (matchedItem) {
        onAddMasteryScore(matchedItem.id, isCorrect);
      }
    }
  };

  const handleSpellingSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !userTypedAns.trim()) return;

    setIsAnswered(true);
    const sanitizedUser = userTypedAns.trim().replace(/\s+/g, '');
    const sanitizedCorrect = currentQuestion.correctAnswer.trim().replace(/\s+/g, '');

    const isCorrect = sanitizedUser === sanitizedCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setFailuresLog((prev) => [
        ...prev,
        {
          question: currentQuestion.questionText,
          correct: currentQuestion.correctAnswer,
          user: userTypedAns,
        },
      ]);
    }

    if (onAddMasteryScore) {
      const matchedItem = ALL_ITEMS.find((i) => i.korean === currentQuestion.correctAnswer);
      if (matchedItem) {
        onAddMasteryScore(matchedItem.id, isCorrect);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setSelectedAns(null);
      setIsAnswered(false);
      setUserTypedAns('');
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setIsQuizActive(false);
    setQuizComplete(false);
    setSelectedAns(null);
    setIsAnswered(false);
    setUserTypedAns('');
  };

  const handleSyllableClick = (syllable: string) => {
    if (isAnswered) return;
    setUserTypedAns((prev) => prev + syllable);
  };

  const handleClearSyllables = () => {
    if (isAnswered) return;
    setUserTypedAns('');
  };

  const activeProgressPercent = questions.length > 0
    ? Math.round(((currentQuestionIdx) / questions.length) * 100)
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="quiz-system">
      {!isQuizActive ? (
        /* SETUP PORTAL (Not Active) */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-xl max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold font-sans text-slate-800 dark:text-white tracking-tight">
            Quiz Trainer Arena
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Test your knowledge of Korean days & numbers. Select your format, set your category lists, and see how many points you can pull!
          </p>

          <div className="mt-8 border-y border-slate-100 dark:border-slate-800 py-6 text-left space-y-6">
            {/* Choose Category */}
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                1. Select Category Subject
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['all', 'days', 'sino', 'native'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-center capitalize flex items-center justify-center gap-2 ${
                      activeCategory === cat
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 dark:border-indigo-400 dark:bg-slate-800 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {cat === 'all' ? 'All Subjects Combined' : cat === 'days' ? 'Days of the Week' : cat === 'sino' ? 'Sino-Korean' : 'Native Korean'}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Quiz Mode */}
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                2. Pick Play Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setQuizType('multiple')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    quizType === 'multiple'
                      ? 'border-indigo-600 bg-indigo-50/55 dark:border-indigo-400 dark:bg-slate-800'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ListFilter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-sm text-slate-800 dark:text-white">Multiple Choice</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Identify correct matches, translations, or listen to audio recordings. Good for speed.
                  </p>
                </button>

                <button
                  onClick={() => setQuizType('spelling')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    quizType === 'spelling'
                      ? 'border-indigo-600 bg-indigo-50/55 dark:border-indigo-400 dark:bg-slate-800'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-sm text-slate-800 dark:text-white">Syllable spelling Builder</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Type or assemble syllable blocks in Hangeul in order. Great for retention.
                  </p>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={generateQuiz}
            className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl active:scale-98 shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center justify-center gap-2"
          >
            Start Quiz Run <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : quizComplete ? (
        /* QUIZ COMPLETE BOARD */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-xl max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border-2 border-amber-200 dark:border-amber-950">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <h2 className="text-3xl font-black font-sans text-slate-800 dark:text-white">
            Set Complete!
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Excellent focus. Let's see your correct card results checklist:
          </p>

          {/* Large Performance score badge */}
          <div className="my-8 inline-block bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl px-8 py-6">
            <p className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-1">Final Score</p>
            <h1 className="text-5xl font-black font-mono text-indigo-600 dark:text-indigo-400">
              {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
            </h1>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
              {score === questions.length
                ? ' Perfect Run! 대단해요!'
                : score >= questions.length * 0.7
                ? ' Great job! 아주 잘했어요!'
                : ' Good effort! 조금만 더 화이팅!'}
            </p>
          </div>

          {/* Fault overview logs */}
          {failuresLog.length > 0 && (
            <div className="text-left mb-8 max-h-56 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/10">
              <p className="text-xs uppercase font-mono tracking-wider text-rose-500 font-bold mb-3">
                Items to review ({failuresLog.length})
              </p>
              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {failuresLog.map((log, index) => (
                  <div key={index} className="pt-2 first:pt-0">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">{log.question}</p>
                    <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 rounded-lg">
                      <span className="text-slate-400">Incorrect: <span className="text-rose-500 font-semibold">{log.user || '(empty/skipped)'}</span></span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {log.correct}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-4.5 text-sm font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Back to Portal
            </button>
            <button
              onClick={generateQuiz}
              className="flex-1 py-4.5 text-sm font-semibold text-white rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/10"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </div>
      ) : (
        /* QUIZ MATCH RUNTIME */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xl max-w-2xl mx-auto">
          {/* Header Progress indicator */}
          <div className="flex justify-between items-center mb-4 text-xs font-mono text-slate-400">
            <span>
              Question <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentQuestionIdx + 1}</span> of {questions.length}
            </span>
            <span className="font-semibold">Score: {score}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${activeProgressPercent}%` }}
            />
          </div>

          {/* Question Display Card */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-center mb-6">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold block mb-2">
              Category: {currentQuestion.category === 'days' ? 'Days of the week' : currentQuestion.category === 'sino' ? 'Sino-Korean' : 'Native Number'}
            </span>
            
            <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-800 dark:text-white mb-4 leading-normal">
              {currentQuestion.questionText}
            </h2>

            {/* If audio text exists, render a larger clickable Volume block */}
            {currentQuestion.audioText && (
              <div className="flex justify-center my-4 animate-pulse">
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 px-5 py-3 rounded-full shadow-sm">
                  <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">Listen Closely:</span>
                  <AudioButton text={currentQuestion.audioText} size="md" />
                </div>
              </div>
            )}
          </div>

          {/* QUIZ METHOD: MULTIPLE CHOICE */}
          {quizType === 'multiple' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quiz-multichoice-options">
              {currentQuestion.options.map((opt, index) => {
                const isSelected = selectedAns === opt;
                const isCorrectOpt = opt === currentQuestion.correctAnswer;
                
                let btnStyle = 'border-slate-250 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-slate-700 hover:bg-indigo-50/20';
                let checkIcon = null;

                if (isAnswered) {
                  if (isCorrectOpt) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 ring-4 ring-emerald-50 dark:ring-emerald-950/40';
                    checkIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-auto shrink-0" />;
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400 ring-4 ring-rose-50 dark:ring-rose-950/40';
                    checkIcon = <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 ml-auto shrink-0" />;
                  } else {
                    btnStyle = 'opacity-50 border-slate-100 dark:border-slate-800 pointer-events-none';
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswered}
                    onClick={() => handleMultipleChoiceSelect(opt)}
                    className={`p-4 md:p-5 text-sm md:text-base rounded-2xl border font-semibold text-slate-800 dark:text-slate-200 text-left transition-all flex items-center gap-3 ${btnStyle}`}
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-400">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {checkIcon}
                  </button>
                );
              })}
            </div>
          ) : (
            /* QUIZ METHOD: SYLLABLE SPELLING TYPE & CHIPS */
            <div className="space-y-6">
              {/* Syllable Assembly Display */}
              <form onSubmit={handleSpellingSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    disabled={isAnswered}
                    value={userTypedAns}
                    onChange={(e) => {
                      if (!isAnswered) {
                        setUserTypedAns(e.target.value);
                      }
                    }}
                    placeholder="Enter spelling in Hangeul or select below..."
                    className="w-full p-4 pr-24 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white bg-white dark:bg-slate-900 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 text-center font-bold text-2xl tracking-wide placeholder:text-sm placeholder:font-normal"
                  />
                  {!isAnswered && userTypedAns && (
                    <button
                      type="button"
                      onClick={handleClearSyllables}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Scrambled Syllable Selector Chips */}
                {!isAnswered && (
                  <div className="bg-slate-50/50 dark:bg-slate-800/10 border border-dashed border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                    <p className="text-xxs uppercase tracking-wider font-bold text-slate-400 text-center mb-3">
                      Syllable assembler (Tap to form word):
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center">
                      {scrambledSyllables.map((syl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSyllableClick(syl)}
                          className="px-5 py-3 text-lg font-bold bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 rounded-xl shadow-sm hover:translate-y--0.5 active:translate-y-0 text-slate-800 dark:text-white transition-all"
                        >
                          {syl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spelling submission / explanation box */}
                {!isAnswered ? (
                  <button
                    type="submit"
                    disabled={!userTypedAns.trim()}
                    className="w-full py-4 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Check Hangeul Spelling
                  </button>
                ) : (
                  /* Correct spelling block display */
                  <div className={`p-5 rounded-2xl border-2 flex items-start gap-4 ${
                    userTypedAns.trim().replace(/\s+/g, '') === currentQuestion.correctAnswer.trim().replace(/\s+/g, '')
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400'
                      : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400'
                  }`}>
                    {userTypedAns.trim().replace(/\s+/g, '') === currentQuestion.correctAnswer.trim().replace(/\s+/g, '') ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="text-left">
                      <p className="font-bold text-base">
                        {userTypedAns.trim().replace(/\s+/g, '') === currentQuestion.correctAnswer.trim().replace(/\s+/g, '')
                          ? 'Excellent Spelling! 아주 잘했어요!'
                          : 'Incorrect Spelling!'}
                      </p>
                      <div className="mt-2 text-xs flex flex-col gap-1.5 font-mono">
                        <span>Your Translation: <strong className="underline">{userTypedAns || '(Empty)'}</strong></span>
                        <span>Correct Hangeul Spelling: <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{currentQuestion.correctAnswer}</strong></span>
                        {currentQuestion.romanization && (
                          <span>Romanization Pronunciation: <strong className="text-indigo-400">/{currentQuestion.romanization}/</strong></span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Nav controller row */}
          {isAnswered && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-end"
            >
              <button
                onClick={handleNextQuestion}
                className="py-3 px-6 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-all flex items-center gap-1.5 active:scale-95 shadow-md"
              >
                {currentQuestionIdx + 1 === questions.length ? 'Show Scoring Summary' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
