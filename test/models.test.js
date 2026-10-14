import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startSimulator, API_KEY } from './simulator.js';

let simulator;
let models;

before(async () => {
  simulator = await startSimulator();
  process.env.OPENAI_API_KEY = API_KEY;
  process.env.OPENAI_BASE_URL = simulator.url;
  models = await import('../src/models.js');
});

after(async () => {
  await simulator.close();
});

test('getModelOwner returns the lowercase owner', async () => {
  assert.equal(await models.getModelOwner('gpt-demo'), 'openai');
});

test('getModelCreated returns id and created', async () => {
  assert.deepEqual(await models.getModelCreated('gpt-demo'), { id: 'gpt-demo', created: 0 });
});
