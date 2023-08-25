import type { Event } from './event';

export interface Series {
  name: string;
  description: string;
  events: Event[];
}
