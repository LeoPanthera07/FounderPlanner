export const daySchema = {
  date: '',
  dayTheme: '',
  todayMattersBecause: '',
  energyForecast: 'High',
  focusLadder: {
    mustWin:   { task: '', bucket: 'Build', timeBlock: '', done: false },
    shouldDo1: { task: '', bucket: 'Learn', timeBlock: '', done: false },
    shouldDo2: { task: '', bucket: 'Operate', timeBlock: '', done: false },
    canDo1:    { task: '', bucket: 'Build', timeBlock: '', done: false },
    canDo2:    { task: '', bucket: 'Learn', timeBlock: '', done: false },
    canDo3:    { task: '', bucket: 'Live', timeBlock: '', done: false },
  },
  shutdownItems: [],
  routines: [
    { name: 'Wake + hydrate + plan',    targetTime: '05:30–06:00', done: false, quality: 0, notes: '' },
    { name: 'Meditation / affirmation', targetTime: '06:00–06:20', done: false, quality: 0, notes: '' },
    { name: 'Movement',                 targetTime: '06:20–07:00', done: false, quality: 0, notes: '' },
    { name: 'Deep work block 1',        targetTime: '07:00–09:00', done: false, quality: 0, notes: '' },
    { name: 'Review + comms batch',     targetTime: '09:00–09:30', done: false, quality: 0, notes: '' },
    { name: 'Deep work block 2',        targetTime: '10:00–12:00', done: false, quality: 0, notes: '' },
    { name: 'Learning block',           targetTime: '13:00–14:00', done: false, quality: 0, notes: '' },
    { name: 'Admin + shallow tasks',    targetTime: '14:00–15:30', done: false, quality: 0, notes: '' },
    { name: 'Evening review + shutdown',targetTime: '21:00–21:30', done: false, quality: 0, notes: '' },
    { name: 'Wind-down (no screens)',   targetTime: '21:30–22:00', done: false, quality: 0, notes: '' },
  ],
  reflection: { momentum: '', energyDrain: '', peakMoment: '', tomorrowFirstMove: '' },
  schedule: [], // Array of 48 half-hour slots (00:00 → 23:30)
};