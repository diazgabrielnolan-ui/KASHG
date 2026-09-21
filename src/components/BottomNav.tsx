import React from 'react';
import { Home, Receipt, PieChart, PiggyBank, BarChart2 } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <Receipt className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'budget',
      label: 'Budget',
      icon: <PieChart className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'savings',
      label: 'Savings',
      icon: <PiggyBank className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart2 className="w-5 h-5 stroke-[2]" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-[#09090b] text-white border-t border-[#27272a] shadow-2xl px-3 py-2 pb-5 flex items-center justify-between pointer-events-auto transition-all">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative group ${
                isActive ? 'text-[#f97316]' : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#f97316] rounded-full shadow-[0_0_8px_#f97316]" />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold mt-1 transition-colors ${
                  isActive ? 'text-[#f97316]' : 'text-[#a1a1aa]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
