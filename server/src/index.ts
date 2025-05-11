import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import connectDatabase from './infrastructure/database/mongo/connectDb';
import routes from './interface/routes/appRoutes';
import { errorMiddleware } from './interface/routes/dependencyInjection/authentication';

dotenv.config();

const app = express();

connectDatabase();

app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorMiddleware.handleNotFound);
app.use(errorMiddleware.handleErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
