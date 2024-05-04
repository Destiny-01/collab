/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  transpilePackages: ["geist"],
  reactStrictMode: false,
};

module.exports = nextConfig;
