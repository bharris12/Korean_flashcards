import React, { useState, useEffect } from 'react';
import { convertSinoNumber, convertNativeNumber, getCounterTip } from '../data/koreanData';
import { AudioButton } from './AudioButton';
import { 
  Binary, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  AlertCircle, 
  Lightbulb,
  Gamepad2,
  CalendarDays,
  Coins,
  FileDigit,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

export const NumberGenerator: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'sino' | 'native'>('sino');
  const [inputValue, setInputValue] = useState<number>(1);
  const [typedInput, setTypedInput] = useState<string>('1');

  // Practise Game stats
  const [gameActive, setGameActive] = useState(false);
  const [gameTarget, setGameTarget] = useState<number>(0);
  const [gameSystem, setGameSystem] = useState<'sino' | 'native'>('sino');
  const [gameAnswer, setGameAnswer] = useState<string>('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isGameCorrect, setIsGameCorrect] = useState(false);

  // Sync typedInput and inputValue
  const handleNumberChange = (valStr: string) => {
    setTypedInput(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed)) {
      const maxVal = activeSystem === 'sino' ? 999 : 99;
      const minVal = activeSystem === 'sino' ? 0 : 1;
      
      let clamped = Math.max(minVal, Math.min(maxVal, parsed));
      setInputValue(clamped);
    }
  };

  const handleIncrement = () => {
    const maxVal = activeSystem === 'sino' ? 999 : 99;
    if (inputValue < maxVal) {
      const nextVal = inputValue + 1;
      setInputValue(nextVal);
      setTypedInput(nextVal.toString());
    }
  };

  const handleDecrement = () => {
    const minVal = activeSystem === 'sino' ? 0 : 1;
    if (inputValue > minVal) {
      const prevVal = inputValue - 1;
      setInputValue(prevVal);
      setTypedInput(prevVal.toString());
    }
  };

  const currentResult = activeSystem === 'sino'
    ? convertSinoNumber(inputValue)
    : convertNativeNumber(inputValue);

  const counterTip = activeSystem === 'native' 
    ? getCounterTip(inputValue) 
    : '';

  // Practise game logic
  const startNewGameInstance = () => {
    const sys = Math.random() > 0.5 ? 'sino' : 'native';
    const maxNum = sys === 'sino' ? 100 : 99;
    const minNum = sys === 'sino' ? 1 : 1;
    const target = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    setGameSystem(sys);
    setGameTarget(target);
    setGameAnswer('');
    setHasGuessed(false);
    setIsGameCorrect(false);
    setGameActive(true);
  };

  const handleVerifyGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameAnswer.trim() || hasGuessed) return;

    const answerFormula = gameSystem === 'sino' 
      ? convertSinoNumber(gameTarget).hangul 
      : convertNativeNumber(gameTarget).hangul;

    const sanitizedAnswer = gameAnswer.trim().replace(/\s+/g, '');
    const sanitizedCorrect = answerFormula.trim().replace(/\s+/g, '');

    const correct = sanitizedAnswer === sanitizedCorrect;
    setIsGameCorrect(correct);
    setHasGuessed(true);
  };

  // Preset buttons
  const presets = activeSystem === 'sino' 
    ? [1, 5, 10, 24, 50, 100, 365, 999] 
    : [1, 5, 10, 18, 20, 35, 50, 99];

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="number-generator-component">
      {/* Dynamic calculator interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Converter Core (cols-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-1.5 rounded-xl">
            <button
              onClick={() => {
                setActiveSystem('sino');
                // adjust bounds
                if (inputValue > 99) {
                  setInputValue(99);
                  setTypedInput('99');
                }
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeSystem === 'sino'
                  ? 'bg-white tracking-wide text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              1. Sino-Korean
            </button>
            <button
              onClick={() => {
                setActiveSystem('native');
                if (inputValue > 99) {
                  setInputValue(99);
                  setTypedInput('99');
                } else if (inputValue === 0) {
                  setInputValue(1);
                  setTypedInput('1');
                }
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeSystem === 'native'
                  ? 'bg-white tracking-wide text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              2. Native Korean
            </button>
          </div>

          {/* Quick Explainer Badges */}
          <div className="grid grid-cols-2 gap-2 text-xxs font-mono text-slate-500" id="number-system-uses">
            {activeSystem === 'sino' ? (
              <>
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/10 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Coins className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Money, Prices, Math</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/10 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <CalendarDays className="w-3.5 h-3.5 text-indigo-505 shrink-0" />
                  <span>Dates, Years, Minutes</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/10 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>Hours in Time</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/10 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <FileDigit className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Ages, Counting items</span>
                </div>
              </>
            )}
          </div>

          {/* Number Dial / input */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Enter Number ({activeSystem === 'sino' ? '0 - 999' : '1 - 99'}):
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                -
              </button>
              
              <input
                type="number"
                min={activeSystem === 'sino' ? 0 : 1}
                max={activeSystem === 'sino' ? 999 : 99}
                value={typedInput}
                onChange={(e) => handleNumberChange(e.target.value)}
                className="flex-1 text-center h-12 p-3 font-mono font-bold text-xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950/40"
              />

              <button
                onClick={handleIncrement}
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                +
              </button>
            </div>
            
            {/* Quick Presets row */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {presets.map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setInputValue(val);
                    setTypedInput(val.toString());
                  }}
                  className={`px-3 py-1 text-xs rounded-lg border font-mono transition-colors ${
                    inputValue === val
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white hover:bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Translation Result Card */}
          <div className="bg-gradient-to-br from-indigo-500/5 to-slate-500/5 dark:from-slate-900 border border-indigo-100/30 dark:border-slate-800/80 p-6 rounded-2xl flex flex-col items-center relative overflow-hidden">
            <span className="text-xxs uppercase tracking-widest font-bold text-slate-400">Korean Translation</span>
            <h1 className="text-4xl md:text-5xl font-black font-sans text-slate-800 dark:text-white my-3 tracking-tight">
              {currentResult.hangul}
            </h1>
            <p className="text-sm font-mono text-indigo-500/90 font-semibold italic">/{currentResult.romanization}/</p>
            
            <div className="mt-4">
              <AudioButton text={currentResult.hangul} size="md" />
            </div>

            {/* Compound breakdown diagram */}
            <div className="w-full mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xxs uppercase tracking-widest font-bold text-slate-400 block mb-1">Structural Assembly</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
                {currentResult.breakdown}
              </p>
            </div>
          </div>

          {/* Helper Tips Banner */}
          {counterTip && (
            <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-50/20 text-xs text-teal-800 dark:text-teal-400 leading-relaxed flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>{counterTip}</span>
            </div>
          )}
        </div>

        {/* Right Side: Training Minigame (cols-5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-extrabold font-sans text-slate-800 dark:text-white">
                "Build-A-Number" Game
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Train your skills. We'll generate a random number and ask you to write out the Hangul syllables.
            </p>

            {!gameActive ? (
              <div className="py-8 text-center" id="game-lobby">
                <button
                  onClick={startNewGameInstance}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 mx-auto active:scale-95"
                >
                  <Play className="w-4 h-4" /> Initialize Sandbox Game
                </button>
              </div>
            ) : (
              <div className="space-y-5" id="game-ongoing">
                {/* Visual Card showing the mystery number */}
                <div className="bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center">
                  <span className="text-xxs uppercase tracking-widest font-bold text-slate-400 block mb-1">
                    TARGET VALUE ({gameSystem === 'sino' ? 'SINO-KOREAN' : 'NATIVE KOREAN'})
                  </span>
                  <div className="text-5xl font-black font-mono text-indigo-600 dark:text-white">
                    {gameTarget}
                  </div>
                </div>

                {/* Submitting user answer formula */}
                <form onSubmit={handleVerifyGame} className="space-y-3">
                  <label className="text-xxs uppercase tracking-wider font-bold text-slate-400 block">
                    Write in Hangeul:
                  </label>
                  <input
                    type="text"
                    disabled={hasGuessed}
                    value={gameAnswer}
                    onChange={(e) => setGameAnswer(e.target.value)}
                    placeholder="e.g. 삼십오..."
                    className="w-full p-3 font-bold rounded-xl border border-slate-250 dark:border-slate-800 tracking-wide text-center"
                  />

                  {/* Guess results banner */}
                  {hasGuessed && (
                    <div className={`p-4 rounded-xl border flex items-start gap-2.5 ${
                      isGameCorrect 
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800 dark:text-emerald-400' 
                        : 'border-rose-500 bg-rose-50/40 text-rose-800 dark:text-rose-400'
                    }`}>
                      {isGameCorrect ? (
                        <div className="text-xs">
                          <p className="font-bold">✓ Perfect Answer!</p>
                          <p className="font-mono mt-1 opacity-90">Spelling: {convertSinoNumber(gameTarget).hangul || convertNativeNumber(gameTarget).hangul}</p>
                        </div>
                      ) : (
                        <div className="text-xs">
                          <p className="font-bold">✗ Need Practice</p>
                          <p className="mt-1 font-semibold">Correct Spelling: <strong className="underline text-sm text-emerald-600 dark:text-emerald-400">
                            {gameSystem === 'sino' ? convertSinoNumber(gameTarget).hangul : convertNativeNumber(gameTarget).hangul}
                          </strong></p>
                          <p className="text-slate-400 italic mt-0.5">({gameSystem === 'sino' ? convertSinoNumber(gameTarget).romanization : convertNativeNumber(gameTarget).romanization})</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasGuessed ? (
                    <button
                      type="submit"
                      disabled={!gameAnswer.trim()}
                      className="w-full py-3 bg-indigo-605 text-white bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-xl active:scale-97 disabled:opacity-50"
                    >
                      Verify Answer Spelling
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startNewGameInstance}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl active:scale-97 flex items-center justify-center gap-1"
                    >
                      Play Next Number <Play className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xxs text-slate-400 leading-normal">
            💡 <span className="font-bold text-slate-700 dark:text-slate-300">Quick Rule:</span> Native counting goes 1–99. Sino counting has multiples of tens, hundreds, and thousands using combined Sino blocks.
          </div>
        </div>

      </div>
    </div>
  );
};
