'use client';

import { useEffect, useState } from 'react';

export default function WaveAnimation() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((current) => current + 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 items-center w-fit h-32">
      {Array.from(Array(50).keys()).map((value, index) => (
        <div
          key={index}
          className="w-2 rounded-full bg-primary transition-all duration-500 ease-linear"
          style={{ height: Math.sin(offset + index*2) * 40, transform: `translateY(${((Math.sin(offset/3 + index/5) + Math.sin(offset/5 + index)) * 5)}px` }}
        ></div>
      ))}
    </div>
  );
}
