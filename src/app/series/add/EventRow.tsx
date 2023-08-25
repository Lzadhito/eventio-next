import { Event } from '@/types/event';
import clsx from 'clsx';

interface Props {
  event: Event;
  onClick?: (event: Event) => void;
}

export default function EventRow({ event, onClick }: Props) {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };

  return (
    <li
      data-theme="light"
      className={clsx({
        'card card-compact bg-base-100 p-1 flex flex-row items-center gap-4 max-w-4xl click': true,
        'cursor-pointer': !!onClick,
      })}
      onClick={() => (onClick ? onClick(event) : undefined)}
    >
      <div
        data-theme="dark"
        className="rounded-2xl text-xs w-14 h-fit p-2 px-3 bg-base-100 text-center font-bold uppercase text-white"
      >
        {new Intl.DateTimeFormat('id', options).format(event.startDate)}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold">{event.name}</p>
        <p className="text-xs truncate">{event?.description}</p>
      </div>
    </li>
  );
}
