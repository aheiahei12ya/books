/** @type {import('next').NextConfig} */
const path = require('path')
const withBundleAnalyser = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack: (config) => {
    // camelCase style names from css modules
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options.modules) {
          options.modules.exportLocalsConvention = 'camelCase'
        }
      })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.[jt]sx?$/]
      },
      use: ['@svgr/webpack', 'url-loader']
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'aheiahei.imdo.co',
        port: '8081',
        pathname: '/repository/blob/**'
      }
    ]
  }
}

module.exports = withBundleAnalyser(nextConfig)
