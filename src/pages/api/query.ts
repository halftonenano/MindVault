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

  if (typeof body.query !== 'string')
    return res.status(400).json({ error: 'bad request' });
  const input = body.query as string;

  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return res.status(401).json({ error: 'not signed in' });

  const { data: embed } = await openai.createEmbedding({
    input: input,
    model: 'text-embedding-ada-002',
  });

  const { data: match, error } = await supabase.rpc('match_memories', {
    match_count: 5,
    query_embedding: embed.data[0].embedding,
    similarity_threshold: 0.7,
  });

  // const final = match.filter(
  //   (record: {
  //     id: string;
  //     content: string;
  //     owner: string;
  //     similarity: number;
  //   }) => record.owner === user.id
  // ).slice(0,5);

  if (error) return res.status(500).json({ error: 'something went wrong' });

  return res.status(200).json(match);
}
