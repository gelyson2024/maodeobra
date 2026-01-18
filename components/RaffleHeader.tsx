
import React from 'react';
import { RAFFLE_INFO } from '../constants';
import { CalendarIcon, ClockIcon, InformationCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const RaffleHeader: React.FC = () => {
  return (
    <header className="relative bg-orange-600 text-white overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5,13H7V11H17Zm0-5H7V7H17Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
          Sorteio Especial Dia do Trabalhador
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight uppercase italic">
          {RAFFLE_INFO.title}
        </h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-200">
                🏆 O Prêmio
              </h2>
              <p className="text-lg leading-relaxed text-orange-50 font-medium">
                {RAFFLE_INFO.prize}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-orange-100">
                  <CalendarIcon className="w-5 h-5" /> 01 de Maio às 10:00h
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-100">
                  <VideoCameraIcon className="w-5 h-5" /> Live no Instagram: <strong>@gelyson_thales</strong>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-100 font-bold mt-2">
                  <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-base">R$ 30,00 por número</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-200">
                📋 Regras & Detalhes
              </h2>
              <ul className="space-y-1">
                {RAFFLE_INFO.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-orange-50">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-xs bg-orange-700/50 p-2 rounded-lg border border-orange-500/50">
                <InformationCircleIcon className="w-5 h-5 text-orange-200" />
                <span>Sorteio via sorteador.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RaffleHeader;
