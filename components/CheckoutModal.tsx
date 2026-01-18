
import React, { useState } from 'react';
import { BuyerInfo } from '../types';
import { RAFFLE_INFO, MOCK_PIX_KEY } from '../constants';
import { XMarkIcon, ClipboardIcon, CheckIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

interface CheckoutModalProps {
  selectedNumbers: string[];
  onClose: () => void;
  onConfirm: (info: BuyerInfo) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ selectedNumbers, onClose, onConfirm }) => {
  const [form, setForm] = useState({ name: '', whatsapp: '', cpf: '' });
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const total = selectedNumbers.length * RAFFLE_INFO.price;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp) return;
    setStep(2);
  };

  const copyPix = () => {
    navigator.clipboard.writeText(MOCK_PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    onConfirm({
      ...form
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 bg-orange-600 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Finalizar Reserva</h3>
            <p className="text-sm opacity-80">{selectedNumbers.length} números • R$ {total.toFixed(2).replace('.', ',')}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Seu Nome Completo *</label>
                <input 
                  required
                  type="text" 
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp *</label>
                <input 
                  required
                  type="tel" 
                  value={form.whatsapp}
                  onChange={e => setForm({...form, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CPF (Opcional)</label>
                <input 
                  type="text" 
                  value={form.cpf}
                  onChange={e => setForm({...form, cpf: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
                  placeholder="000.000.000-00"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl hover:bg-orange-700 transition shadow-lg active:scale-95 mt-4"
              >
                Próximo Passo
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl mb-2 w-full">
                  <p className="text-xs text-orange-800 mb-2 uppercase tracking-widest font-black">Chave PIX</p>
                  <p className="text-2xl font-black text-gray-900 mb-4">{MOCK_PIX_KEY}</p>
                  <button 
                    onClick={copyPix} 
                    className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-bold w-full hover:bg-orange-700 transition"
                  >
                    {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                    {copied ? 'Copiado!' : 'Copiar Chave'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 italic">Após o pagamento, clique no botão abaixo para nos enviar o comprovante pelo WhatsApp.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={handleFinish}
                  className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                  Enviar Comprovante
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-400 font-medium hover:text-gray-600"
                >
                  Editar meus dados
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
