import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { getDiagnose } from '@/datas/diagnose';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const call35Turbo = async (
  prompt: string,
  maxToken: number,
  temp: number,
  presence: number,
  frequency: number
) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxToken,
    temperature: temp,
    presence_penalty: presence,
    frequency_penalty: frequency,
  });
  const ret_str = completion.data.choices[0].message?.content;
  return ret_str;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 一旦名前をプロンプトから除外
  const name = req.query.name as string || '名無し'
  const label = req.query.label as string;

  if (name.length > 30) {
    res.status(400).json({ error: 'name must be less than 30 characters' });
    return;
  }

  if (!label) {
    res.status(400).json({ error: 'label must be required' });
    return;
  }

  const diagnose = await getDiagnose(label);

  const prompt = diagnose.prompt.replace('$name', name);

  if (!diagnose) {
    res.status(500).json({ error: 'internal server error' });
    return;
  }

  res.status(200).json({
    chat: await call35Turbo(
      prompt,
      Number(diagnose.maxToken),
      Number(diagnose.temperature),
      Number(diagnose.presence_penalty),
      Number(diagnose.frequency_penalty)
    )
  });
}
