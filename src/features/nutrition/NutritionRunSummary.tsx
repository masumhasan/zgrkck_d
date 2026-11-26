import React from 'react';
import { formatDate, formatNumber } from '../../utils/format';
import type { NutritionRun } from '../../api/nutrition.api';

const when = (iso: string | null): string =>
  iso ? `${formatDate(iso)}, ${new Date(iso).toLocaleTimeString('en-US', { timeStyle: 'short' })}` : '—';

const STATE_STYLE: Record<NutritionRun['state'], string> = {
  running: 'bg-amber-50 text-amber-800',
  done: 'bg-emerald-50 text-emerald-800',
  failed: 'bg-red-50 text-red-700',
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="rounded-lg bg-stone-50 px-3 py-2">
    <p className="text-[10px] uppercase tracking-wide text-stone-500">{label}</p>
    <p className="text-sm font-semibold text-stone-900">{formatNumber(value)}</p>
  </div>
);

export const NutritionRunSummary: React.FC<{ run: NutritionRun }> = ({ run }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
      <span className={`px-2 py-0.5 rounded font-semibold ${STATE_STYLE[run.state]}`}>
        {run.state === 'running' ? 'Running' : run.state === 'done' ? 'Done' : 'Failed'}
      </span>
      <span>Started: {when(run.startedAt)}</span>
      <span>Finished: {when(run.finishedAt)}</span>
    </div>
    {run.message && <p className="text-xs text-stone-500">{run.message}</p>}
    {run.state === 'failed' && run.error && (
      <p className="text-xs text-red-700 bg-red-50 border border-red-100 rounded px-3 py-2">
        {run.error}
      </p>
    )}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <Stat label="USDA SR Legacy foods" value={run.usda.srLegacy} />
      <Stat label="USDA Foundation foods" value={run.usda.foundation} />
      <Stat label="Recipes" value={run.recipes.total} />
      <Stat label="Complete" value={run.recipes.complete} />
      <Stat label="Estimated" value={run.recipes.estimated} />
      <Stat label="No nutrition data" value={run.recipes.none} />
      <Stat label="Hidden for review" value={run.recipes.hidden} />
    </div>
  </div>
);
