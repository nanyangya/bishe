export type GameGenre = "益智" | "动作" | "休闲";
export type GameDifficulty = "入门" | "中等" | "困难";

export interface Game {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  genre: GameGenre;
  difficulty: GameDifficulty;
  controls: string;
  image: string;
  playUrl?: string;
  repoUrl?: string;
  tags: string[];
}

