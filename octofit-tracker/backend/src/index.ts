import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database.js';
import apiRouter from './routes.js';
import { apiBaseUrl } from './server.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
    apiBaseUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
