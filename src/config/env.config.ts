export const environmentConfig = () => ({
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT ?? 3002,
    jwtSecret: process.env.JWT_SECRET
})