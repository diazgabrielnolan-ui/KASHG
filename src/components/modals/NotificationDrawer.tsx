import React from 'react';
import { X, Bell, CheckCheck, Sparkles, AlertCircle, Wallet, PiggyBank } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'allowance':
        return <Wallet className="w-4 h-4 text-[#16a34a]" />;
      case 'ipon':
        return <PiggyBank className="w-4 h-4 text-[#ea580c]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#f59e0b]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center">
              <Bell className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="font-extrabold text-[#09090b] text-base">
              Campus Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mark all read */}
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span>Student baon & budget updates</span>
          <button
            onClick={onMarkAllRead}
            className="font-bold text-[#ea580c] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                n.read
                  ? 'bg-white border-[#e2e8f0]'
                  : 'bg-[#fff7ed]/50 border-[#fed7aa]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#fed7aa]/60 flex items-center justify-center shrink-0 shadow-xs">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#09090b] truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-[#94a3b8] shrink-0 ml-1">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    {n.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#09090b] text-white font-bold text-xs hover:bg-[#18181b] transition-colors"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
