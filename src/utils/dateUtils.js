export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export const getTodayString = () => new Date().toISOString().split('T')[0];

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

export const getMonthName = (month) =>
  new Date(2000, month - 1, 1).toLocaleString('en-IN', { month: 'long' });

export const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

export const generateScheduleSlots = () => {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    for (let m of [0, 30]) {
      const hour   = String(h).padStart(2, '0');
      const minute = String(m).padStart(2, '0');
      const defaultMode =
        h >= 0 && h < 5  ? 'Sleep' :
        h === 5           ? 'Wake Prep' :
        h >= 7 && h < 9   ? 'Deep Work' :
        h === 9           ? 'Comms' :
        h >= 10 && h < 12 ? 'Deep Work' :
        h === 12          ? 'Lunch' :
        h === 13          ? 'Learning' :
        h >= 14 && h < 15 ? 'Admin' :
        h >= 15 && h < 16 ? 'Deep Work' :
        h >= 16 && h < 17 ? 'Meetings' :
        h >= 18 && h < 19 ? 'Dinner' :
        h === 21          ? 'Evening Shutdown' :
        h >= 22           ? 'Sleep' : 'Buffer';
      slots.push({
        time: `${hour}:${minute}`,
        mode: defaultMode,
        blockName: '',
        intent: '',
        energy: '',
      });
    }
  }
  return slots;
};

export const isSameDay = (a, b) =>
  new Date(a).toDateString() === new Date(b).toDateString();

export const getPreviousDay = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const getNextDay = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const getWeekDates = (year, week) => {
  const jan1 = new Date(year, 0, 1);
  const dayOffset = jan1.getDay() || 7;
  const monday = new Date(jan1);
  monday.setDate(jan1.getDate() + (week - 1) * 7 - dayOffset + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
};