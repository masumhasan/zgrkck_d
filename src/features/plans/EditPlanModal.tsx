import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { InlineError } from '../../components/shared/StatusViews';
import { PlanFormFields } from './PlanFormFields';
import { emptyPlanForm } from './planForm';
import type { PlanFormState } from './planForm';
import { plansApi } from '../../api/plans.api';
import { errorMessage } from '../../hooks/useAsync';
import type { SubscriptionPlan } from '../../types';

interface Props {
  plan: SubscriptionPlan | null;
  onClose: () => void;
  onSaved: () => void;
}

const toForm = (plan: SubscriptionPlan): PlanFormState => ({
  name: plan.name,
  cycle: plan.cycle,
  description: plan.description,
  price: String(plan.price),
  aiLimit: String(plan.aiLimit),
  recipeLimit: plan.recipeLimit,
  status: plan.status,
  features: plan.features,
});

export const EditPlanModal: React.FC<Props> = ({ plan, onClose, onSaved }) => {
  const [form, setForm] = useState<PlanFormState>(() => (plan ? toForm(plan) : emptyPlanForm));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setBusy(true);
    setError(null);
    try {
      await plansApi.update(plan.id, {
        name: form.name.trim(),
        cycle: form.cycle,
        description: form.description.trim(),
        price: Number(form.price) || 0,
        aiLimit: Number(form.aiLimit) || 0,
        recipeLimit: form.recipeLimit.trim() || 'Unlimited',
        status: form.status,
        features: form.features,
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal isOpen={!!plan} onClose={onClose} title={plan ? `Edit ${plan.name}` : 'Edit Plan'} maxWidth="xl">
      <form onSubmit={submit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <PlanFormFields form={form} onChange={setForm} />
        <InlineError message={error} />
        <div className="flex justify-end gap-3 pt-3">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
