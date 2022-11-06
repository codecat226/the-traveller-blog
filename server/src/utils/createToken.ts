import randomstring from 'randomstring';

export const createToken = () => {
  return randomstring.generate();
};
