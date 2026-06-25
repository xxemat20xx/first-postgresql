import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './src/routes/todoRoutes.js';
import { pool } from './src/config/db.js'; // <-- import your pool

dotenv.config();

const app = express();

// Test DB connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL successfully!');
        client.release();
    } catch (error) {
        console.error('❌ PostgreSQL connection failed:', error.message);
        process.exit(1);
    }
};

await testConnection(); // wait for connection

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});