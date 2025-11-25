import express from 'express';
import cors from 'cors';
import routes from './src/http/routes';

const app = express();
const PORT = process.env.PORT || 3080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
