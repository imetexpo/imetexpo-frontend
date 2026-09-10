export type RegistrationTab = 'enquiry' | 'exhibitor' | 'sponsor' | 'brochure';

export const REGISTRATION_TABS: RegistrationTab[] = [
    'enquiry',
    'exhibitor',
    'sponsor',
    'brochure',
];

export const TAB_QUERY_PARAM = 't';

export const LEGACY_PATH_TO_TAB: Record<string, RegistrationTab> = {
    '/visitor-registration': 'enquiry',
    '/exhibiting-enquiry': 'exhibitor',
    '/become-partner': 'sponsor',
    '/event-brochure': 'brochure',
};

export const TAB_TO_LEGACY_PATH: Record<RegistrationTab, string> = {
    enquiry: '/visitor-registration',
    exhibitor: '/exhibiting-enquiry',
    sponsor: '/become-partner',
    brochure: '/event-brochure',
};

export const REGISTRATION_HERO: Record<
    RegistrationTab,
    { title: string; accent?: string; subtitle: string }
> = {
    enquiry: {
        title: 'REGISTER TO',
        accent: 'VISIT',
        subtitle:
            "Register now to access India's premier metrology and precision manufacturing exhibition.",
    },
    exhibitor: {
        title: 'BECOME AN',
        accent: 'EXHIBITOR',
        subtitle:
            'Please complete the form below and our team will contact you regarding INDIAMET Expo exhibiting opportunities.',
    },
    sponsor: {
        title: 'BECOME A',
        accent: 'SPONSOR',
        subtitle:
            'Partner with INDIAMET Expo and put your brand in front of industry professionals.',
    },
    brochure: {
        title: 'DOWNLOAD',
        accent: 'BROCHURE',
        subtitle: 'Almost there — your event brochure is waiting for you to download.',
    },
};

export function isValidRegistrationTab(value: string | null): value is RegistrationTab {
    return normalizeRegistrationTab(value) !== null;
}

export function normalizeRegistrationTab(value: string | null): RegistrationTab | null {
    if (!value) return null;
    const normalized = value.replace(/\/+$/, '').toLowerCase();
    return REGISTRATION_TABS.includes(normalized as RegistrationTab)
        ? (normalized as RegistrationTab)
        : null;
}

export function buildRegisterUrl(
    tab: RegistrationTab,
    existingParams?: URLSearchParams | string,
): string {
    const params = new URLSearchParams(
        typeof existingParams === 'string' ? existingParams : existingParams?.toString(),
    );
    params.set(TAB_QUERY_PARAM, tab);
    return `/register?${params.toString()}`;
}

export function redirectToRegister(
    tab: RegistrationTab,
    searchParams?: Record<string, string | string[] | undefined>,
): string {
    const params = new URLSearchParams();

    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (key === TAB_QUERY_PARAM) continue;
            if (typeof value === 'string') params.set(key, value);
            else if (Array.isArray(value) && value[0]) params.set(key, value[0]);
        }
    }

    return buildRegisterUrl(tab, params);
}