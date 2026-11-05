// lib/graphql-client.ts

export const PROJECT_ID_VAR = {
    projectId: process.env.NEXT_PUBLIC_CMS_PROJECT_ID,
};

export const UTM_QUERIES = {
    getUtmByProject: `
        query GetUtmByProject($id: String!) {
            getUtmByProject(id: $id) {
                id
                source
                medium
                campaign
                term
                content
                url
                projectId
                createdAt
                updatedAt
            }
        }
    `,
    createUtm: `
        mutation CreateUtm($input: CreateUtmInput!) {
            createUtm(input: $input) {
                id
                source
                medium
                campaign
                term
                content
                url
                projectId
                createdAt
                updatedAt
            }
        }
    `
};

export async function graphqlRequest<T>(
    query: string,
    variables: Record<string, any> = {},
    options: { signal?: AbortSignal } = {},
): Promise<{ data?: T; errors?: any[] }> {
    const endpoint = process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT;
    if (!endpoint) {
        console.warn('GraphQL endpoint is not defined in environment variables.');
        return { errors: [{ message: 'GraphQL endpoint is not defined' }] };
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            signal: options.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
        }

        const json = await response.json();
        return {
            data: json.data,
            errors: json.errors,
        };
    } catch (error: any) {
        console.error('GraphQL request failed:', error);
        return {
            errors: [{ message: error.message || 'Network request failed' }],
        };
    }
}

export async function submitContactForm(
    projectId: string,
    input: any,
    options: { signal?: AbortSignal } = {},
) {
    const query = `
        mutation CreateLead($input: CreateLeadInput!) {
            createLead(input: $input) {
                id
                email
            }
        }
    `;

    // Map input fields to CreateLeadInput schema
    const leadTypeMap: Record<string, string> = {
        'visitor-registration': 'VISITOR',
        'exhibitor-enquiry': 'EXHIBITOR',
        'event-brochure': 'BROCHURE',
        'sponsor-registration': 'SPONSOR',
    };

    const leadType = leadTypeMap[input.formType] || 'OTHER';
    const name = input.name || input.contactPerson || `${input.firstName || ''} ${input.lastName || ''}`.trim() || 'Unknown';

    const graphqlInput = {
        projectId,
        email: input.email || '',
        name,
        leadType,
        companyName: input.companyName || input.company || '',
        jobTitle: input.jobTitle || input.designation || '',
        phone: input.phone || input.mobile || '',
        country: input.country || '',
        state: input.state || '',
        city: input.city || '',
        message: input.message || input.comments || input.profile || '',
        source: 'WEBSITE_UTM', // maps to LeadSource enum
        status: 'NEW', // maps to LeadStatus enum

        // UTM tracking fields
        utmSource: input.utmSource || '',
        utmMedium: input.utmMedium || '',
        utmCampaign: input.utmCampaign || '',
        utmTerm: input.utmTerm || '',
        utmContent: input.utmContent || '',
        utmId: input.utmId || '',
        utmUrl: input.landingPage || input.referrer || '',
    };

    return graphqlRequest<{ createLead: { id: string } }>(query, {
        input: graphqlInput,
    }, options);
}

