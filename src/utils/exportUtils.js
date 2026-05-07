export const exportToJSON = (data, filename = 'planner-export.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = (e) => {
      try { resolve(JSON.parse(e.target.result)); }
      catch { reject(new Error('Invalid JSON file')); }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });

export const exportDayAsText = (dayData) => {
  const lines = [
    `=== FOUNDER PLANNER — ${dayData.date} ===`,
    `Theme: ${dayData.dayTheme}`,
    `Today matters because: ${dayData.todayMattersBecause}`,
    `Energy: ${dayData.energyForecast}`,
    '',
    '--- FOCUS LADDER ---',
    `MUST WIN: ${dayData.focusLadder.mustWin.task}`,
    `Should Do 1: ${dayData.focusLadder.shouldDo1.task}`,
    `Should Do 2: ${dayData.focusLadder.shouldDo2.task}`,
    '',
    '--- REFLECTION ---',
    `Momentum: ${dayData.reflection.momentum}`,
    `Energy Drain: ${dayData.reflection.energyDrain}`,
    `Peak Moment: ${dayData.reflection.peakMoment}`,
    `Tomorrow First Move: ${dayData.reflection.tomorrowFirstMove}`,
  ];
  return lines.join('\n');
};