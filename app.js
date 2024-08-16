import express from 'express';
import connectDB from './config/db.js';
import contentRoutes from'./routes/content.js';
import mediaRoutes from './routes/media.js';
import authRoutes from './routes/auth.js'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
connectDB();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
