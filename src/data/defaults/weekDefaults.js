import { weekSchema } from '../schemas/weekSchema';
import { getWeekNumber } from '../../utils/dateUtils';

export const weekDefaults = () => ({
  ...weekSchema,
  year: new Date().getFullYear(),
  week: getWeekNumber(new Date()),
});