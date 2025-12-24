
import React from 'react';
import { Icon } from './Icons';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="pointer-events-auto min-w-[300px] bg-slate-900/90 backdrop-blur-xl border border-winbuzz-gold/20 rounded-2xl shadow-2xl p-4 flex items-start gap-4 animate-in slide-in-from-right duration-500 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-winbuzz-gold"></div>
          <div className={`p-2 rounded-xl flex-shrink-0 ${
            toast.type === 'success' ? 'bg-green-500/10 text-green-500' : 
            toast.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-winbuzz-gold/10 text-winbuzz-gold'
          }`}>
            {toast.type === 'success' ? <Icon.CheckCircle className="w-5 h-5" /> : 
             toast.type === 'error' ? <Icon.Shield className="w-5 h-5" /> : <Icon.Bell className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">{toast.title}</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-1 leading-relaxed uppercase tracking-tight">{toast.message}</p>
          </div>
          <button 
            onClick={() => onRemove(toast.id)}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <Icon.Close className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
