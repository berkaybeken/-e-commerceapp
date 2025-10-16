import './globals.css';
import Header from '../components/Header';
import ClientProviders from './ClientProviders';
import ThemeProvider from './ThemeProvider';
import I18nProvider from './I18nProvider';

export const metadata = {
  title: 'Mobiversite Shop',
  description: 'Next.js 15 demo e-ticaret',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="body-skin">
        <I18nProvider>
          <ThemeProvider>
            <ClientProviders>
              <Header />
              <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
            </ClientProviders>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
