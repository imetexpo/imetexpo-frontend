'use client';

import { ClipboardEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check,
  Download,
  Lightbulb,
  Lock,
  MapPin,
  MessageSquare,
  QrCode,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';
import { getBackendUrl } from '@/lib/api/backendUrl';
import VisitorPassCard from '@/components/passes/VisitorPassCard';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';

const API = getBackendUrl();
const COUNTRIES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
];
const INTERESTS = [
  'Tyre Manufacturing',
  'Rubber Compounds & Raw Materials',
  'Tyre Testing & Quality Control',
  'Retreading & Repair',
  'Recycling & Sustainability',
  'Machinery & Automation',
  'Mold & Tooling',
  'Software & Industry 4.0',
];
const SOURCES = [
  'Google Search',
  'Social Media',
  'Email Invitation',
  'Colleague / Friend',
  'Exhibitor Invitation',
  'Print / Outdoor',
  'Other',
];

type Channel = 'sms' | 'whatsapp';
type Step = 'phone' | 'register' | 'success';

export default function PassesPage() {
  const [step, setStep] = useState<Step>('phone');
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [devOtp, setDevOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [pass, setPass] = useState<any>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [form, setForm] = useState({
    name: '',
    company: '',
    pinCode: '',
    area: '',
    city: '',
    state: '',
    country: 'India',
    source: '',
    interests: [] as string[],
  });

  useEffect(() => {
    if (!otpOpen || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [otpOpen, secondsLeft]);

  useEffect(() => {
    const pin = form.pinCode.replace(/\D/g, '');
    if (pin.length !== 6) return;
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const payload = await response.json();
        const office = payload?.[0]?.PostOffice?.[0];
        if (office) {
          setForm((current) => ({
            ...current,
            area: office.Name || current.area,
            city: office.District || current.city,
            state: office.State || current.state,
            country: 'India',
          }));
        }
      } catch {
        // keep manual entry available
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [form.pinCode]);

  const displayPhone = `${countryCode}${phone}`;

  const sendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/passes/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, countryCode, channel }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to send OTP');
      setDevOtp(payload.devOtp || '');
      setOtp(['', '', '', '']);
      setSecondsLeft(60);
      setOtpOpen(true);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (code = otp.join('')) => {
    if (code.length !== 4) {
      setError('Enter the 4-digit OTP');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/passes/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, countryCode, otp: code }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Invalid OTP');
      setVerificationToken(payload.data.verificationToken);
      setOtpOpen(false);
      setStep('register');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 3) otpRefs.current[index + 1]?.focus();
    if (next.every(Boolean)) verifyOtp(next.join(''));
  };

  const handleOtpPaste = (event: ClipboardEvent) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    event.preventDefault();
    const next = ['', '', '', ''].map((_, index) => pasted[index] || '');
    setOtp(next);
    if (pasted.length === 4) verifyOtp(pasted);
  };

  const completeRegistration = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/passes/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationToken, ...form }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to complete registration');
      setPass(payload.data);
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
  };

  return (
    <div className="intro-animation bg-white font-sans">
      {step === 'phone' && (
        <>
          <section className="relative overflow-hidden bg-[#FCF8F3]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#03193D0a_1px,transparent_1px),linear-gradient(to_bottom,#03193D0a_1px,transparent_1px)] bg-[size:44px_44px]" />
            <Container className="relative grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">
              <div>
                <span className="inline-flex items-center rounded-sm bg-[#CC9808]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#CC9808]">
                  India Tyre Show 2027 · Registration Open
                </span>
                <h1 className="mt-5 font-bebas text-5xl uppercase leading-none tracking-tight text-[#03193D] md:text-6xl lg:text-7xl">
                  Your <span className="text-[#CC9808]">Digital Visitor Badge</span> In Seconds
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                  Register for India Tyre Show, receive your <strong>QR-coded visitor pass</strong> instantly
                  via WhatsApp or SMS, and walk into the exhibition hassle-free.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className="rounded-sm bg-white px-3 py-1 text-[#03193D] shadow-sm">1 Register</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="rounded-sm bg-[#CC9808]/10 px-3 py-1 text-[#CC9808]">2 Get Badge</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="rounded-sm bg-[#03193D] px-3 py-1 text-white">3 Walk In</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#register"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154]"
                  >
                    <QrCode className="h-4 w-4" /> Register Now <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#register"
                    className="inline-flex items-center rounded-sm border border-[#03193D] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#03193D] transition-all duration-300 hover:bg-[#03193D] hover:text-white"
                  >
                    Learn How It Works
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-5 text-xs font-medium text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Shield className="h-4 w-4 text-[#CC9808]" /> Secure & Private
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Zap className="h-4 w-4 text-[#CC9808]" /> Instant Badge
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-4 w-4 text-[#CC9808]" /> Free Registration
                  </span>
                </div>
              </div>
              <VisitorPassCard
                pass={{
                  registrationNumber: 'REG-ITS-PREVIEW',
                  qrToken: 'its-preview',
                  passUrl: '/passes/',
                  name: 'Your Name',
                  company: 'Company / Organization',
                  event: {
                    name: 'India Tyre Show 2027',
                    dates: '22–24 April 2027',
                    venue: 'Auto Cluster Exhibition Center, Pune',
                  },
                }}
              />
            </Container>
          </section>

          <section id="register" className="bg-[#03193D] px-4 py-10 text-white">
            <Container>
              <Link
                href="/"
                className="inline-flex rounded-sm border border-white/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-[#03193D]"
              >
                ← Back to Home
              </Link>
              <span className="ml-3 inline-flex rounded-sm bg-[#CC9808] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Registration Open
              </span>
              <h2 className="mt-6 font-bebas text-4xl uppercase tracking-wide md:text-5xl">India Tyre Show 2027</h2>
              <div className="mt-4 max-w-3xl rounded-sm border border-white/15 p-4 text-sm text-white/80">
                <p className="font-semibold text-white">About This Event</p>
                <p className="mt-2">
                  India&apos;s dedicated exhibition for tyre manufacturing, rubber compounds, machinery,
                  testing, retreading, and sustainable solutions. 22–24 April 2027 at Auto Cluster
                  Exhibition Center, Pune.
                </p>
              </div>
            </Container>
          </section>

          <section className="bg-[#FCF8F3] px-4 py-10">
            <Container>
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div className="h-fit space-y-5 rounded-sm border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#03193D]">Event Details</h3>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <Calendar className="mt-0.5 h-5 w-5 text-[#CC9808]" />
                    <div>
                      <p className="font-medium text-[#03193D]">Event Dates</p>
                      <p>22–24 April 2027</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-5 w-5 text-[#CC9808]" />
                    <div>
                      <p className="font-medium text-[#03193D]">Venue</p>
                      <p>Auto Cluster Exhibition Center, Pune, India</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#CC9808]">India Tyre Show 2027</p>
                  <h3 className="mt-2 font-bebas text-3xl uppercase tracking-wide text-[#03193D]">
                    Choose Verification Method
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Select how you&apos;d like to receive your one-time password</p>

                  <div className="mt-5 grid grid-cols-2 rounded-sm bg-[#FCF8F3] p-1">
                    {(['sms', 'whatsapp'] as Channel[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setChannel(item)}
                        className={`rounded-sm py-2.5 text-sm font-semibold uppercase tracking-wider capitalize ${
                          channel === item ? 'bg-[#03193D] text-white shadow-sm' : 'text-gray-500'
                        }`}
                      >
                        {item === 'sms' ? 'SMS' : 'WhatsApp'}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-sm bg-[#FCF8F3] px-4 py-3 text-sm text-[#03193D]">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#CC9808]" />
                    OTP will be sent via {channel === 'sms' ? 'SMS' : 'WhatsApp'} to your phone number
                  </div>

                  <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[#03193D]">
                    Mobile Number *
                  </label>
                  <div className="mt-2 flex overflow-hidden rounded-sm border border-gray-300">
                    <select
                      value={countryCode}
                      onChange={(event) => setCountryCode(event.target.value)}
                      className="bg-[#FCF8F3] px-3 text-sm outline-none"
                    >
                      {COUNTRIES.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 12))}
                      placeholder="Enter mobile number"
                      className="w-full px-3 py-3 text-sm outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Select your country code and enter your mobile number</p>
                  {error && !otpOpen && <p className="mt-3 text-sm text-red-600">{error}</p>}

                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={loading}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#CC9808] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D] disabled:opacity-60"
                  >
                    <Smartphone className="h-4 w-4" />
                    {loading ? 'Sending OTP...' : `Send OTP via ${channel === 'sms' ? 'SMS' : 'WhatsApp'}`}
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-400">
                    {channel === 'sms' ? 'SMS' : 'WhatsApp'} OTP from India Tyre Show · Expires in 10 minutes
                  </p>
                </div>
              </div>
              <p className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="h-3.5 w-3.5 text-[#CC9808]" /> Your data is encrypted and secure
              </p>
            </Container>
          </section>
        </>
      )}

      {step === 'register' && (
        <section className="bg-[#FCF8F3] px-4 py-10">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
              <div className="h-fit space-y-5 rounded-sm border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#03193D]">Event Details</h3>
                <p className="flex gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-[#CC9808]" /> 22–24 April 2027
                </p>
                <p className="flex gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-[#CC9808]" /> Auto Cluster Exhibition Center, Pune
                </p>
              </div>
              <form onSubmit={completeRegistration} className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#03193D]">Complete Registration</h2>
                    <p className="text-sm text-gray-500">Fill in your details to complete registration</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold uppercase tracking-wider text-[#CC9808] hover:underline"
                  >
                    Change Number
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Field label="Full Name *" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
                  <Field
                    label="Company Or Firm Name *"
                    value={form.company}
                    onChange={(value) => setForm({ ...form, company: value })}
                  />
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Phone No. *
                    </label>
                    <div className="flex items-center justify-between rounded-sm border border-[#CC9808]/30 bg-[#FCF8F3] px-3 py-3 text-sm">
                      <span>{displayPhone}</span>
                      <span className="inline-flex items-center gap-1 rounded-sm bg-[#CC9808] px-2 py-0.5 text-xs font-bold uppercase text-white">
                        <Lock className="h-3 w-3" /> Verified
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[#CC9808]">This number was verified via OTP</p>
                  </div>
                  <Field
                    label="Search By Area / Pin Code *"
                    value={form.pinCode}
                    onChange={(value) => setForm({ ...form, pinCode: value.replace(/\D/g, '').slice(0, 6) })}
                    hint="Auto-fills area, city & state"
                  />
                  <Field label="Area / Locality" value={form.area} onChange={(value) => setForm({ ...form, area: value })} locked />
                  <Field label="City *" value={form.city} onChange={(value) => setForm({ ...form, city: value })} locked />
                  <Field label="State *" value={form.state} onChange={(value) => setForm({ ...form, state: value })} locked />
                  <Field
                    label="Country *"
                    value={form.country}
                    onChange={(value) => setForm({ ...form, country: value })}
                    locked
                    hint="Country set based on your phone number"
                  />
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                      How Did You Find Us *
                    </label>
                    <select
                      required
                      value={form.source}
                      onChange={(event) => setForm({ ...form, source: event.target.value })}
                      className="w-full rounded-sm border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808]"
                    >
                      <option value="">Select an option</option>
                      {SOURCES.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#03193D]">What are you looking for?</h3>
                  <p className="mt-2 rounded-sm bg-[#FCF8F3] px-4 py-3 text-sm text-[#03193D]">
                    Please select at least one interest to continue with your registration.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-sm border px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                          form.interests.includes(interest)
                            ? 'border-[#CC9808] bg-[#CC9808] text-white'
                            : 'border-gray-300 bg-white text-[#03193D] hover:border-[#CC9808]'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full rounded-sm bg-[#CC9808] py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D] disabled:opacity-60"
                >
                  {loading ? 'Creating your pass...' : 'Complete Registration'}
                </button>
                <p className="mt-3 text-center text-xs text-gray-400">By registering, you agree to our terms and conditions</p>
              </form>
            </div>
          </Container>
        </section>
      )}

      {step === 'success' && pass && (
        <section className="bg-[#FCF8F3] px-4 py-12">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#CC9808]/15 text-[#CC9808]">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#03193D]">Registration Successful!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your visitor pass has been sent via {pass.channel === 'sms' ? 'SMS' : 'WhatsApp'}.
            </p>
            <div className="mt-8">
              <VisitorPassCard pass={pass} />
            </div>
            <div className="mt-6 rounded-sm bg-white p-4 text-left text-sm text-[#03193D] shadow-sm">
              <p className="font-semibold">Next step</p>
              <p className="mt-1 text-gray-600">
                Show this screen or download the badge at the entrance. Registration number:
              </p>
              <p className="mt-2 font-mono text-lg font-bold text-[#CC9808]">{pass.registrationNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#CC9808] py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
            >
              <Download className="h-4 w-4" /> Download Full Badge
            </button>
            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              <StatusCard title="Check Your WhatsApp / SMS" body={pass.delivered ? 'Confirmation sent' : 'Pass is ready on this page'} />
              <StatusCard title="Badge Ready" body="Download above" />
              <StatusCard title="Event Reminder" body="We'll remind you" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="rounded-sm bg-[#03193D] py-3 text-xs font-bold uppercase tracking-wider text-white"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-sm border border-[#CC9808] py-3 text-xs font-bold uppercase tracking-wider text-[#CC9808]"
              >
                Another Registration
              </button>
            </div>
          </div>
        </section>
      )}

      {otpOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#03193D]/60 p-4">
          <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-[#CC9808]">India Tyre Show</p>
              <button type="button" onClick={() => setOtpOpen(false)} className="text-gray-400">
                ✕
              </button>
            </div>
            <h3 className="mt-4 font-bebas text-3xl uppercase tracking-wide text-[#03193D]">Verify Your Phone Number</h3>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ve sent a 4-digit verification code to <strong>{displayPhone}</strong>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#CC9808]">
              <Lightbulb className="h-4 w-4" /> Tip: Copy the OTP and paste it here to auto-fill
            </p>
            {devOtp && (
              <p className="mt-2 rounded-sm bg-[#FCF8F3] px-3 py-2 text-xs text-[#03193D]">
                Development OTP: <strong>{devOtp}</strong> (also printed in the backend console)
              </p>
            )}
            <div className="mt-5 flex justify-center gap-3" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    otpRefs.current[index] = node;
                  }}
                  value={digit}
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 w-12 rounded-sm border-2 border-gray-200 text-center text-xl font-bold outline-none focus:border-[#CC9808]"
                />
              ))}
            </div>
            {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
            <p className="mt-4 text-center text-sm text-gray-500">
              {secondsLeft > 0 ? (
                <>
                  Resend code in <span className="font-semibold text-[#CC9808]">{secondsLeft}s</span>
                </>
              ) : (
                <button type="button" className="font-semibold text-[#CC9808]" onClick={sendOtp}>
                  Resend code
                </button>
              )}
            </p>
            <p className="mt-2 text-center text-xs text-gray-400">
              {channel === 'whatsapp'
                ? 'WhatsApp usually arrives within a few seconds.'
                : 'SMS usually arrives within a few seconds.'}
            </p>
            <div className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
              <Lock className="mr-1 inline h-3 w-3 text-[#CC9808]" /> Your phone number is securely verified and will
              not be shared.
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  locked = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  locked?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{label}</label>
      <div className="relative">
        <input
          required={label.includes('*')}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-sm border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808]"
        />
        {locked && value && (
          <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#CC9808]" />
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function StatusCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-gray-100 bg-white p-3 shadow-sm">
      <p className="font-semibold text-[#03193D]">{title}</p>
      <p className="mt-1 text-gray-500">{body}</p>
    </div>
  );
}
