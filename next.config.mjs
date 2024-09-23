/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "dev-to-uploads.s3.amazonaws.com",
      "media.dev.to",
      "res.cloudinary.com",
      "picsum.photos",
      "randomuser.me",
    ],
  },
};

export default nextConfig;
