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

  if (typeof body.content !== 'string')
    return res.status(400).json({ error: 'bad request' });
  const input = body.content as string;

  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return res.status(401).json({ error: 'not signed in' });

  const { data } = await openai.createEmbedding({
    input: input,
    model: 'text-embedding-ada-002',
  });

  const { error } = await supabase.from('memories').insert({
    content: input,
    embedding: data.data[0].embedding,
    owner: user.id,
  });

  if (error) return res.status(500).json({ error: 'error saving' });

  return res.status(200).json({ success: 'created successfully' });
}
