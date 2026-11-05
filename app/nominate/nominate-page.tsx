'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import { Field, TextInput, TextArea, Select } from '@/components/nominate/FormFields';
import LocationDropdown from '@/components/nominate/LocationDropdown';
import { COUNTRIES } from '@/lib/registrationOptions';
import { useLocationOptions } from '@/hooks/useLocationOptions';
import {
  EMPTY_NOMINATION, NOMINATION_CATEGORIES, NOMINATION_LABELS, NOMINATION_LIMITS,
  NOMINATION_STEPS, NOMINATION_STEP_FIELDS, REQUIRED_NOMINATION_FIELDS,
  normalizeNomination, validateNominationStep,
  type NominationData, type NominationField, type NominationErrors,
} from '@/lib/nominationForm';
import LoadingDots from '@/components/ui/LoadingDots';


export default function NominatePage() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [formData, setFormData] = useState<NominationData>({ ...EMPTY_NOMINATION });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<NominationErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [returnToReview, setReturnToReview] = useState(false);
  const [validationAttempt, setValidationAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const requestPending = useRef(false);
  const states = useLocationOptions(formData.nominatorCountry);
  const cities = useLocationOptions(formData.nominatorCountry, formData.nominatorState, 'cities');

  useEffect(() => {
    router.prefetch('/nominate/thank-you');
  }, [router]);

  useEffect(() => {
    if (!interacted.current) return;
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]:not(:disabled)');
    const target = invalid || headingRef.current;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [active, validationAttempt]);

  function updateField(name: NominationField, value: string) {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'nominatorCountry' ? { nominatorState: '', nominatorCity: '' } : {}),
      ...(name === 'nominatorState' ? { nominatorCity: '' } : {}),
    }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      if (name === 'nominatorCountry') { delete next.nominatorState; delete next.nominatorCity; }
      if (name === 'nominatorState') delete next.nominatorCity;
      return next;
    });
    setSubmitError('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    updateField(event.target.name as NominationField, event.target.value);
  }

  function validateThrough(lastStep: number) {
    for (let step = 0; step <= lastStep; step++) {
      const nextErrors = validateNominationStep(formData, step);
      if (Object.keys(nextErrors).length) {
        setActive(step);
        setErrors(nextErrors);
        setValidationAttempt((attempt) => attempt + 1);
        return false;
      }
    }
    setErrors({});
    return true;
  }

  function goToStep(step: number) {
    if (submitting || step > furthest) return;
    interacted.current = true;
    setSubmitError('');
    setReturnToReview(false);
    if (step > active && !validateThrough(step - 1)) return;
    setErrors({});
    setActive(step);
  }

  function handleNext() {
    interacted.current = true;
    const destination = returnToReview ? NOMINATION_STEPS.length - 1 : active + 1;
    if (!validateThrough(destination - 1)) return;
    setSubmitError('');
    setActive(destination);
    setFurthest((previous) => Math.max(previous, destination));
    setReturnToReview(false);
  }

  function editSection(step: number) {
    if (submitting) return;
    interacted.current = true;
    setErrors({});
    setSubmitError('');
    setActive(step);
    setReturnToReview(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current) return;
    if (active < NOMINATION_STEPS.length - 1) { handleNext(); return; }
    interacted.current = true;
    if (!validateThrough(NOMINATION_STEPS.length - 2)) return;
    if (!consent) {
      setSubmitError('Please confirm the details and accept the privacy policy before submitting.');
      return;
    }
    requestPending.current = true;
    setSubmitting(true);
    setSubmitError('');
    let accepted = false;
    try {
      const response = await fetch('/api/nominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...normalizeNomination(formData), consent }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        if (result.errors && Number.isInteger(result.step)) {
          setActive(result.step);
          setErrors(result.errors);
          setValidationAttempt((attempt) => attempt + 1);
        }
        throw new Error(result.message || 'Your nomination could not be submitted. Please try again.');
      }
      router.replace('/nominate/thank-you');
      accepted = true;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit. Please try again.');
    } finally {
      if (!accepted) {
        requestPending.current = false;
        setSubmitting(false);
      }
    }
  }

  function inputProps(name: NominationField) {
    return {
      name,
      value: formData[name],
      onChange: handleChange,
      required: REQUIRED_NOMINATION_FIELDS.includes(name),
      maxLength: NOMINATION_LIMITS[name],
      'aria-invalid': errors[name] ? true as const : undefined,
      'aria-describedby': errors[name] ? name + '-error' : undefined,
    };
  }

  function renderField(
    name: NominationField,
    options: { type?: string; placeholder?: string; rows?: number; wide?: boolean; hint?: string; autoComplete?: string } = {},
  ) {
    const props = inputProps(name);
    const describedBy = [props['aria-describedby'], options.hint ? name + '-hint' : ''].filter(Boolean).join(' ') || undefined;
    return (
      <Field key={name} label={NOMINATION_LABELS[name]} required={props.required}
        error={errors[name]} hint={options.hint} className={options.wide ? 'md:col-span-2' : ''}>
        {options.rows
          ? <TextArea {...props} aria-describedby={describedBy} rows={options.rows} placeholder={options.placeholder} />
          : <TextInput {...props} aria-describedby={describedBy} type={options.type || 'text'}
              autoComplete={options.autoComplete} placeholder={options.placeholder} />}
      </Field>
    );
  }

  function reviewRows(step: number): [string, string][] {
    return NOMINATION_STEP_FIELDS[step].map((name) => [NOMINATION_LABELS[name], formData[name]]);
  }

  return (
    <div className="intro-animation overflow-hidden bg-white font-sans">
      <PageHero title="AWARDS" accent="NOMINATE"
        subtitle="Recognize. Celebrate. Inspire excellence. Nominate the best organisations and individuals shaping the future of metrology and precision manufacturing." />

      <section className="border-b border-gray-100 bg-[#FCF8F3] py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#00A1B1]">Home</Link>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <Link href="/awards/" className="hover:text-[#00A1B1]">Awards</Link>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <span aria-current="page" className="font-medium text-[#00A1B1]">Nomination Form</span>
          </nav>
        </Container>
      </section>

      <section className="border-b border-gray-100 bg-[#FCF8F3] py-6">
          <Container>
            <nav aria-label="Nomination progress" className="overflow-x-auto pb-2">
              <ol className="flex min-w-[600px] items-start">
                {NOMINATION_STEPS.map((step, index) => {
                  const current = index === active;
                  const complete = index < furthest && !Object.keys(validateNominationStep(formData, index)).length;
                  return (
                    <li key={step.title} className="flex min-w-0 flex-1 items-center last:flex-none">
                      <button type="button" onClick={() => goToStep(index)}
                        disabled={index > furthest || submitting}
                        aria-current={current ? 'step' : undefined}
                        aria-label={'Step ' + (index + 1) + ': ' + step.title + (complete ? ', complete' : '')}
                        className="group flex w-28 flex-col items-center gap-2 disabled:cursor-not-allowed">
                        <span className={'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ' +
                          (current ? 'border-[#00A1B1] bg-[#00A1B1] text-white ring-4 ring-[#00A1B1]/10'
                            : complete ? 'border-[#00A1B1] bg-[#00A1B1]/10 text-[#008896]'
                            : 'border-gray-300 bg-white text-gray-500')}>
                          {complete && !current ? <span aria-hidden="true">✓</span> : index + 1}
                        </span>
                        <span className={'text-center text-xs leading-relaxed ' + (current ? 'font-semibold text-[#003A77]' : 'text-gray-600')}>
                          {step.title}
                        </span>
                      </button>
                      {index < NOMINATION_STEPS.length - 1 && <span aria-hidden="true"
                        className={'mx-1 mb-8 h-px flex-1 ' + (complete ? 'bg-[#00A1B1]' : 'bg-gray-300')} />}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Container>
      </section>

      <section className="py-8 lg:py-12" id="form">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
            <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={submitting}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
              <Link href="/awards/" className="mb-7 inline-flex text-sm font-medium text-gray-500 hover:text-[#00A1B1]">
                ← Back to Awards
              </Link>

              <>
                  <div className="mb-7 border-b border-gray-100 pb-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00A1B1]" aria-live="polite">
                      Step {active + 1} of {NOMINATION_STEPS.length}
                    </p>
                    <h2 ref={headingRef} tabIndex={-1} className="font-bebas text-3xl text-[#003A77] outline-none">
                      {active + 1}. {NOMINATION_STEPS[active].title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{NOMINATION_STEPS[active].description}</p>
                    {active < 3 && <p className="mt-2 text-xs text-gray-500">Fields marked <span className="text-[#00A1B1]">*</span> are required.</p>}
                  </div>

                  {Object.keys(errors).length > 0 && (
                    <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      Please check the highlighted fields before continuing.
                    </div>
                  )}

                  {active === 0 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      {renderField('nominatorName', { wide: true, placeholder: 'Enter your name or organization', autoComplete: 'organization' })}
                      {renderField('contactPerson', { placeholder: 'Enter contact person name', autoComplete: 'name' })}
                      {renderField('designation', { placeholder: 'Enter your designation', autoComplete: 'organization-title' })}
                      {renderField('email', { type: 'email', placeholder: 'you@company.com', autoComplete: 'email' })}
                      {renderField('mobile', { type: 'tel', placeholder: '+91 9876543210', autoComplete: 'tel' })}
                      <Field label="Country" required error={errors.nominatorCountry}>
                        <Select {...inputProps('nominatorCountry')} autoComplete="country-name" options={COUNTRIES} placeholder="Select country" />
                      </Field>
                      <LocationDropdown key={formData.nominatorCountry + '-state'}
                        label="State / Province" name="nominatorState" value={formData.nominatorState}
                        options={states.options} loading={states.loading} error={states.error}
                        validationError={errors.nominatorState} disabled={!formData.nominatorCountry}
                        onChange={(value) => updateField('nominatorState', value)} />
                      <LocationDropdown key={formData.nominatorCountry + '-' + formData.nominatorState + '-city'}
                        label="City" name="nominatorCity" value={formData.nominatorCity}
                        options={cities.options} loading={cities.loading} error={cities.error}
                        validationError={errors.nominatorCity} disabled={!formData.nominatorState.trim()}
                        onChange={(value) => updateField('nominatorCity', value)} />
                    </div>
                  )}

                  {active === 1 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <fieldset className="min-w-0 md:col-span-2">
                        <legend className="mb-3 text-sm font-medium text-gray-700">Type of Nominee <span className="text-[#00A1B1]">*</span></legend>
                        <div className="grid grid-cols-2 gap-3">
                          {(['Organization', 'Individual'] as const).map((type) => (
                            <label key={type} className={'flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ' +
                              (formData.nomineeType === type ? 'border-[#00A1B1] bg-[#00A1B1]/5 text-[#003A77]' : 'border-gray-300 text-gray-600')}>
                              <input type="radio" name="nomineeType" value={type} checked={formData.nomineeType === type}
                                onChange={handleChange} required aria-invalid={errors.nomineeType ? true : undefined}
                                aria-describedby={errors.nomineeType ? 'nomineeType-error' : undefined} className="accent-[#00A1B1]" />
                              {type}
                            </label>
                          ))}
                        </div>
                        {errors.nomineeType && <p id="nomineeType-error" className="mt-2 text-sm text-red-600">{errors.nomineeType}</p>}
                      </fieldset>
                      {renderField('nomineeName', { wide: true, placeholder: formData.nomineeType === 'Organization' ? 'Enter organization name' : 'Enter nominee’s full name' })}
                      {renderField('nomineeEmail', { type: 'email', placeholder: 'nominee@company.com' })}
                      {renderField('nomineePhone', { type: 'tel', placeholder: '+91 9876543210' })}
                      {renderField('website', { wide: true, type: 'url', placeholder: 'https://example.com', hint: 'Optional — add the nominee’s website or professional profile.' })}
                      {renderField('address', { wide: true, rows: 2, placeholder: 'Enter street address, building or office details' })}
                      {renderField('pinCode', { placeholder: 'Enter PIN or ZIP code' })}
                    </div>
                  )}

                  {active === 2 && (
                    <div className="space-y-5">
                      <Field label="Award Category" required error={errors.category}>
                        <Select {...inputProps('category')} options={NOMINATION_CATEGORIES} placeholder="Select award category" />
                      </Field>
                      <div className="rounded-lg border border-[#00A1B1]/20 bg-[#00A1B1]/5 p-4 text-sm leading-relaxed text-gray-600">
                        Not sure which category to choose?{' '}
                        <Link href="/awards/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#008896] underline">
                          View award categories ↗
                        </Link>
                      </div>
                    </div>
                  )}

                  {active === 3 && (
                    <div className="grid gap-5">
                      {renderField('achievements', { rows: 5, placeholder: 'Describe the nominee’s achievements and their impact', hint: 'Include relevant results, innovations or milestones.' })}
                      {renderField('supportingLinks', { rows: 3, placeholder: 'https://example.com/case-study', hint: 'Optional — add one link per line, such as case studies or media coverage.' })}
                      {renderField('additionalComments', { rows: 3, placeholder: 'Anything else you would like the jury to know' })}
                    </div>
                  )}

                  {active === 4 && (
                    <div className="space-y-5">
                      {[0, 1, 2, 3].map((step) => (
                        <ReviewSection key={step} title={NOMINATION_STEPS[step].title} rows={reviewRows(step)}
                          disabled={submitting} onEdit={() => editSection(step)} />
                      ))}
                      <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                        <input type="checkbox" name="consent" checked={consent} disabled={submitting}
                          onChange={(event) => { setConsent(event.target.checked); setSubmitError(''); }}
                          required className="mt-1 h-4 w-4 shrink-0 accent-[#00A1B1]" />
                        <span>
                          I confirm the details above are accurate and agree to the{' '}
                          <Link href="/privacy-policy" target="_blank" className="text-[#008896] underline">privacy policy</Link>.
                          <span className="text-[#00A1B1]"> *</span>
                        </span>
                      </label>
                    </div>
                  )}

                  {submitError && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{submitError}</p>}

                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {active > 0 && (
                      <button type="button" disabled={submitting} onClick={() => goToStep(active - 1)}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50">
                        ← Previous step
                      </button>
                    )}
                    <button type="submit" disabled={submitting || (active === 4 && !consent)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00A1B1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003A77] disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto">
                      {submitting ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Submitting nomination…</span>
                        : active === 4 ? 'Submit nomination'
                        : returnToReview ? 'Save & return to review →'
                        : active === 3 ? 'Review nomination →' : 'Continue →'}
                    </button>
                  </div>
              </>
            </form>

            <aside className="flex min-w-0 flex-col gap-5">
              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#00A1B1]">
                  ABOUT GMEA AWARDS

                </h3>
                <p className="mb-3 text-base leading-relaxed text-gray-700">
                  The Global Metrology Excellence Awards (GMEA) honor outstanding achievements, innovation, and leadership in the field of metrology, measurement, inspection and quality assurance.


                </p>
                <Link
                  href="/awards/"
                  className="text-xs font-bold uppercase tracking-wider text-[#00A1B1] hover:underline"
                >
                  Know more about →
                </Link>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#00A1B1]">Why Nominate?</h3>
                <ul className="space-y-2 text-base leading-relaxed text-gray-700">
                  {[
                    'Gain global recognition',
                    'Enhance brand reputation',
                    'Showcase innovation & excellence',
                    'Benchmark against industry leaders',
                    'Expand business opportunities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#00A1B1]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#00A1B1]">
                  Important Dates
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-gray-500">Nominations Open</p>
                    <p className="text-base leading-relaxed font-semibold text-[#003A77]">01 January 2027</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-base text-gray-500">Last Date to Nominate</p>
                    <p className="text-base leading-relaxed font-semibold text-[#003A77]">31 March 2027</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-base text-gray-500">Finalists Announcement</p>
                    <p className="text-base leading-relaxed font-semibold text-[#003A77]">15 April 2027</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-base text-gray-500">Awards Ceremony</p>
                    <p className="text-base leading-relaxed font-bold text-[#00A1B1]">14 May 2027</p>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#00A1B1]">Need Help?</h3>
                <p className="mb-3 text-base leading-relaxed text-gray-700">Our team is here to assist you with your nomination.</p>
                <p className="text-base leading-relaxed text-[#003A77]">📞 +91 91483 19993</p>
                <p className="text-base leading-relaxed text-[#003A77]">✉️ support@indiametexpo.com</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-6 sm:py-8">
        <Container>
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 md:grid-cols-3 lg:gap-10 sm:pt-8">
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">🔒</span>
              <p className="text-lg font-medium leading-snug text-gray-700 sm:text-xl">
                Secure & Confidential — All nominations are treated with the utmost confidentiality
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">📄</span>
              <p className="text-lg font-medium leading-snug text-gray-700 sm:text-xl">
                Easy Nomination Process — Simple 5-step process to submit securely online
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">🏅</span>
              <p className="text-lg font-medium leading-snug text-gray-700 sm:text-xl">
                Celebrate Excellence — Join us at the Global Metrology Excellence Awards Night
              </p>
            </div>
          </div>
        </Container>
      </section>


      <BackToTop />
    </div>
  );
}

function ReviewSection({ title, rows, onEdit, disabled }: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
  disabled: boolean;
}) {
  const filled = rows.filter(([, value]) => value.trim());
  return (
    <section className="rounded-lg border border-gray-200 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-[#003A77]">{title}</h3>
        <button type="button" disabled={disabled} onClick={onEdit} aria-label={'Edit ' + title}
          className="rounded-md px-2 py-1 text-sm font-semibold text-[#008896] hover:bg-[#00A1B1]/5 disabled:opacity-50">
          Edit
        </button>
      </div>
      {filled.length ? (
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {filled.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="mb-1 text-xs text-gray-500">{label}</dt>
              <dd className="whitespace-pre-line text-sm leading-relaxed text-gray-800 [overflow-wrap:anywhere]">{value}</dd>
            </div>
          ))}
        </dl>
      ) : <p className="text-sm text-gray-500">No supporting details added.</p>}
    </section>
  );
}
