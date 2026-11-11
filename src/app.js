import express from 'express';
import { cnpjRouter } from './routes/cnpj.js';

export const app = express();

app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/cnpj', cnpjRouter);

app.use((_req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));
