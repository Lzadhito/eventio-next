import { AnyPresentValue } from '@/types';

export interface EventForm {
  name?: string;
  description?: string;
  endDate?: Date | '';
  startDate?: Date | '';
  banner?: AnyPresentValue | null;
}
export const DEFAULT_EVENT_VALUES: EventForm = {
  name: '',
  description: '',
  endDate: '',
  startDate: '',
  banner: null,
};
