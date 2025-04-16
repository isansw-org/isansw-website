type RouteType = "protected" | "public";

type Page = {
  label: string;
  url: string;
};

export const pages: Record<RouteType, Record<string, Page>> = {
  public: {
    home: {
      label: "Home",
      url: "/",
    },
    branches: {
      label: "Branches",
      url: "/branches",
    },
    committee: {
      label: "Committee",
      url: "/committee",
    },
    events: {
      label: "Events",
      url: "/events",
    },
    sponsors: {
      label: "sponsors",
      url: "/sponsors",
    },
    signIn: {
      label: "Sign In",
      url: "/sign-in",
    },
    signUp: {
      label: "Sign Up",
      url: "/sign-up",
    },
  },
  protected: {
    dashboard: {
      label: "Dashboard",
      url: "/dash",
    },
    manageEvents: {
      label: "Manage Events",
      url: "/dash/events",
    },
    manageAnnouncements: {
      label: "Manage Announcements",
      url: "/dash/announcements",
    },
    manageSponsors: {
      label: "Manage Sponsors",
      url: "/dash/sponsors",
    },
    manageUsers: {
      label: "Manage Users",
      url: "/dash/users",
    },
  },
};
