export interface FlashcardItem {
  id: string;
  korean: string;
  english: string;
  romanization: string;
  category: 'days' | 'sino' | 'native';
  hint?: string;
  usage?: string;
}

export type ProgressStatus = 'not_started' | 'learning' | 'mastered';

export interface CardProgress {
  id: string; // matches FlashcardItem.id
  status: ProgressStatus;
  correctCount: number;
  incorrectCount: number;
  lastPracticed?: string; // ISO string
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
  romanization?: string;
  koreanSymbol?: string;
  category: 'days' | 'sino' | 'native';
}

export type StudyMode = 'deck' | 'quiz' | 'generator' | 'cheatsheet';
