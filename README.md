# refit-openai-demo

A small Node.js app that uses the real OpenAI Node SDK (`openai@7.32.0`). It is a test target for Refit.

## The change is SIMULATED

`docs/contracts/after.json` describes a **fake** API change to the `Model` response. This is not a real or announced OpenAI change. `docs/contracts/before.json` (v2.3.0) and `after.json` (v2.4.0) are hand-written subsets of the API for testing only.

## Tests

All traffic goes to a local `node:http` simulator; there are no real network calls and no real API key.

- `npm test` runs against the `before` response shape.
- `npm run test:after` runs against the `after` response shape.
