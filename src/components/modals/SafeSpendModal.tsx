import React from 'react';
import { X, Clock, CheckCircle2, ShieldCheck, Bus, Utensils, Coffee, PiggyBank, Sparkles } from 'lucide-react';

interface SafeSpendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExpense: () => void;
  safeDailySpend: number;
  remainingAllowance: number;
  daysRemaining: number;
}

export const SafeSpendModal: React.FC<SafeSpendModalProps> = ({
  isOpen,
  onClose,
  onOpenExpense,
  safeDailySpend = 241,
  remainingAllowance = 2750,
  daysRemaining = 12,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center">
              <Clock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#09090b] text-base">
                Safe Daily Spend Formula
              </h3>
              <p className="text-xs text-[#64748b]">
                Pacing your baon until the next monthly payout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Number */}
        <div className="bg-gradient-to-br from-[#09090b] to-[#18181b] text-white p-4 rounded-2xl text-center space-y-1">
          <div className="text-xs text-orange-300 font-bold uppercase tracking-wider">
            RECOMMENDED DAILY BAON CAP
          </div>
          <div className="text-4xl font-black text-white">
            ₱{safeDailySpend}{' '}
            <span className="text-sm font-normal text-zinc-300">/ day</span>
          </div>
          <p className="text-xs text-zinc-300 pt-1">
            Based on <strong>₱{remainingAllowance.toLocaleString('en-PH')}</strong> remaining for{' '}
            <strong>{daysRemaining} days</strong> (until Nov 30).
          </p>
        </div>

        {/* Math Breakdown */}
        <div className="bg-[#f8fafc] rounded-2xl p-3.5 border border-[#e2e8f0] space-y-2">
          <div className="text-xs font-bold text-[#09090b]">
            How KashG calculates this:
          </div>
          <div className="text-xs text-[#475569] space-y-1.5">
            <div className="flex justify-between">
              <span>Remaining Baon:</span>
              <strong className="text-[#09090b]">₱{remainingAllowance.toLocaleString('en-PH')}</strong>
            </div>
            <div className="flex justify-between">
              <span>Days until Next Allowance (Dec 1):</span>
              <strong className="text-[#09090b]">{daysRemaining} days</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#e2e8f0]">
              <span>Base Daily Burn:</span>
              <strong className="text-[#09090b]">
                ₱{(remainingAllowance / daysRemaining).toFixed(2)}/day
              </strong>
            </div>
          </div>
        </div>

        {/* Recommended Daily Budget Allocation */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#09090b] uppercase tracking-wider">
            Suggested Daily Campus Breakdown:
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#ea580c]" />
                <span className="font-semibold text-[#09090b]">Jeepney Roundtrip</span>
              </div>
              <span className="font-bold text-[#09090b]">₱40</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#e11d48]" />
                <span className="font-semibold text-[#09090b]">Gastambide Canteen Lunch</span>
              </div>
              <span className="font-bold text-[#09090b]">₱120</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#d97706]" />
                <span className="font-semibold text-[#09090b]">Merienda / Snack</span>
              </div>
              <span className="font-bold text-[#09090b]">₱45</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#fff7ed] border border-[#fed7aa]">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-[#ea580c]" />
                <span className="font-semibold text-[#c2410c]">Daily Leftover to Ipon Pot</span>
              </div>
              <span className="font-extrabold text-[#ea580c]">₱36</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenExpense();
            }}
            className="w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-bold text-sm shadow-md hover:bg-[#c2410c] transition-colors"
          >
            Log Today's Expense
          </button>
        </div>
      </div>
    </div>
  );
};
