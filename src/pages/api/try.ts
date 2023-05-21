import { call35Turbo } from '@/pages/api/chatgpt'
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, maxToken, temperature, presence_penalty, frequency_penalty, username } = req.query as Record<string, string>;

  if (username.length > 30) {
    res.status(400).json({ error: 'name must be less than 30 characters' });
    return;
  }

  const formatedPrompt = prompt.replace('$name', username)

  res.status(200).json({
    chat: await call35Turbo(
      formatedPrompt,
      Number(maxToken),
      Number(temperature),
      Number(presence_penalty),
      Number(frequency_penalty)
    )
  });
}
