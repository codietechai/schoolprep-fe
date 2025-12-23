'use client';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Overlay = () => {
  const pathname = usePathname();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  return (
    <>
      {/* sidebar menu overlay */}
      {!pathname.includes('/test') && !pathname.includes('/result') && (
        <div
          className={`${
            (!themeConfig.sidebar && 'hidden') || ''
          } fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
          onClick={() => dispatch(toggleSidebar())}></div>
      )}{' '}
    </>
  );
};

export default Overlay;
