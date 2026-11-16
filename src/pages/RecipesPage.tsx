import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { ErrorBlock, LoadingBlock } from '../components/shared/StatusViews';
import { Pagination } from '../components/shared/Pagination';
import { AddRecipeModal } from '../features/recipes/AddRecipeModal';
import { RecipeViewModal } from '../features/recipes/RecipeViewModal';
import { recipesApi } from '../api/recipes.api';
import { useAsync, useDebounced } from '../hooks/useAsync';
import { timeAgo } from '../utils/format';
import { recipeBadgeVariant } from '../utils/badges';

const PAGE_SIZE = 10;

export const RecipesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const search = useDebounced(searchTerm);
  const cuisines = useAsync(() => recipesApi.cuisines(), []);
  const recipes = useAsync(
    () => recipesApi.list({ search, status: statusFilter, cuisine: cuisineFilter, page, limit: PAGE_SIZE }),
    [search, statusFilter, cuisineFilter, page]
  );

  const pagination = recipes.data?.pagination;

  return (
    <AppLayout title="Recipes" subtitle="Manage the Mealist.ai recipe catalogue.">
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
        {/* Title & Primary Action Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-editorial font-bold text-[#1F2924] leading-tight">Recipes</h2>
            <p className="text-[14px] text-[#69736F] mt-1">Manage the Mealist.ai recipe catalogue.</p>
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
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-[13px] text-[#2C3330] placeholder-[#8E9793] border border-[#DED9CD] rounded focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41]"
                placeholder="Search by title, ID or cuisine..."
                type="text"
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
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
                onChange={(e) => { setCuisineFilter(e.target.value); setPage(1); }}
                options={[
                  { label: 'Cuisine: All Cuisines', value: 'All' },
                  ...(cuisines.data ?? []).map((c) => ({ label: c, value: c })),
                ]}
                className="w-52"
              />
            </div>
          </div>
        </section>

        {/* Recipes Table Card */}
        <section className="bg-white border border-[#E5E1D8] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-x-auto">
          {recipes.error ? (
            <ErrorBlock message={recipes.error} onRetry={recipes.reload} />
          ) : recipes.loading && !recipes.data ? (
            <LoadingBlock label="Loading recipes…" />
          ) : (
            <>
              <table className={`w-full text-left border-collapse ${recipes.loading ? 'opacity-60' : ''}`}>
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
                  {recipes.data?.items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-xs text-slate-500">
                        No recipes match your criteria.
                      </td>
                    </tr>
                  )}
                  {recipes.data?.items.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FBFAF8] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            alt={r.title}
                            className="w-12 h-12 rounded object-cover border border-[#E5E1D8] shrink-0"
                            src={r.imageUrl}
                            loading="lazy"
                          />
                          <div>
                            <h3 className="font-editorial font-bold text-[17px] text-[#1C2421] leading-snug">
                              {r.title}
                            </h3>
                            <p className="text-[11px] font-medium text-[#7D8682] tracking-wide mt-0.5">
                              ID: {r.code.length > 14 ? `${r.code.slice(0, 8)}…` : r.code}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#353F3B]">{r.cuisine}</td>
                      <td className="py-4 px-6">
                        <Badge variant={recipeBadgeVariant(r.status)}>{r.status}</Badge>
                      </td>
                      <td className="py-4 px-6 text-[#5B6460]">
                        <span>{timeAgo(r.updatedAt)}</span>{' '}
                        <span className="text-[#8E9793]">by {r.updatedBy}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setViewingId(r.id)}
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
              {pagination && <Pagination pagination={pagination} onPageChange={setPage} noun="recipes" />}
            </>
          )}
        </section>
      </div>

      <AddRecipeModal
        isOpen={isAddModalOpen}
        cuisines={cuisines.data ?? []}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={() => {
          setPage(1);
          recipes.reload();
        }}
      />

      <RecipeViewModal
        recipeId={viewingId}
        onClose={() => setViewingId(null)}
        onChanged={recipes.reload}
      />
    </AppLayout>
  );
};
