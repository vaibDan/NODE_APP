const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require('./config/config');
const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const session = require('express-session');
const redis = require('redis');
const { RedisStore } = require('connect-redis');
let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
});
redisClient.connect().catch(console.error);

const connectDB= async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
app.use(cors({}));
app.enable('trust proxy');

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 100 // 100 seconds
    }
}));


app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.status(200).json("ya node-app is running perfectly ");
});



app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/login", userRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err =>{
    console.error('Database connection failed', err);
    process.exit(1);
});
