import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import type { SubscriptionPlan } from '../types';

export const SubscriptionPage: React.FC = () => {
  const { plans, navigateTo } = useApp();
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const renderIcon = (type: SubscriptionPlan['iconType']) => {
    switch (type) {
      case 'leaf':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#EFECE6] flex items-center justify-center text-gray-600 shrink-0">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9m0 0a3.001 3.001 0 013-3h2.25M12 9a3.001 3.001 0 00-3-3H6.75" />
            </svg>
          </div>
        );
      case 'calendar':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#9CE6D1]/40 flex items-center justify-center text-teal-800 shrink-0">
            <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'award':
      default:
        return (
          <div className="w-9 h-9 rounded-lg bg-[#EAB368] flex items-center justify-center text-white shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <AppLayout
      title="Subscription"
      subtitle="Monitor Mealist.ai subscription activity."
    >
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Section Title & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-gray-900">
              Subscription
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor Mealist.ai subscription activity.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigateTo('add-plan')}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add a Plan
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Plan Breakdown Card (Left) */}
          <div className="lg:col-span-8 bg-white border border-[#E9E4D9] rounded-xl p-6 shadow-sm overflow-x-auto">
            <h3 className="font-editorial text-xl font-bold text-gray-900 mb-6">
              Plan Breakdown
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold" scope="col">PLAN</th>
                  <th className="pb-3 font-semibold" scope="col">USERS</th>
                  <th className="pb-3 font-semibold text-center" scope="col">STATUS</th>
                  <th className="pb-3 font-semibold text-right" scope="col">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {plans.map((plan) => (
                  <tr key={plan.id} className="group hover:bg-gray-50/60 transition-colors">
                    <td className="py-4.5 pr-4">
                      <div className="flex items-center gap-3">
                        {renderIcon(plan.iconType)}
                        <div>
                          <span className="font-semibold text-gray-900 block">
                            {plan.name}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            ${plan.price.toFixed(2)} / {plan.cycle.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4.5 text-gray-600 font-normal">
                      {plan.userCount.toLocaleString()}
                    </td>
                    <td className="py-4.5 text-center">
                      <Badge variant={plan.status === 'Active' ? 'active' : 'draft'}>
                        {plan.status}
                      </Badge>
                    </td>
                    <td className="py-4.5 text-right">
                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="font-medium text-[#205844] hover:underline text-xs"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Usage & Revenue Overview (Right) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E9E4D9] rounded-xl p-6 shadow-sm">
              <h3 className="font-editorial text-xl font-bold text-gray-900 mb-6">
                Usage Overview
              </h3>
              <div className="mb-5">
                <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-2">
                  AI OPERATIONS THIS MONTH
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-editorial text-3xl font-extrabold text-gray-900 tracking-tight">
                    1.2M
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    / 5M Limit
                  </span>
                </div>
                <div className="w-full bg-[#EAE6DD] h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#205844] h-2 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>
              <div className="pt-5 border-t border-gray-100 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Cook Mode Invocations</span>
                  <span className="font-semibold text-slate-900">420,180</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Meal Plan Generations</span>
                  <span className="font-semibold text-slate-900">680,240</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Nutrition Analysis Runs</span>
                  <span className="font-semibold text-slate-900">99,580</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white border border-[#E9E4D9] rounded-xl p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1">
                MONTHLY RUN RATE
              </span>
              <p className="font-editorial text-3xl font-bold text-[#205844]">
                $42,850
              </p>
              <p className="text-xs text-slate-500 mt-1">
                +14.2% from last calendar month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <Modal
          isOpen={!!editingPlan}
          onClose={() => setEditingPlan(null)}
          title={`Edit ${editingPlan.name}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">{editingPlan.description}</p>
            <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
              <p><span className="font-semibold">Price:</span> ${editingPlan.price.toFixed(2)} ({editingPlan.cycle})</p>
              <p><span className="font-semibold">AI Operations Limit:</span> {editingPlan.aiLimit.toLocaleString()} / mo</p>
              <p><span className="font-semibold">Recipe Save Limit:</span> {editingPlan.recipeLimit}</p>
              <p><span className="font-semibold">Features:</span> {editingPlan.features.join(', ')}</p>
            </div>
            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" onClick={() => setEditingPlan(null)}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};
