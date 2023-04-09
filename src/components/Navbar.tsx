import Link from 'next/link';

export default function Navbar() {
  return (
    // <section className="fixed right-3 top-3 flex items-center gap-3 rounded-lg border border-primary bg-gradient-to-br from-primary/10 to-primary/40 p-2 px-5 text-black shadow-xl backdrop-blur-xl">
    <section className="fixed right-3 top-3 z-10 flex items-center gap-3 rounded-lg rounded-br-none rounded-tl-none border border-primary p-2 px-5 text-black shadow-xl backdrop-blur-xl">
      <Link href="/?noredirect=true" className="">
        Home
      </Link>
      <div className="h-6 w-px bg-black/50"></div>
      <Link href="/ask" className="">
        Ask
      </Link>
      <div className="h-6 w-px bg-black/50"></div>
      <Link href="/add" className="">
        Add
      </Link>
    </section>
  );
}
