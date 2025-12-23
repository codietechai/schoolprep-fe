import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Sidebar from '@/components/layouts/sidebar';
import Portals from '@/components/portals';
import { headers } from 'next/headers';

export default function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string };
}) {
  const pathname = headers().get('next-url') || '/';
  return (
    <>
      <div className="relative">
        <Overlay />
        <ScrollToTop />
        <MainContainer>
          <Sidebar />

          <div
            className={`${
              !pathname.includes('/test') && !pathname.includes('/result')
                ? 'main-content-sidebar'
                : ''
            } main-content relative flex min-h-screen flex-col pb-20`}>
            <div className="main-header">
              <Header />
            </div>
            <ContentAnimation>{children}</ContentAnimation>
            <Footer />
            <Portals />
          </div>
        </MainContainer>
      </div>
    </>
  );
}
