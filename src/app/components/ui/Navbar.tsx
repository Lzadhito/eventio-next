import { clsx } from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <div className={twMerge(clsx('navbar', className))}>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost font-bold normal-case text-lg">
          Event IO
        </Link>
      </div>
    </div>
  );
}
