# openai-api-test

## Offline tests and the simulated change

`src/models.js` wraps two calls to `client.models.retrieve()`. The tests in `test/` run against a local `node:http` simulator, so they make no real network calls and need no real API key.

`docs/contracts/before.json` (v2.3.0) and `docs/contracts/after.json` (v2.4.0) describe a **SIMULATED** change to the `Model` response. It is not a real or announced OpenAI change, and not an OpenAI release.

```sh
npm test            # simulator serves the "before" response shape
npm run test:after  # simulator serves the "after" response shape
```
