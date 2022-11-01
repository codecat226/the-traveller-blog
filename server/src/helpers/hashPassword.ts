import bcrypt from 'bcrypt';
const saltRounds = 10;

export const securePassword = async (pw: string) => {
  return await bcrypt.hash(pw, saltRounds);
};

export const decryptPassword = async (pw: string, hash: string) => {
  return await bcrypt.compare(pw, hash);
};
