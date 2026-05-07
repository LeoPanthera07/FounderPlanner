import { useEffect } from 'react';
import { useYearStore } from './yearStore';
import { IdentityStatement } from './IdentityStatement';
import { AnnualThemes } from './AnnualThemes';
import { AnnualTargets } from './AnnualTargets';
import { YearEndOutcomes } from './YearEndOutcomes';
import { NotThisYearList } from './NotThisYearList';

export const YearPage = () => {
  const { yearData, loading, loadYear, updateField, updateTarget, updateOutcome, addNotThisYear, removeNotThisYear } = useYearStore();

  useEffect(() => { loadYear(); }, []);

  if (loading || !yearData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Year {yearData.year}</h1>
          <p className="text-sm text-slate-400">North Star · Annual Architecture</p>
        </div>
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full">Build · Learn · Operate · Live</span>
      </div>
      <IdentityStatement value={yearData.identityStatement} onChange={(v) => updateField('identityStatement', v)} />
      <AnnualThemes themes={yearData.themes} onChange={(i, v) => { const t = [...yearData.themes]; t[i] = v; updateField('themes', t); }} />
      <AnnualTargets targets={yearData.annualTargets} onChange={updateTarget} />
      <YearEndOutcomes outcomes={yearData.yearEndOutcomes} onChange={updateOutcome} />
      <NotThisYearList items={yearData.notThisYear} onAdd={addNotThisYear} onRemove={removeNotThisYear} />
    </div>
  );
};
