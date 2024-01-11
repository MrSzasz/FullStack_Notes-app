/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_BASE_URL: process.env.DB_BASE_URL,
    },
    images: {
        remotePatterns: [{
            hostname: 'media3.giphy.com',
        }, ],
    },
}

module.exports = nextConfig