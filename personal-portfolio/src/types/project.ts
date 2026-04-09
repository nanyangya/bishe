export type ProjectCategory = "学习项目" | "实战项目" | "工具类项目";

export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  category: ProjectCategory;
  tags: string[];
  links: ProjectLinks;
  highlights: string[];
  date: string;
}

