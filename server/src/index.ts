import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import blogRouter from './routes/blog.routes';

import { dev } from './config';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

const app = express();

// port number
const PORT = dev.app.port;

// middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

app.listen(PORT, async () => {
  console.log(`server is running on http://localhost:${PORT}`);
  await connectDB();
});

// basic error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).send('Route does not exist!');
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
