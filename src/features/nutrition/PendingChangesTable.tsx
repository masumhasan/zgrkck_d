import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { InlineError } from '../../components/shared/StatusViews';
import { nutritionApi, type PendingNutritionChange } from '../../api/nutrition.api';
import { errorMessage } from '../../hooks/useAsync';

interface Props {
  pending: PendingNutritionChange[];
  onApproved: () => void;
}

export const PendingChangesTable: React.FC<Props> = ({ pending, onApproved }) => {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const approve = async (recipeId: string) => {
    setBusyId(recipeId);
    setError(null);
    try {
      await nutritionApi.approve(recipeId);
      onApproved();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-stone-900">Changes waiting for approval</h4>
      <InlineError message={error} />
      {pending.length === 0 ? (
        <p className="text-xs text-stone-500">No changes waiting for approval.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-stone-500 border-b border-stone-100">
              <tr>
                <th className="py-2 pr-4 font-medium">Recipe</th>
                <th className="py-2 pr-4 font-medium">Calories</th>
                <th className="py-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {pending.map((p) => (
                <tr key={p.recipeId}>
                  <td className="py-2 pr-4 text-stone-800">{p.title}</td>
                  <td className="py-2 pr-4 text-stone-600">
                    was {p.kcalWas} kcal, now {p.kcalNow} kcal ({p.changePct > 0 ? '+' : ''}
                    {p.changePct.toFixed(1)}%)
                  </td>
                  <td className="py-2 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={busyId !== null}
                      onClick={() => void approve(p.recipeId)}
                    >
                      {busyId === p.recipeId ? 'Approving…' : 'Approve'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
