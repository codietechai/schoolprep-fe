import React from 'react';
import { Noto_Sans } from 'next/font/google';
import Navbar from '@/components/userui/layout/Navbar';
import Footer from '@/components/userui/layout/footer';
import './style.css';
import 'daisyui/dist/full.css';
import UiContainer from '@/components/layouts/UiContainer';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});
export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en" data-theme="mytheme">
    <main className={notoSans.variable}>
      <UiContainer>
        <section className="bg-white text-[#253650]">
          <Navbar />
          {children}
          <Footer />
        </section>
      </UiContainer>
    </main>
    // </html>
  );
}
