/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://172.17.0.1:80/api/:path*/',
            },
        ]
    },
};
