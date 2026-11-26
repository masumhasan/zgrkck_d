import React, { useEffect, useRef, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { FormattedText } from '../components/shared/FormattedText';
import { InlineError, LoadingBlock } from '../components/shared/StatusViews';
import { legalApi, type LegalPayload } from '../api/legal.api';
import { errorMessage } from '../hooks/useAsync';

type LegalField = 'disclaimer' | 'terms' | 'privacy';

const SECTIONS: { key: LegalField; title: string; hint: string; rows: number }[] = [
  {
    key: 'disclaimer',
    title: 'Disclaimers (Top Banner)',
    hint: 'Displayed in the red safety box at the top of Terms of Use & Privacy Policy.',
    rows: 5,
  },
  {
    key: 'terms',
    title: 'Terms of Service',
    hint: 'Displayed under the Terms of Use tab.',
    rows: 10,
  },
  {
    key: 'privacy',
    title: 'Privacy Policy',
    hint: 'Displayed under the Privacy Policy tab.',
    rows: 10,
  },
];

export const LegalPage: React.FC = () => {
  const [data, setData] = useState<LegalPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<Record<LegalField, boolean>>({
    disclaimer: false,
    terms: false,
    privacy: false,
  });

  const refs = {
    disclaimer: useRef<HTMLTextAreaElement>(null),
    terms: useRef<HTMLTextAreaElement>(null),
    privacy: useRef<HTMLTextAreaElement>(null),
  };

  useEffect(() => {
    legalApi
      .get()
      .then(setData)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const wrapSelection = (field: LegalField, marker: '**' | '*') => {
    const el = refs[field].current;
    if (!el || !data) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const val = data[field];
    const selected = val.slice(start, end) || 'text';
    const next = `${val.slice(0, start)}${marker}${selected}${marker}${val.slice(end)}`;
    setData({ ...data, [field]: next });
    setSavedMsg(null);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + marker.length, start + marker.length + selected.length);
    });
  };

  const handleSave = async () => {
    if (!data || saving) return;
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      const updated = await legalApi.save({
        disclaimer: data.disclaimer,
        terms: data.terms,
        privacy: data.privacy,
      });
      setData(updated);
      setSavedMsg(`Saved (${updated.lastUpdated})`);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Legal Content">
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Terms, Privacy &amp; Disclaimers</h2>
            <p className="text-sm text-slate-500">
              {data?.lastUpdated ?? 'Manage legal text shown in the mobile app.'}
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving || loading || !data}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>

        {error && <InlineError message={error} />}
        {savedMsg && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm text-emerald-800">
            {savedMsg}
          </div>
        )}

        {loading || !data ? (
          <LoadingBlock label="Loading legal content…" />
        ) : (
          SECTIONS.map(({ key, title, hint, rows }) => (
            <div
              key={key}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-xs text-slate-500">{hint}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => wrapSelection(key, '**')}
                    title="Bold"
                    className="px-2.5 py-1 text-xs font-bold rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => wrapSelection(key, '*')}
                    title="Italic"
                    className="px-2.5 py-1 text-xs italic font-serif rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreview((p) => ({ ...p, [key]: !p[key] }))}
                    className="px-2.5 py-1 text-xs rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                  >
                    {preview[key] ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>

              {preview[key] ? (
                <FormattedText
                  text={data[key]}
                  className={
                    key === 'disclaimer'
                      ? 'rounded-lg bg-[#FDECEC] p-4 text-sm text-[#D94040]'
                      : 'rounded-lg bg-[#F5F3EE] p-4 text-sm text-slate-700'
                  }
                />
              ) : (
                <textarea
                  ref={refs[key]}
                  rows={rows}
                  value={data[key]}
                  onChange={(e) => {
                    setData({ ...data, [key]: e.target.value });
                    setSavedMsg(null);
                  }}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[#244E41] focus:outline-none"
                />
              )}
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
};
