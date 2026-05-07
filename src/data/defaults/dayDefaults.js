import { daySchema } from '../schemas/daySchema';

export const dayDefaults = (date = new Date()) => ({
  ...daySchema,
  date: date.toISOString().split('T')[0],
  schedule: [],
});
