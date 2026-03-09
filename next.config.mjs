/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: false,
  env: {
    BACKEND_URL: `https://skin-aura-be.vercel.app/`,
    // BACKEND_URL: `http://localhost:8000/`,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: `rzp_live_SFkndfQfuCHhAb`,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

export default nextConfig;
