/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com'],
  },
  env: {
    SECRET_API: process.env.SECRET_API,
  },
  compiler: {
    styledComponents: true,
  },
};
