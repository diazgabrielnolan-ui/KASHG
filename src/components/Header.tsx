import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  activeTab,
}) => {
  return (
    <header className="px-4 pt-3 pb-2 flex items-center justify-between sticky top-0 z-20 bg-[#f7f9fb]/90 backdrop-blur-md transition-all">
      {/* Brand & Campus Pill */}
      <div className="flex items-center gap-2.5">
        <div 
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center text-white font-extrabold text-xl shadow-sm cursor-pointer hover:opacity-95 transition-transform active:scale-95"
          title="Open Student Profile"
        >
          K
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg text-[#18181b] tracking-tight">KashG</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa]/60">
              {activeTab === 'home' ? 'Home' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </div>
          <div className="text-[12px] font-medium text-[#64748b] leading-tight">
            UE · Year 1
          </div>
        </div>
      </div>

      {/* Right Controls: Notification Bell & Avatar */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-[#475569] hover:text-[#09090b] hover:bg-slate-200/50 transition-colors"
          aria-label="Notifications"
          title="Student Baon Alerts"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ea580c] ring-2 ring-[#f7f9fb] animate-pulse" />
          )}
        </button>

        <button
          onClick={onOpenProfile}
          className="relative rounded-full p-0.5 ring-2 ring-[#22c55e] hover:ring-[#16a34a] transition-all group active:scale-95"
          title="View Student ID & Profile"
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-9 h-9 rounded-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full" />
        </button>
      </div>
    </header>
  );
};
