import { defineStore } from 'pinia';
const useCategoryStore = defineStore('category', {
  state: () => ({
    categoryName: '',
  }),
});
export default useCategoryStore;
