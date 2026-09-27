import type { User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@email.com',
    initials: 'AJ',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCidWJ_n_CuhKlsJeu-ceeKQCeB3oRM0SdyyTvF81ZEHVVu41uqCN72rJWY3JH0GtjQsdhP75T-UKox7tPkAc8yZDTG80Ye7OwyxXEsRhKDVYnOZ6--hvg09MTIf4JKT6ABFKwMbllmA-1QZJJ6C0Fqqiwei2u0_dKgc3e48rK-3YaPbMAafk4RAL2AQ3uvXHUpPmvhOnK3snnyqgKuZg0X9Nat_Ausq-jAcqt07gvIGmwIYXRvtTuHKQ',
    plan: 'Plus',
    status: 'Active',
    joinedDate: 'Aug 21, 2026',
    lastActive: 'Today',
    productActivity: {
      plansGenerated: 12,
      mealsCooked: 28,
      recipesSaved: 16,
      recipesImported: 4,
    },
    usage: {
      aiGenerations: {
        used: 12,
        limit: 50,
        resetDate: 'Sep 21, 2026',
      },
      savedRecipes: {
        used: 16,
        limit: 'Unlimited',
      },
      importedRecipes: {
        used: 4,
        limit: 100,
      },
      customIngredients: {
        used: 2,
        limit: 20,
      },
    },
  },
  {
    id: 'user-2',
    name: 'Sarah Ahmed',
    email: 'sarah@email.com',
    initials: 'SA',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaWGteCMfR11uIdZDvFwoORZpKjonUbDK3PQR9jCzPGo-Pgslv7q4ELDDjJw0pCrCWPDD7TRMJFo3rl1cf3ubXWw94NXBc5FraUPk_WooImCWb3jm2AvX9fMtEJZf7A9_mzk7yTejFhDBq_ZFRvrdlrt-Yn16gy9CBejfv4jBp_4ODlhEIcp4B3ySaWpPrAjOFO6ViLaJWxI78Q7vgsUh8DA9KQRw3wLk_Lw8YQAwKD_8JudgrIt-BNQ',
    plan: 'Free',
    status: 'Active',
    joinedDate: 'Aug 20, 2026',
    lastActive: 'Yesterday',
    productActivity: {
      plansGenerated: 4,
      mealsCooked: 9,
      recipesSaved: 5,
      recipesImported: 1,
    },
    usage: {
      aiGenerations: {
        used: 4,
        limit: 10,
        resetDate: 'Sep 20, 2026',
      },
      savedRecipes: {
        used: 5,
        limit: '25',
      },
      importedRecipes: {
        used: 1,
        limit: 10,
      },
      customIngredients: {
        used: 0,
        limit: 5,
      },
    },
  },
  {
    id: 'user-3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    initials: 'JD',
    plan: 'Pro',
    status: 'Active',
    joinedDate: 'Jul 15, 2026',
    lastActive: '2 days ago',
    productActivity: {
      plansGenerated: 45,
      mealsCooked: 92,
      recipesSaved: 64,
      recipesImported: 18,
    },
    usage: {
      aiGenerations: {
        used: 45,
        limit: 200,
        resetDate: 'Oct 01, 2026',
      },
      savedRecipes: {
        used: 64,
        limit: 'Unlimited',
      },
      importedRecipes: {
        used: 18,
        limit: 500,
      },
      customIngredients: {
        used: 12,
        limit: 100,
      },
    },
  },
  {
    id: 'user-4',
    name: 'Jane Smith',
    email: 'jane.s@example.com',
    initials: 'JS',
    plan: 'Plus',
    status: 'Pending',
    joinedDate: 'Sep 12, 2026',
    lastActive: '3 hours ago',
    productActivity: {
      plansGenerated: 2,
      mealsCooked: 4,
      recipesSaved: 3,
      recipesImported: 0,
    },
    usage: {
      aiGenerations: {
        used: 2,
        limit: 50,
        resetDate: 'Oct 12, 2026',
      },
      savedRecipes: {
        used: 3,
        limit: 'Unlimited',
      },
      importedRecipes: {
        used: 0,
        limit: 100,
      },
      customIngredients: {
        used: 1,
        limit: 20,
      },
    },
  },
  {
    id: 'user-5',
    name: 'Robert Brown',
    email: 'r.brown@example.com',
    initials: 'RB',
    plan: 'Free',
    status: 'Active',
    joinedDate: 'Jun 05, 2026',
    lastActive: '5 days ago',
    productActivity: {
      plansGenerated: 6,
      mealsCooked: 14,
      recipesSaved: 8,
      recipesImported: 2,
    },
    usage: {
      aiGenerations: {
        used: 6,
        limit: 10,
        resetDate: 'Oct 05, 2026',
      },
      savedRecipes: {
        used: 8,
        limit: '25',
      },
      importedRecipes: {
        used: 2,
        limit: 10,
      },
      customIngredients: {
        used: 0,
        limit: 5,
      },
    },
  },
];
