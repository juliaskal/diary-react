import {
  House,
  NotebookText,
  CalendarHeart,
  FolderHeart,
  ChartSpline,
  Settings,
  LogOut,
} from 'lucide-react';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Diary",
  backendDomain: "http://127.0.0.1:8000",
  navItems: [
    {
      label: "home",
      href: "/",
      icon: House,
    },
    {
      label: "feed",
      href: "/feed",
      icon: NotebookText,
    },
    {
      label: "calendar",
      href: "/calendar",
      icon: CalendarHeart,
    },
    {
      label: "folders",
      href: "/folders",
      icon: FolderHeart,
    },
    {
      label: "statistic",
      href: "/statistic",
      icon: ChartSpline,
    },
  ],
  navMenuItems: [
    {
      label: "home",
      href: "/",
      icon: House,
    },
    {
      label: "feed",
      href: "/feed",
      icon: NotebookText,
    },
    {
      label: "calendar",
      href: "/calendar",
      icon: CalendarHeart,
    },
    {
      label: "folders",
      href: "/folders",
      icon: FolderHeart,
    },
    {
      label: "statistic",
      href: "/statistic",
      icon: ChartSpline,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: LogOut,
    },
  ],
};
