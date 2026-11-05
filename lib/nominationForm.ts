import { COUNTRIES } from './registrationOptions';

export const NOMINATION_CATEGORIES = [
  'Outstanding Tyre Manufacturing',
  'Best Rubber Compound Innovation',
  'Quality Excellence Award',
  'Tyre Testing & QC Award',
  'Machinery & Automation Award',
  'Inspection Technology Award',
  'Recycling & Sustainability Award',
  'Smart Manufacturing Award',
  'Young Professional Award',
  'Green Manufacturing Award',
  'Excellence in R&D',
  'Lifetime Achievement Award',
];

export const EMPTY_NOMINATION = {
  nominatorName: '',
  contactPerson: '',
  designation: '',
  email: '',
  mobile: '',
  nominatorCountry: '',
  nominatorState: '',
  nominatorCity: '',
  nomineeName: '',
  nomineeType: 'Organization' as 'Organization' | 'Individual',
  website: '',
  address: '',
  pinCode: '',
  nomineeEmail: '',
  nomineePhone: '',
  category: '',
  achievements: '',
  supportingLinks: '',
  additionalComments: '',
};

export type NominationData = typeof EMPTY_NOMINATION;
export type NominationField = keyof NominationData;
export type NominationErrors = Partial<Record<NominationField, string>>;

export const NOMINATION_LABELS: Record<NominationField, string> = {
  nominatorName: 'Name of Nominator / Organization',
  contactPerson: 'Contact Person',
  designation: 'Designation',
  email: 'Email Address',
  mobile: 'Mobile Number',
  nominatorCountry: 'Country',
  nominatorState: 'State / Province',
  nominatorCity: 'City',
  nomineeName: 'Name of Nominee',
  nomineeType: 'Type of Nominee',
  website: 'Website',
  address: 'Address',
  pinCode: 'PIN / ZIP Code',
  nomineeEmail: 'Nominee Email',
  nomineePhone: 'Nominee Phone / Mobile',
  category: 'Award Category',
  achievements: 'Key Achievements / Notable Contributions',
  supportingLinks: 'Supporting Links',
  additionalComments: 'Additional Comments',
};

export const NOMINATION_STEPS = [
  { title: 'Nominator Details', description: 'Start with your contact details and location.' },
  { title: 'Nominee Details', description: 'Tell us who you are nominating and how to reach them.' },
  { title: 'Category Selection', description: 'Choose the award that best matches the nominee’s work.' },
  { title: 'Supporting Details', description: 'Add achievements and supporting links. These details are optional.' },
  { title: 'Review & Submit', description: 'Check your details below. You can edit any section before submitting.' },
];

export const NOMINATION_STEP_FIELDS: NominationField[][] = [
  ['nominatorName', 'contactPerson', 'designation', 'email', 'mobile', 'nominatorCountry', 'nominatorState', 'nominatorCity'],
  ['nomineeName', 'nomineeType', 'website', 'address', 'pinCode', 'nomineeEmail', 'nomineePhone'],
  ['category'],
  ['achievements', 'supportingLinks', 'additionalComments'],
  [],
];

export const REQUIRED_NOMINATION_FIELDS: NominationField[] = [
  ...NOMINATION_STEP_FIELDS[0],
  'nomineeName', 'nomineeType', 'address', 'pinCode', 'nomineeEmail', 'nomineePhone', 'category',
];

export const NOMINATION_LIMITS: Record<NominationField, number> = {
  ...Object.fromEntries(Object.keys(EMPTY_NOMINATION).map((key) => [key, 200])),
  address: 2000,
  website: 2000,
  achievements: 10000,
  supportingLinks: 5000,
  additionalComments: 5000,
} as Record<NominationField, number>;

export function isNominationUrl(value: string): boolean {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : 'https://' + value);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.') && !/\s/.test(value);
  } catch {
    return false;
  }
}

export function normalizeNomination(input: Record<string, unknown>): NominationData {
  const data = Object.fromEntries(
    Object.keys(EMPTY_NOMINATION).map((key) => [key, typeof input[key] === 'string' ? input[key].trim() : '']),
  ) as NominationData;
  if (data.website && isNominationUrl(data.website) && !/^https?:\/\//i.test(data.website)) {
    data.website = 'https://' + data.website;
  }
  return data;
}

export function validateNominationStep(data: NominationData, step: number): NominationErrors {
  const errors: NominationErrors = {};
  const fields = NOMINATION_STEP_FIELDS[step] || [];
  for (const field of fields) {
    const value = data[field].trim();
    if (REQUIRED_NOMINATION_FIELDS.includes(field) && !value) {
      errors[field] = 'Please enter ' + NOMINATION_LABELS[field].toLowerCase() + '.';
    } else if (value.length > NOMINATION_LIMITS[field]) {
      errors[field] = 'Please use no more than ' + NOMINATION_LIMITS[field] + ' characters.';
    }
  }
  for (const field of ['email', 'nomineeEmail'] as const) {
    if (fields.includes(field) && data[field].trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[field].trim())) {
      errors[field] = 'Please enter a valid email address.';
    }
  }
  for (const field of ['mobile', 'nomineePhone'] as const) {
    const value = data[field].trim();
    const digits = value.replace(/\D/g, '');
    if (fields.includes(field) && value && (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15)) {
      errors[field] = 'Enter a phone number with 7–15 digits, including the country code if needed.';
    }
  }
  if (fields.includes('nominatorCountry') && data.nominatorCountry && !COUNTRIES.includes(data.nominatorCountry)) {
    errors.nominatorCountry = 'Please select a country.';
  }
  if (fields.includes('nomineeType') && !['Organization', 'Individual'].includes(data.nomineeType)) {
    errors.nomineeType = 'Please choose an organization or individual.';
  }
  if (fields.includes('website') && data.website.trim() && !isNominationUrl(data.website.trim())) {
    errors.website = 'Please enter a valid website, such as https://example.com.';
  }
  if (fields.includes('category') && data.category && !NOMINATION_CATEGORIES.includes(data.category)) {
    errors.category = 'Please select an award category.';
  }
  if (fields.includes('supportingLinks') && data.supportingLinks.trim() &&
      data.supportingLinks.trim().split(/[\s,]+/).some((link) => !isNominationUrl(link))) {
    errors.supportingLinks = 'Please enter valid links, with one link per line.';
  }
  return errors;
}
