import React from 'react';
import type { PlanBillingCycle, PlanStatus } from '../../types';
import { PLAN_FEATURES } from './planForm';
import type { PlanFormState } from './planForm';


const labelClass = 'block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5';
const fieldClass =
  'w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] bg-white';

interface Props {
  form: PlanFormState;
  onChange: (next: PlanFormState) => void;
}

// Shared field set for creating and editing a subscription plan.
export const PlanFormFields: React.FC<Props> = ({ form, onChange }) => {
  const set = <K extends keyof PlanFormState>(key: K, value: PlanFormState[K]) =>
    onChange({ ...form, [key]: value });

  const toggleFeature = (feature: string) =>
    set(
      'features',
      form.features.includes(feature)
        ? form.features.filter((f) => f !== feature)
        : [...form.features, feature]
    );

  // Keep features that were saved earlier but aren't in the preset list.
  const featureOptions = Array.from(new Set([...PLAN_FEATURES, ...form.features]));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>PLAN NAME</label>
          <input required className={fieldClass} placeholder="e.g., Plus Pro" value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>BILLING CYCLE</label>
          <select className={`${fieldClass} cursor-pointer`} value={form.cycle} onChange={(e) => set('cycle', e.target.value as PlanBillingCycle)}>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>DESCRIPTION</label>
        <input className={fieldClass} placeholder="Short summary of the plan benefits..." value={form.description} onChange={(e) => set('description', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>PRICE ($)</label>
          <input required type="number" min="0" step="0.01" className={fieldClass} placeholder="0.00" value={form.price} onChange={(e) => set('price', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>AI OPERATIONS / MONTH</label>
          <input type="number" min="0" step="1" className={fieldClass} value={form.aiLimit} onChange={(e) => set('aiLimit', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>RECIPE SAVE LIMIT</label>
          <input className={fieldClass} placeholder="e.g., 100 or Unlimited" value={form.recipeLimit} onChange={(e) => set('recipeLimit', e.target.value)} />
        </div>
      </div>

      <div>
        <label className={`${labelClass} mb-2`}>PREMIUM FEATURES</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featureOptions.map((feat) => (
            <label key={feat} className="flex items-center px-4 py-3 rounded border border-stone-200 hover:border-stone-300 cursor-pointer transition-colors bg-white select-none">
              <input type="checkbox" checked={form.features.includes(feat)} onChange={() => toggleFeature(feat)} className="h-4 w-4 rounded border-stone-300 text-[#244E41] focus:ring-[#244E41]" />
              <span className="ml-3 text-xs font-medium text-stone-800">{feat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={`${labelClass} mb-2`}>STATUS</label>
        <div className="flex items-center space-x-6">
          {(['Draft', 'Active', 'Hidden'] as PlanStatus[]).map((st) => (
            <label key={st} className="inline-flex items-center cursor-pointer">
              <input type="radio" name="plan-status" checked={form.status === st} onChange={() => set('status', st)} className="h-4 w-4 border-stone-300 text-[#244E41] focus:ring-[#244E41]" />
              <span className="ml-2 text-xs text-stone-800">{st}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
