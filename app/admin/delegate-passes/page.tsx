'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Search,
  Ticket,
} from 'lucide-react';
import {
  fetchDelegatePasses,
  type DelegatePassList,
} from '@/lib/api/delegatePasses';

const PAGE_SIZE = 25;
const controlClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-[#003A77] focus:outline-none focus:ring-2 focus:ring-blue-100';
const buttonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer';

function formatDate(value: string | null) {
  if (!value) return 'Not recorded';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? 'Not recorded'
    : new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }).format(parsed);
}

function packageName(value: string | null, amount: number | null) {
  const labels: Record<string, string> = {
    student: 'Student',
    general: 'General',
    group: 'Group of 3',
  };
  if (!value) return 'Not recorded';
  const label = labels[value.toLowerCase()] || value;
  return amount == null
    ? label
    : label + ' · ₹' + new Intl.NumberFormat('en-IN').format(amount);
}

function statusLabel(value: string) {
  if (value === 'checked_in') return 'Checked in';
  if (value === 'cancelled') return 'Cancelled';
  return 'Issued';
}

function statusClass(value: string) {
  if (value === 'checked_in') return 'bg-green-50 text-green-700';
  if (value === 'cancelled') return 'bg-red-50 text-red-700';
  return 'bg-blue-50 text-[#003A77]';
}

export default function DelegatePassesPage() {
  const [data, setData] = useState<DelegatePassList | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    fetchDelegatePasses(
      { page, limit: PAGE_SIZE, search, status },
      controller.signal
    )
      .then((result) => {
        setData(result);
        setError('');
      })
      .catch((failure: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            isAxiosError<{ error?: string }>(failure)
              ? failure.response?.data?.error || 'Could not load delegate passes.'
              : 'Could not load delegate passes.'
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, search, status, refresh]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  const registrations = data?.registrations || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#00A1B1]">IndiaMET 2027 · Delegate Management</p>
          <h1 className="mt-1 flex items-center gap-3 text-3xl font-bold text-slate-900">
            <Ticket className="h-7 w-7 text-[#003A77]" />
            Delegate Passes
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review paid delegate registrations, pass details, and venue check-in status.
          </p>
        </div>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setRefresh((value) => value + 1)}
          disabled={loading}
        >
          <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          Refresh
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered delegates</p>
            <p className="mt-1 text-2xl font-bold text-[#003A77]">{data?.total ?? 0}</p>
          </div>
          <form onSubmit={submitSearch} className="flex w-full flex-wrap gap-2 sm:w-auto">
            <label className="relative min-w-[220px] flex-1 sm:flex-none">
              <span className="sr-only">Search delegates</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className={controlClass + ' w-full pl-9'}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Name, company, email, phone..."
              />
            </label>
            <label>
              <span className="sr-only">Filter by pass status</span>
              <select
                className={controlClass}
                value={status}
                onChange={(event) => {
                  setPage(1);
                  setStatus(event.target.value);
                }}
              >
                <option value="">All statuses</option>
                <option value="issued">Issued</option>
                <option value="checked_in">Checked in</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#003A77] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002957] cursor-pointer">
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </div>

        {error ? (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-semibold">Delegate</th>
                <th className="px-3 py-3 font-semibold">Company</th>
                <th className="px-3 py-3 font-semibold">Contact</th>
                <th className="px-3 py-3 font-semibold">Package</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Registered</th>
                <th className="px-3 py-3 font-semibold">Pass</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center text-slate-500">Loading delegate passes...</td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center text-slate-500">
                    {error ? 'Delegate passes could not be loaded.' : 'No delegate passes found.'}
                  </td>
                </tr>
              ) : (
                registrations.map((pass) => (
                  <tr key={pass.id} className="hover:bg-slate-50/70">
                    <td className="px-3 py-3.5">
                      <p className="font-semibold text-slate-900">{pass.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{pass.designation || 'Delegate'}</p>
                      <p className="mt-1 text-xs text-slate-400">{pass.registrationNumber}</p>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium text-slate-800">{pass.company || 'Not provided'}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {[pass.city, pass.country].filter(Boolean).join(', ') || 'Location not recorded'}
                      </p>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-slate-800">{pass.email || 'No email'}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{pass.phone || 'No phone'}</p>
                    </td>
                    <td className="px-3 py-3.5 font-medium text-slate-700">
                      {packageName(pass.package, pass.packageAmount)}
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={'inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ' + statusClass(pass.status)}>
                        {statusLabel(pass.status)}
                      </span>
                      {pass.checkedInAt ? (
                        <p className="mt-1 text-xs text-slate-500">{formatDate(pass.checkedInAt)}</p>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-slate-600">
                      {formatDate(pass.issuedAt || pass.createdAt)}
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <a
                          href={pass.passUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </a>
                        <a
                          href={pass.badgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white"
                          aria-label={'Open badge for ' + pass.name}
                          title="Download badge"
                        >
                          Badge
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
          <p className="text-slate-500">
            Page {page} of {totalPages} · {data?.total ?? 0} delegates
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={buttonClass}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={loading || page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              className={buttonClass}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={loading || page >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}