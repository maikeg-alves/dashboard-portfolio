/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'i.imgur.com',
      'www.vectorlogo.zone',
      'upload.wikimedia.org',
      'upload.vectorlogo.zone',
      'raw.githubusercontent.com',
      'user-images.githubusercontent.com',
    ],
  },
  env: {
    SECRET_API: process.env.SECRET_API,
  },
  compiler: {
    styledComponents: true,
  },
};
