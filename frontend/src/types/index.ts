export interface Contact {
  label: string;
  iconName: string;
  hrefValue: string;
}

export type JobRole = "fe" | "be" | "fe/be";

export interface JobExperience {
  company: string;
  role: JobRole;
  isCurrentJob: boolean;
  shortDescriptionMd: string;
  startDate: Date;
  endDate?: Date;
  companyFullName: string;
  roleFullText: string;
}

export type ProjectState = "Completed" | "In Progress" | "Planned";

export interface Project {
  nameShort: string;
  nameFull: string;
  url: string;
  state: ProjectState;
  description: string;
  technologies: string[];
  imageUrl: string;
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
}
