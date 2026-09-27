import type {
  SubscriptionPlan,
  RecentActivityItem,
  AdminSettings,
} from '../types';

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-1',
    name: 'Free',
    cycle: 'Monthly',
    price: 0,
    description: 'Basic meal planning with standard catalog access',
    userCount: 11594,
    status: 'Active',
    iconType: 'leaf',
    aiLimit: 100,
    recipeLimit: '25',
    features: ['Basic Recipe Catalog', 'Weekly Plan Preview'],
  },
  {
    id: 'plan-2',
    name: 'Plus Monthly',
    cycle: 'Monthly',
    price: 9.99,
    description: 'Comprehensive personalized AI meal generator',
    userCount: 624,
    status: 'Active',
    iconType: 'calendar',
    aiLimit: 5000,
    recipeLimit: 'Unlimited',
    features: ['Cook Mode', 'Ad-free Experience', 'Nutrition AI Insights'],
  },
  {
    id: 'plan-3',
    name: 'Plus Yearly',
    cycle: 'Yearly',
    price: 99.0,
    description: 'Yearly commitment with 2 months free and priority features',
    userCount: 624,
    status: 'Active',
    iconType: 'award',
    aiLimit: 60000,
    recipeLimit: 'Unlimited',
    features: [
      'Cook Mode',
      'Ad-free Experience',
      'Nutrition AI Insights',
      'Priority Support',
    ],
  },
];

export const INITIAL_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'Recipe "Chicken Tikka Bowl" published',
    timeAgo: '10 mins ago',
  },
  {
    id: 'act-2',
    title: 'New subscriber joined Plus Yearly (Alex J.)',
    timeAgo: '28 mins ago',
  },
  {
    id: 'act-3',
    title: 'AI model updated: Recipe Parser v2.4 deployed',
    timeAgo: '2 hours ago',
  },
  {
    id: 'act-4',
    title: 'Database backup completed successfully',
    timeAgo: '4 hours ago',
  },
];

export const INITIAL_SETTINGS: AdminSettings = {
  name: 'Jane Doe',
  email: 'jane.doe@mealist.ai',
  role: 'Super Admin',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJUHIgIsbEcY0QW4ZA4WdbWodfF9djbwG678FiN-6IkwurtaTGj3cCzy4mPmAB8cHl9dAuk03KIC5uiOoFSYo3i17ykl-0J5rCYntf9Ts-OwUBemfA-r-VTY_S_NID6QeJG2UoavDQaGYyYa50126Wtnj5ITLOFnesI8636HF4k1TJS6aPti4jK-vzSDzAAMLFca6QBEKZfBWHTgqxXLvzvXuBfU1boqaWH7Eaka_tcxcBImEZzczKsw',
  notifications: {
    safetyAlerts: true,
    recipeReviewAlerts: true,
    systemAlerts: false,
  },
};
