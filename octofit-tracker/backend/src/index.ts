import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-api', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
