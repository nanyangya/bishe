export interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  timeline: TimelineItem[];
  skills: SkillItem[];
  contacts: ContactItem[];
}

