import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    const requestInit = {
      method: req.method,
      headers: req.headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // Vercel parses req.body automatically. We need to stringify it if it's an object
      if (req.body) {
        requestInit.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      } else {
        requestInit.body = req;
        requestInit.duplex = 'half';
      }
    }

    const webRequest = new Request(url.href, requestInit);
    const webResponse = await server.fetch(webRequest, process.env, {});

    res.status(webResponse.status);
    
    // Set headers
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      // For Node 18+ Response, we can use the async iterator
      for await (const chunk of webResponse.body) {
        res.write(chunk);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
