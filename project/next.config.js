/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure output for static deployment
  output: 'export',
  
  // Static exports don't support custom headers
  // Remove headers configuration for static export compatibility
};

module.exports = nextConfig;