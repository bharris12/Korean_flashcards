import { FlashcardItem } from '../types';

// Days of the Week
export const DAYS_OF_WEEK: FlashcardItem[] = [
  {
    id: 'day-sun',
    korean: '일요일',
    english: 'Sunday',
    romanization: 'il-yo-il',
    category: 'days',
    hint: 'Associated with the Sun (일 - 日)',
    usage: '일요일 (Sun day)'
  },
  {
    id: 'day-mon',
    korean: '월요일',
    english: 'Monday',
    romanization: 'wol-yo-il',
    category: 'days',
    hint: 'Associated with the Moon (월 - 月)',
    usage: '월요일 (Moon day)'
  },
  {
    id: 'day-tue',
    korean: '화요일',
    english: 'Tuesday',
    romanization: 'hwa-yo-il',
    category: 'days',
    hint: 'Associated with Fire (화 - 火 / Planet Mars)',
    usage: '화요일 (Fire day)'
  },
  {
    id: 'day-wed',
    korean: '수요일',
    english: 'Wednesday',
    romanization: 'su-yo-il',
    category: 'days',
    hint: 'Associated with Water (수 - 水 / Planet Mercury)',
    usage: '수요일 (Water day)'
  },
  {
    id: 'day-thu',
    korean: '목요일',
    english: 'Thursday',
    romanization: 'mog-yo-il',
    category: 'days',
    hint: 'Associated with Trees/Wood (목 - 木 / Planet Jupiter)',
    usage: '목요일 (Wood day)'
  },
  {
    id: 'day-fri',
    korean: '금요일',
    english: 'Friday',
    romanization: 'geum-yo-il',
    category: 'days',
    hint: 'Associated with Gold/Metal (금 - 金 / Planet Venus)',
    usage: '금요일 (Gold/Metal day)'
  },
  {
    id: 'day-sat',
    korean: '토요일',
    english: 'Saturday',
    romanization: 'to-yo-il',
    category: 'days',
    hint: 'Associated with Soil/Earth (토 - 土 / Planet Saturn)',
    usage: '토요일 (Soil/Earth day)'
  }
];

// Base Sino-Korean Numbers for training
export const SINO_NUMBERS: FlashcardItem[] = [
  { id: 'sino-0', korean: '영', english: '0 (Zero)', romanization: 'yeong', category: 'sino', hint: 'Commonly used in telephone numbers, temperatures. (Alternate is 공 - gong)', usage: 'Sino numbers are used for phone numbers, dates, minutes, seconds, money, and address rooms.' },
  { id: 'sino-1', korean: '일', english: '1 (One)', romanization: 'il', category: 'sino', hint: 'Think of "ill" but short.' },
  { id: 'sino-2', korean: '이', english: '2 (Two)', romanization: 'i', category: 'sino', hint: 'Pronounced like the letter "E".' },
  { id: 'sino-3', korean: '삼', english: '3 (Three)', romanization: 'sam', category: 'sino', hint: 'Same root as Samosa (three angles) in Sanskrit, or think "Uncle Sam".' },
  { id: 'sino-4', korean: '사', english: '4 (Four)', romanization: 'sa', category: 'sino', hint: 'Associated with death (Hanzi: 死), often avoided in hospital elevators.' },
  { id: 'sino-5', korean: '오', english: '5 (Five)', romanization: 'o', category: 'sino', hint: 'Pronounced like the letter "O".' },
  { id: 'sino-6', korean: '육', english: '6 (Six)', romanization: 'yuk', category: 'sino', hint: 'Sounds like "yook".' },
  { id: 'sino-7', korean: '칠', english: '7 (Seven)', romanization: 'chil', category: 'sino', hint: 'Sounds like "chill".' },
  { id: 'sino-8', korean: '팔', english: '8 (Eight)', romanization: 'pal', category: 'sino', hint: 'Sounds like "pal" or "Paul".' },
  { id: 'sino-9', korean: '구', english: '9 (Nine)', romanization: 'gu', category: 'sino', hint: 'Sounds like "goo" or "coo".' },
  { id: 'sino-10', korean: '십', english: '10 (Ten)', romanization: 'sip', category: 'sino', hint: 'Sounds like "ship".' },
  { id: 'sino-20', korean: '이십', english: '20 (Twenty)', romanization: 'i-sip', category: 'sino', hint: '2 (이) + 10 (십)' },
  { id: 'sino-30', korean: '삼십', english: '30 (Thirty)', romanization: 'sam-sip', category: 'sino', hint: '3 (삼) + 10 (십)' },
  { id: 'sino-50', korean: '오십', english: '50 (Fifty)', romanization: 'o-sip', category: 'sino', hint: '5 (오) + 10 (십)' },
  { id: 'sino-100', korean: '백', english: '100 (One Hundred)', romanization: 'baek', category: 'sino', hint: 'Sounds like "beck" or "bag".' }
];

// Base Native Korean Numbers for training
export const NATIVE_NUMBERS: FlashcardItem[] = [
  { id: 'native-1', korean: '하나', english: '1 (One)', romanization: 'hana', category: 'native', hint: 'Becomes 한 (han) when placed directly before a counter/noun.', usage: 'Native numbers are used for counting physical items, people, hours in time, and age (up to 99).' },
  { id: 'native-2', korean: '둘', english: '2 (Two)', romanization: 'dul', category: 'native', hint: 'Becomes 두 (du) when placed directly before a counter/noun.' },
  { id: 'native-3', korean: '셋', english: '3 (Three)', romanization: 'set', category: 'native', hint: 'Becomes 세 (se) when placed directly before a counter/noun.' },
  { id: 'native-4', korean: '넷', english: '4 (Four)', romanization: 'net', category: 'native', hint: 'Becomes 네 (ne) when placed directly before a counter/noun.' },
  { id: 'native-5', korean: '다섯', english: '5 (Five)', romanization: 'daseot', category: 'native', hint: 'Sounds like "dah-seot".' },
  { id: 'native-6', korean: '여섯', english: '6 (Six)', romanization: 'yeoseot', category: 'native', hint: 'Sounds like "yeo-seot".' },
  { id: 'native-7', korean: '일곱', english: '7 (Seven)', romanization: 'ilgop', category: 'native', hint: 'Sounds like "il-gop".' },
  { id: 'native-8', korean: '여덟', english: '8 (Eight)', romanization: 'yeodeolb', category: 'native', hint: 'Double consonant ending - pronounced like "yeo-deol".' },
  { id: 'native-9', korean: '아홉', english: '9 (Nine)', romanization: 'ahop', category: 'native', hint: 'Sounds like "ah-hop".' },
  { id: 'native-10', korean: '열', english: '10 (Ten)', romanization: 'yeol', category: 'native', hint: 'Sounds like "yeol".' },
  { id: 'native-20', korean: '스물', english: '20 (Twenty)', romanization: 'seomul', category: 'native', hint: 'Becomes 스무 (seomu) when before counters like 세 (years of age).' },
  { id: 'native-30', korean: '서른', english: '30 (Thirty)', romanization: 'seoreun', category: 'native', hint: 'Used for ages in the 30s.' },
  { id: 'native-40', korean: '마흔', english: '40 (Forty)', romanization: 'maheun', category: 'native', hint: 'Used for ages in the 40s.' },
  { id: 'native-50', korean: '쉰', english: '50 (Fifty)', romanization: 'swin', category: 'native', hint: 'Sounds like "sheen" or "shween".' },
  { id: 'native-60', korean: '예순', english: '60 (Sixty)', romanization: 'yesun', category: 'native', hint: 'Sounds like "yeh-soon".' },
  { id: 'native-70', korean: '일흔', english: '70 (Seventy)', romanization: 'ilheun', category: 'native', hint: 'Sounds like "eel-heun".' },
  { id: 'native-80', korean: '여든', english: '80 (Eighty)', romanization: 'yeodeun', category: 'native', hint: 'Sounds like "yeo-deun".' },
  { id: 'native-90', korean: '아흔', english: '90 (Ninety)', romanization: 'aheun', category: 'native', hint: 'Sounds like "ah-heun".' }
];

// All item lookup map
export const ALL_ITEMS: FlashcardItem[] = [
  ...DAYS_OF_WEEK,
  ...SINO_NUMBERS,
  ...NATIVE_NUMBERS
];

// SINO NUMBERS HELPERS FOR 1 - 999
const SINO_DIGITS_HANGUL: { [key: number]: string } = {
  1: '일', 2: '이', 3: '삼', 4: '사', 5: '오', 6: '육', 7: '칠', 8: '팔', 9: '구'
};

const SINO_DIGITS_ROMAN: { [key: number]: string } = {
  1: 'il', 2: 'i', 3: 'sam', 4: 'sa', 5: 'o', 6: 'yuk', 7: 'chil', 8: 'pal', 9: 'gu'
};

export interface NumberBreakdown {
  hangul: string;
  romanization: string;
  breakdown: string; // "300 (삼백) + 40 (사십) + 5 (오)"
}

export function convertSinoNumber(num: number): NumberBreakdown {
  if (num === 0) {
    return { hangul: '영', romanization: 'yeong', breakdown: '0 (영)' };
  }
  if (num < 0 || num > 999) {
    return { hangul: 'N/A', romanization: 'n/a', breakdown: 'Supported ranges: 0 - 999' };
  }

  let hangulArr: string[] = [];
  let romanArr: string[] = [];
  let componentArr: string[] = [];

  const hundreds = Math.floor(num / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = num % 10;

  // Hundreds
  if (hundreds > 0) {
    if (hundreds === 1) {
      hangulArr.push('백');
      romanArr.push('baek');
      componentArr.push('100 (백)');
    } else {
      hangulArr.push(SINO_DIGITS_HANGUL[hundreds] + '백');
      romanArr.push(SINO_DIGITS_ROMAN[hundreds] + '-baek');
      componentArr.push(`${hundreds}00 (${SINO_DIGITS_HANGUL[hundreds]}백)`);
    }
  }

  // Tens
  if (tens > 0) {
    if (tens === 1) {
      hangulArr.push('십');
      romanArr.push('sip');
      componentArr.push('10 (십)');
    } else {
      hangulArr.push(SINO_DIGITS_HANGUL[tens] + '십');
      romanArr.push(SINO_DIGITS_ROMAN[tens] + '-sip');
      componentArr.push(`${tens}0 (${SINO_DIGITS_HANGUL[tens]}십)`);
    }
  }

  // Ones
  if (ones > 0) {
    hangulArr.push(SINO_DIGITS_HANGUL[ones]);
    romanArr.push(SINO_DIGITS_ROMAN[ones]);
    componentArr.push(`${ones} (${SINO_DIGITS_HANGUL[ones]})`);
  }

  // Join Romanization
  let romanStr = romanArr.join('-');
  // Simple cleanup of double hyphens or hanging hyphens
  romanStr = romanStr.replace(/-+/g, '-').replace(/(^-|-$)/g, '');

  return {
    hangul: hangulArr.join(''),
    romanization: romanStr,
    breakdown: componentArr.join(' + ')
  };
}

// NATIVE NUMBERS HELPERS FOR 1 - 99
const NATIVE_ONES_HANGUL: { [key: number]: string } = {
  1: '하나', 2: '둘', 3: '셋', 4: '넷', 5: '다섯', 6: '여섯', 7: '일곱', 8: '여덟', 9: '아홉'
};

const NATIVE_ONES_ROMAN: { [key: number]: string } = {
  1: 'hana', 2: 'dul', 3: 'set', 4: 'net', 5: 'daseot', 6: 'yeoseot', 7: 'ilgop', 8: 'yeodeolb', 9: 'ahop'
};

const NATIVE_TENS_HANGUL: { [key: number]: string } = {
  10: '열', 20: '스물', 30: '서른', 40: '마흔', 50: '쉰', 60: '예순', 70: '일흔', 80: '여든', 90: '아흔'
};

const NATIVE_TENS_ROMAN: { [key: number]: string } = {
  10: 'yeol', 20: 'seomul', 30: 'seoreun', 40: 'maheun', 50: 'swin', 60: 'yesun', 70: 'ilheun', 80: 'yeodeun', 90: 'aheun'
};

export function convertNativeNumber(num: number): NumberBreakdown {
  if (num < 1 || num > 99) {
    return { hangul: 'N/A', romanization: 'n/a', breakdown: 'Native numbers generally range 1 - 99' };
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  let hangul = '';
  let romanization = '';
  let breakdown = '';

  if (tens > 0 && ones > 0) {
    hangul = NATIVE_TENS_HANGUL[tens] + NATIVE_ONES_HANGUL[ones];
    romanization = `${NATIVE_TENS_ROMAN[tens]}-${NATIVE_ONES_ROMAN[ones]}`;
    breakdown = `${tens} (${NATIVE_TENS_HANGUL[tens]}) + ${ones} (${NATIVE_ONES_HANGUL[ones]})`;
  } else if (tens > 0) {
    hangul = NATIVE_TENS_HANGUL[tens];
    romanization = NATIVE_TENS_ROMAN[tens];
    breakdown = `${tens} (${NATIVE_TENS_HANGUL[tens]})`;
  } else {
    hangul = NATIVE_ONES_HANGUL[ones];
    romanization = NATIVE_ONES_ROMAN[ones];
    breakdown = `${ones} (${NATIVE_ONES_HANGUL[ones]})`;
  }

  return { hangul, romanization, breakdown };
}

// Generate an elegant text explanation for counters
export function getCounterTip(num: number, isDirectCounter: boolean = false): string {
  if (num > 99) {
    return 'Native numbers only up to 99. For 100+, use Sino-Korean numbers (백, 백일...)';
  }

  const specialPluralModifier: { [key: number]: string } = {
    1: '하나 (hana) becomes 한 (han) when preceding a counter. E.g., 한 시 (1 o\'clock), 한 명 (1 person).',
    2: '둘 (dul) becomes 두 (du) when preceding a counter. E.g., 두 시 (2 o\'clock), 두 개 (2 items).',
    3: '셋 (set) becomes 세 (se) when preceding a counter. E.g., 세 시 (3 o\'clock), 세 마리 (3 animals).',
    4: '넷 (net) becomes 네 (ne) when preceding a counter. E.g., 네 시 (4 o\'clock), 네 병 (4 bottles).',
    20: '스물 (seomul) becomes 스무 (seomu) when preceding a counter. E.g., 스무 살 (20 years of age).'
  };

  if (specialPluralModifier[num]) {
    return specialPluralModifier[num];
  }

  const endDigit = num % 10;
  const baseTen = Math.floor(num / 10) * 10;

  if (endDigit === 1 || endDigit === 2 || endDigit === 3 || endDigit === 4) {
    const rootOneWord = NATIVE_ONES_HANGUL[endDigit];
    const modifiedOneWord = endDigit === 1 ? '한' : endDigit === 2 ? '두' : endDigit === 3 ? '세' : '네';
    return `Note: When followed by a counter, the ending ${rootOneWord} shrinks to ${modifiedOneWord}. E.g. ${NATIVE_TENS_HANGUL[baseTen] || ''}${modifiedOneWord} ...`;
  }

  return '';
}
