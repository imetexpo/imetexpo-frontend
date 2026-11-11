'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
    getUTMParams,
    getUTMParamsFromSearchParams,
    storeUTMData,
    getStoredUTMData,
    syncUTMParamsToUrl,
    UTMData,
    hasUTMData,
} from '@/lib/utmTracker';
import { getOrCreateUTMInCMS, CMSUTMCampaign } from '@/lib/cms-utm';

const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
] as const;

function UTMTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [, setCampaignData] = useState<CMSUTMCampaign | null>(null);

    useEffect(() => {
        // ── Step 1: Restore stored UTM params into the URL if the URL has none ──
        try {
            const stored = getStoredUTMData();
            const hasStored = hasUTMData(stored);

            const currentSearch =
                typeof window !== 'undefined'
                    ? new URLSearchParams(window.location.search)
                    : null;

            const urlHasAny = currentSearch
                ? UTM_KEYS.some((k) => currentSearch.has(k))
                : false;

            if (hasStored && !urlHasAny && pathname) {
                const merged = new URLSearchParams(
                    typeof window !== 'undefined' ? window.location.search : ''
                );
                UTM_KEYS.forEach((k) => {
                    const v = stored[k as keyof UTMData];
                    if (v && !merged.has(k)) merged.set(k, v as string);
                });
                const newQuery = merged.toString();
                router.replace(`${pathname}${newQuery ? `?${newQuery}` : ''}`);
            }
        } catch {
            // ignore — URL restore is best-effort
        }

        // ── Step 2: Detect UTM params and sync with CMS ──
        const handleUTMDetection = async () => {
            // Prefer Next.js searchParams; fall back to window.location.search
            const utmParams: UTMData = getUTMParamsFromSearchParams(searchParams);

            if (Object.keys(utmParams).length === 0 && typeof window !== 'undefined') {
                Object.assign(utmParams, getUTMParams());
            }

            // Attach metadata
            if (typeof document !== 'undefined') {
                utmParams.referrer = document.referrer || '';
            }
            if (typeof window !== 'undefined') {
                utmParams.landingPage = window.location.href;
                utmParams.timestamp = new Date().toISOString();
            }

            const hasActualUtm = UTM_KEYS.some((key) => !!utmParams[key as keyof UTMData]);

            if (hasActualUtm) {
                console.log('✅ UTMProvider: UTM detected:', utmParams);

                // Check if this exact combination was already processed
                const storedUtm = getStoredUTMData();
                const isAlreadyProcessed = !!(
                    storedUtm.utm_id &&
                    storedUtm.utm_source === utmParams.utm_source &&
                    storedUtm.utm_medium === utmParams.utm_medium &&
                    storedUtm.utm_campaign === utmParams.utm_campaign
                );

                // Always persist latest params and keep URL in sync
                storeUTMData(utmParams);
                syncUTMParamsToUrl(utmParams);

                if (!isAlreadyProcessed) {
                    try {
                        // getOrCreateUTMInCMS handles "already exists" gracefully
                        const campaign = await getOrCreateUTMInCMS(utmParams);
                        if (campaign) {
                            setCampaignData(campaign);
                            // Store the CMS-assigned id so future renders skip the create
                            storeUTMData({ utm_id: campaign.id, utm_url: campaign.url });
                        }
                    } catch (error) {
                        console.warn('CMS UTM check/create failed:', error);
                    }
                }
            } else {
                // ── Step 3: No URL UTMs — restore from localStorage into URL ──
                const storedUtm = getStoredUTMData();
                const hasStoredUtm = UTM_KEYS.some((key) => !!storedUtm[key as keyof UTMData]);

                if (hasStoredUtm) {
                    const currentParams = new URLSearchParams(searchParams?.toString() ?? '');
                    let updated = false;

                    UTM_KEYS.forEach((key) => {
                        const val = storedUtm[key as keyof UTMData];
                        if (val && !currentParams.has(key)) {
                            currentParams.set(key, val as string);
                            updated = true;
                        }
                    });

                    if (updated) {
                        syncUTMParamsToUrl(storedUtm, pathname ?? undefined, currentParams.toString());
                    }
                }
            }
        };

        handleUTMDetection();
    }, [searchParams, pathname]);

    return null;
}
// Query tracking may wait for client URL data; page content can still render on the server.
export function UTMProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <UTMTracker />
            </Suspense>
            {children}
        </>
    );
}
