/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["i.pravatar.cc", "images.unsplash.com", "lh3.googleusercontent.com", "teamraft.com"],
  },
};

export default nextConfig;
