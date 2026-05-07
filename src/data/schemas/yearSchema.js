export const yearSchema = {
  year: new Date().getFullYear(),
  identityStatement: '',
  themes: ['', '', ''],
  annualTargets: {
    career:        { target: '', why: '', evidence: '' },
    health:        { target: '', why: '', evidence: '' },
    money:         { target: '', why: '', evidence: '' },
    lifestyle:     { target: '', why: '', evidence: '' },
    relationships: { target: '', why: '', evidence: '' },
  },
  yearEndOutcomes: [
    { outcome: '', deadline: '', bucket: 'Build' },
    { outcome: '', deadline: '', bucket: 'Learn' },
    { outcome: '', deadline: '', bucket: 'Operate' },
    { outcome: '', deadline: '', bucket: 'Live' },
    { outcome: '', deadline: '', bucket: 'Build' },
  ],
  notThisYear: [],
};