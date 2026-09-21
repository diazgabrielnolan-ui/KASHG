import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Utensils, 
  Bus, 
  BookOpen, 
  Wallet, 
  Coffee,
  Sparkles,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Transaction, CategoryType, PaymentMethod } from '../../types';

interface TransactionsScreenProps {
  transactions: Transaction[];
  onOpenAdd: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  isBalanceHidden: boolean;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  onOpenAdd,
  onSelectTransaction,
  isBalanceHidden,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');

  // Filter logic
  const filtered = transactions.filter((tx) => {
    const matchesSearch = 
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.merchant && tx.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'income' && tx.amount > 0) ||
      (selectedCategory === 'expense' && tx.amount < 0) ||
      tx.category === selectedCategory;

    const matchesMethod = 
      selectedMethod === 'all' || tx.paymentMethod === selectedMethod;

    return matchesSearch && matchesCategory && matchesMethod;
  });

  // Calculate totals
  const totalInflow = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOutflow = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  // Group by date
  const groupedByDate: { [key: string]: Transaction[] } = {};
  filtered.forEach((tx) => {
    const key = tx.dateStr;
    if (!groupedByDate[key]) {
      groupedByDate[key] = [];
    }
    groupedByDate[key].push(tx);
  });

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'food':
        return <Utensils className="w-4 h-4 text-[#e11d48]" />;
      case 'transit':
        return <Bus className="w-4 h-4 text-[#ea580c]" />;
      case 'school':
        return <BookOpen className="w-4 h-4 text-[#334155]" />;
      case 'leisure':
        return <Coffee className="w-4 h-4 text-[#d97706]" />;
      default:
        return <Wallet className="w-4 h-4 text-[#16a34a]" />;
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header & Quick Action */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-extrabold text-[#09090b] tracking-tight">
            Transactions
          </h1>
          <p className="text-[13px] text-[#64748b]">
            Track your student cashflow and allowances
          </p>
        </div>
        <button
          onClick={onOpenAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ea580c] text-white text-[13px] font-bold shadow-sm hover:bg-[#c2410c] active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Record
        </button>
      </div>

      {/* Summary Inflow / Outflow Pill Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3 rounded-2xl border border-[#e2e8f0]/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
            <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b]">Total Inflow</div>
            <div className="text-[15px] font-extrabold text-[#16a34a]">
              {isBalanceHidden ? '₱ •,•••' : `+₱${totalInflow.toLocaleString('en-PH')}`}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-[#e2e8f0]/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ffe4e6] flex items-center justify-center text-[#e11d48]">
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b]">Total Spent</div>
            <div className="text-[15px] font-extrabold text-[#09090b]">
              {isBalanceHidden ? '₱ •,•••' : `-₱${totalOutflow.toLocaleString('en-PH')}`}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Gastambide, Jeepney, Xerox, Canteen..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e2e8f0] text-[13px] font-medium text-[#09090b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
        />
      </div>

      {/* Filter Categories Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[12px]">
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'expense', label: 'Expenses' },
          { id: 'income', label: 'Baon & Income' },
          { id: 'food', label: 'Food & Dining' },
          { id: 'transit', label: 'Jeep & LRT' },
          { id: 'school', label: 'Prints & Books' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#09090b] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Transactions List Grouped by Date */}
      {Object.keys(groupedByDate).length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#e2e8f0] text-[#64748b]">
          <p className="font-semibold text-sm">No transactions found</p>
          <p className="text-xs mt-1">Try clearing your search query or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByDate).map(([dateLabel, items]) => (
            <div key={dateLabel} className="space-y-2">
              <div className="text-[12px] font-bold text-[#64748b] px-1 flex items-center justify-between">
                <span>{dateLabel}</span>
                <span className="font-normal text-[11px] text-[#94a3b8]">
                  {items.length} {items.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-[#e2e8f0]/90 divide-y divide-[#f1f5f9] overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
                {items.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <div
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {getCategoryIcon(tx.category)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-[14px] text-[#09090b] truncate group-hover:text-[#ea580c] transition-colors">
                            {tx.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#64748b] mt-0.5">
                            <span>{tx.categoryLabel}</span>
                            <span>•</span>
                            <span>{tx.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-2">
                        <div
                          className={`font-extrabold text-[14px] ${
                            isPositive ? 'text-[#16a34a]' : 'text-[#09090b]'
                          }`}
                        >
                          {isPositive ? '+' : '-'}
                          {isBalanceHidden
                            ? '₱ •••'
                            : `₱${Math.abs(tx.amount).toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                              })}`}
                        </div>
                        <span className="inline-block text-[10px] font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded-md mt-0.5">
                          {tx.paymentMethod}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
