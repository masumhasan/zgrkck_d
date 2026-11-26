import React, { useEffect, useState } from 'react';
import { legalApi, type LegalPayload } from '../api/legal.api';
import { InlineError, LoadingBlock } from '../components/shared/StatusViews';
import { FormattedText } from '../components/shared/FormattedText';
import { errorMessage } from '../hooks/useAsync';

interface PublicLegalPageProps {
  mode: 'terms' | 'privacy';
}

export const PublicLegalPage: React.FC<PublicLegalPageProps> = ({ mode }) => {
  const [data, setData] = useState<LegalPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    legalApi
      .get()
      .then(setData)
      .catch((err) => setError(errorMessage(err)));
  }, []);

  const title = mode === 'terms' ? 'Terms of Use' : 'Privacy Policy';
  const body = data ? (mode === 'terms' ? data.terms : data.privacy) : '';

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#1A1A1A] py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#2D5F4F]">Mealist.ai</p>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{title}</h1>
            {data?.lastUpdated && (
              <p className="text-xs text-[#6B6B6B] mt-0.5">{data.lastUpdated}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <a
              href="/terms"
              className={
                mode === 'terms'
                  ? 'rounded-full bg-[#E8F0ED] text-[#2D5F4F] px-3 py-1.5'
                  : 'rounded-full border border-[#E0DDD6] bg-white text-[#1A1A1A] px-3 py-1.5'
              }
            >
              Terms of Use
            </a>
            <a
              href="/privacy"
              className={
                mode === 'privacy'
                  ? 'rounded-full bg-[#E8F0ED] text-[#2D5F4F] px-3 py-1.5'
                  : 'rounded-full border border-[#E0DDD6] bg-white text-[#1A1A1A] px-3 py-1.5'
              }
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {error && <InlineError message={error} />}

        {!data && !error ? (
          <LoadingBlock label="Loading…" />
        ) : (
          data && (
            <>
              {data.disclaimer.trim() && (
                <FormattedText
                  text={data.disclaimer}
                  className="rounded-xl bg-[#FDECEC] p-4 text-sm text-[#D94040]"
                />
              )}
              <FormattedText text={body} className="text-sm text-[#6B6B6B] space-y-1" />
            </>
          )
        )}
      </div>
    </div>
  );
};
