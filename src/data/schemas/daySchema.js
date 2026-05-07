export const daySchema = {
  date: '',
  dayTheme: '',
  todayMattersBecause: '',
  energyForecast: 'High',
  focusLadder: {
    mustWin:   { task: '', bucket: 'Build',   timeBlock: '', done: false },
    shouldDo1: { task: '', bucket: 'Learn',   timeBlock: '', done: false },
    shouldDo2: { task: '', bucket: 'Operate', timeBlock: '', done: false },
    canDo1:    { task: '', bucket: 'Build',   timeBlock: '', done: false },
    canDo2:    { task: '', bucket: 'Learn',   timeBlock: '', done: false },
    canDo3:    { task: '', bucket: 'Live',    timeBlock: '', done: false },
  },
  shutdownItems: [],
  schedule: [],
  reflection: { momentum: '', energyDrain: '', peakMoment: '', tomorrowFirstMove: '' },
};
