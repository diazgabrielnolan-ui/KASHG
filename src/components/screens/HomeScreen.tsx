import React from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowDown, 
  Plus, 
  SlidersHorizontal, 
  GraduationCap, 
  Utensils, 
  Bus, 
  BookOpen, 
  Wallet, 
  Sparkles,
  ChevronRight,
  Clock,
  PiggyBank
} from 'lucide-react';
import { Transaction, StudentProfile, TabType } from '../../types';

interface HomeScreenProps {
  profile: StudentProfile;
  availableFunds: number;
  isBalanceHidden: boolean;
  onToggleBalance: () => void;
  onOpenExpense: () => void;
  onOpenIncome: () => void;
  onOpenSafeSpend: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onNavigateTab: (tab: TabType) => void;
  transactions: Transaction[];
  currentTipIndex: number;
  onNextTip: () => void;
  tips: { id: string; tag: string; title: string; desc: string }[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  availableFunds,
  isBalanceHidden,
  onToggleBalance,
  onOpenExpense,
  onOpenIncome,
  onOpenSafeSpend,
  onSelectTransaction,
  onNavigateTab,
  transactions,
  currentTipIndex,
  onNextTip,
  tips,
}) => {
  const currentTip = tips[currentTipIndex % tips.length];

  // Calculations for screenshot alignment
  const budgetCap = 8000;
  const budgetSpent = 5250;
  const budgetRemaining = budgetCap - budgetSpent; // 2,750
  const spentPercent = ((budgetSpent / budgetCap) * 100).toFixed(1); // 65.6%
  const daysLeft = 12;
  const safeDailySpend = Math.round(budgetRemaining / daysLeft); // 229-241

  // Format peso
  const formatPeso = (val: number, withDecimals = false) => {
    if (isBalanceHidden) return '₱ •,•••';
    const formatted = Math.abs(val).toLocaleString('en-PH', {
      minimumFractionDigits: withDecimals ? 2 : 0,
      maximumFractionDigits: withDecimals ? 2 : 0,
    });
    return `₱${formatted}`;
  };

  // Icon selector for transactions matching the screenshot
  const getTransactionIcon = (tx: Transaction) => {
    switch (tx.category) {
      case 'food':
        return (
          <div className="w-10 h-10 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
        );
      case 'transit':
        return (
          <div className="w-10 h-10 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5" />
          </div>
        );
      case 'school':
        return (
          <div className="w-10 h-10 rounded-full bg-[#e2e8f0] text-[#334155] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        );
      case 'allowance':
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
        );
    }
  };

  // Recent 4 transactions to match screenshot exactly
  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#09090b] tracking-tight flex items-center gap-1.5 leading-snug">
            Good day, {profile.name}! <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-[14px] text-[#64748b] font-medium">
            Here's your allowance snapshot for November
          </p>
        </div>
        <div className="relative shrink-0">
          <img
            src={profile.avatarUrl}
            alt="Student Avatar"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#22c55e] p-0.5 shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full" />
        </div>
      </div>

      {/* 2. Available Funds Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#fed7aa]/70 shadow-[0_4px_20px_-4px_rgba(234,88,12,0.06)] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#ffedd5]/60 rounded-full blur-2xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff7ed] border border-[#ffedd5] text-[#c2410c] text-[11px] font-bold tracking-wider uppercase">
            <Wallet className="w-3.5 h-3.5 text-[#ea580c]" />
            AVAILABLE FUNDS
          </div>
          <span className="text-[12px] font-medium text-[#64748b] px-2.5 py-0.5 rounded-full bg-[#f1f5f9]">
            Year 1 · Sem 1
          </span>
        </div>

        {/* Big Balance */}
        <div className="my-2 relative z-10">
          {isBalanceHidden ? (
            <div className="text-4xl font-extrabold text-[#09090b] tracking-tight">
              ₱ •••••••
            </div>
          ) : (
            <div className="flex items-baseline text-[#09090b] font-extrabold tracking-tight">
              <span className="text-4xl sm:text-[42px] leading-tight">
                ₱{availableFunds.toLocaleString('en-PH')}
              </span>
              <span className="text-2xl text-[#71717a] font-bold ml-0.5">.00</span>
            </div>
          )}
          <p className="text-[13px] font-medium text-[#64748b] mt-0.5">
            Pocket money & freelance reserve
          </p>
        </div>

        {/* Bottom Status & Eye Toggle */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9] relative z-10">
          <button
            onClick={onOpenSafeSpend}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff7ed] text-[#c2410c] text-[12px] font-semibold border border-[#fed7aa]/60 hover:bg-[#ffedd5] transition-colors group cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#ea580c] group-hover:rotate-12 transition-transform" />
            <span>Safe to spend:</span>
            <span className="text-[#ea580c] font-bold">₱241 / day</span>
          </button>

          <button
            onClick={onToggleBalance}
            className="p-2 rounded-full text-[#94a3b8] hover:text-[#09090b] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            title={isBalanceHidden ? 'Show balance' : 'Hide balance'}
          >
            {isBalanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Action Buttons: Expense & Income */}
      <div className="grid grid-cols-2 gap-3">
        {/* Expense Button (Jet Black) */}
        <button
          onClick={onOpenExpense}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#09090b] text-white font-bold text-[15px] hover:bg-[#18181b] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          Expense
        </button>

        {/* Income Button (Flame Orange) */}
        <button
          onClick={onOpenIncome}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#ea580c] text-white font-bold text-[15px] hover:bg-[#c2410c] active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(234,88,12,0.25)] cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          Income
        </button>
      </div>

      {/* 4. Three Mini Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Income Card */}
        <div 
          onClick={() => onNavigateTab('transactions')}
          className="bg-white rounded-xl p-3 border border-[#e2e8f0]/80 shadow-[0_2px_6px_rgba(15,23,42,0.02)] cursor-pointer hover:border-[#cbd5e1] transition-all"
        >
          <div className="flex items-center justify-between text-[12px] font-medium text-[#64748b]">
            <span>Income</span>
            <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#16a34a] font-bold flex items-center justify-center text-[10px]">
              ↑
            </span>
          </div>
          <div className="text-[15px] sm:text-[16px] font-extrabold text-[#09090b] mt-1.5">
            {formatPeso(10000)}
          </div>
          <div className="text-[11px] text-[#64748b] mt-0.5 truncate">
            Baon & gigs
          </div>
        </div>

        {/* Outflow Card */}
        <div 
          onClick={() => onNavigateTab('reports')}
          className="bg-white rounded-xl p-3 border border-[#e2e8f0]/80 shadow-[0_2px_6px_rgba(15,23,42,0.02)] cursor-pointer hover:border-[#cbd5e1] transition-all"
        >
          <div className="flex items-center justify-between text-[12px] font-medium text-[#64748b]">
            <span>Outflow</span>
            <span className="w-4 h-4 rounded-full bg-[#ffe4e6] text-[#e11d48] font-bold flex items-center justify-center text-[10px]">
              📉
            </span>
          </div>
          <div className="text-[15px] sm:text-[16px] font-extrabold text-[#09090b] mt-1.5">
            {formatPeso(2750)}
          </div>
          <div className="text-[11px] text-[#64748b] mt-0.5 truncate">
            34% of baon
          </div>
        </div>

        {/* Ipon Pot Card */}
        <div 
          onClick={() => onNavigateTab('savings')}
          className="bg-white rounded-xl p-3 border border-[#fed7aa]/60 shadow-[0_2px_6px_rgba(234,88,12,0.03)] cursor-pointer hover:border-[#ea580c]/50 transition-all"
        >
          <div className="flex items-center justify-between text-[12px] font-medium text-[#64748b]">
            <span>Ipon Pot</span>
            <span className="w-4 h-4 rounded-full bg-[#ffedd5] text-[#ea580c] font-bold flex items-center justify-center text-[10px]">
              🐷
            </span>
          </div>
          <div className="text-[15px] sm:text-[16px] font-extrabold text-[#09090b] mt-1.5">
            {formatPeso(1500)}
          </div>
          <div className="text-[11px] text-[#ea580c] font-semibold mt-0.5 truncate">
            +₱500 week
          </div>
        </div>
      </div>

      {/* 5. Monthly Baon Budget Card */}
      <div 
        onClick={() => onNavigateTab('budget')}
        className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] cursor-pointer hover:shadow-md transition-shadow"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] text-[#09090b] leading-tight">
                Monthly Baon Budget
              </h3>
              <p className="text-[12px] text-[#64748b]">
                Cap: ₱8,000 / month
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#fff7ed] text-[#c2410c] text-[11px] font-bold border border-[#fed7aa]/60">
            {daysLeft} days left
          </span>
        </div>

        {/* Spend Stats */}
        <div className="flex items-center justify-between mt-3 text-[14px]">
          <div className="font-extrabold text-[#09090b]">
            ₱5,250 <span className="font-medium text-[#64748b]">spent ({spentPercent}%)</span>
          </div>
          <div className="font-extrabold text-[#ea580c]">
            ₱2,750 left
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#f1f5f9] rounded-full overflow-hidden mt-2 relative">
          <div 
            className="h-full bg-[#ea580c] rounded-full transition-all duration-500"
            style={{ width: `${spentPercent}%` }}
          />
        </div>

        {/* Checkpoint labels */}
        <div className="flex items-center justify-between mt-2.5 text-[11px] font-semibold text-[#64748b]">
          <span>₱0</span>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff7ed] text-[#c2410c] text-[11px] font-semibold border border-[#fed7aa]/60">
            📍 Mid-month checkpoint cleared
          </div>
          <span>₱8,000</span>
        </div>
      </div>

      {/* 6. Allowance Outflow Card (Top Student Spending Categories) */}
      <div 
        onClick={() => onNavigateTab('reports')}
        className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-extrabold text-[15px] text-[#09090b] leading-tight">
              Allowance Outflow
            </h3>
            <p className="text-[12px] text-[#64748b]">
              Top student spending categories
            </p>
          </div>
          <span className="text-[12px] font-medium text-[#64748b]">
            Nov 1 – 18
          </span>
        </div>

        {/* Segmented Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 mb-3.5">
          {/* Food: 51.6% */}
          <div className="h-full bg-[#ea580c] rounded-l-full" style={{ width: '51.6%' }} title="Food & Drinks ₱1,420" />
          {/* Jeepney: 17.5% */}
          <div className="h-full bg-[#18181b]" style={{ width: '17.5%' }} title="Jeep & Transit ₱480" />
          {/* Prints: 20% */}
          <div className="h-full bg-[#c2410c]" style={{ width: '20%' }} title="Prints & Notes ₱550" />
          {/* Others: 10.9% */}
          <div className="h-full bg-[#94a3b8] rounded-r-full" style={{ width: '10.9%' }} title="Others ₱300" />
        </div>

        {/* 2x2 Category Chips */}
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
              <span className="text-[#334155] font-medium truncate">Food & Drin...</span>
            </div>
            <span className="font-extrabold text-[#09090b] ml-1">₱1,420</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#18181b] shrink-0" />
              <span className="text-[#334155] font-medium truncate">Jeep & Transit</span>
            </div>
            <span className="font-extrabold text-[#09090b] ml-1">₱480</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#c2410c] shrink-0" />
              <span className="text-[#334155] font-medium truncate">Prints & Notes</span>
            </div>
            <span className="font-extrabold text-[#09090b] ml-1">₱550</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#94a3b8] shrink-0" />
              <span className="text-[#334155] font-medium truncate">Others</span>
            </div>
            <span className="font-extrabold text-[#09090b] ml-1">₱300</span>
          </div>
        </div>
      </div>

      {/* 7. Student Tip Card */}
      <div 
        onClick={onNextTip}
        className="bg-white rounded-2xl p-3.5 border border-[#fed7aa]/80 shadow-[0_2px_8px_rgba(234,88,12,0.04)] flex items-start gap-3 relative overflow-hidden group cursor-pointer hover:border-[#ea580c] transition-all"
      >
        <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
          <GraduationCap className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-extrabold tracking-wider text-[#ea580c] uppercase">
            {currentTip.tag}
          </div>
          <h4 className="font-bold text-[13px] text-[#09090b] leading-snug">
            {currentTip.title}
          </h4>
          <p className="text-[12px] text-[#64748b] leading-tight mt-0.5 truncate">
            {currentTip.desc}
          </p>
        </div>
        <div className="text-[#94a3b8] group-hover:text-[#ea580c] transition-colors self-center">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* 8. Recent Activity Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-[17px] text-[#09090b] tracking-tight">
              Recent Activity
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] text-[11px] font-semibold">
              Today
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="text-[13px] font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center gap-0.5 cursor-pointer"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of transactions matching screenshot */}
        <div className="space-y-2">
          {recentTransactions.map((tx) => {
            const isPositive = tx.amount > 0;
            return (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0]/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-[#cbd5e1] hover:bg-slate-50/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getTransactionIcon(tx)}
                  <div className="min-w-0">
                    <h4 className="font-bold text-[14px] text-[#09090b] truncate group-hover:text-[#ea580c] transition-colors">
                      {tx.title}
                    </h4>
                    <p className="text-[11px] text-[#64748b] font-medium">
                      {tx.categoryLabel} · {tx.timestamp}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <div
                    className={`font-extrabold text-[14px] ${
                      isPositive ? 'text-[#16a34a]' : 'text-[#09090b]'
                    }`}
                  >
                    {isPositive ? '+' : '-'}
                    {formatPeso(tx.amount, true)}
                  </div>
                  <div className="text-[11px] font-medium text-[#64748b]">
                    {tx.paymentMethod}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
