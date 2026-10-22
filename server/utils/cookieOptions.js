const isProduction = process.env.NODE_ENV === "production";

export const baseCookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'none' : 'lax',
  secure: isProduction,
  maxAge: 7*24*60*60*1000
};