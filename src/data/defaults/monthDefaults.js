import { monthSchema } from '../schemas/monthSchema';

export const monthDefaults = () => ({
  ...monthSchema,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});