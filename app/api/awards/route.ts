import { PROJECT_ID_VAR, submitContactForm } from "@/lib/graphql-client";
import { COUNTRIES, INDUSTRIES, AWARD_CATEGORIES } from "@/lib/registrationOptions";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid body");
    body = input as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, message: "Please submit a valid form." }, { status: 400 });
  }

  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const name = text("name");
  const email = text("email");
  const companyName = text("companyName");
  const jobTitle = text("jobTitle");
  const country = text("country");
  const industry = text("industry");
  const awardCategory = text("awardCategory");
  const message = text("message");
  const phone = text("phone");
  const state = text("state");
  const city = text("city");
  const pincode = text("pincode");

  if (!name || !jobTitle || !companyName || !email || !country || !awardCategory || body.termsAccepted !== true) {
    return Response.json({ success: false, message: "Please complete all required fields and accept the terms." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !COUNTRIES.includes(country) || !AWARD_CATEGORIES.includes(awardCategory) ||
      (industry && !INDUSTRIES.includes(industry)) ||
      [name, email, companyName, jobTitle, phone].some((value) => value.length > 200) ||
      message.length > 5000) {
    return Response.json({ success: false, message: "Please check your email and selected form values." }, { status: 400 });
  }

  if (!PROJECT_ID_VAR.projectId) {
    return Response.json({ success: false, message: "Awards enquiries are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (siteKey || secret) {
    if (!siteKey || !secret) {
      return Response.json({ success: false, message: "Security verification is temporarily unavailable. Please try again later." }, { status: 503 });
    }
    const token = text("captchaToken");
    if (!token || token.length > 2048) {
      return Response.json({ success: false, message: "Please complete security verification." }, { status: 400 });
    }
    try {
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
        signal: AbortSignal.timeout(10000),
      });
      if (!verification.ok) throw new Error("Verification service unavailable");
      const result = await verification.json();
      if (result.success !== true || result.action !== "awards-registration") {
        return Response.json({ success: false, message: "Security verification expired or failed. Please try again." }, { status: 400 });
      }
    } catch {
      return Response.json({ success: false, message: "Security verification is temporarily unavailable. Please try again." }, { status: 503 });
    }
  }

  try {
    // The existing CMS stores unsupported lead types as OTHER. Keep every awards
    // field in its message, since CreateLeadInput has no industry/category fields.
    const result = await submitContactForm(PROJECT_ID_VAR.projectId, {
      formType: "awards-registration",
      name, email, companyName, jobTitle, phone, country,
      message: [
        "Awards enquiry",
        "Award Category: " + awardCategory,
        "Industry: " + (industry || "Not specified"),
        "State / Province: " + (state || "N/A"),
        "City: " + (city || "N/A"),
        "Pin Code / Zip: " + (pincode || "N/A"),
        "Terms and Conditions accepted: Yes",
        "Submitted at: " + new Date().toISOString(),
        "",
        message,
      ].join("\n"),
      ...Object.fromEntries(
        ["utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent", "utmId", "landingPage", "referrer"]
          .map((key) => [key, text(key).slice(0, 2000)]),
      ),
    });
    if (result.errors?.length || !result.data?.createLead?.id) throw new Error("Lead was not saved");
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, message: "Unable to save your awards enquiry. Please try again." }, { status: 502 });
  }
}
