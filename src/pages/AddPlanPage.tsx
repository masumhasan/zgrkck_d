import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import type { PlanBillingCycle, PlanStatus } from '../types';

export const AddPlanPage: React.FC = () => {
  const { addPlan, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [cycle, setCycle] = useState<PlanBillingCycle>('Monthly');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [aiLimit, setAiLimit] = useState('5000');
  const [recipeLimit, setRecipeLimit] = useState('Unlimited');
  const [status, setStatus] = useState<PlanStatus>('Draft');

  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    'Cook Mode': true,
    'Ad-free Experience': true,
    'Nutrition AI Insights': false,
    'Priority Support': false,
  });

  const toggleFeature = (feat: string) => {
    setFeatures((prev) => ({ ...prev, [feat]: !prev[feat] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const activeFeatures = Object.keys(features).filter((k) => features[k]);
    const numPrice = parseFloat(price) || 0;
    const numAiLimit = parseInt(aiLimit, 10) || 5000;

    addPlan({
      name,
      cycle,
      price: numPrice,
      description: description || 'New custom subscription tier',
      status,
      iconType: cycle === 'Yearly' ? 'award' : 'calendar',
      aiLimit: numAiLimit,
      recipeLimit: recipeLimit || 'Unlimited',
      features: activeFeatures,
    });
  };

  return (
    <AppLayout
      title="Add Subscription Plan"
      subtitle="Define a new tier, limits, and pricing."
    >
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
            <span className="font-editorial text-base font-semibold tracking-tight">
              Back to Subscription
            </span>
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

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-8 shadow-sm">
          {/* SECTION 1: Basic Information */}
          <section className="mb-8">
            <h3 className="font-editorial text-lg font-medium text-stone-900 pb-2 border-b border-stone-100">
              1. Basic Information
            </h3>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  PLAN NAME
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                  placeholder="e.g., Plus Pro"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  BILLING CYCLE
                </label>
                <select
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value as PlanBillingCycle)}
                  className="w-full text-xs text-stone-800 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] bg-white cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                DESCRIPTION
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                placeholder="Short summary of the plan benefits..."
                type="text"
              />
            </div>

            <div className="mt-5">
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                PRICE
              </label>
              <div className="relative w-full md:w-1/2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 text-xs">
                  $
                </span>
                <input
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded pl-7 pr-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: Features & Limits */}
          <section className="mb-8">
            <h3 className="font-editorial text-lg font-medium text-stone-900 pb-2 border-b border-stone-100">
              2. Features &amp; Limits
            </h3>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  AI OPERATIONS LIMIT (PER MONTH)
                </label>
                <input
                  value={aiLimit}
                  onChange={(e) => setAiLimit(e.target.value)}
                  className="w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                  placeholder="e.g., 5000"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  RECIPE SAVE LIMIT
                </label>
                <input
                  value={recipeLimit}
                  onChange={(e) => setRecipeLimit(e.target.value)}
                  className="w-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                  placeholder="e.g., 100 or Unlimited"
                  type="text"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                PREMIUM FEATURES
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(features).map((feat) => (
                  <label
                    key={feat}
                    className="flex items-center px-4 py-3 rounded border border-stone-200 hover:border-stone-300 cursor-pointer transition-colors bg-white select-none"
                  >
                    <input
                      type="checkbox"
                      checked={features[feat]}
                      onChange={() => toggleFeature(feat)}
                      className="h-4 w-4 rounded border-stone-300 text-[#244E41] focus:ring-[#244E41]"
                    />
                    <span className="ml-3 text-xs font-medium text-stone-800">
                      {feat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: Status */}
          <section className="mb-10">
            <h3 className="font-editorial text-lg font-medium text-stone-900 pb-2 border-b border-stone-100">
              3. Status
            </h3>
            <div className="mt-4">
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                INITIAL STATUS
              </label>
              <div className="flex items-center space-x-6">
                {(['Draft', 'Active', 'Hidden'] as PlanStatus[]).map((st) => (
                  <label key={st} className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={st}
                      checked={status === st}
                      onChange={() => setStatus(st)}
                      className="h-4 w-4 border-stone-300 text-[#244E41] focus:ring-[#244E41]"
                    />
                    <span className="ml-2 text-xs text-stone-800">{st}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex justify-end items-center space-x-3 pt-4 border-t border-stone-100">
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={() => navigateTo('subscription')}
            >
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Create Plan
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};
