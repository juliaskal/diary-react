export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Diary",
  backendDomain: "http://127.0.0.1:8000",
  navItems: [
    {
      label: "home",
      href: "/",
    },
    {
      label: "feed",
      href: "/feed",
    },
    {
      label: "calendar",
      href: "/calendar",
    },
    {
      label: "folders",
      href: "/folders",
    },
    {
      label: "statistic",
      href: "/statistic",
    },
  ],
  navMenuItems: [
    {
      label: "home",
      href: "/",
    },
    {
      label: "feed",
      href: "/feed",
    },
    {
      label: "calendar",
      href: "/calendar",
    },
    {
      label: "folders",
      href: "/folders",
    },
    {
      label: "statistic",
      href: "/statistic",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
