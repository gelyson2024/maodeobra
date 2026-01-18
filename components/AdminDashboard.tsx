
import React from 'react';
import { Ticket, TicketStatus } from '../types';
import { CheckBadgeIcon, XCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface AdminDashboardProps {
  tickets: Ticket[];
  onConfirm: (numbers: string[]) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tickets, onConfirm, onClose }) => {
  const reservations = tickets.filter(t => t.status === TicketStatus.RESERVED);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
          <h2 className="text-xl font-bold">Painel de Controle (Simulado)</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-lg font-bold mb-4">Reservas Aguardando Pagamento ({reservations.length})</h3>
          
          {reservations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Nenhuma reserva pendente no momento.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((res, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="bg-yellow-500 text-white font-bold h-12 w-12 flex items-center justify-center rounded-xl text-lg">
                      {res.number}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{res.buyer?.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <PhoneIcon className="w-3 h-3" /> {res.buyer?.whatsapp}
                      </div>
                      {res.reservedAt && (
                        <p className="text-[10px] text-orange-600 font-bold uppercase mt-1">
                          Expira em: {new Date(res.reservedAt + 48*60*60*1000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {res.buyer?.receiptUrl && (
                      <a href={res.buyer.receiptUrl} target="_blank" className="text-blue-600 text-xs font-bold hover:underline">Ver Comprovante</a>
                    )}
                    <button 
                      onClick={() => onConfirm([res.number])}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition"
                    >
                      <CheckBadgeIcon className="w-5 h-5" /> Confirmar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          Nota: Este painel simula a confirmação manual de pagamentos pelo administrador.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
