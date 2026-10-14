import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  maxRetries: 0,
  timeout: 5000,
});

export async function getModelOwner(id) {
  const model = await client.models.retrieve(id);
  return model.owned_by.toLowerCase();
}

export async function getModelCreated(id) {
  const model = await client.models.retrieve(id);
  return { id: model.id, created: model.created };
}
