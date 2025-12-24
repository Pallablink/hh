
import React, { useState, useRef } from 'react';
import { Icon } from './Icons';
import { ToastType } from './ToastContainer';

interface KYCViewProps {
  onBack: () => void;
  currentStatus: string;
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const KYCView: React.FC<KYCViewProps> = ({ onBack, currentStatus, onNotify }) => {
  const [step, setStep] = useState(1);
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setVideoActive(true);
      }
    } catch (err) {
      onNotify('error', 'Device Access Failed', 'Terminal could not initialize camera node. Please check browser permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setVideoActive(false);
    }
  };

  const handleNext = () => {
    if (step === 2) stopCamera();
    setStep(prev => prev + 1);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button onClick={onBack} className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-slate-200 transition-all border border-slate-200">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Identity Audit Terminal</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 p-12 text-center border-b border-slate-100 relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-winbuzz-blue/5 rounded-full blur-3xl"></div>
           <div className="w-24 h-24 bg-winbuzz-blue/10 rounded-3xl flex items-center justify-center text-winbuzz-blue mx-auto mb-6 shadow-inner border border-winbuzz-blue/20">
              <Icon.User className="w-12 h-12" />
           </div>
           <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Security Protocol L1</h3>
           <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.4em]">Audit Status: <span className={currentStatus === 'Verified' ? 'text-green-600' : 'text-winbuzz-blue'}>{currentStatus.toUpperCase()}</span></p>
        </div>

        <div className="p-12">
          {step === 1 && (
            <div className="space-y-10 text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-3xl border-2 border-dashed border-slate-200 hover:border-winbuzz-blue transition-all bg-slate-50/30 cursor-pointer group">
                   <div className="flex justify-center mb-6 text-slate-300 group-hover:text-winbuzz-blue transition-colors"><Icon.Camera className="w-12 h-12" /></div>
                   <h5 className="text-[11px] font-black uppercase text-slate-900 italic">Government ID Front</h5>
                   <input type="file" className="hidden" id="doc-front" onChange={handleNext} />
                   <label htmlFor="doc-front" className="mt-8 inline-block bg-white border border-winbuzz-blue/20 px-8 py-3 rounded-2xl text-[10px] font-black uppercase text-winbuzz-blue cursor-pointer hover:bg-winbuzz-blue hover:text-white transition-all shadow-md">Upload Scan</label>
                </div>
                <div className="p-10 rounded-3xl border-2 border-dashed border-slate-200 hover:border-winbuzz-blue transition-all bg-slate-50/30 cursor-pointer group">
                   <div className="flex justify-center mb-6 text-slate-300 group-hover:text-winbuzz-blue transition-colors"><Icon.Camera className="w-12 h-12" /></div>
                   <h5 className="text-[11px] font-black uppercase text-slate-900 italic">Government ID Back</h5>
                   <input type="file" className="hidden" id="doc-back" onChange={handleNext} />
                   <label htmlFor="doc-back" className="mt-8 inline-block bg-white border border-winbuzz-blue/20 px-8 py-3 rounded-2xl text-[10px] font-black uppercase text-winbuzz-blue cursor-pointer hover:bg-winbuzz-blue hover:text-white transition-all shadow-md">Upload Scan</label>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight max-w-md mx-auto leading-relaxed italic">Identity verification is mandatory for high-volume withdrawals. All data is encrypted using military-grade RSA-4096 protocols.</p>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-8 animate-in slide-in-from-bottom duration-400">
               <h4 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Live Biometric Scan</h4>
               <div className="relative w-full max-w-md aspect-video bg-black rounded-[2rem] mx-auto overflow-hidden shadow-2xl border-4 border-slate-900">
                  {videoActive ? (
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950">
                       <button onClick={startCamera} className="bg-winbuzz-blue text-white p-6 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-pulse border-2 border-white/20">
                          <Icon.Camera className="w-8 h-8" />
                       </button>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-6 italic">Initialize High-Res Camera Stream</p>
                    </div>
                  )}
                  {videoActive && (
                    <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
                       <div className="w-full h-full border-2 border-winbuzz-blue/40 rounded-2xl animate-pulse shadow-[inset_0_0_20px_rgba(37,99,235,0.2)]"></div>
                    </div>
                  )}
               </div>
               <div className="flex gap-4 justify-center">
                  <button onClick={() => { stopCamera(); setStep(1); }} className="px-8 py-3 rounded-2xl bg-slate-100 text-[11px] font-black uppercase text-slate-600 hover:bg-slate-200 border border-slate-200 italic">Restart</button>
                  <button onClick={handleNext} disabled={!videoActive} className="px-12 py-3 rounded-2xl bg-winbuzz-blue text-white text-[11px] font-black uppercase shadow-xl disabled:opacity-20 italic">Commit Profile Scan</button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 space-y-8 animate-in zoom-in duration-300">
               <div className="flex justify-center text-winbuzz-blue animate-bounce drop-shadow-xl"><Icon.CheckCircle className="w-20 h-20" /></div>
               <h4 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">Packet Transmitted</h4>
               <p className="text-[11px] text-slate-500 max-w-sm mx-auto font-black uppercase tracking-[0.1em] leading-relaxed italic">Your data has been mirrored to the audit node. Completion notification will be sent to your primary terminal within 120 minutes.</p>
               <button onClick={onBack} className="bg-winbuzz-blue text-white px-12 py-4 rounded-[2rem] font-black uppercase text-[11px] mt-8 shadow-2xl hover:brightness-110 active:scale-95 transition-all italic tracking-widest">Return to Terminal</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCView;
