/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const hash: string = await bcrypt.hash(password, 10);
  return hash;
};
