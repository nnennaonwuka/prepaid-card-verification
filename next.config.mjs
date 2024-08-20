/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/agricos-dev-bucket-1/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/babbangona-prod-bucket-2/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/home/cards",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
