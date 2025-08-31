import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Adicionado para forçar a atualização do Git e resolver o problema de deploy
  env: {
    FORCE_REDEPLOY: new Date().toISOString(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fitnessprogramer.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
