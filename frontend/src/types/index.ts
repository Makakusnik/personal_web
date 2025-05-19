export interface Contact {
  label: string;
  iconName: string;
  hrefValue: string;
}

export interface JobExperience {
  company: string;
  role: string;
  isCurrentJob: boolean;
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
  short_description: string;
  long_description: string;
  location: string;
  locationLatitude: string;
  locationLongitude: string;
}
