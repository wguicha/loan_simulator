'use client';

import "../styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <html lang="en">
      <head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            {children}
            <Analytics />
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}