import type { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    code: '#REC-4829',
    title: 'Mediterranean Quinoa Bowl',
    cuisine: 'Mediterranean',
    status: 'Published',
    lastUpdated: 'Oct 24, 2026',
    updatedBy: 'Sarah L.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAElu5_4AerbiZkcAX7-x2PoNQYW0GYVV2xRJIwKCxnIGlkyBH_DXMtZR4vy85rhUcfJcMECPWDKEzpJNC6pyJSt9gs6g4GjRmyPBbTBePTe2qU_TTqzr_jUjmnp8CvzYUtLSxaB3UtnRawIKUbexzBAI741DMZ9NfG6DgZ3AgmDnM1QiONbHqYSnGSipPU9dNssBPfXa-yItBtNRqaRrBfHoDCN7QccGY-QLg-mBxObpxg_MSo9rITgQ',
  },
  {
    id: 'rec-2',
    code: '#REC-4830',
    title: 'Spicy Miso Ramen',
    cuisine: 'Japanese',
    status: 'Needs Review',
    lastUpdated: 'Oct 26, 2026',
    updatedBy: 'Auto-Ingest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaiNNXza2BHvHFL9ZxLLjV48nOy1URHFkZu3eqF7EEUdy47Ml-xygf_tsoWYhsUhKoqXcvum6ywolNDbTP5Vbwhi1dxUtEN-Ttk2bmNlE-02hKbcV1GzwPgTNYXuqhvmFpfKfvVzCVfyrB2DMCOIG0JIhkM6vtuIbeWNMskQmkUDnyKG9sPvJOu4aR2ScsNbtvv3OjLNReZNGA8OE6pq5c0v-AzIS0F_bFE26-Fwe3bqNxF3SBwSlBrQ',
  },
  {
    id: 'rec-3',
    code: '#REC-4831',
    title: 'Herb Roasted Chicken',
    cuisine: 'British',
    status: 'Published',
    lastUpdated: 'Oct 28, 2026',
    updatedBy: 'David K.',
    imageUrl:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'rec-4',
    code: '#REC-4832',
    title: 'Classic Beef Wellington',
    cuisine: 'British',
    status: 'Draft',
    lastUpdated: 'Oct 29, 2026',
    updatedBy: 'Chef Gordon',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
  },
];
