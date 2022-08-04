import type { Locale } from "date-fns";
import { format as fmt } from "date-fns";
import { sv } from "date-fns/locale";

export const format = (
  date: number | Date,
  format: string,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  }
) => {
  return fmt(new Date(date), format, {
    ...options,
    locale: sv,
  });
};
