export const urlRoot = 'url';

export const urlRoutes = {
  root: urlRoot,

  create: `:url/create`,
  get: `:url/get`,
  stats: `:url/stats`,
} as const;
