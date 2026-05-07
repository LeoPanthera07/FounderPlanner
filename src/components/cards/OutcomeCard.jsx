import { getBucketColor } from '../../utils/bucketUtils';

export const OutcomeCard = ({ number, outcome, deadline, bucket, onChange }) => {
  const color = getBucketColor(bucket);
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${color.dot}`}>
        {number}
      </span>
      <div className="flex-1 grid grid-cols-1 gap-2">
        <input
          value={outcome || ''}
          onChange={(e) => onChange('outcome', e.target.value)}
          placeholder="Outcome (specific & measurable)"
          className="w-full px-2 py-1 text-sm border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={deadline || ''}
            onChange={(e) => onChange('deadline', e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <select
            value={bucket || 'Build'}
            onChange={(e) => onChange('bucket', e.target.value)}
            className={`px-2 py-1 text-xs font-semibold rounded border ${color.border} ${color.bg} ${color.text} focus:outline-none`}
          >
            {['Build','Learn','Operate','Live'].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
