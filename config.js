module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.BASE_URL || 3000,
    URL: process.env.PORT || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://peter:<password>@ds259802.mlab.com:59802/customer_api',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}