import express from 'express';
import { router } from './routes/router';
import { ZodError } from 'zod';
import { env } from './env';

const app = express();
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error.',
      error: err.message
    });
  }

  if (env.NODE_ENV === 'dev') {
    console.error(err);
  } else {
    //TODO: colocar um sentry aqui?
  }
  
  return next.status(500).send({ message: 'Internal server error.'});
});


export { app };