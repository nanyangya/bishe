import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    favorites: [] as number[] // 收藏的作品ID数组
  }),
  actions: {
    toggleFavorite(projectId: number) {
      if (this.favorites.includes(projectId)) {
        this.favorites = this.favorites.filter(id => id !== projectId);
      } else {
        this.favorites.push(projectId);
      }
    }
  }
});