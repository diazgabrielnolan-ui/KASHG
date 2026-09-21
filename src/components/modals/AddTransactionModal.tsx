import React, { useState } from 'react';
import { X, ArrowDown, Plus, Utensils, Bus, BookOpen, Wallet, Coffee, ShieldAlert } from 'lucide-react';
import { Transaction, CategoryType, PaymentMethod } from '../../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  initialType?: 'expense' | 'income';
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  initialType = 'expense',
}) => {
  const [type, setType] = useState<'expense' | 'income'>(initialType);
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('food');
  const [categoryLabel, setCategoryLabel] = useState('Food & Milk Tea');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('GCash');
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const categories: { id: CategoryType; label: string; name: string }[] = [
    { id: 'food', label: 'Food & Milk Tea', name: 'Food & Dining' },
    { id: 'transit', label: 'Jeepney & LRT', name: 'Jeep & Transit' },
    { id: 'school', label: 'School & Photocopier', name: 'Prints & Notes' },
    { id: 'leisure', label: 'Coffee & Barkada', name: 'Leisure' },
    { id: 'allowance', label: 'Family Allowance', name: 'Family Baon' },
    { id: 'freelance', label: 'Sideline / Gig', name: 'Freelance' },
    { id: 'others', label: 'General / Misc', name: 'Others' },
  ];

  const quickExpensePresets = [
    { title: 'Gastambide Canteen Lunch', amount: '120', category: 'food' as CategoryType, catLabel: 'Food & Milk Tea', method: 'GCash' as PaymentMethod },
    { title: 'Jeepney Fare to UE Manila', amount: '40', category: 'transit' as CategoryType, catLabel: 'Jeepney & LRT', method: 'Coins' as PaymentMethod },
    { title: 'Engineering Xerox Plates', amount: '85', category: 'school' as CategoryType, catLabel: 'School & Photocopier', method: 'Cash' as PaymentMethod },
    { title: 'Siomai Rice & Gulaman', amount: '65', category: 'food' as CategoryType, catLabel: 'Food & Milk Tea', method: 'Coins' as PaymentMethod },
  ];

  const quickIncomePresets = [
    { title: 'Monthly Baon from Parents', amount: '8000', category: 'allowance' as CategoryType, catLabel: 'Family Allowance', method: 'Bank Transfer' as PaymentMethod },
    { title: 'Freelance Commission Gig', amount: '1500', category: 'freelance' as CategoryType, catLabel: 'Sideline / Gig', method: 'GCash' as PaymentMethod },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0 || !title.trim()) return;

    const finalAmount = type === 'expense' ? -numericAmount : numericAmount;

    onAddTransaction({
      title: title.trim(),
      category,
      categoryLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: 'Today',
      amount: finalAmount,
      paymentMethod,
      merchant: merchant.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  const applyPreset = (preset: { title: string; amount: string; category: CategoryType; catLabel: string; method: PaymentMethod }) => {
    setTitle(preset.title);
    setAmount(preset.amount);
    setCategory(preset.category);
    setCategoryLabel(preset.catLabel);
    setPaymentMethod(preset.method);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-[#09090b] text-lg">
              {type === 'expense' ? 'Record Expense' : 'Add Student Income'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Toggle: Expense vs Income */}
        <div className="grid grid-cols-2 gap-2 bg-[#f1f5f9] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setCategory('food');
              setCategoryLabel('Food & Milk Tea');
            }}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              type === 'expense'
                ? 'bg-[#09090b] text-white shadow-sm'
                : 'text-[#64748b]'
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5" />
            Expense
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setCategory('allowance');
              setCategoryLabel('Family Allowance');
            }}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              type === 'income'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'text-[#64748b]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Income
          </button>
        </div>

        {/* Quick Student Presets */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            Quick University Presets
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {(type === 'expense' ? quickExpensePresets : quickIncomePresets).map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-2.5 py-1.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#334155] whitespace-nowrap hover:border-[#ea580c] hover:bg-[#fff7ed] transition-colors"
              >
                {p.title} (₱{p.amount})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Amount input */}
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Amount (₱)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-extrabold text-xl text-[#09090b]">
                ₱
              </span>
              <input
                type="number"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#e2e8f0] font-extrabold text-xl text-[#09090b] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Item / Description
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lunch at Gastambide Canteen"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-medium text-[#09090b] focus:outline-none focus:border-[#ea580c]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                const sel = categories.find((c) => c.id === e.target.value);
                if (sel) {
                  setCategory(sel.id);
                  setCategoryLabel(sel.label);
                }
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-sm bg-white font-medium text-[#09090b] focus:outline-none focus:border-[#ea580c]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.label})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['GCash', 'Cash', 'Coins', 'Maya', 'Bank Transfer'] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all truncate ${
                    paymentMethod === m
                      ? 'border-[#ea580c] bg-[#fff7ed] text-[#ea580c]'
                      : 'border-[#e2e8f0] text-[#64748b] hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Merchant & Notes */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Merchant / Location
              </label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. Gastambide St."
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs focus:outline-none focus:border-[#ea580c]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Student Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sisig meal with drink"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs focus:outline-none focus:border-[#ea580c]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
              type === 'expense'
                ? 'bg-[#09090b] hover:bg-[#18181b]'
                : 'bg-[#ea580c] hover:bg-[#c2410c]'
            }`}
          >
            Save {type === 'expense' ? 'Expense' : 'Income'}
          </button>
        </form>
      </div>
    </div>
  );
};
