import { ChatGPTMessage } from '@/utils/ChatGPTMessage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await req.body;

  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return res.status(401).json({ error: 'not signed in' });

  const date = new Date();

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `You are to restate the current statement, clarifying the time referred to in the prompt as a real date. The current date is ${date.toDateString()}. If you cannot specify a date, do not say so and just return the message as is.`,
    },
    { role: 'user', content: body.input },
  ];

  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    top_p: 0.4,
  });

  return res.status(200).json({ output: data.choices[0].message?.content });
}
