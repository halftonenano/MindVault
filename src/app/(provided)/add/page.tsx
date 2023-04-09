'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ThinkImage from './thinkingman.png';
import WaveAnimation from '@/components/Waves';
import Navbar from '@/components/Navbar';
// import ThoughtBubble from './thoughtbubble.png';

const tipList = [
  'What was the last event you went to?',
  'What did you do last summer?',
  'Where did you meet your best friends?',
  "When are your friends' birthdays?",
  'What was the last vacation you went on?',
  'What were the highlights of your highschool years?',
  'What are some moments you never want to forget?',
  'Which people are most important to you?',
];

export default function Page() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [tip, setTip] = useState(0);
  const [tipFade, setTipFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipFade(true);
      setTimeout(() => {
        setTip((current) => (current > tipList.length - 2 ? 0 : current + 1));
      }, 500);
      setTimeout(() => {
        setTipFade(false);
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div
        className="min-h-screen bg-zinc-50 grid place-items-center"
        style={{ gridTemplate: '1fr auto 1fr / auto' }}
      >
        <Navbar />

        <div className='text-zinc-500 text-center px-5'>
          <div className="font-bold">Suggestions:</div>
          <div
            className={`italic text-md transition-opacity duration-500 ${
              tipFade ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {tipList[tip]}
          </div>
        </div>

        <motion.div
          animate={{ y: submitted ? -500 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 63,
            mass: 10,
          }}
          className="col-start-1 col-end-1 row-start-2 row-end-2 z-20"
        >
          <motion.form
            className="flex gap-2 flex-col sm:flex-row p-1"
            onSubmit={async (e) => {
              e.preventDefault();
              if (input === '') return;
              setSubmitted(true);

              const {
                data: { output },
              } = await axios.post('/api/time', { input });

              toast.promise(axios.post('/api/add', { content: output }), {
                loading: 'Saving...',
                success: 'Memory saved!',
                error: 'Error saving :/',
              });
            }}
          >
            <input
              className="bg-zinc-200 rounded p-2 px-4 md:w-96 shadow-lg"
              type="text"
              placeholder="Type up something to remember..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <motion.button
              className={`p-2 px-4 rounded bg-primary text-white shadow-lg${
                submitted ? 'pointer-events-none' : ''
              }`}
              whileHover={{ y: 10 }}
              whileTap={{ scale: 0.75 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 10,
              }}
            >
              create
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.button
          className={`hover:shadow-xl hover:shadow-green-400/25 col-start-1 col-end-1 row-start-2 row-end-2 transition-[opacity,_box-shadow] p-2 px-4 bg-primary text-cyan-50 rounded${
            submitted ? ' opacity-100' : ' opacity-0'
          }`}
          onClick={() => {
            setSubmitted(false);
            setInput('');
          }}
          whileHover={{ scale: 0.9 }}
        >
          New memory
        </motion.button>
        {/* <WaveAnimation /> */}
      </div>
      {/* <Image
        src={ThinkImage}
        alt="Guy thinking"
        className="z-30 absolute bottom-0 right-0 hover:bottom-3 transition-transform"
      /> */}
    </>
  );
}
