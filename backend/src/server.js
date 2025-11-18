// const express = require('express');
import express from 'express';
import dotenv, { parse } from 'dotenv';
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(rateLimiter)
app.use(express.json());

// custom logging middleware
// app.use((req, res, next)=> {
//     console.log(`${req.method} ${req.url}`,"hello");
//     next();
// });

const PORT = process.env.PORT || 5000;



// app.get('/health', (req, res) => {
//     res.send('API is running...');
// });

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});