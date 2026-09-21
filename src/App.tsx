/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  Transaction, 
  BudgetCategory, 
  IponPot, 
  StudentProfile, 
  NotificationItem 
} from './types';
import { 
  initialStudentProfile, 
  initialTransactions, 
  initialBudgetCategories, 
  initialIponPots, 
  studentTips, 
  initialNotifications 
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { TransactionsScreen } from './components/screens/TransactionsScreen';
import { BudgetScreen } from './components/screens/BudgetScreen';
import { SavingsScreen } from './components/screens/SavingsScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { SafeSpendModal } from './components/modals/SafeSpendModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { TransactionDetailModal } from './components/modals/TransactionDetailModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Persistence State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('kashg_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('kashg_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(() => {
    const saved = localStorage.getItem('kashg_budget_categories');
    return saved ? JSON.parse(saved) : initialBudgetCategories;
  });

  const [iponPots, setIponPots] = useState<IponPot[]>(() => {
    const saved = localStorage.getItem('kashg_ipon_pots');
    return saved ? JSON.parse(saved) : initialIponPots;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('kashg_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Base funds: 7,250
  const [availableFunds, setAvailableFunds] = useState<number>(() => {
    const saved = localStorage.getItem('kashg_available_funds');
    return saved ? parseFloat(saved) : 7250;
  });

  // UI States
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addModalType, setAddModalType] = useState<'expense' | 'income'>('expense');
  const [isSafeSpendModalOpen, setIsSafeSpendModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kashg_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('kashg_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('kashg_budget_categories', JSON.stringify(budgetCategories));
  }, [budgetCategories]);

  useEffect(() => {
    localStorage.setItem('kashg_ipon_pots', JSON.stringify(iponPots));
  }, [iponPots]);

  useEffect(() => {
    localStorage.setItem('kashg_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('kashg_available_funds', availableFunds.toString());
  }, [availableFunds]);

  // Handlers
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };

    setTransactions((prev) => [created, ...prev]);
    setAvailableFunds((prev) => prev + created.amount);

    // Update category spent if it's an expense
    if (created.amount < 0) {
      setBudgetCategories((prev) =>
        prev.map((cat) => {
          if (
            (created.category === 'food' && cat.name.includes('Food')) ||
            (created.category === 'transit' && cat.name.includes('Jeep')) ||
            (created.category === 'school' && cat.name.includes('Prints')) ||
            (created.category === 'leisure' && cat.name.includes('Leisure'))
          ) {
            return { ...cat, spent: cat.spent + Math.abs(created.amount) };
          }
          return cat;
        })
      );
    }
  };

  const handleDeleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    if (target) {
      setAvailableFunds((prev) => prev - target.amount);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleDepositToPot = (potId: string, amount: number) => {
    setAvailableFunds((prev) => prev - amount);
    setIponPots((prev) =>
      prev.map((p) => (p.id === potId ? { ...p, currentAmount: p.currentAmount + amount } : p))
    );

    // Add transaction record
    const pot = iponPots.find((p) => p.id === potId);
    handleAddTransaction({
      title: `Deposit to ${pot?.title || 'Ipon Pot'}`,
      category: 'others',
      categoryLabel: 'Savings Allocation',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: 'Today',
      amount: -amount,
      paymentMethod: 'GCash',
      notes: 'Transfer to personal college piggy bank',
    });
  };

  const handleWithdrawFromPot = (potId: string, amount: number) => {
    setAvailableFunds((prev) => prev + amount);
    setIponPots((prev) =>
      prev.map((p) => (p.id === potId ? { ...p, currentAmount: Math.max(0, p.currentAmount - amount) } : p))
    );

    // Add transaction record
    const pot = iponPots.find((p) => p.id === potId);
    handleAddTransaction({
      title: `Withdrawal from ${pot?.title || 'Ipon Pot'}`,
      category: 'allowance',
      categoryLabel: 'Savings Withdrawal',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: 'Today',
      amount: amount,
      paymentMethod: 'Cash',
      notes: 'Funds released to available allowance',
    });
  };

  const handleAddIponPot = (newPot: Omit<IponPot, 'id' | 'currentAmount'>) => {
    const created: IponPot = {
      ...newPot,
      id: `pot-${Date.now()}`,
      currentAmount: 0,
    };
    setIponPots((prev) => [created, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#eceef0] text-[#191c1e] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4">
      {/* Top Device Switcher Toolbar (Desktop only) */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between pb-3 px-2 text-xs font-semibold text-[#64748b]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
          <span className="font-bold text-[#09090b]">KashG Mobile Preview</span>
        </div>
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#d8dadc] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer text-[#09090b]"
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container / Mobile Device Wrapper */}
      <div
        className={`w-full ${
          isPhoneFrame
            ? 'max-w-[428px] sm:rounded-[36px] sm:border-[8px] sm:border-[#09090b] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]'
            : 'max-w-2xl sm:rounded-3xl sm:border border-[#d8dadc] shadow-xl'
        } bg-[#f7f9fb] min-h-screen sm:min-h-[880px] flex flex-col relative overflow-hidden transition-all duration-300`}
      >
        {/* Phone Speaker Notch & Status Bar */}
        <div className="w-full pt-2 px-5 flex items-center justify-between text-[#09090b] select-none text-xs font-bold shrink-0">
          <span>9:41</span>
          <div className="w-20 h-4 bg-black/5 rounded-full hidden sm:block mx-auto" />
          <div className="flex items-center gap-1.5 text-[#09090b]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Global App Header */}
        <Header
          profile={profile}
          unreadCount={unreadCount}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          activeTab={activeTab}
        />

        {/* Main Content View with Active Tab */}
        <main className="flex-1 px-4 pt-1 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeScreen
              profile={profile}
              availableFunds={availableFunds}
              isBalanceHidden={isBalanceHidden}
              onToggleBalance={() => setIsBalanceHidden(!isBalanceHidden)}
              onOpenExpense={() => {
                setAddModalType('expense');
                setIsAddModalOpen(true);
              }}
              onOpenIncome={() => {
                setAddModalType('income');
                setIsAddModalOpen(true);
              }}
              onOpenSafeSpend={() => setIsSafeSpendModalOpen(true)}
              onSelectTransaction={(tx) => setSelectedTransaction(tx)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              transactions={transactions}
              currentTipIndex={currentTipIndex}
              onNextTip={() => setCurrentTipIndex((prev) => (prev + 1) % studentTips.length)}
              tips={studentTips}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsScreen
              transactions={transactions}
              onOpenAdd={() => {
                setAddModalType('expense');
                setIsAddModalOpen(true);
              }}
              onSelectTransaction={(tx) => setSelectedTransaction(tx)}
              isBalanceHidden={isBalanceHidden}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetScreen
              categories={budgetCategories}
              onOpenSafeSpend={() => setIsSafeSpendModalOpen(true)}
              monthlyCap={profile.monthlyBaonCap}
              onUpdateCap={(newCap) => setProfile((prev) => ({ ...prev, monthlyBaonCap: newCap }))}
              isBalanceHidden={isBalanceHidden}
            />
          )}

          {activeTab === 'savings' && (
            <SavingsScreen
              pots={iponPots}
              availableFunds={availableFunds}
              onDeposit={handleDepositToPot}
              onWithdraw={handleWithdrawFromPot}
              onAddPot={handleAddIponPot}
              isBalanceHidden={isBalanceHidden}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsScreen
              transactions={transactions}
              isBalanceHidden={isBalanceHidden}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

        {/* Modals & Drawers */}
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTransaction={handleAddTransaction}
          initialType={addModalType}
        />

        <SafeSpendModal
          isOpen={isSafeSpendModalOpen}
          onClose={() => setIsSafeSpendModalOpen(false)}
          onOpenExpense={() => {
            setAddModalType('expense');
            setIsAddModalOpen(true);
          }}
          safeDailySpend={241}
          remainingAllowance={2750}
          daysRemaining={12}
        />

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profile={profile}
          onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
        />

        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onDelete={handleDeleteTransaction}
        />

        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />
      </div>
    </div>
  );
}
