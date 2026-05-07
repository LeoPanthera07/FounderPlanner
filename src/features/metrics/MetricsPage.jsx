import { useEffect, useState } from 'react';
import { useMetricsStore } from './metricsStore';
import { MetricCard } from './MetricCard';
import { MetricChart } from './MetricChart';
import { PlannerCard } from '../../components/cards/PlannerCard';
import { getTodayString } from '../../utils/dateUtils';

const EMPTY_FORM = { name: '', target: '', unit: '', color: 'blue' };
const COLORS = ['blue','teal','amber','green'];

export const MetricsPage = () => {
  const { metrics, logs, loadMetrics, loadLogs, addMetric, logMetricValue, deleteMetric } = useMetricsStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadMetrics(); }, []);

  useEffect(() => {
    if (selected) {
      const end = getTodayString();
      const start = new Date(); start.setDate(start.getDate() - 30);
      loadLogs(selected, start.toISOString().split('T')[0], end);
    }
  }, [selected]);

  const handleAdd = async () => {
    if (!form.name.trim()) return;
    await addMetric({ ...form, target: Number(form.target) });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Metrics</h1>
          <p className="text-sm text-slate-400">Scoreboard · Track what matters</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition">
          {showForm ? 'Cancel' : '+ New Metric'}
        </button>
      </div>

      {showForm && (
        <PlannerCard title="Add New Metric">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Metric name" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="number" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })}
              placeholder="Target" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
              placeholder="Unit (h, kg, ...)" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              {COLORS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleAdd}
            className="mt-3 w-full py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition">
            Add Metric
          </button>
        </PlannerCard>
      )}

      {metrics.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-semibold">No metrics yet</p>
          <p className="text-sm">Add your first scoreboard metric above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map(metric => (
            <PlannerCard key={metric.id} title={metric.name}
              subtitle={`Target: ${metric.target}${metric.unit}`}
              className={`cursor-pointer transition-shadow hover:shadow-md ${selected === metric.id ? 'ring-2 ring-blue-400' : ''}`}>
              <div onClick={() => setSelected(selected === metric.id ? null : metric.id)}>
                <MetricCard metric={metric} value={logs.find(l => l.metricId === metric.id)?.value ?? '—'}
                  onLog={(v) => logMetricValue(metric.id, v)} />
                {selected === metric.id && <MetricChart logs={logs.filter(l => l.metricId === metric.id)} />}
              </div>
              <button onClick={() => deleteMetric(metric.id)}
                className="mt-2 text-xs text-slate-300 hover:text-red-400 transition">Delete metric</button>
            </PlannerCard>
          ))}
        </div>
      )}
    </div>
  );
};
