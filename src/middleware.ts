import { defineMiddleware } from "astro:middleware";

const COOKIE_NAME = "portfolio_auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Allow login page, auth endpoint, and static assets through
  const isPublic =
    path === "/login" ||
    path === "/api/auth" ||
    path.startsWith("/_") ||
    path.startsWith("/fonts") ||
    path.startsWith("/media") ||
    path === "/favicon.ico" ||
    path === "/robots.txt";

  if (isPublic) return next();

  const expected = import.meta.env.PORTFOLIO_PASSWORD;

  // If no password is configured (e.g. local dev without env var), let through.
  // In production on Vercel, set PORTFOLIO_PASSWORD as an environment variable.
  if (!expected) return next();

  const cookie = context.cookies.get(COOKIE_NAME);
  if (cookie?.value === expected) return next();

  return context.redirect(
    `/login?next=${encodeURIComponent(path + url.search)}`,
  );
});
