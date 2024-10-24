'use client';

import localFont from "next/font/local";
import "./globals.css";

import { Provider } from 'react-redux';
import { store } from '@/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {/* Envuelve la app con I18nextProvider */}
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );

}
