
import React, { useState } from 'react';
import { ToastType } from './ToastContainer';

interface ForgotPasswordProps {
  onBack: () => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onNotify }) => {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      onNotify('info', 'Token Broadcast', `Verification sequence transmitted to ${contact}.`);
    } else if (step === 2) {
      onNotify('success', 'OTP Verified', 'Terminal access authorized. Define new secure credentials.');
    }
    setStep(prev => prev + 1);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify('success', 'Security Re-sync', 'Exchange token successfully re-encrypted. Node connection restored.');
    onBack();
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="bg-winbuzz-gold p-6 text-center">
          <h2 className="text-2xl font-black italic text-slate-900 uppercase tracking-tighter">Recover Account</h2>
          <p className="text-[10px] font-bold text-slate-800/70 uppercase tracking-widest mt-1">Reset your secure password</p>
        </div>

        <div className="p-8">
          <div className="flex justify-between mb-8 px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 transition-all ${step >= i ? 'bg-winbuzz-gold border-winbuzz-gold text-slate-900' : 'border-slate-700 text-slate-500'}`}>
                {i}
              </div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight text-center">Enter your registered Email or Mobile Number</p>
              <input 
                type="text" 
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email or Mobile"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white focus:ring-2 focus:ring-winbuzz-gold outline-none"
              />
              <button type="submit" className="w-full bg-winbuzz-gold text-slate-900 py-4 rounded-xl font-black uppercase shadow-xl hover:brightness-110">Send OTP</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight text-center">We've sent a 6-digit code to <br/><span className="text-white">{contact}</span></p>
              <input 
                type="text" 
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-center tracking-[1em] text-xl font-black text-winbuzz-gold focus:ring-2 focus:ring-winbuzz-gold outline-none"
              />
              <button type="submit" className="w-full bg-winbuzz-gold text-slate-900 py-4 rounded-xl font-black uppercase shadow-xl hover:brightness-110">Verify OTP</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-[10px] text-slate-500 font-black uppercase hover:text-white">Resend Code</button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleReset} className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight text-center">Create a strong new password</p>
              <input 
                type="password" 
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="New Password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white focus:ring-2 focus:ring-winbuzz-gold outline-none"
              />
              <input 
                type="password" 
                required
                placeholder="Confirm Password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white focus:ring-2 focus:ring-winbuzz-gold outline-none"
              />
              <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase shadow-xl hover:brightness-110">Reset Password</button>
            </form>
          )}

          <div className="mt-8 text-center">
            <button onClick={onBack} className="text-[10px] font-black text-winbuzz-gold uppercase underline underline-offset-4">Return to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
