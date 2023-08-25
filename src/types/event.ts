import { AnyPresentValue } from '.';

export interface Event {
  name: string;
  description?: string;
  banner?: AnyPresentValue;
  startDate: Date;
  endDate: Date;
}
