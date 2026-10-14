import http from 'node:http';

export const API_KEY = 'refit-offline-test';

export function startSimulator(contract = process.env.CONTRACT ?? 'before') {
  const server = http.createServer((req, res) => {
    const match = /^\/v1\/models\/([^/?]+)/.exec(req.url ?? '');
    if (req.method !== 'GET' || !match) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'not found' } }));
      return;
    }
    if (req.headers.authorization !== `Bearer ${API_KEY}`) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'unauthorized' } }));
      return;
    }
    const body = { id: decodeURIComponent(match[1]), object: 'model', created: 0 };
    if (contract === 'after') body.owner_name = 'openai';
    else body.owned_by = 'openai';
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({
        url: `http://127.0.0.1:${server.address().port}/v1`,
        close: () =>
          new Promise((done) => {
            server.close(done);
            server.closeAllConnections();
          }),
      });
    });
  });
}
