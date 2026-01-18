
import React from 'react';
import { Ticket, TicketStatus } from '../types';
import { STATUS_COLORS } from '../constants';

interface NumberGridProps {
  tickets: Ticket[];
  selectedNumbers: string[];
  onToggle: (num: string) => void;
}

const NumberGrid: React.FC<NumberGridProps> = ({ tickets, selectedNumbers, onToggle }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {tickets.map((ticket) => {
        const isSelected = selectedNumbers.includes(ticket.number);
        const colorClass = isSelected 
          ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
          : STATUS_COLORS[ticket.status];

        return (
          <button
            key={ticket.number}
            onClick={() => onToggle(ticket.number)}
            disabled={ticket.status === TicketStatus.PAID || ticket.status === TicketStatus.UNAVAILABLE || ticket.status === TicketStatus.RESERVED}
            className={`
              h-12 w-full flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200
              ${colorClass}
              ${ticket.status === TicketStatus.AVAILABLE ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}
              relative
            `}
          >
            {ticket.number}
            {ticket.status === TicketStatus.RESERVED && !isSelected && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default NumberGrid;
