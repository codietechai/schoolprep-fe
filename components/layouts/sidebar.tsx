'use client';
import { useEffect, Fragment, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import IconMenuUsers from '../icon/menu/icon-menu-users';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconPencilPaper from '@/components/icon/icon-pencil-paper';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import AnimateHeight from 'react-animate-height';
import { usePermissions, useSession } from '@/hooks';
import { LINKS } from '@/constants';
import { InfoIcon } from '../icon/info-icon';
import {
  DiagnosticIcon,
  IconMenuDashboard,
  PerformanceIcon,
  PieChartIcon,
  PreparatoryIcon,
  ReportIcon,
} from '../icon/sidebar-icons';
import ResultIcon from '../icon/result-icon';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const { hasPermission } = usePermissions();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark,
  );
  const [currentMenu, setCurrentMenu] = useState<string>('');

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue: string) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any =
          ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);
  const userSession = useSelector((state: IRootState) => state.auth);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    selector?.classList.add('active');
  };

  const menuClassName = 'shrink-0 group-hover:!text-primary icon';
  const menuItems: any = [
    {
      name: t('dashboard'),
      Icon: <IconMenuDashboard className={menuClassName} />,
      route: LINKS.dashboard.route,
      items: [],
      heading: '',
    },
  ];

  if (hasPermission('user', 'read')) {
    menuItems.push({
      name: t('User'),
      Icon: <IconMenuUsers className={menuClassName} />,
      route: LINKS.users.route,
      items: [
        {
          name: t('Roles'),
          Icon: null,
          route: LINKS.roles.route,
        },
        {
          name: t('Users'),
          Icon: null,
          route: LINKS.users.route,
        },
      ],
      heading: '',
    });
  }
  const { session } = useSession();

  if (hasPermission('course_category', 'read')) {
    menuItems.push({
      name: t('Categories'),
      Icon: <IconMenuPages className={menuClassName} />,
      route: LINKS.courseCategory.route,
      items: [],
      heading: '',
    });
  }
  if (
    hasPermission('course', 'read') &&
    userSession.user?.user.role.name !== 'Student'
  ) {
    menuItems.push({
      name: t('Courses'),
      Icon: <IconPencilPaper className={menuClassName} />,
      route: LINKS.courses.route,
      items: [],
      heading: '',
    });
  }
  if (hasPermission('subject', 'read')) {
    menuItems.push({
      name: t('Subjects'),
      Icon: <IconMenuNotes className={menuClassName} />,
      route: LINKS.subjects.route,
      items: [],
      heading: '',
    });
  }
  if (hasPermission('question', 'read')) {
    menuItems.push({
      name: t('Questions'),
      Icon: <IconMenuPages className={menuClassName} />,
      route: LINKS.questions.route,
      items: [],
      heading: '',
    });
  }
  if (hasPermission('contact', 'read')) {
    menuItems.push({
      name: t('Contacts'),
      Icon: <IconMenuPages className={menuClassName} />,
      route: LINKS.contacts.route,
      items: [],
      heading: '',
    });
  }

  if (session?.user?.role?.name === 'Student') {
    menuItems.push({
      name: t('Performance'),
      Icon: <PerformanceIcon className={menuClassName} />,
      route: LINKS.performance.route,
      items: [
        {
          name: t('Overall'),
          Icon: <ReportIcon />,
          route: LINKS.performance.route,
        },
        {
          name: t('Reports'),
          Icon: <PieChartIcon />,
          route: LINKS.performance.report.route,
        },
      ],
      heading: '',
    });
    menuItems.push({
      name: t('Diagnostic test'),
      Icon: <DiagnosticIcon className={menuClassName} />,
      route: LINKS.diagnostic.route,
      items: [],
      heading: '',
    });
    menuItems.push({
      name: t('Preparatory test'),
      Icon: <PreparatoryIcon className={menuClassName} />,
      route: LINKS.preparatory.route,
      heading: '',
    });
  }
  return (
    <>
      {!pathname.includes('/test') && !pathname.includes('/result') && (
        <div className={semidark ? 'dark' : ''}>
          <nav
            className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
              semidark ? 'text-white-dark' : ''
            }`}>
            <div className="h-full bg-white dark:bg-black">
              <div className="relative flex items-center justify-center px-4 py-14">
                <Link
                  href="/portal/dashboard"
                  className="main-logo flex shrink-0 items-center">
                  {/* <img
                className="ml-[5px] w-8 flex-none"
                src="/assets/images/logo.svg"
                alt="logo"
              /> */}
                  <span className="text-center align-middle text-[35px]  font-semibold dark:text-white-light lg:inline">
                    Logo
                  </span>
                </Link>

                <button
                  type="button"
                  className="collapse-icon absolute right-2 flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                  onClick={() => dispatch(toggleSidebar())}>
                  <IconCaretsDown className="m-auto rotate-90" />
                </button>
              </div>
              <PerfectScrollbar className="relative h-[calc(100vh-300px)]">
                <ul className="relative space-y-0.5 p-6 py-0 font-semibold">
                  <li className="nav-item">
                    <ul>
                      {menuItems?.map((menuItem: any) => {
                        if (!menuItem.items?.length) {
                          return (
                            <Fragment key={menuItem.route}>
                              <li className="nav-item">
                                <Link
                                  href={menuItem.route}
                                  className="group !p-[16px]">
                                  <div className="flex items-center">
                                    {menuItem.Icon}
                                    <span className="text-black dark:text-[#506690] ltr:pl-3 rtl:pr-3">
                                      {menuItem.name}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            </Fragment>
                          );
                        } else {
                          return (
                            <li className="menu nav-item" key={menuItem.name}>
                              {menuItem?.heading && (
                                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                  {/* <IconMinus className="hidden h-5 w-4 flex-none" /> */}
                                  <span>{menuItem?.heading}</span>
                                </h2>
                              )}
                              <button
                                type="button"
                                className={`${
                                  currentMenu === menuItem.name ? 'active' : ''
                                } nav-link group w-full`}
                                onClick={() => toggleMenu(menuItem.name)}>
                                <div className="flex items-center pl-[5px]">
                                  {menuItem.Icon}
                                  <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                    {menuItem.name}
                                  </span>
                                </div>
                                <div
                                  className={
                                    currentMenu !== menuItem.name
                                      ? '-rotate-90 transition-transform duration-300 rtl:rotate-90'
                                      : 'rotate-0 transition-transform duration-300 rtl:-rotate-0'
                                  }>
                                  <IconCaretDown />
                                </div>
                              </button>
                              <AnimateHeight
                                duration={300}
                                height={
                                  currentMenu === menuItem.name ? 'auto' : 0
                                }>
                                <ul className="sub-menu text-gray-500">
                                  {menuItem.items.map((subItem: any) => {
                                    return (
                                      <li key={subItem.route} className="">
                                        <Link
                                          href={subItem.route}
                                          className="group">
                                          <div className="flex items-center gap-3">
                                            <span>{subItem.Icon}</span>
                                            {subItem.name}
                                          </div>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </AnimateHeight>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              </PerfectScrollbar>
              <div className="space-y-2 pl-12 text-base">
                <h3 className="font-bold text-secondary">Support</h3>
                <div className="text-[#7C8696]">
                  <div className="flex items-center gap-4 py-4">
                    <InfoIcon />
                    <Link href={'/about-us'} className="cursor-pointer">
                      About
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 py-4">
                    <InfoIcon />
                    <Link href={'/contact-us'} className="cursor-pointer">
                      Help
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
