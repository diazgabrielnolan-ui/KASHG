export type TabType = 'home' | 'transactions' | 'budget' | 'savings' | 'reports';

export type PaymentMethod = 'GCash' | 'Maya' | 'Cash' | 'Coins' | 'Bank Transfer';

export type CategoryType = 
  | 'food' 
  | 'transit' 
  | 'school' 
  | 'allowance' 
  | 'freelance' 
  | 'leisure' 
  | 'others';

export interface Transaction {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  timestamp: string;
  dateStr: string; // e.g. "Today", "Yesterday", "Nov 1"
  amount: number; // positive for income, negative for expense
  paymentMethod: PaymentMethod;
  notes?: string;
  merchant?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  iconName: string;
}

export interface IponPot {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  emoji: string;
}

export interface StudentProfile {
  name: string;
  greeting: string;
  university: string;
  yearAndSem: string;
  course: string;
  studentId: string;
  monthlyBaonCap: number;
  cycleStartDay: number;
  avatarUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'allowance' | 'tip' | 'alert' | 'ipon';
}
