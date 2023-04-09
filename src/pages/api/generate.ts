import { ChatGPTMessage } from '@/utils/ChatGPTMessage';
import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request, res: Response) {
  const body = await req.json();

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `You are to provide the user with information about a part of their life. After the question, you will also be given a list of relevant information from the user's database. Today's date is ${new Date().toDateString()}`,
    },
  ];
  messages.push(...body?.messages);

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG;
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
