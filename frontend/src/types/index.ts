import type { StrapiImage } from "@/types/api";

export interface MetaData {
  author: string;
  description: string;
  title: string;
  keywords: string;
  robots: string;
  canonical: string;
  themeColor: string;

  // OG tags
  ogTitle: string;
  ogDescription: string;
  ogImage: StrapiImage;
  ogUrl: string;
  ogLocale: string;
  ogType: string;

  // Twitter tags
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: StrapiImage;
  twitterCard: string;
  twitterSite: string;
}

export interface Contact {
  label: string;
  iconName: string;
  hrefValue: string;
}

export interface JobExperience {
  company: string;
  role: string;
  isCurrentJob: boolean;
  shortDescriptionMd: string;
  startDate: Date;
  endDate?: Date;
  companyFullName: string;
}

export type Platform = {
  name: string;
  iconName: string;
  label: string;
};

export type ProjectPlatform = {
  url: string;
  platform: Platform;
};

export type ProjectState = "online" | "in-progress" | "offline";

export interface Project {
  name: string;
  type: string;
  opensource: boolean;
  shortDescription: string;
  skills: Skill[];
  license: string;
  launched: Date;
  languagesSupported: string;
  projectPlatforms: ProjectPlatform[];
  githubUrl?: string;
  state: ProjectState;
  longDescriptionMd: string;
  imagePath: string;
  fullImage: StrapiImage;
  previewImage: StrapiImage;
}

export interface Skill {
  skillName: string;
  iconName: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  shortDescription: string;
  longDescriptionMd: string;
  location: string;
  locationLatitude: string;
  locationLongitude: string;
  headshot: StrapiImage;
}
