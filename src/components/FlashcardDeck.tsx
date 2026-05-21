import React, { useState, useEffect } from 'react';
import { FlashcardItem, CardProgress, ProgressStatus } from '../types';
import { ALL_ITEMS, DAYS_OF_WEEK, SINO_NUMBERS, NATIVE_NUMBERS } from '../data/koreanData';
import { AudioButton } from './AudioButton';
import { 
  Check, 
  HelpCircle, 
  RotateCcw, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Award,
  Sparkles,
  Calendar,
  Hash,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlashcardDeckProps {
  progress: Record<string, CardProgress>;
  onUpdateProgress: (cardId: string, status: ProgressStatus) => void;
  onResetProgress: (category?: string) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  progress,
  onUpdateProgress,
  onResetProgress
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'days' | 'sino' | 'native'>('all');
  const [items, setItems] = useState<FlashcardItem[]>(ALL_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sync category items
  useEffect(() => {
    let list: FlashcardItem[] = [];
    if (selectedCategory === 'all') list = [...ALL_ITEMS];
    else if (selectedCategory === 'days') list = [...DAYS_OF_WEEK];
    else if (selectedCategory === 'sino') list = [...SINO_NUMBERS];
    else if (selectedCategory === 'native') list = [...NATIVE_NUMBERS];

    setItems(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const currentCard: FlashcardItem | undefined = items[currentIndex];
  const cardProgressState = currentCard ? progress[currentCard.id] || { status: 'not_started' } : { status: 'not_started' };

  const handleNext = () => {
    if (items.length === 0) return;
    setIsFlipped(false);
    // Add small delay to allow card to unflip before loading next card
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 150);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const handleResetCategoryProgress = () => {
    if (window.confirm(`Reset your learning results for ${selectedCategory === 'all' ? 'all sets' : selectedCategory + ' set'}?`)) {
      onResetProgress(selectedCategory === 'all' ? undefined : selectedCategory);
    }
  };

  // Get status color coding
  const getStatusBadge = (status: ProgressStatus) => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Check className="w-3.5 h-3.5" /> Checked (Mastered)
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <RotateCcw className="w-3.5 h-3.5" /> Practicing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
            <HelpCircle className="w-3.5 h-3.5" /> Quiz Ready
          </span>
        );
    }
  };

  // Count progress in currently active subset
  const categoryStates = items.reduce(
    (acc, card) => {
      const state = progress[card.id]?.status || 'not_started';
      acc[state]++;
      return acc;
    },
    { mastered: 0, learning: 0, not_started: 0 }
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="flashcard-system">
      {/* Visual Study Modes Selection Grid */}
      <div className="mb-8" id="study-modes-panel">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Select Flashcard Study Mode
            </h3>
            <p className="text-xs text-slate-500">Select an specialized learning set below to load matching cards</p>
          </div>
          
          {/* Deck states tracker */}
          <div className="hidden sm:flex items-center gap-3.5 text-xs font-mono text-slate-500" id="deck-stats">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Mastered: {categoryStates.mastered}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>Learning: {categoryStates.learning}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span>Total: {items.length} cards</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Days of the week */}
          <button
            onClick={() => setSelectedCategory('days')}
            className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
              selectedCategory === 'days'
                ? 'border-indigo-650 bg-indigo-50/40 dark:border-indigo-500 dark:bg-slate-800/80 ring-4 ring-indigo-50 dark:ring-indigo-950/20'
                : 'border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xxs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                {DAYS_OF_WEEK.length} cards
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Days of the Week</h4>
            <p className="text-xxs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Master Sunday through Saturday using natural Hanja elemental roots.
            </p>
            {selectedCategory === 'days' && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          {/* 2. Sino Numbers */}
          <button
            onClick={() => setSelectedCategory('sino')}
            className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
              selectedCategory === 'sino'
                ? 'border-indigo-650 bg-indigo-50/40 dark:border-indigo-500 dark:bg-slate-800/80 ring-4 ring-indigo-50 dark:ring-indigo-950/20'
                : 'border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                <Hash className="w-5 h-5" />
              </div>
              <span className="text-xxs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                {SINO_NUMBERS.length} cards
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Sino-Korean</h4>
            <p className="text-xxs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Learn math, phone numbers, currency prices, minutes and address rooms.
            </p>
            {selectedCategory === 'sino' && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          {/* 3. Native Numbers */}
          <button
            onClick={() => setSelectedCategory('native')}
            className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
              selectedCategory === 'native'
                ? 'border-indigo-650 bg-indigo-50/40 dark:border-indigo-500 dark:bg-slate-800/80 ring-4 ring-indigo-50 dark:ring-indigo-950/20'
                : 'border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xxs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                {NATIVE_NUMBERS.length} cards
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Native Korean</h4>
            <p className="text-xxs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Train on hours, animal counts, human ages, and general objects counting.
            </p>
            {selectedCategory === 'native' && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          {/* 4. Mixed Mode */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
              selectedCategory === 'all'
                ? 'border-indigo-650 bg-indigo-50/40 dark:border-indigo-500 dark:bg-slate-800/80 ring-4 ring-indigo-50 dark:ring-indigo-950/20'
                : 'border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xxs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                {ALL_ITEMS.length} cards
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Mixed Mode</h4>
            <p className="text-xxs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Experience the full combined test of days, Sino numbers, and Native numbers.
            </p>
            {selectedCategory === 'all' && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-slate-500">No flashcards loaded.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Card Frame with 3D Flip */}
          <div className="w-full max-w-md h-96 relative group cursor-pointer" id="card-card-perspective" style={{ perspective: '1200px' }}>
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-full duration-500 relative transition-transform"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Card FRONT: Hangeul (Korean) */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-500/10 via-white to-slate-50/50 dark:from-slate-900 dark:to-indigo-950/20 border-2 border-indigo-100 dark:border-slate-800 p-8 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/5 transition-all"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
                    {currentCard?.category === 'days'
                      ? '📅 DAYS OF THE WEEK'
                      : currentCard?.category === 'sino'
                      ? '🔢 SINO-KOREAN NUMBER'
                      : '🔢 NATIVE KOREAN NUMBER'}
                  </span>
                  <div>{currentCard && getStatusBadge(cardProgressState.status)}</div>
                </div>

                {/* Centered Big Korean Lettering */}
                <div className="text-center flex-1 flex flex-col justify-center items-center">
                  <motion.h1 
                    key={currentCard?.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-bold font-sans tracking-tight text-slate-800 dark:text-white"
                  >
                    {currentCard?.korean}
                  </motion.h1>
                  
                  {/* Speaker Pronounce icon */}
                  {currentCard && (
                    <div className="mt-6 flex gap-2">
                      <AudioButton text={currentCard.korean} size="md" />
                    </div>
                  )}

                  {cardProgressState.status === 'not_started' && (
                    <p className="text-xs text-indigo-400 mt-4 animate-pulse">
                      Tap anywhere to flip card
                    </p>
                  )}
                </div>

                {/* Card footer */}
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Card {currentIndex + 1} / {items.length}</span>
                  <span>Flip for Translation</span>
                </div>
              </div>

              {/* Card BACK: English translation, romanization and helpful hints */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-slate-900 border-2 border-slate-800 p-8 flex flex-col justify-between shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold">
                    TRANSLATION & USAGE
                  </span>
                  {currentCard && (
                    <AudioButton text={currentCard.korean} size="sm" />
                  )}
                </div>

                {/* Core contents */}
                <div className="text-center flex-1 flex flex-col justify-center items-center px-4">
                  <p className="text-sm font-mono text-amber-400/80 mb-1">/{currentCard?.romanization}/</p>
                  <h2 className="text-4xl font-bold font-sans text-white leading-tight">
                    {currentCard?.english}
                  </h2>
                  
                  {currentCard?.hint && (
                    <div className="mt-4 max-w-xs text-xs text-slate-400 rounded-lg bg-slate-800/40 border border-slate-800 p-3 leading-relaxed">
                      💡 {currentCard.hint}
                    </div>
                  )}

                  {currentCard?.usage && (
                    <p className="mt-3 text-xs text-indigo-400/90 italic font-mono">
                      {currentCard.usage}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>Card {currentIndex + 1} / {items.length}</span>
                  <span>Tap to flip back</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick learning status rating buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center w-full max-w-md" id="mastery-controllers">
            <button
              onClick={() => {
                if (currentCard) {
                  onUpdateProgress(currentCard.id, 'learning');
                  handleNext();
                }
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl text-sm font-medium border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-700 dark:text-amber-300 dark:border-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Keep Practicing
            </button>
            <button
              onClick={() => {
                if (currentCard) {
                  onUpdateProgress(currentCard.id, 'mastered');
                  handleNext();
                }
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl text-sm font-medium border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 dark:border-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Got It! (Mastered)
            </button>
          </div>

          {/* Deck controls (Prev, Shuffle, Next, Reset) */}
          <div className="mt-8 flex items-center justify-between w-full max-w-md border-t border-slate-100 dark:border-slate-800 pt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              title="Previous Card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="Shuffle Current Deck"
              >
                <Shuffle className="w-4 h-4" /> Shuffle
              </button>
              
              <button
                onClick={handleResetCategoryProgress}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                title="Reset Deck Progress"
              >
                <RotateCcw className="w-4 h-4" /> Reset Set
              </button>
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              title="Next Card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Guide tip box */}
          <div className="mt-8 p-4 rounded-xl bg-indigo-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 max-w-md text-xs text-slate-500 leading-relaxed text-center">
            📌 <span className="font-semibold text-slate-700 dark:text-slate-300">Learning Method:</span> Say the word aloud, flip to verify the translation, and label your mastery level. The bar indicators above track your daily training progress.
          </div>
        </div>
      )}
    </div>
  );
};
