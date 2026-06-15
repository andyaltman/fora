import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // The standalone Fora form has been retired in favor of the Wedge enquiry app,
  // which captures the agency code from the URL path. Permanently redirect all
  // traffic to the Wedge form pre-tagged with Fora's agency code (PAS022).
  // Keep this rule until the fora-itrvl-enquiry Vercel project is deleted.
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://wedge-enquiry.com/PAS022",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
