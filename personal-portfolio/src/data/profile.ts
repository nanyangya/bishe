import type { Profile } from "../types/profile";

export const profile: Profile = {
  name: "你的名字",
  title: "前端开发方向学生 / 创意交互爱好者",
  bio: "专注于 Vue 生态与交互体验，喜欢将视觉设计与工程实践结合，持续输出可展示、可复用、可迭代的项目成果。",
  timeline: [
    {
      year: "2023",
      title: "进入计算机相关专业学习",
      description: "建立前端基础，系统学习 HTML、CSS、JavaScript。",
    },
    {
      year: "2024",
      title: "完成多个课程项目",
      subtitle: "Vue3 + TypeScript",
      description: "重点训练组件化开发、状态管理和接口联调能力。",
    },
    {
      year: "2025",
      title: "开始作品集与游戏方向实践",
      description: "制作交互式页面与小游戏，形成个人可展示作品体系。",
    },
  ],
  skills: [
    { name: "Vue 3", level: 85 },
    { name: "TypeScript", level: 78 },
    { name: "JavaScript", level: 82 },
    { name: "CSS / 动画", level: 80 },
  ],
  contacts: [
    { label: "邮箱", value: "yourname@example.com", href: "mailto:yourname@example.com" },
    { label: "GitHub", value: "github.com/yourname", href: "https://github.com/yourname" },
    { label: "博客", value: "yourblog.com", href: "https://yourblog.com" },
  ],
};

