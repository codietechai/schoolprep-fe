import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import '../styles/custom.css';
import { Metadata } from 'next';
// import { Nunito } from 'next/font/google';
import { Noto_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Test Prep',
  },
};
const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});
// const nunito = Nunito({
//     weight: ['400', '500', '600', '700', '800'],
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-nunito',
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.variable}>
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}
