import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './interface/routes/routes'
import { errorMiddleware } from './interface/routes/injection';
dotenv.config();

const app = express();



app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes here
app.use('/api', routes);

app.use(errorMiddleware.handleErrors);
app.use(errorMiddleware.handleNotFound);


const port = process.  env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
