/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  transpilePackages: ["geist"],
  reactStrictMode: false,
};

module.exports = nextConfig;
