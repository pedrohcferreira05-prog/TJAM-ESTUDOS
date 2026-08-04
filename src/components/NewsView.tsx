import React from 'react';
import { NewsItem } from '../types';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';

interface NewsViewProps {
  news: NewsItem[];
  isDarkMode: boolean;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, isDarkMode }) => {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Notícias e Comunicados do TJAM</h2>
        <p className="text-xs text-slate-500 mt-1">
          Informações oficiais sobre o edital, provas, comarca e dicas da coordenação pedagógica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  {item.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </span>
              </div>

              <h3 className="font-extrabold text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.content}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Por {item.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
