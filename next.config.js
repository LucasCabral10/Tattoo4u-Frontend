module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.sa-east-1.amazonaws.com",
        port: "",
      },
    ],
  },
};
