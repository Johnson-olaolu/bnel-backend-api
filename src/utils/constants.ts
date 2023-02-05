export const BCRYPT_HASH_ROUND = 8;

export const roles: {
  name: string;
  description: string;
}[] = [
  {
    name: 'SuperAdmin',
    description: 'site owner',
  },
  {
    name: 'Admin',
    description: 'manages post and companies',
  },
  {
    name: 'User',
    description: 'Product User',
  },
];
