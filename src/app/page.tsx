import Link from 'next/link';

import Navbar from '@/app/components/ui/Navbar';

import Icon from './components/Icon';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-skeleton">
      <Navbar />
      <main className="hero grow">
        <div className="hero-content text-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">
              <span>Manage and Publish Your </span>
              <span className="from-[#FF1CF7] to-[#b249f8] text-transparent bg-gradient-to-b bg-clip-text">
                Event Series
              </span>
            </h1>
            <div className="flex gap-4">
              <input type="search" placeholder="Find an event series" className="input input-bordered w-full" />
              <Link href="/series/add" className="btn btn-primary normal-case">
                <Icon icon="plus" />
                <span>New Series</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
