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
  swcMinify: false,
  trailingSlash: true,
  env: {

    // HOST
    HOST_API_KEY: 'http://localhost:8080',
    // MAPBOX
    MAPBOX_API: '',
  
    
  },
};
