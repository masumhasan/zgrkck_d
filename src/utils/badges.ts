import type { BadgeVariant } from '../components/ui/Badge';
import type { RecipeStatus, UserStatus } from '../types';

export const statusBadgeVariant = (status: UserStatus): BadgeVariant =>
  status.toLowerCase() as BadgeVariant;

export const recipeBadgeVariant = (status: RecipeStatus): BadgeVariant => {
  switch (status) {
    case 'Published':
      return 'published';
    case 'Needs Review':
      return 'needs-review';
    default:
      return 'draft';
  }
};

// Plan names are admin-defined, so map only the well-known tiers and fall back to neutral.
export const planBadgeVariant = (plan: string): BadgeVariant => {
  const key = plan.toLowerCase();
  if (key.startsWith('free')) return 'free';
  if (key.startsWith('plus')) return 'plus';
  if (key.startsWith('pro')) return 'pro';
  return 'neutral';
};
