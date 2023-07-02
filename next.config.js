/** @type {import('next').NextConfig} */
const path = require('path')
const withBundleAnalyser = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const isProd = process.env.NODE_ENV === 'production'


const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? './' : undefined,
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
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/config/image.ts',
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
