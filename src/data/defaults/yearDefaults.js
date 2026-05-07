import { yearSchema } from '../schemas/yearSchema';

export const yearDefaults = () => ({
  ...yearSchema,
  year: new Date().getFullYear(),
});