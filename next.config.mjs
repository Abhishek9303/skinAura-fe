/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: false,
  env: {
    BACKEND_URL: `https://skin-aura-be.vercel.app/`,
    NEXT_PUBLIC_RAZORPAY_KEY_ID : `rzp_test_IhkH6awJCWjYBT`
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
