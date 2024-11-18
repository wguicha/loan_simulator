/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en', 'es', 'pt'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['loanprojections.com'], // Reemplaza 'yourdomain.com' con tu dominio si usas imágenes externas
    },
    webpack: (config, { isServer }) => {
        // Configuración adicional de Webpack si es necesario
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
};