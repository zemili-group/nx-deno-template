import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const router = new Router();

router.get('/', (ctx) => {
  ctx.response.redirect('/api');
});

router.get('/api', (ctx) => {
  ctx.response.body = { message: 'Hello services-backend' };
  ctx.response.type = 'text/json';
});

const app = new Application();

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? 'https://' : 'http://'}${
      hostname ?? 'localhost'
    }:${port}`
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

await app
  .listen({ port: Number(Deno.env.get('PORT') || 4200) })
  .catch((err) => {
    console.error('Error serving app. Original Error:', err);
  });
