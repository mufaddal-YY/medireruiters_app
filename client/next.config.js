/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {    
    unoptimized: true,
  },
  swcMinify: false,
  trailingSlash: true,
  env: {

    // HOST
    HOST_API_KEY: 'https://medi-server.onrender.com',
    // MAPBOX
    MAPBOX_API: '',
  
    
  },
};
