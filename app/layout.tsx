import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Imobiliare Strășeni | Case, apartamente și terenuri',
  description: 'Ghidul imobiliar al municipiului și raionului Strășeni. Case, apartamente și terenuri din Strășeni, explicate simplu. Consultanță imobiliară, evaluare și promovare proprietăți.',
  keywords: 'imobiliare Strășeni, case Strășeni, apartamente Strășeni, terenuri Strășeni, proprietăți Strășeni, real estate Moldova',
  openGraph: {
    title: 'Imobiliare Strășeni',
    description: 'Ghidul imobiliar al municipiului și raionului Strășeni',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-warm-white text-charcoal font-inter">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
