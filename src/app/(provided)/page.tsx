import Link from 'next/link';
import Image from 'next/image';
import WavesRight from './wavesright.svg';
import WavesTop from './wavestop.svg';
import WaveAnimation from '@/components/Waves';
import AutoRedirect from '@/components/AutoRedirect';

export default function Home() {
  return (
    <main className="">
      <AutoRedirect />
      <Image
        src={WavesRight}
        alt=""
        className="invisible absolute right-0 top-0 h-screen w-auto md:visible"
      />
      <Image
        src={WavesTop}
        alt=""
        className="absolute top-0 h-auto w-screen md:invisible"
      />
      <header className="grid h-screen w-full place-items-center overflow-hidden pt-24">
        <div className="relative mx-8 h-fit md:mx-28">
          <h1 className="text-5xl font-bold text-primary md:text-7xl">
            MindVault
          </h1>
          <div className="-z-10 -my-6 w-screen scale-y-75 overflow-hidden md:scale-y-100">
            <WaveAnimation />
          </div>
          <div className="flex w-full flex-col gap-5 md:max-w-2xl">
            <div className="w-full text-zinc-500 flex flex-col gap-2">
              <h2 className="w-64 font-bold md:w-1/2 md:max-w-xl">
                Your memories are important, and it can be scary to forget.
              </h2>
              <h2 className="w-64 md:w-1/2 md:max-w-xl">
                We can help you access your memories, no matter how easily you forget.
              </h2>
            </div>
            <Link
              className="md:w-fit rounded bg-primary px-5 py-2 font-bold text-white shadow-lg transition-colors hover:border hover:border-primary hover:bg-white hover:text-primary"
              href="/signin"
            >
              Save some of your memories
            </Link>
          </div>
        </div>
      </header>
    </main>
  );
}
