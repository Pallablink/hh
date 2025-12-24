
import React, { useState } from 'react';
import { User } from '../types';
import { ToastType } from './ToastContainer';

interface ProfileSettingsProps {
  user: User;
  onBack: () => void;
  onUpdate: (updatedUser: Partial<User>) => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onBack, onUpdate, onNotify }) => {
  const [activeAvatar, setActiveAvatar] = useState(user.avatarUrl || '');
  
  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=King',
  ];

  const handleSave = () => {
    onUpdate({ avatarUrl: activeAvatar });
    onNotify('success', 'Identity Re-sync', 'Operator profile data successfully mirrored to exchange nodes.');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
        <h2 className="text-lg font-black uppercase italic tracking-tighter">Profile Settings</h2>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-winbuzz-gold/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto rounded-full bg-slate-800 border-4 border-winbuzz-gold overflow-hidden shadow-2xl flex items-center justify-center">
              {activeAvatar ? (
                <img src={activeAvatar} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <span className="text-4xl font-black text-winbuzz-gold">{user.username.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <h3 className="text-2xl font-black text-white mt-4 italic uppercase">{user.username}</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Player ID: {user.id}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h4 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest italic border-l-4 border-winbuzz-gold pl-3">Choose Your Avatar</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {avatars.map((url, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveAvatar(url)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${activeAvatar === url ? 'border-winbuzz-gold bg-slate-50' : 'border-slate-100 grayscale hover:grayscale-0 opacity-40 hover:opacity-100'}`}
                >
                  <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
               <input type="text" disabled value={user.id} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-black text-slate-400 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400">Status</label>
               <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase">Verified Member</span>
                  <span className="bg-green-100 text-green-700 text-[8px] font-black px-2 py-0.5 rounded-full">ACTIVE</span>
               </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button onClick={onBack} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-xl font-black uppercase text-xs hover:bg-slate-200 transition-all">Discard Changes</button>
            <button onClick={handleSave} className="flex-1 bg-winbuzz-gold text-slate-900 py-4 rounded-xl font-black uppercase text-xs shadow-xl hover:translate-y-[-2px] transition-all">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
