/**
 * Site-wide constants.
 * Keep sensitive values in .env — reference them here for a single source of truth.
 */

export const SITE_NAME = "Blindspot";
export const SITE_DESCRIPTION =
    "AI-powered observability that surfaces the critical insights buried in your data.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blindspot.app";

export const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
] as const;

export const API_ROUTES = {
    WAITLIST: "/api/waitlist",
    HEALTH: "/api/health",
} as const;
