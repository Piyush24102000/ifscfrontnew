/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.jsdelivr.net'
            }
        ]
    }
};

export default nextConfig;
