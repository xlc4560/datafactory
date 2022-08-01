import { defineStore } from 'pinia';
const useCategoryStore = defineStore('category', {
  state: () => ({
    fiterCategoryName: '',
  }),
});
export default useCategoryStore;
