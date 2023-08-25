import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ICON_TYPE } from './constants';

interface Props {
  className?: string;
  icon: keyof typeof ICON_TYPE;
}
export default function Icon({ className = '', icon }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge(clsx('w-6 h-6', className))}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_TYPE[icon]} />
    </svg>
  );
}
