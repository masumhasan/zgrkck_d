import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import { ErrorBlock, LoadingBlock } from '../../components/shared/StatusViews';
import { nutritionApi } from '../../api/nutrition.api';
import { useAsync } from '../../hooks/useAsync';
import { NutritionRunSummary } from './NutritionRunSummary';
import { PendingChangesTable } from './PendingChangesTable';

const POLL_MS = 3000;

export const NutritionRefreshCard: React.FC = () => {
  const { data, error, reload } = useAsync(nutritionApi.status, []);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const running = data?.run?.state === 'running';

  // Poll only while a run is in progress.
  useEffect(() => {
    if (!running) return;
    const t = setInterval(reload, POLL_MS);
    return () => clearInterval(t);
  }, [running, reload]);

  // A rejection (e.g. 409 already running) is shown by ConfirmDialog.
  const start = async () => {
    await nutritionApi.refresh();
    reload();
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs">
      <div className="mb-4 pb-3 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-editorial font-semibold text-stone-900">Nutrition data</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Refresh USDA data and recalculate nutrition for every recipe.
          </p>
        </div>
        <Button variant="primary" size="sm" disabled={running} onClick={() => setConfirmOpen(true)}>
          {running ? 'Refreshing…' : 'Refresh USDA data & recalculate all recipes'}
        </Button>
      </div>

      {!data && error && <ErrorBlock message={error} onRetry={reload} />}
      {!data && !error && <LoadingBlock />}
      {data && (
        <div className="space-y-6">
          {data.run ? (
            <NutritionRunSummary run={data.run} />
          ) : (
            <p className="text-xs text-stone-500">No refresh has been run yet.</p>
          )}
          <PendingChangesTable pending={data.pending} onApproved={reload} />
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={start}
        title="Refresh USDA data"
        message="This downloads the latest USDA data and recalculates nutrition for every recipe. Calories changes above 10% are held for your approval."
        confirmLabel="Start refresh"
      />
    </section>
  );
};
