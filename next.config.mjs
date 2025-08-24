import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n/request.js"); // ← path inside /app

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.takestockinchildren.org",
        pathname: "/**",
      },
      { protocol: "https", hostname: "imgur.com", pathname: "/**" },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
};

export default withNextIntl(nextConfig);
