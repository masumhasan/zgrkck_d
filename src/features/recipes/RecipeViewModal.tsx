import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import { ErrorBlock, InlineError, LoadingBlock } from '../../components/shared/StatusViews';
import { recipesApi } from '../../api/recipes.api';
import { errorMessage, useAsync } from '../../hooks/useAsync';
import { timeAgo } from '../../utils/format';
import { recipeBadgeVariant } from '../../utils/badges';
import type { RecipeStatus } from '../../types';

interface RecipeViewModalProps {
  recipeId: string | null;
  onClose: () => void;
  onChanged: () => void;
}

export const RecipeViewModal: React.FC<RecipeViewModalProps> = ({ recipeId, onClose, onChanged }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detail = useAsync(
    () => (recipeId ? recipesApi.get(recipeId) : Promise.resolve(null)),
    [recipeId]
  );
  const recipe = recipeId ? detail.data : null;

  const changeStatus = async (status: RecipeStatus) => {
    if (!recipeId) return;
    setError(null);
    try {
      detail.setData(await recipesApi.setStatus(recipeId, status));
      onChanged();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <>
      <Modal isOpen={!!recipeId} onClose={onClose} title={recipe?.title ?? 'Recipe'} maxWidth="lg">
        {detail.error ? (
          <ErrorBlock message={detail.error} onRetry={detail.reload} />
        ) : !recipe || detail.loading ? (
          <LoadingBlock />
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-lg border border-[#E5E1D8]" />
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500 break-all">{recipe.code}</span>
              <Badge variant={recipeBadgeVariant(recipe.status)}>{recipe.status}</Badge>
            </div>
            {recipe.summary && <p className="text-xs text-slate-600 leading-relaxed">{recipe.summary}</p>}
            <div className="text-xs text-slate-600 space-y-1">
              <p><span className="font-semibold">Cuisine:</span> {recipe.cuisine}</p>
              <p><span className="font-semibold">Meal types:</span> {recipe.mealTypes.join(', ') || '—'}</p>
              <p>
                <span className="font-semibold">Time:</span> {recipe.totalMinutes} min
                {recipe.servings ? ` · serves ${recipe.servings}` : ''}
              </p>
              {recipe.allergens.length > 0 && (
                <p><span className="font-semibold">Contains:</span> {recipe.allergens.join(', ')}</p>
              )}
              <p><span className="font-semibold">Last Updated:</span> {timeAgo(recipe.updatedAt)} by {recipe.updatedBy}</p>
            </div>

            {recipe.ingredients.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Ingredients</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-0.5">
                  {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              </div>
            )}
            {recipe.steps.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Instructions</h4>
                <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-1">
                  {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                </ol>
              </div>
            )}

            <div className="pt-3 border-t border-[#ECE8DF] space-y-3">
              <Select
                label="Publication Status"
                value={recipe.status}
                onChange={(e) => void changeStatus(e.target.value as RecipeStatus)}
                options={[
                  { label: 'Published', value: 'Published' },
                  { label: 'Needs Review', value: 'Needs Review' },
                  { label: 'Draft', value: 'Draft' },
                ]}
              />
              <p className="text-[11px] text-slate-500">Only Published recipes appear in the mobile app.</p>
              <InlineError message={error} />
              <div className="flex justify-between">
                <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}>Delete Recipe</Button>
                <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          if (!recipeId) return;
          await recipesApi.remove(recipeId);
          onChanged();
          onClose();
        }}
        title="Delete Recipe"
        message={`Permanently delete "${recipe?.title ?? 'this recipe'}"? Meal plans that already include it keep their saved copy, but it can no longer be opened.`}
        confirmLabel="Delete Recipe"
        isDanger
      />
    </>
  );
};
