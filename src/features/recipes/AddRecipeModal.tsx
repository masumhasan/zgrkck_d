import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { InlineError } from '../../components/shared/StatusViews';
import { recipesApi } from '../../api/recipes.api';
import { errorMessage } from '../../hooks/useAsync';
import type { RecipeStatus } from '../../types';

interface AddRecipeModalProps {
  isOpen: boolean;
  cuisines: string[];
  onClose: () => void;
  onCreated: () => void;
}

const lines = (text: string): string[] =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const areaClass =
  'w-full bg-white border border-[#E5E1D8] text-xs text-slate-800 placeholder-slate-400 rounded-md py-2 px-3.5 focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]';

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, cuisines, onClose, onCreated }) => {
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [status, setStatus] = useState<RecipeStatus>('Published');
  const [mealType, setMealType] = useState('dinner');
  const [imageUrl, setImageUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [prep, setPrep] = useState('');
  const [cook, setCook] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCuisine = cuisine || cuisines[0] || '';

  const reset = () => {
    setTitle('');
    setCuisine('');
    setStatus('Published');
    setMealType('dinner');
    setImageUrl('');
    setSummary('');
    setPrep('');
    setCook('');
    setIngredients('');
    setSteps('');
    setError(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await recipesApi.create({
        title: title.trim(),
        cuisine: selectedCuisine,
        status,
        mealType,
        imageUrl: imageUrl.trim() || undefined,
        summary: summary.trim() || undefined,
        prepMinutes: Number(prep) || 0,
        cookMinutes: Number(cook) || 0,
        ingredients: lines(ingredients),
        steps: lines(steps),
      });
      reset();
      onCreated();
      onClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Add New Recipe" maxWidth="lg">
      <form onSubmit={submit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <Input label="Recipe Title" placeholder="e.g., Creamy Tuscan Pasta" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Cuisine"
            value={selectedCuisine}
            onChange={(e) => setCuisine(e.target.value)}
            options={cuisines.map((c) => ({ label: c, value: c }))}
          />
          <Select
            label="Meal Type"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            options={['breakfast', 'lunch', 'dinner', 'snack'].map((m) => ({ label: m[0].toUpperCase() + m.slice(1), value: m }))}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as RecipeStatus)}
            options={[
              { label: 'Published', value: 'Published' },
              { label: 'Needs Review', value: 'Needs Review' },
              { label: 'Draft', value: 'Draft' },
            ]}
          />
          <Input label="Image URL (optional)" placeholder="https://..." type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <Input label="Prep Minutes" type="number" min={0} value={prep} onChange={(e) => setPrep(e.target.value)} />
          <Input label="Cook Minutes" type="number" min={0} value={cook} onChange={(e) => setCook(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-1.5">Summary (optional)</label>
          <textarea className={areaClass} rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-1.5">Ingredients (one per line)</label>
          <textarea className={areaClass} rows={4} placeholder={'200g spaghetti\n2 cloves garlic'} value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-1.5">Instructions (one step per line)</label>
          <textarea className={areaClass} rows={4} value={steps} onChange={(e) => setSteps(e.target.value)} />
        </div>
        <InlineError message={error} />
        <div className="flex justify-end gap-3 pt-3">
          <Button variant="secondary" size="sm" type="button" onClick={close}>Cancel</Button>
          <Button variant="primary" size="sm" type="submit" disabled={busy || !selectedCuisine}>
            {busy ? 'Creating…' : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
