import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';

import { dev } from './config';
import { connectDB } from './config/db';

const app = express();

// port number
const PORT = dev.app.port;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/users', userRouter);

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
