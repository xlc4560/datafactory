import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const beforeEach = (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext): void => {
  document.title = to.meta.title as string;
  next();
};
export { beforeEach };
