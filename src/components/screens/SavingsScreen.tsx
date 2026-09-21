import React, { useState } from 'react';
import { 
  PiggyBank, 
  Plus, 
  ArrowDownRight, 
  Sparkles, 
  Target, 
  Calendar, 
  TrendingUp, 
  Coins, 
  Check, 
  X,
  ChevronRight
} from 'lucide-react';
import { IponPot } from '../../types';

interface SavingsScreenProps {
  pots: IponPot[];
  availableFunds: number;
  onDeposit: (potId: string, amount: number) => void;
  onWithdraw: (potId: string, amount: number) => void;
  onAddPot: (pot: Omit<IponPot, 'id' | 'currentAmount'>) => void;
  isBalanceHidden: boolean;
}

export const SavingsScreen: React.FC<SavingsScreenProps> = ({
  pots,
  availableFunds,
  onDeposit,
  onWithdraw,
  onAddPot,
  isBalanceHidden,
}) => {
  const [selectedPot, setSelectedPot] = useState<IponPot | null>(null);
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [actionAmount, setActionAmount] = useState<string>('100');
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('2000');
  const [newEmoji, setNewEmoji] = useState('🎒');
  const [newDate, setNewDate] = useState('Dec 2026');

  const totalSaved = pots.reduce((acc, p) => acc + p.currentAmount, 0);

  const handleAction = () => {
    if (!selectedPot) return;
    const val = parseFloat(actionAmount);
    if (isNaN(val) || val <= 0) return;

    if (actionType === 'deposit') {
      if (val > availableFunds) {
        alert('Insufficient available funds to deposit!');
        return;
      }
      onDeposit(selectedPot.id, val);
    } else {
      if (val > selectedPot.currentAmount) {
        alert('Cannot withdraw more than current pot balance!');
        return;
      }
      onWithdraw(selectedPot.id, val);
    }

    setSelectedPot(null);
  };

  const handleCreatePot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const target = parseFloat(newTarget);
    if (isNaN(target) || target <= 0) return;

    onAddPot({
      title: newTitle.trim(),
      targetAmount: target,
      targetDate: newDate,
      category: 'Student Goal',
      emoji: newEmoji || '🎯',
    });

    setIsAddingGoal(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-extrabold text-[#09090b] tracking-tight">
            Ipon Pots 🐷
          </h1>
          <p className="text-[13px] text-[#64748b]">
            Your college piggy bank and goal vaults
          </p>
        </div>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ea580c] text-white text-[13px] font-bold shadow-sm hover:bg-[#c2410c] active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          New Pot
        </button>
      </div>

      {/* Hero Ipon Balance Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#fed7aa]/80 shadow-[0_4px_16px_rgba(234,88,12,0.06)] relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center">
              <PiggyBank className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                TOTAL IPON ACCUMULATED
              </div>
              <div className="text-3xl font-extrabold text-[#09090b] tracking-tight">
                {isBalanceHidden ? '₱ •,•••' : `₱${totalSaved.toLocaleString('en-PH')}.00`}
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#16a34a] text-xs font-bold">
            +₱500 this week
          </span>
        </div>

        <p className="text-xs text-[#64748b] mt-3">
          Saved from baon leftovers, coin change, and freelance sideline income.
        </p>
      </div>

      {/* Quick Ipon Hacks */}
      <div className="bg-[#fff7ed] rounded-2xl p-3.5 border border-[#fed7aa] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ea580c] text-white flex items-center justify-center font-extrabold text-sm">
            ₱20
          </div>
          <div>
            <div className="text-xs font-bold text-[#09090b]">
              Daily ₱20 Coin Challenge
            </div>
            <div className="text-[11px] text-[#c2410c]">
              Drop your change into your pots at the end of each school day!
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[16px] text-[#09090b] tracking-tight">
            Active Student Pots ({pots.length})
          </h3>
          <span className="text-xs text-[#64748b] font-medium">Tap pot to deposit</span>
        </div>

        <div className="space-y-3">
          {pots.map((pot) => {
            const percent = Math.min(100, Math.round((pot.currentAmount / pot.targetAmount) * 100));
            const isCompleted = pot.currentAmount >= pot.targetAmount;

            return (
              <div
                key={pot.id}
                onClick={() => {
                  setSelectedPot(pot);
                  setActionType('deposit');
                }}
                className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-[#ea580c]/60 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] group-hover:scale-110 transition-transform">
                      {pot.emoji}
                    </span>
                    <div>
                      <h4 className="font-bold text-[15px] text-[#09090b] group-hover:text-[#ea580c] transition-colors">
                        {pot.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#64748b] mt-0.5">
                        <span>{pot.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {pot.targetDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        isCompleted
                          ? 'bg-[#dcfce7] text-[#16a34a]'
                          : 'bg-[#fff7ed] text-[#ea580c]'
                      }`}
                    >
                      {percent}%
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3.5 space-y-1.5">
                  <div className="w-full h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-[#16a34a]' : 'bg-[#ea580c]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#09090b]">
                      ₱{pot.currentAmount.toLocaleString('en-PH')}{' '}
                      <span className="text-[11px] font-normal text-[#64748b]">saved</span>
                    </span>
                    <span className="text-[#64748b] font-medium">
                      Target: ₱{pot.targetAmount.toLocaleString('en-PH')}
                    </span>
                  </div>
                </div>

                {/* Action buttons inside card */}
                <div className="mt-3 pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[11px] text-[#ea580c] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Manage Pot <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPot(pot);
                        setActionType('deposit');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#fff7ed] text-[#ea580c] text-[11px] font-bold hover:bg-[#ffedd5] transition-colors"
                    >
                      + Deposit
                    </button>
                    {pot.currentAmount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPot(pot);
                          setActionType('withdraw');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#f1f5f9] text-[#64748b] text-[11px] font-bold hover:bg-[#e2e8f0] transition-colors"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deposit / Withdraw Modal Dialog */}
      {selectedPot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedPot.emoji}</span>
                <div>
                  <h3 className="font-extrabold text-[#09090b] text-[15px]">
                    {selectedPot.title}
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Current Pot: ₱{selectedPot.currentAmount.toLocaleString('en-PH')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPot(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle Action */}
            <div className="grid grid-cols-2 gap-2 bg-[#f1f5f9] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActionType('deposit')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  actionType === 'deposit'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-[#64748b]'
                }`}
              >
                + Deposit Funds
              </button>
              <button
                type="button"
                onClick={() => setActionType('withdraw')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  actionType === 'withdraw'
                    ? 'bg-[#09090b] text-white shadow-sm'
                    : 'text-[#64748b]'
                }`}
              >
                - Withdraw Funds
              </button>
            </div>

            {/* Preset Amount Chips */}
            <div className="grid grid-cols-4 gap-1.5">
              {['50', '100', '200', '500'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setActionAmount(preset)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    actionAmount === preset
                      ? 'border-[#ea580c] bg-[#fff7ed] text-[#ea580c]'
                      : 'border-[#e2e8f0] text-[#64748b] hover:bg-slate-50'
                  }`}
                >
                  ₱{preset}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-extrabold text-base text-[#09090b]">
                ₱
              </span>
              <input
                type="number"
                value={actionAmount}
                onChange={(e) => setActionAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#e2e8f0] font-extrabold text-lg text-[#09090b] focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="text-[11px] text-[#64748b]">
              Available Wallet Balance: ₱{availableFunds.toLocaleString('en-PH')}
            </div>

            {/* Confirm button */}
            <button
              onClick={handleAction}
              className="w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-bold text-sm shadow-md hover:bg-[#c2410c] active:scale-95 transition-all"
            >
              Confirm {actionType === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </button>
          </div>
        </div>
      )}

      {/* New Pot Modal */}
      {isAddingGoal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <form
            onSubmit={handleCreatePot}
            className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#09090b] text-[16px]">
                Create New Ipon Pot
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingGoal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Goal Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sembreak Elyu trip, Casio Sci-Cal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Target Amount (₱)
                </label>
                <input
                  type="number"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold focus:outline-none focus:border-[#ea580c]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Target Date
                </label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Dec 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Emoji Icon
              </label>
              <div className="flex gap-2 text-xl">
                {['🏄‍♂️', '📐', '🛡️', '🎒', '💻', '🎮', '👟'].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setNewEmoji(em)}
                    className={`p-2 rounded-xl border transition-all ${
                      newEmoji === em
                        ? 'border-[#ea580c] bg-[#fff7ed]'
                        : 'border-[#e2e8f0]'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#ea580c] text-white font-bold text-sm hover:bg-[#c2410c] transition-all"
            >
              Start Saving
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
