import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = 8000;
const codespaceUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
    apiBaseUrl: codespaceUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
