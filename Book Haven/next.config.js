/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "png.pngtree.com"
            },
            {
                protocol: "https",
                hostname: "images.unplash.com"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            },
        ]
    }
}

module.exports = nextConfig
