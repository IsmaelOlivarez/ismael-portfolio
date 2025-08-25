export const siteConfig = {
  name: "Ismael Olivarez",
  tagline: "CS @ Columbia • SWE Intern @ Comerica • Building scalable backend systems & thoughtful applications",
  headshotPath: null, // Set to "/images/headshot.jpg" if you have a headshot
  email: "ismael.olivarez@columbia.edu",
  socials: {
    github: "https://github.com/IsmaelOlivarez",
    linkedin: "https://www.linkedin.com/in/ismael-olivarez-9a477b264",
    email: "mailto:ismael.olivarez@columbia.edu"
  },
  plausible: {
    enabled: true,
    domain: "" // Set this to your domain when deploying
  },
  theme: {
    default: "system" as const,
    allowToggle: true
  }
} as const;

export type SiteConfig = typeof siteConfig;
