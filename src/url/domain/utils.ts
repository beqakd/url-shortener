const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateShortCode(length = 7): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += base62.charAt(Math.floor(Math.random() * base62.length));
  }
  return code;
}
