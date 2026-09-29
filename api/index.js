import server from '../dist/server/server.js';



export default function handler(request) {
  // Pass standard web Request to the server
  return server.fetch(request, process.env, {});
}
