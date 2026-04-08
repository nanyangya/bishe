export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "个人网站作品",
    description: "使用 Vue 3 + TypeScript构建的个人网站",
    image: "public/assets/person.jpg",
    category: "Web",
    tags: ["Vue3", "TypeScript", "CSS3"],
    link: "https://wwx.com"
  },
  {
    id: 2,
    title: "小游戏项目",
    description: "vue3 + TypeScript 实现的小游戏",
    image: "public/assets/touxiang.jpg",
    category: "Game",
    tags: ["TypeScript", "Vue3", "动画"],
    link: "https://wwx1.com"
  }
];