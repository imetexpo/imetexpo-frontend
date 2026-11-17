// app/visitor-registration/page.tsx
import { redirect } from "next/navigation";
import { redirectToRegister } from "@/app/register/registrationRoutes";

export default async function VisitorRegistrationRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  redirect(redirectToRegister("enquiry", resolvedParams));
}
