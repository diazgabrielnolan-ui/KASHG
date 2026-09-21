import React from 'react';
import { X, Trash2, Calendar, CreditCard, MapPin, Tag, FileText } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onDelete,
}) => {
  if (!transaction) return null;

  const isPositive = transaction.amount > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
            Student Receipt
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748b]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Amount & Title */}
        <div className="text-center py-2 border-b border-[#f1f5f9]">
          <div
            className={`text-3xl font-extrabold tracking-tight ${
              isPositive ? 'text-[#16a34a]' : 'text-[#09090b]'
            }`}
          >
            {isPositive ? '+' : '-'}₱
            {Math.abs(transaction.amount).toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </div>
          <h3 className="font-bold text-base text-[#09090b] mt-1">
            {transaction.title}
          </h3>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b] text-xs font-semibold mt-1">
            {transaction.categoryLabel}
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-2.5 text-xs text-[#475569]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc]">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#94a3b8]" />
              Date & Time
            </span>
            <strong className="text-[#09090b]">
              {transaction.dateStr} • {transaction.timestamp}
            </strong>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc]">
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#94a3b8]" />
              Payment Channel
            </span>
            <strong className="text-[#09090b]">
              {transaction.paymentMethod}
            </strong>
          </div>

          {transaction.merchant && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc]">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#94a3b8]" />
                Merchant / Spot
              </span>
              <strong className="text-[#09090b]">
                {transaction.merchant}
              </strong>
            </div>
          )}

          {transaction.notes && (
            <div className="p-2.5 rounded-xl bg-[#f8fafc] space-y-1">
              <span className="flex items-center gap-2 text-[#64748b]">
                <FileText className="w-4 h-4 text-[#94a3b8]" />
                Notes
              </span>
              <p className="text-[#09090b] font-medium pl-6">
                {transaction.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => {
              if (confirm('Delete this transaction record?')) {
                onDelete(transaction.id);
                onClose();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-red-50 text-[#dc2626] font-bold text-xs hover:bg-red-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Entry
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#09090b] text-white font-bold text-xs hover:bg-[#18181b] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
