import { daySchema } from '../schemas/daySchema';
import { generateScheduleSlots } from '../../utils/dateUtils';

export const dayDefaults = (date = new Date()) => ({
  ...daySchema,
  date: date.toISOString().split('T')[0],
  schedule: generateScheduleSlots(),
});