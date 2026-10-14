import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const model = await client.models.retrieve(process.env.OPENAI_MODEL ?? 'gpt-4o-mini');
console.log('model:', model.id);

const res = await client.chat.completions.create({
  model: model.id,
  messages: [{ role: 'user', content: 'Say hello in one short sentence.' }],
});
console.log('reply:', res.choices[0].message.content);
