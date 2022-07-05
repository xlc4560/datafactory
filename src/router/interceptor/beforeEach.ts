import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const beforeEach = (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext): void => {
  typeof to.name === 'string' ? (document.title = to.name) : '';
  next();
};
export { beforeEach };
