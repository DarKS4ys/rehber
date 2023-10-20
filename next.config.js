/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ['firebasestorage.googleapis.com']
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
