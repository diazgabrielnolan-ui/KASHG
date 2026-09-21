import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Utensils, 
  Bus, 
  BookOpen, 
  Coffee, 
  ShieldAlert,
  Clock,
  Sparkles,
  Edit3
} from 'lucide-react';
import { BudgetCategory } from '../../types';

interface BudgetScreenProps {
  categories: BudgetCategory[];
  onOpenSafeSpend: () => void;
  monthlyCap: number;
  onUpdateCap: (newCap: number) => void;
  isBalanceHidden: boolean;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({
  categories,
  onOpenSafeSpend,
  monthlyCap,
  onUpdateCap,
  isBalanceHidden,
}) => {
  const [isEditingCap, setIsEditingCap] = useState(false);
  const [capInput, setCapInput] = useState(monthlyCap.toString());

  const totalSpent = categories.reduce((acc, c) => acc + c.spent, 0); // ~5,250
  const remaining = Math.max(0, monthlyCap - totalSpent); // ~2,750
  const spentPercent = Math.min(100, (totalSpent / monthlyCap) * 100);
  const daysLeft = 12;
  const safeDaily = Math.round(remaining / daysLeft); // ₱229 - ₱241

  const handleSaveCap = () => {
    const parsed = parseFloat(capInput);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateCap(parsed);
      setIsEditingCap(false);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#ea580c]" />;
      case 'Bus':
        return <Bus className="w-4 h-4 text-[#18181b]" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-[#c2410c]" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-[#d97706]" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-[#0284c7]" />;
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-extrabold text-[#09090b] tracking-tight">
            Baon Budget
          </h1>
          <p className="text-[13px] text-[#64748b]">
            November semester allowance discipline
          </p>
        </div>
        <button
          onClick={() => setIsEditingCap(!isEditingCap)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e2e8f0] text-[12px] font-bold text-[#09090b] hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#ea580c]" />
          Edit Cap
        </button>
      </div>

      {/* Edit Cap Popdown */}
      {isEditingCap && (
        <div className="bg-[#fff7ed] p-4 rounded-2xl border border-[#fed7aa] space-y-3">
          <div className="text-xs font-bold text-[#c2410c]">
            Update Monthly Allowance Cap
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#09090b]">
                ₱
              </span>
              <input
                type="number"
                value={capInput}
                onChange={(e) => setCapInput(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-[#fed7aa] font-bold text-sm focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
              />
            </div>
            <button
              onClick={handleSaveCap}
              className="px-4 py-2 bg-[#ea580c] text-white font-bold text-xs rounded-xl hover:bg-[#c2410c] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Main Budget Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0]/90 shadow-[0_4px_16px_rgba(15,23,42,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-[16px] text-[#09090b]">
                Monthly Baon Budget
              </div>
              <div className="text-[12px] text-[#64748b]">
                Cap: {isBalanceHidden ? '₱ ••••' : `₱${monthlyCap.toLocaleString('en-PH')} / month`}
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#fff7ed] text-[#c2410c] text-[11px] font-bold border border-[#fed7aa]/60">
            {daysLeft} days left
          </span>
        </div>

        {/* Amount numbers */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <div className="text-[11px] font-semibold text-[#64748b]">Total Spent</div>
            <div className="text-xl font-extrabold text-[#09090b]">
              {isBalanceHidden ? '₱ •••' : `₱${totalSpent.toLocaleString('en-PH')}`}{' '}
              <span className="text-xs font-medium text-[#64748b]">
                ({spentPercent.toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-semibold text-[#64748b]">Remaining Allowance</div>
            <div className="text-xl font-extrabold text-[#ea580c]">
              {isBalanceHidden ? '₱ •••' : `₱${remaining.toLocaleString('en-PH')} left`}
            </div>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3.5 bg-[#f1f5f9] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#ea580c] rounded-full transition-all duration-500"
              style={{ width: `${spentPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748b]">
            <span>₱0</span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff7ed] text-[#c2410c] text-[11px] font-semibold border border-[#fed7aa]/60">
              📍 Mid-month checkpoint cleared
            </div>
            <span>₱{monthlyCap.toLocaleString('en-PH')}</span>
          </div>
        </div>
      </div>

      {/* Daily Allowance Burn Card */}
      <div 
        onClick={onOpenSafeSpend}
        className="bg-gradient-to-br from-[#09090b] to-[#18181b] text-white p-4 rounded-2xl shadow-lg relative overflow-hidden cursor-pointer group"
      >
        <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#ea580c]/20 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#f97316]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
              Safe Daily Spend Target
            </span>
          </div>
          <span className="text-[11px] text-zinc-400">Nov 19 - Nov 30</span>
        </div>

        <div className="mt-2.5 flex items-baseline justify-between relative z-10">
          <div>
            <div className="text-2xl font-extrabold text-white">
              {isBalanceHidden ? '₱ •••' : `₱${safeDaily}`} <span className="text-xs text-zinc-300 font-normal">/ day</span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Enough for Gastambide lunch + Quiapo jeepney return
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold group-hover:bg-white/20 transition-colors">
            Tap for Breakdown
          </span>
        </div>
      </div>

      {/* Category Limits Breakdown */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-[16px] text-[#09090b] tracking-tight">
          Category Allocations
        </h3>

        <div className="space-y-2.5">
          {categories.map((cat) => {
            const catPercent = Math.min(100, (cat.spent / cat.allocated) * 100);
            const isNearLimit = catPercent >= 80;
            const isExceeded = catPercent >= 100;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_6px_rgba(15,23,42,0.02)] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-[#09090b]">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-[#64748b]">
                        Allocated: ₱{cat.allocated.toLocaleString('en-PH')}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-[14px] text-[#09090b]">
                      ₱{cat.spent.toLocaleString('en-PH')}
                    </div>
                    <div className="text-[11px] font-semibold text-[#64748b]">
                      {catPercent.toFixed(0)}% used
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isExceeded
                        ? 'bg-[#dc2626]'
                        : isNearLimit
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#ea580c]'
                    }`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#64748b] pt-0.5">
                  <span>
                    Remaining:{' '}
                    <strong className="text-[#09090b]">
                      ₱{Math.max(0, cat.allocated - cat.spent).toLocaleString('en-PH')}
                    </strong>
                  </span>
                  <span
                    className={`font-semibold ${
                      isExceeded
                        ? 'text-[#dc2626]'
                        : isNearLimit
                        ? 'text-[#d97706]'
                        : 'text-[#16a34a]'
                    }`}
                  >
                    {isExceeded ? 'Over Cap' : isNearLimit ? 'Caution' : 'On Track'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
