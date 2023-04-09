'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChatGPTMessage } from '@/utils/ChatGPTMessage';
import Navbar from '@/components/Navbar';

export default function Page() {
  const [chatLog, setChatLog] = useState<ChatGPTMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  return (
    <>
      <Navbar />
      <div
        className="grid h-screen w-screen overflow-hidden bg-zinc-50"
        style={{ gridTemplate: '1fr auto / 1fr auto 1fr' }}
      >
        <div className="row-start-2 row-end-2 flex flex-col justify-end">
          <div className="ml-auto h-4 w-4 bg-primary">
            <div className="h-4 w-4 rounded-br-full bg-white"></div>
          </div>
          <div className="h-4 w-full bg-primary"></div>
        </div>
        <div className="col-start-2 col-end-2 flex w-[calc(100vw-2rem)] max-w-3xl flex-col-reverse gap-4 overflow-x-visible overflow-y-scroll p-6 pr-2">
          {isLoading && (
            <div className="mr-8 rounded-lg rounded-bl-none bg-gray-100 p-3 shadow-md">
              loading...
            </div>
          )}

          {chatLog.map((message, index) => (
            <div
              className={`rounded-lg border p-4 px-5 shadow-md ${
                message.role === 'user'
                  ? 'ml-8 rounded-br-none border-primary'
                  : 'mr-8 rounded-bl-none bg-slate-200'
              }`}
              key={index}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="row-start-2 row-end-2 col-start-3 col-end-3 flex flex-col justify-end">
          <div className="mr-auto h-4 w-4 bg-primary">
            <div className="h-4 w-4 rounded-bl-full bg-white"></div>
          </div>
          <div className="h-4 w-full bg-primary"></div>
        </div>

        <form
          className="col-start-2 col-end-2 flex max-w-3xl rounded-t-xl bg-primary p-4"
          onSubmit={async (event) => {
            event.preventDefault();

            if (chatInput === '') return;

            setInputDisabled(true);
            setIsLoading(true);

            const newMessages = [
              { role: 'user', content: chatInput } as ChatGPTMessage,
              ...chatLog.slice(0, 6),
            ];

            setChatLog([{ role: 'user', content: chatInput }, ...chatLog]);
            setChatInput('');

            const {
              data: { output },
            } = await axios.post('/api/time', { input: chatInput });

            const { data } = await axios.post('/api/query', {
              query: output,
            });

            const reversingmessages = new Array(...newMessages);
            reversingmessages.reverse();
            reversingmessages.push({
              role: 'user',
              content: `Here are some of my saved memories:\n---\n${data.map(
                (record: any) => `- ${record.content}\n`
              )}`,
            });

            try {
              const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  messages: reversingmessages,
                }),
              });

              const data = response.body;
              if (!data) return;

              const reader = data.getReader();
              const decoder = new TextDecoder();
              let done = false;

              let lastMessage = '';

              setIsLoading(false);

              while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);

                lastMessage = lastMessage + chunkValue;

                setChatLog([
                  {
                    role: 'assistant',
                    content: lastMessage,
                  } as ChatGPTMessage,
                  ...newMessages,
                ]);
              }

              setInputDisabled(false);
            } catch {
              setChatLog([
                {
                  role: 'assistant',
                  content: 'Error: Message failed',
                } as ChatGPTMessage,
                ...newMessages,
              ]);
              setIsLoading(false);
              setInputDisabled(false);
            }
          }}
        >
          <input
            className="w-full rounded-md rounded-r-none bg-zinc-100 p-2 px-4 text-sm"
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder={inputDisabled ? 'please wait...' : 'Ask me anything!'}
            disabled={inputDisabled}
          />
          <motion.button
            className="rounded-lg rounded-l-none border-l-[3px] border-primary bg-zinc-100 p-2 px-4 font-bold text-primary"
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.9, y: -5 }}
          >
            Ask!
          </motion.button>
        </form>
      </div>
    </>
  );
}
