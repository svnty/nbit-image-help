import { HttpError, createApplication, Response } from '@nbit/bun';
import { join } from 'path';

const { attachRoutes, defineRoutes } = createApplication({
  root: join(import.meta.dir, '..'),
  allowStaticFrom: ['public'],
});

const routes = defineRoutes((app) => [
  app.get('/', async (request) => {
    return Response.file('public/index.html');
  }),
  app.post('/action', async (request: any) => {
    const { profilePicture } = await request.json();
    
    return { status: 200 };
  }),
]);

Bun.serve({
  port: 3001,
  fetch: attachRoutes(routes),
});

console.log(`server running http://localhost:3001/`);