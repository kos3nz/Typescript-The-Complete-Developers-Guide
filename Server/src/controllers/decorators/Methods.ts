export const Methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  del: 'delete',
} as const;

export type Methods = typeof Methods[keyof typeof Methods];

// export enum Methods {
//   get = 'get',
//   post = 'post',
//   put = 'put',
//   patch = 'patch',
//   del = 'delete',
// }
