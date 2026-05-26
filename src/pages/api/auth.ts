import type { APIRoute } from "astro";

const COOKIE_NAME = "portfolio_auth";
const COOKIE_MAX_AGE_DAYS = 30;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const submitted = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");
  const expected = import.meta.env.PORTFOLIO_PASSWORD;

  // Constant-time-ish equality to discourage timing attacks
  const matches = expected && submitted.length === expected.length && submitted === expected;

  if (!matches) {
    return redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }

  cookies.set(COOKIE_NAME, expected, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * COOKIE_MAX_AGE_DAYS,
  });

  // Only redirect to in-app paths to prevent open-redirect
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  return redirect(safeNext);
};
