module.exports={
    MONGO_USER : process.env.MONGO_USER || 'admin', 
    MONGO_PASSWORD : process.env.MONGO_PASSWORD || 'password',
    MONGO_IP : process.env.MONGO_IP || 'mongo',
    MONGO_PORT : process.env.MONGO_PORT || '27017',
    REDIS_URL : process.env.REDIS_URL || 'redis',
    REDIS_PORT : process.env.REDIS_PORT || '6379',
    SESSION_SECRET : process.env.SESSION_SECRET
}