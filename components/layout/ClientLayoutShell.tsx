"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast";
import { UTMProvider } from "@/components/UTMProvider";
import { UTMDebugger } from "@/components/UTMDebugger";
import { getUTMParams } from "@/lib/utmTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ClientLayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const hideHeaderFooter =
        normalizedPath.startsWith("/dashboard") || normalizedPath.startsWith("/admin");
    const hideFooter = hideHeaderFooter || normalizedPath === "/login";

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).gtag && !hideHeaderFooter) {
            const utmData = getUTMParams();
            const pageData: any = {
                page_path: pathname,
                page_title: document.title,
                page_location: window.location.href,
            };

            if (utmData.utm_source) pageData.utm_source = utmData.utm_source;
            if (utmData.utm_medium) pageData.utm_medium = utmData.utm_medium;
            if (utmData.utm_campaign) pageData.utm_campaign = utmData.utm_campaign;
            if (utmData.utm_term) pageData.utm_term = utmData.utm_term;
            if (utmData.utm_content) pageData.utm_content = utmData.utm_content;
            if (utmData.utm_id) pageData.utm_id = utmData.utm_id;

            (window as any).gtag("config", "G-CGKLPLYCF9", pageData);
        }
    }, [pathname, hideHeaderFooter]);

    return (
        <>
            {!hideHeaderFooter && (
                <Suspense fallback={null}>
                    <Header />
                </Suspense>
            )}

            <div className="flex min-h-0 flex-1 flex-col">
                <Suspense fallback={null}>
                    <UTMProvider>
                        <Providers>
                            {children}
                            <Toaster position="top-right" />
                        </Providers>
                        <UTMDebugger />
                    </UTMProvider>
                </Suspense>
            </div>

            {!hideFooter && <Footer />}
            <WhatsAppButton />
        </>
    );
}