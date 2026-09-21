import { Transaction, BudgetCategory, IponPot, StudentProfile, NotificationItem } from '../types';

export const initialStudentProfile: StudentProfile = {
  name: 'Popes',
  greeting: 'Good day, Popes! 👋',
  university: 'UE Manila (University of the East)',
  yearAndSem: 'Year 1 · Sem 1',
  course: 'BS Civil Engineering',
  studentId: '2026-01842-MN',
  monthlyBaonCap: 8000,
  cycleStartDay: 1,
  // High quality student avatar photo
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Lunch at Gastambide Canteen',
    category: 'food',
    categoryLabel: 'Food & Milk Tea',
    timestamp: '12:45 PM',
    dateStr: 'Today',
    amount: -120,
    paymentMethod: 'GCash',
    merchant: 'Gastambide Student Canteen',
    notes: 'Pork sisig meal with iced tea refill near UE Gate 2',
  },
  {
    id: 'tx-2',
    title: 'Jeepney Fare to UE Manila',
    category: 'transit',
    categoryLabel: 'Jeepney & LRT',
    timestamp: '07:15 AM',
    dateStr: 'Today',
    amount: -40,
    paymentMethod: 'Coins',
    merchant: 'Quiapo - Morayta Jeepney',
    notes: 'Traditional jeepney fare (Student discount applied)',
  },
  {
    id: 'tx-3',
    title: 'Engineering Notes & Blueprints',
    category: 'school',
    categoryLabel: 'School & Photocopier',
    timestamp: '03:30 PM',
    dateStr: 'Yesterday',
    amount: -250,
    paymentMethod: 'Cash',
    merchant: 'Recto Express Photox',
    notes: 'Drafting plates photocopy & bluebooks for midterms',
  },
  {
    id: 'tx-4',
    title: 'Monthly Baon from Parents',
    category: 'allowance',
    categoryLabel: 'Family Allowance',
    timestamp: '09:00 AM',
    dateStr: 'Nov 1',
    amount: 10000,
    paymentMethod: 'Bank Transfer',
    merchant: 'BDO Unibank to Maya/GCash',
    notes: 'Living allowance & semester project budget from Mama & Papa',
  },
  {
    id: 'tx-5',
    title: 'Siomai Rice & Gulaman',
    category: 'food',
    categoryLabel: 'Food & Snacks',
    timestamp: '04:15 PM',
    dateStr: 'Nov 16',
    amount: -65,
    paymentMethod: 'Coins',
    merchant: 'Morayta Corner Food Cart',
    notes: 'Merienda break after Physics laboratory',
  },
  {
    id: 'tx-6',
    title: 'LRT-2 Legarda to Cubao Return',
    category: 'transit',
    categoryLabel: 'Jeepney & LRT',
    timestamp: '06:00 PM',
    dateStr: 'Nov 15',
    amount: -55,
    paymentMethod: 'GCash',
    merchant: 'LRT-2 Beep / Ticket',
    notes: 'Commute home via LRT-2 Legarda Station',
  },
  {
    id: 'tx-7',
    title: 'Freelance Graphic Design Gig',
    category: 'freelance',
    categoryLabel: 'Sideline / Gig',
    timestamp: '08:20 PM',
    dateStr: 'Nov 14',
    amount: 1200,
    paymentMethod: 'GCash',
    merchant: 'Org Poster Design',
    notes: 'University org social media banner commission',
  },
  {
    id: 'tx-8',
    title: 'Group Study at Tim Hortons',
    category: 'leisure',
    categoryLabel: 'Coffee & Barkada',
    timestamp: '05:00 PM',
    dateStr: 'Nov 12',
    amount: -180,
    paymentMethod: 'Maya',
    merchant: 'Tim Hortons U-Belt',
    notes: 'Iced French Vanilla while reviewing Calculus',
  },
  {
    id: 'tx-9',
    title: 'Ipon Pot Auto-Transfer',
    category: 'others',
    categoryLabel: 'Savings Allocation',
    timestamp: '10:00 AM',
    dateStr: 'Nov 8',
    amount: -500,
    paymentMethod: 'GCash',
    merchant: 'KashG Ipon Pot',
    notes: 'Weekly savings deposit for Sembreak Barkada Trip',
  }
];

export const initialBudgetCategories: BudgetCategory[] = [
  {
    id: 'b-1',
    name: 'Food & Dining',
    allocated: 3500,
    spent: 2350,
    color: '#ea580c', // flame orange
    iconName: 'Utensils',
  },
  {
    id: 'b-2',
    name: 'Jeep & Transit',
    allocated: 1500,
    spent: 980,
    color: '#18181b', // jet obsidian
    iconName: 'Bus',
  },
  {
    id: 'b-3',
    name: 'Prints & Notes',
    allocated: 1200,
    spent: 850,
    color: '#c2410c', // terracotta
    iconName: 'BookOpen',
  },
  {
    id: 'b-4',
    name: 'Snacks & Leisure',
    allocated: 1000,
    spent: 720,
    color: '#64748b', // slate
    iconName: 'Coffee',
  },
  {
    id: 'b-5',
    name: 'Emergency / Others',
    allocated: 800,
    spent: 350,
    color: '#0284c7', // cyan
    iconName: 'ShieldAlert',
  },
];

export const initialIponPots: IponPot[] = [
  {
    id: 'pot-1',
    title: 'Sembreak Trip to Elyu',
    targetAmount: 4000,
    currentAmount: 1000,
    targetDate: 'Dec 18, 2026',
    category: 'Barkada Travel',
    emoji: '🏄‍♂️',
  },
  {
    id: 'pot-2',
    title: 'Casio Scientific Calculator',
    targetAmount: 1800,
    currentAmount: 500,
    targetDate: 'Dec 05, 2026',
    category: 'School Tools',
    emoji: '📐',
  },
  {
    id: 'pot-3',
    title: 'Midterms Emergency Baon Buffer',
    targetAmount: 2500,
    currentAmount: 750,
    targetDate: 'Ongoing',
    category: 'Safety Net',
    emoji: '🛡️',
  }
];

export const studentTips = [
  {
    id: 'tip-1',
    tag: 'UE STUDENT TIP',
    title: 'Bring a tumbler to campus',
    desc: 'Free cold water refills save ~₱40/day on bottled drinks in U-Belt.',
    source: 'Gastambide Water Station'
  },
  {
    id: 'tip-2',
    tag: 'TRANSIT HACK',
    title: 'Claim 20% Student Fare Discount',
    desc: 'Show your validated UE Student ID to Jeepney and LRT conductors for legal 20% discount.',
    source: 'LTFRB Student Fare Law'
  },
  {
    id: 'tip-3',
    tag: 'PHOTOCOPY TRICK',
    title: 'Share PDF scanning with blockmates',
    desc: 'Pool printing funds with your block to buy one master book and scan to PDF.',
    source: 'UE Engineering Org'
  },
  {
    id: 'tip-4',
    tag: 'CANTEEN TIP',
    title: 'Eat at Dalupan or Gastambide at 11:30 AM',
    desc: 'Fresh student budget meals (₱60-80) run out fast by 12:15 PM peak class break.',
    source: 'KashG Community'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Baon Received: ₱10,000.00',
    description: 'BDO Transfer from Family was credited to your November Allowance budget.',
    time: 'Nov 1, 9:00 AM',
    read: false,
    type: 'allowance',
  },
  {
    id: 'notif-2',
    title: 'Mid-month Checkpoint Cleared! 🎯',
    description: 'You have ₱2,750 remaining for the next 12 days. Safe spend: ₱241/day.',
    time: 'Yesterday, 8:00 PM',
    read: false,
    type: 'alert',
  },
  {
    id: 'notif-3',
    title: 'Ipon Pot Boost: +₱500',
    description: 'You are now 25% towards your Sembreak Elyu trip goal!',
    time: 'Nov 8, 10:00 AM',
    read: true,
    type: 'ipon',
  },
];
