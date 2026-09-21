import React, { useState } from 'react';
import { 
  BarChart2, 
  PieChart, 
  TrendingDown, 
  Award, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Info
} from 'lucide-react';
import { Transaction } from '../../types';

interface ReportsScreenProps {
  transactions: Transaction[];
  isBalanceHidden: boolean;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  transactions,
  isBalanceHidden,
}) => {
  const [activeView, setActiveView] = useState<'category' | 'daily' | 'payment'>('category');

  // Categories matching screenshot
  const categoryData = [
    { name: 'Food & Drinks', amount: 1420, percent: 51.6, color: '#ea580c', detail: 'Gastambide, canteen meals, siomai' },
    { name: 'Jeep & Transit', amount: 480, percent: 17.5, color: '#18181b', detail: 'Quiapo jeepneys, LRT-2 Legarda, trike' },
    { name: 'Prints & Notes', amount: 550, percent: 20.0, color: '#c2410c', detail: 'Photox plates, bluebooks, engineering xerox' },
    { name: 'Others & Misc', amount: 300, percent: 10.9, color: '#94a3b8', detail: 'Tumbler refills, ballpens, school org fee' },
  ];

  const totalSpent = 2750;

  // Daily outflow data for school days
  const dailyData = [
    { day: 'Mon', amount: 180, label: 'Canteen & Jeep' },
    { day: 'Tue', amount: 220, label: 'Jeep + Lunch' },
    { day: 'Wed', amount: 380, label: 'Prints & Plates' },
    { day: 'Thu', amount: 160, label: 'Jeep & Siomai' },
    { day: 'Fri', amount: 240, label: 'Group review' },
    { day: 'Sat', amount: 110, label: 'Coffee review' },
    { day: 'Sun', amount: 40, label: 'Rest day' },
  ];

  const maxDaily = Math.max(...dailyData.map((d) => d.amount));

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="pt-1">
        <h1 className="text-2xl font-extrabold text-[#09090b] tracking-tight">
          Allowance Reports
        </h1>
        <p className="text-[13px] text-[#64748b]">
          November student outflow & spending trends
        </p>
      </div>

      {/* Student Health Score Banner */}
      <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-lg">
            1.75
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-orange-200">
              STUDENT BUDGET RATING
            </div>
            <div className="font-extrabold text-base">
              Discipline: Very Good!
            </div>
            <div className="text-xs text-orange-100">
              Burn rate is safely below the ₱8,000 monthly baon ceiling.
            </div>
          </div>
        </div>
        <Award className="w-8 h-8 text-orange-200 shrink-0" />
      </div>

      {/* Main Outflow Breakdown Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[15px] text-[#09090b]">
              Allowance Outflow Analysis
            </h3>
            <p className="text-[12px] text-[#64748b]">
              Top student spending categories (Nov 1 – 18)
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold text-[#64748b]">Total Outflow</div>
            <div className="font-extrabold text-[#09090b] text-[15px]">
              {isBalanceHidden ? '₱ •••' : `₱${totalSpent.toLocaleString('en-PH')}`}
            </div>
          </div>
        </div>

        {/* Multi-segment stacked bar */}
        <div className="space-y-1.5">
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
            {categoryData.map((cat) => (
              <div
                key={cat.name}
                style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all"
                title={`${cat.name}: ₱${cat.amount} (${cat.percent}%)`}
              />
            ))}
          </div>

          <div className="flex justify-between text-[11px] text-[#64748b] font-medium px-1">
            <span>Nov 1 Payout</span>
            <span>65.6% allowance remaining</span>
            <span>Nov 30</span>
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-2.5 pt-2">
          {categoryData.map((cat) => (
            <div
              key={cat.name}
              className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div>
                  <div className="font-bold text-[13px] text-[#09090b]">
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    {cat.detail}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-[13px] text-[#09090b]">
                  ₱{cat.amount.toLocaleString('en-PH')}
                </div>
                <div className="text-[11px] font-bold text-[#ea580c]">
                  {cat.percent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Outflow Histogram */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[15px] text-[#09090b]">
              Weekly Outflow Pattern
            </h3>
            <p className="text-[12px] text-[#64748b]">
              Spending peaks on mid-week drafting & lab days
            </p>
          </div>
          <span className="text-xs font-bold text-[#ea580c] bg-[#fff7ed] px-2 py-1 rounded-md">
            Safe: ₱241/d
          </span>
        </div>

        <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1">
          {dailyData.map((d) => {
            const heightPercent = (d.amount / maxDaily) * 100;
            const isOverSafe = d.amount > 241;

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="text-[10px] font-extrabold text-[#09090b]">
                  ₱{d.amount}
                </div>
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isOverSafe ? 'bg-[#ea580c]' : 'bg-[#18181b]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[11px] font-bold text-[#64748b] mt-1">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#64748b] pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#18181b]" />
            <span>Normal Daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ea580c]" />
            <span>Peak Lab/Printing Day</span>
          </div>
        </div>
      </div>

      {/* Payment Channel Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] space-y-3">
        <h3 className="font-extrabold text-[15px] text-[#09090b]">
          How You Pay for Stuff
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="text-xs text-[#64748b]">GCash / E-Wallet</div>
            <div className="text-base font-extrabold text-[#09090b] mt-0.5">54%</div>
            <div className="text-[11px] text-[#ea580c] font-medium">Canteens & 7-Eleven</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="text-xs text-[#64748b]">Cash & Paper</div>
            <div className="text-base font-extrabold text-[#09090b] mt-0.5">28%</div>
            <div className="text-[11px] text-[#64748b] font-medium">Photox & Bluebooks</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="text-xs text-[#64748b]">Coins & Barya</div>
            <div className="text-base font-extrabold text-[#09090b] mt-0.5">14%</div>
            <div className="text-[11px] text-[#64748b] font-medium">Jeepney & Trike fare</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="text-xs text-[#64748b]">Maya / Online</div>
            <div className="text-base font-extrabold text-[#09090b] mt-0.5">4%</div>
            <div className="text-[11px] text-[#64748b] font-medium">Study coffee & loads</div>
          </div>
        </div>
      </div>
    </div>
  );
};
