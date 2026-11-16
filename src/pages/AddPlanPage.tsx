import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { InlineError } from '../components/shared/StatusViews';
import { PlanFormFields } from '../features/plans/PlanFormFields';
import { emptyPlanForm } from '../features/plans/planForm';
import type { PlanFormState } from '../features/plans/planForm';
import { plansApi } from '../api/plans.api';
import { errorMessage } from '../hooks/useAsync';

export const AddPlanPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [form, setForm] = useState<PlanFormState>(emptyPlanForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await plansApi.create({
        name: form.name.trim(),
        cycle: form.cycle,
        price: Number(form.price) || 0,
        description: form.description.trim() || 'New custom subscription tier',
        status: form.status,
        iconType: form.cycle === 'Yearly' ? 'award' : 'calendar',
        aiLimit: Number(form.aiLimit) || 0,
        recipeLimit: form.recipeLimit.trim() || 'Unlimited',
        features: form.features,
      });
      navigateTo('subscription');
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <AppLayout title="Add Subscription Plan" subtitle="Define a new tier, limits, and pricing.">
      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <button
            onClick={() => navigateTo('subscription')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#244E41] hover:opacity-80 transition-opacity"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-editorial text-base font-semibold tracking-tight">Back to Subscription</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="font-editorial text-3xl font-medium text-stone-900 tracking-tight">
            Define a New Subscription Tier
          </h2>
          <p className="text-xs text-stone-500 mt-1.5 font-normal">
            Configure features, limits, and pricing for Mealist.ai.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-8 shadow-sm space-y-6">
          <PlanFormFields form={form} onChange={setForm} />
          <InlineError message={error} />
          <div className="flex justify-end items-center space-x-3 pt-4 border-t border-stone-100">
            <Button variant="secondary" size="md" type="button" onClick={() => navigateTo('subscription')}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={busy}>
              {busy ? 'Creating…' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};
