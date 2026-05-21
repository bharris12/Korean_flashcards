import React from 'react';
import { ALL_ITEMS, DAYS_OF_WEEK, SINO_NUMBERS, NATIVE_NUMBERS } from '../data/koreanData';
import { 
  Calendar, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  CheckCircle,
  Coins,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export const CheatsheetView: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-10" id="cheatsheet-component">
      
      {/* SECTION 1: Sino-Korean vs. Native Korean Clash Explainer */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-black font-sans text-slate-800 dark:text-white tracking-tight">
            Understanding the Dual Number Systems
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Korean uses two completely distinct sets of numbers depending on context: <strong className="text-indigo-600 dark:text-indigo-400">Sino-Korean</strong> (Chinese origin) and <strong className="text-amber-500 font-semibold">Native Korean</strong> values. Mastering when to use which is the key to natural sounding Korean!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Sino-Korean Use Cases */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">S</span>
                <h3 className="font-bold text-base text-slate-800 dark:text-white">Sino-Korean System</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 font-mono">
                Used for mathematical equations, phone numbers, prices/currency, building rooms, and time measurements EXCEPT hours (specifically minutes and seconds).
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Money & Prices: 10,000 won = <span className="font-bold">만원</span> (man-won)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Minutes: 35 minutes = <span className="font-bold">삼십오 분</span> (sam-sip-o bun)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Phone Numbers: 010-... = <span className="font-bold">공일공-...</span> (gong-il-gong)</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 text-xxs text-slate-400 font-sans italic">
              *Protip: If it feels formal or like a coordinate mathematical value, Sino is safe.
            </div>
          </div>

          {/* Native Use Cases */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-xs text-center">N</span>
                <h3 className="font-bold text-base text-slate-800 dark:text-white">Native Korean System</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 font-mono">
                Used for physical quantities/counting objects, listing people/animals, telling hours of the day, and stating age (restricted mostly to values up to 99).
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hours: 3 o'clock = <span className="font-bold">세 시</span> (se si) *contraction format</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Ages: 25 years old = <span className="font-bold">스물다섯 살</span> (seomul-daseot sal)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>General Counting: 5 items = <span className="font-bold">다섯 개</span> (daseot gae)</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 text-xxs text-slate-400 font-sans italic">
              *Protip: Max Native number is 99 (아흔아홉). For 100+ always use Sino!
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Days of the week breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold font-sans text-slate-800 dark:text-white">
            Daily Cosmos: Days of the Week (요일)
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
          Days of the week are named using traditional Hanja characters representing celestial/nature element components from Yin and Yang and five basic materials of the universe.
        </p>

        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-sm text-left border-collapse font-sans">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 font-mono text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Day Name</th>
                <th className="p-4">Hangeul</th>
                <th className="p-4">Romanization</th>
                <th className="p-4">Hanja Root</th>
                <th className="p-4">Celestial Element</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {DAYS_OF_WEEK.map((day) => {
                const elementChar = day.hint?.match(/\(([ㄱ-ㅎㅏ-ㅣ가-힣])\s*-\s*([^\)]+)\)/);
                return (
                  <tr key={day.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold">{day.english}</td>
                    <td className="p-4 text-base font-semibold text-indigo-600 dark:text-indigo-400">{day.korean}</td>
                    <td className="p-4 font-mono text-xs">/{day.romanization}/</td>
                    <td className="p-4 font-medium text-slate-400">{elementChar ? elementChar[2] : '-'}</td>
                    <td className="p-4 text-xs font-medium text-slate-500">{day.hint?.replace('Associated with ', '') || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Dynamic Special Counting Prefix Contractions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Helper numbers reference */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-800 dark:text-white">Prefix Contractions Table</h3>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Several key <strong className="text-amber-500 font-semibold">Native numbers</strong> automatically contract into altered word roots when counting elements directly before a noun or classifier counters.
          </p>

          <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 font-mono uppercase font-bold">
                <tr>
                  <th className="p-3">Base Native Hangeul</th>
                  <th className="p-3">Counter Form Root</th>
                  <th className="p-3">Classifier Example Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                <tr>
                  <td className="p-3">하나 (hana - 1)</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">한 (han)</td>
                  <td className="p-3">한 시 (1 o'clock)</td>
                </tr>
                <tr>
                  <td className="p-3">둘 (dul - 2)</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">두 (du)</td>
                  <td className="p-3">두 개 (2 items)</td>
                </tr>
                <tr>
                  <td className="p-3">셋 (set - 3)</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">세 (se)</td>
                  <td className="p-3">세 마리 (3 animals)</td>
                </tr>
                <tr>
                  <td className="p-3">넷 (net - 4)</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">네 (ne)</td>
                  <td className="p-3">네 병 (4 bottles)</td>
                </tr>
                <tr>
                  <td className="p-3">스물 (seomul - 20)</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">스무 (seomu)</td>
                  <td className="p-3">스무 살 (20 years old)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Counter terminology cheat helper */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-800 dark:text-white">Essential Classifier Counters</h3>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            When counting anything in Korean, you must append an item classifier suffix to your number. Here are the 5 absolute most common classifiers:
          </p>

          <div className="space-y-3 font-sans text-xs">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">개 (gae)</span>
              <span className="text-slate-400">General inanimate items (apples, pens)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">명 (myeong)</span>
              <span className="text-slate-400">Physical people (students, friends)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">살 (sal)</span>
              <span className="text-slate-400">Ages of physical years (20 years old)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">마리 (mari)</span>
              <span className="text-slate-400">Animals (dogs, cats, horses)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">시 (si) / 분 (bun)</span>
              <span className="text-slate-400">Time: Hours (Native <span className="font-bold">시</span>) / Minutes (Sino <span className="font-bold">분</span>)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
