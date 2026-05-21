import React, { useState, useEffect } from 'react';
import { StudyMode, CardProgress, ProgressStatus } from './types';
import { FlashcardDeck } from './components/FlashcardDeck';
import { QuizView } from './components/QuizView';
import { NumberGenerator } from './components/NumberGenerator';
import { CheatsheetView } from './components/CheatsheetView';
import { ALL_ITEMS } from './data/koreanData';
import { 
  BookOpen, 
  Binary, 
  Trophy, 
  HelpCircle, 
  Sun, 
  Moon, 
  Award, 
  Globe, 
  RotateCcw,
  Sparkles,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<StudyMode>('deck');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [progress, setProgress] = useState<Record<string, CardProgress>>({});

  // 1. Initial configuration loading (localStorage persistent results caching)
  useEffect(() => {
    // Media schema theme checking
    const savedTheme = localStorage.getItem('korean_flash_theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    const savedProgress = localStorage.getItem('korean_flash_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (err) {
        setProgress({});
      }
    }
  }, []);

  // 2. Save progress on changes
  const saveProgressToStorage = (updated: Record<string, CardProgress>) => {
    setProgress(updated);
    localStorage.setItem('korean_flash_progress', JSON.stringify(updated));
  };

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('korean_flash_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Update study status for specific card
  const handleUpdateCardProgress = (cardId: string, status: ProgressStatus) => {
    const current = progress[cardId] || {
      id: cardId,
      status: 'not_started',
      correctCount: 0,
      incorrectCount: 0
    };

    const updated: Record<string, CardProgress> = {
      ...progress,
      [cardId]: {
        ...current,
        status,
        lastPracticed: new Date().toISOString()
      }
    };

    saveProgressToStorage(updated);
  };

  // Increment accuracy log from Quiz outcomes
  const handleQuizReviewScore = (cardId: string, isCorrect: boolean) => {
    const current = progress[cardId] || {
      id: cardId,
      status: 'not_started',
      correctCount: 0,
      incorrectCount: 0
    };

    const nextCorrect = isCorrect ? current.correctCount + 1 : current.correctCount;
    const nextIncorrect = !isCorrect ? current.incorrectCount + 1 : current.incorrectCount;
    
    // Automatically label as practicing if incorrect, or mastered if correct count increases
    let nextStatus = current.status;
    if (isCorrect && nextCorrect >= 2) {
      nextStatus = 'mastered';
    } else if (!isCorrect) {
      nextStatus = 'learning';
    }

    const updated: Record<string, CardProgress> = {
      ...progress,
      [cardId]: {
        ...current,
        correctCount: nextCorrect,
        incorrectCount: nextIncorrect,
        status: nextStatus,
        lastPracticed: new Date().toISOString()
      }
    };

    saveProgressToStorage(updated);
  };

  // Reset progress parameters
  const handleResetProgressState = (categoryFilter?: string) => {
    if (!categoryFilter) {
      saveProgressToStorage({});
    } else {
      const updated = { ...progress };
      ALL_ITEMS.forEach((item) => {
        if (item.category === categoryFilter && updated[item.id]) {
          delete updated[item.id];
        }
      });
      saveProgressToStorage(updated);
    }
  };

  // Global Progress metrics
  const totalCardsCount = ALL_ITEMS.length;
  const masteredCount = ALL_ITEMS.filter((i) => progress[i.id]?.status === 'mastered').length;
  const learningCount = ALL_ITEMS.filter((i) => progress[i.id]?.status === 'learning').length;
  const completionRatio = totalCardsCount > 0 ? Math.round((masteredCount / totalCardsCount) * 100) : 0;

  return (
    <div className="min-h-screen pb-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-150 transition-colors duration-300 font-sans flex flex-col justify-between" id="korean-flashcard-learner-app">
      
      {/* HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-150 dark:border-slate-800/80" id="main-header">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo Brand with Korea style elements */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold shadow-lg overflow-hidden shrink-0">
              <span className="text-xl">한</span>
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-400 rounded-tr-full" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold font-display tracking-tight text-slate-800 dark:text-white flex items-center gap-1.5">
                Korean Days & Numbers <span className="bg-indigo-100 text-indigo-805 text-xxs font-extrabold px-2 py-0.5 rounded-full dark:bg-indigo-950 dark:text-indigo-300">STUDIO</span>
              </h1>
              <p className="text-xxs text-slate-400 font-medium tracking-wide">Days of the Week • Sino Numbers • Native Numbers</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-55 bg-white text-slate-705 dark:bg-slate-800 dark:border-slate-700 dark:text-amber-400 dark:hover:bg-slate-750 transition-all cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>
          </div>

        </div>
      </header>

      {/* COMPACT PROGRESS DASHBOARD CARD */}
      <div className="max-w-6xl mx-auto w-full px-4 mt-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-900 bg-indigo-500/10 dark:bg-indigo-500/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white text-base">Your Learning Progress</h2>
              <p className="text-xs text-slate-400 font-medium">Master cards to charge up your completion stats!</p>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="flex-1 max-w-lg flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
            <div className="text-right">
              <p className="text-xxs font-semibold uppercase tracking-wider text-slate-400 font-mono">Mastered</p>
              <h3 className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {masteredCount} <span className="text-xs text-slate-400 font-normal">/ {totalCardsCount}</span>
              </h3>
            </div>

            <div className="text-right">
              <p className="text-xxs font-semibold uppercase tracking-wider text-slate-400 font-mono">Learning</p>
              <h3 className="text-xl font-bold font-mono text-amber-500">
                {learningCount}
              </h3>
            </div>

            {/* Performance Bar */}
            <div className="w-full sm:w-44 space-y-1">
              <div className="flex justify-between text-xxs font-semibold text-slate-400 font-mono">
                <span>COMPLETION</span>
                <span>{completionRatio}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-605 bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${completionRatio}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTRAL CORE STUDY HUB NAVIGATION CONTROLLER */}
      <main className="max-w-6xl mx-auto w-full px-4 mt-8 flex-1 flex flex-col">
        
        {/* Navigation Selector Tabs */}
        <div className="flex justify-center mb-8" id="platform-tab-bar">
          <div className="grid grid-cols-4 bg-slate-100 p-1.5 dark:bg-slate-900 rounded-2xl w-full max-w-2xl border border-slate-205 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('deck')}
              className={`py-3 px-1 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center gap-1.5 justify-center ${
                activeTab === 'deck'
                  ? 'bg-white text-indigo-650 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Flashcards</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-3 px-1 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center gap-1.5 justify-center ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-650 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Quiz Arena</span>
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`py-3 px-1 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center gap-1.5 justify-center ${
                activeTab === 'generator'
                  ? 'bg-white text-indigo-650 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Binary className="w-4 h-4" />
              <span className="text-center">Numbers Builder</span>
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`py-3 px-1 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center gap-1.5 justify-center ${
                activeTab === 'cheatsheet'
                  ? 'bg-white text-indigo-650 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Cheatsheet</span>
            </button>
          </div>
        </div>

        {/* CONTAINER VIEWPORTS RENDER LAYER */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {activeTab === 'deck' && (
                <FlashcardDeck
                  progress={progress}
                  onUpdateProgress={handleUpdateCardProgress}
                  onResetProgress={handleResetProgressState}
                />
              )}
              {activeTab === 'quiz' && (
                <QuizView onAddMasteryScore={handleQuizReviewScore} />
              )}
              {activeTab === 'generator' && (
                <NumberGenerator />
              )}
              {activeTab === 'cheatsheet' && (
                <CheatsheetView />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* FOOTER SECTION */}
      <footer className="mt-16 border-t border-slate-150 dark:border-slate-800 pt-8" id="footer-credits">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <p>© 2026 Korean Days & Numbers Study Studio.</p>
            <p className="mt-1">Designed for robust local studies and rapid static deployments.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xxs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-1 rounded-md font-semibold border border-emerald-100">
              ● Static Client-Only SPA Mode (GitHub Pages Compliant)
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
