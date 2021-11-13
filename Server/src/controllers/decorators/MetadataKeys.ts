export const MetadataKeys = {
  method: 'method',
  path: 'path',
  middleware: 'middleware',
  validator: 'validator',
} as const;

export type MetadataKeys = typeof MetadataKeys[keyof typeof MetadataKeys];
