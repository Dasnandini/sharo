import crypto from 'crypto';

/**
 * Generates a random alphanumeric share ID (8 characters)
 * Avoids confusing characters like 0/O, 1/l/I
 */
export function generateShareId(length = 8) {
  const chars = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ';
  const randomBytes = crypto.randomBytes(length);
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  
  return result;
}
