require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public'))); // Обслуживание статических файлов
app.use('/api', router);
app.use(errorMiddleware);
const start = async () => {
    try {
        await mongoose.connect(process.env.DB, {});
        app.listen(port, () => {
            console.log(`Запустился на порту ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};


process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});


start();
