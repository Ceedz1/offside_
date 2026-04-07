import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRouter from './routes/newsRoutes.ts';
import matchesRouter from './routes/matchesRoutes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})