import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import type { Recipe, RecipeStatus } from '../types';

export const RecipesPage: React.FC = () => {
  const { recipes, addRecipe } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  // New recipe form state
  const [newTitle, setNewTitle] = useState('');
  const [newCuisine, setNewCuisine] = useState('Mediterranean');
  const [newStatus, setNewStatus] = useState<RecipeStatus>('Published');
  const [newImageUrl, setNewImageUrl] = useState('');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || r.status === statusFilter;
      const matchesCuisine =
        cuisineFilter === 'All' || r.cuisine === cuisineFilter;
      return matchesSearch && matchesStatus && matchesCuisine;
    });
  }, [recipes, searchTerm, statusFilter, cuisineFilter]);

  const handleAddRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addRecipe({
      code: `#REC-${Math.floor(4800 + Math.random() * 500)}`,
      title: newTitle,
      cuisine: newCuisine,
      status: newStatus,
      lastUpdated: 'Just now',
      updatedBy: 'Admin',
      imageUrl:
        newImageUrl ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    });

    setNewTitle('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  const getBadgeVariant = (status: RecipeStatus) => {
    switch (status) {
      case 'Published':
        return 'published';
      case 'Needs Review':
        return 'needs-review';
      case 'Draft':
        return 'draft';
      default:
        return 'neutral';
    }
  };

  return (
    <AppLayout
      title="Recipes"
      subtitle="Manage the Mealist.ai recipe catalogue."
    >
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
        {/* Title & Primary Action Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-editorial font-bold text-[#1F2924] leading-tight">
              Recipes
            </h2>
            <p className="text-[14px] text-[#69736F] mt-1">
              Manage the Mealist.ai recipe catalogue.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddModalOpen(true)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Recipe
          </Button>
        </section>

        {/* Filter and Search Container Card */}
        <section className="bg-white border border-[#E5E1D8] rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9793]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-[13px] text-[#2C3330] placeholder-[#8E9793] border border-[#DED9CD] rounded focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                placeholder="Search recipes or ingredients..."
                type="text"
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { label: 'Status: All', value: 'All' },
                  { label: 'Published', value: 'Published' },
                  { label: 'Needs Review', value: 'Needs Review' },
                  { label: 'Draft', value: 'Draft' },
                ]}
                className="w-44"
              />
              <Select
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                options={[
                  { label: 'Cuisine: All Cuisines', value: 'All' },
                  { label: 'Mediterranean', value: 'Mediterranean' },
                  { label: 'Japanese', value: 'Japanese' },
                  { label: 'British', value: 'British' },
                ]}
                className="w-52"
              />
            </div>
          </div>
        </section>

        {/* Recipes Table Card */}
        <section className="bg-white border border-[#E5E1D8] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E4DB] text-[11px] font-semibold tracking-wider text-[#697570] uppercase">
                <th className="py-3 px-6" scope="col">Recipe</th>
                <th className="py-3 px-6" scope="col">Cuisine</th>
                <th className="py-3 px-6" scope="col">Status</th>
                <th className="py-3 px-6" scope="col">Last Updated</th>
                <th className="py-3 px-6 text-right" scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8DF] text-[13px]">
              {filteredRecipes.map((r) => (
                <tr key={r.id} className="hover:bg-[#FBFAF8] transition-colors">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      alt={r.title}
                      className="w-12 h-12 rounded object-cover border border-[#E5E1D8] shrink-0"
                      src={r.imageUrl}
                    />
                    <div>
                      <h3 className="font-editorial font-bold text-[17px] text-[#1C2421] leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-[11px] font-medium text-[#7D8682] tracking-wide mt-0.5">
                        ID: {r.code}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#353F3B]">{r.cuisine}</td>
                  <td className="py-4 px-6">
                    <Badge variant={getBadgeVariant(r.status)}>
                      {r.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-[#5B6460]">
                    <span>{r.lastUpdated}</span>{' '}
                    <span className="text-[#8E9793]">by {r.updatedBy}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setViewingRecipe(r)}
                      className="px-3.5 py-1.5 border border-[#CFC9BC] rounded text-[12px] font-medium text-[#2D3632] hover:bg-[#F5F3EE] transition-colors"
                      type="button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-[#ECE8DF] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>Showing 1 to {filteredRecipes.length} of 24 results</span>
            <div className="flex items-center space-x-1">
              <button className="px-2.5 py-1 border border-[#D5D1C8] rounded text-slate-600 hover:bg-[#FAF9F6] disabled:opacity-40" disabled>
                Previous
              </button>
              <button className="px-2.5 py-1 bg-[#244E41] text-white rounded font-medium">1</button>
              <button className="px-2.5 py-1 border border-[#D5D1C8] rounded text-slate-600 hover:bg-[#FAF9F6]">2</button>
              <button className="px-2.5 py-1 border border-[#D5D1C8] rounded text-slate-600 hover:bg-[#FAF9F6]">3</button>
              <button className="px-2.5 py-1 border border-[#D5D1C8] rounded text-slate-600 hover:bg-[#FAF9F6]">Next</button>
            </div>
          </div>
        </section>
      </div>

      {/* Add Recipe Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Recipe">
        <form onSubmit={handleAddRecipeSubmit} className="space-y-4">
          <Input label="Recipe Title" placeholder="e.g., Creamy Tuscan Pasta" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
          <Select label="Cuisine" value={newCuisine} onChange={(e) => setNewCuisine(e.target.value)} options={[{ label: 'Mediterranean', value: 'Mediterranean' }, { label: 'Japanese', value: 'Japanese' }, { label: 'British', value: 'British' }, { label: 'Italian', value: 'Italian' }]} />
          <Select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value as RecipeStatus)} options={[{ label: 'Published', value: 'Published' }, { label: 'Needs Review', value: 'Needs Review' }, { label: 'Draft', value: 'Draft' }]} />
          <Input label="Image URL (optional)" placeholder="https://..." value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Create Recipe</Button>
          </div>
        </form>
      </Modal>

      {/* View Recipe Modal */}
      {viewingRecipe && (
        <Modal isOpen={!!viewingRecipe} onClose={() => setViewingRecipe(null)} title={viewingRecipe.title}>
          <div className="space-y-4">
            <img src={viewingRecipe.imageUrl} alt={viewingRecipe.title} className="w-full h-48 object-cover rounded-lg border border-[#E5E1D8]" />
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">{viewingRecipe.code}</span>
              <Badge variant={getBadgeVariant(viewingRecipe.status)}>{viewingRecipe.status}</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p><span className="font-semibold">Cuisine:</span> {viewingRecipe.cuisine}</p>
              <p><span className="font-semibold">Last Updated:</span> {viewingRecipe.lastUpdated} by {viewingRecipe.updatedBy}</p>
            </div>
            <div className="pt-3 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setViewingRecipe(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};
