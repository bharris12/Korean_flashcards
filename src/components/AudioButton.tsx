import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className = '', size = 'md' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [hasVoice, setHasVoice] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
    } else {
      // Check if ko-KR voice exists or can be fallback-tested
      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const koVoice = voices.find(v => v.lang.startsWith('ko'));
        setHasVoice(!!koVoice || voices.length > 0);
      };

      checkVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = checkVoices;
      }
    }
  }, []);

  const speak = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // prevent flipping cards when clicking pronounciation icon
    }
    
    if (!isSupported || typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    // Stop current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85; // Slightly slower for language learning clarity

    // Try to find the Korean voice
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const btnSizes = {
    sm: 'p-1.5 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-4 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!isSupported) {
    return (
      <button
        disabled
        title="Speech synthesis not supported in this browser"
        className={`text-gray-400 bg-gray-50/10 cursor-not-allowed rounded-full ${btnSizes[size]} ${className}`}
      >
        <VolumeX className={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={speak}
      type="button"
      title={isPlaying ? 'Speaking...' : 'Listen Pronunciation (ko-KR)'}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${
        isPlaying
          ? 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-950/60'
          : 'bg-indigo-50 text-indigo-600 hover:bg-slate-100 hover:text-indigo-700 active:scale-95 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700/80'
      } ${btnSizes[size]} ${className}`}
    >
      {isPlaying ? (
        <span className="flex items-center justify-center">
          <Loader2 className={`${iconSizes[size]} animate-spin absolute`} />
          <span className="opacity-0">
            <Volume2 className={iconSizes[size]} />
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 items-center justify-center">
            <span className="w-1 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </span>
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
};
