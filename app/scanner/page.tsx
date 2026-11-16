'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import {
  fetchScannerSummary,
  scanVisitorPass,
  type ScannerSummary,
  type ScanResult,
} from '@/lib/api/passes';

const SCANNER_KEY = 'indiamet_scanner_id';

function scannerId() {
  if (typeof window === 'undefined') return 'server_scanner';
  const existing = localStorage.getItem(SCANNER_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  localStorage.setItem(SCANNER_KEY, created);
  return created;
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatClock(value: string) {
  return new Date(value).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function ScannerPage() {
  const router = useRouter();
  const mountedRef = useRef(false);
  const startingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const startTaskRef = useRef<Promise<unknown> | null>(null);
  const teardownRef = useRef<Promise<void>>(Promise.resolve());
  const regionId = 'indiamet-scanner-camera';
  const cameraRef = useRef<Html5Qrcode | null>(null);
  const runningRef = useRef(false);
  const busyRef = useRef(false);
  const startRef = useRef<() => void>(() => undefined);
  const handleScanRef = useRef<(text: string) => void>(() => undefined);

  const [online, setOnline] = useState(true);
  const [ready, setReady] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [summary, setSummary] = useState<ScannerSummary | null>(null);
  const [outcome, setOutcome] = useState<ScanResult | null>(null);
  const [notice, setNotice] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [manualSubmitting, setManualSubmitting] = useState(false);

  const loadSummary = useCallback(async () => {
    try {
      const data = await fetchScannerSummary();
      setSummary(data);
      setOnline(true);
    } catch (error) {
      setOnline(false);
      if (
        error instanceof Error &&
        'status' in error &&
        (error.status === 401 || error.status === 403)
      ) {
        router.replace('/admin/login?next=/scanner');
      }
    }
  }, [router]);

  const stopCamera = useCallback(async () => {
    const camera = cameraRef.current;
    if (!camera || !runningRef.current) return;
    runningRef.current = false;
    try {
      await camera.stop();
    } catch {
      // Camera may already be stopped.
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (!mountedRef.current || startingRef.current || runningRef.current || busyRef.current) return;
    const camera = cameraRef.current;
    if (!camera) return;

    startingRef.current = true;
    try {
      if (!window.isSecureContext) throw new Error('Open this scanner over HTTPS to use the camera.');
      const startTask = camera.start(
        { facingMode: 'environment' },
        { fps: 8, qrbox: { width: 220, height: 220 } },
        (text) => {
          handleScanRef.current(text);
        },
        () => undefined
      );
      startTaskRef.current = startTask;
      await startTask;
      if (!mountedRef.current || cameraRef.current !== camera) return;
      runningRef.current = true;
      setReady(true);
      setCameraError('');
    } catch {
      if (mountedRef.current && cameraRef.current === camera) {
        setCameraError(
          !window.isSecureContext
            ? 'Open this scanner over HTTPS to use the camera.'
            : 'Camera unavailable. Allow camera access, then tap Retry camera.'
        );
        setReady(false);
      }
    } finally {
      startingRef.current = false;
      startTaskRef.current = null;
    }
  }, []);

  useEffect(() => {
    startRef.current = () => {
      startCamera();
    };
  }, [startCamera]);

  useEffect(() => {
    handleScanRef.current = async (decodedText: string) => {
      if (!mountedRef.current || busyRef.current) return;
      busyRef.current = true;
      setNotice('');
      await stopCamera();

      const resume = (delay: number) => {
        resumeTimerRef.current = window.setTimeout(() => {
          if (!mountedRef.current) return;
          setOutcome(null);
          setNotice('');
          busyRef.current = false;
          startRef.current();
        }, delay);
      };

      try {
        const result = await scanVisitorPass(decodedText, scannerId());
        if (!mountedRef.current) return;
        setOutcome(result);
        await loadSummary();
        resume(result.duplicate ? 1500 : 2000);
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Invalid Pass');
        resume(1600);
      }
    };
  }, [loadSummary, stopCamera]);

  useEffect(() => {
    let disposed = false;
    mountedRef.current = true;
    const priorTeardown = teardownRef.current;

    const kickoff = window.setTimeout(async () => {
      await priorTeardown;
      if (disposed) return;
      busyRef.current = false;
      const { Html5Qrcode: Html5QrcodeClass } = await import('html5-qrcode');
      if (disposed) return;
      const camera = new Html5QrcodeClass(regionId);
      cameraRef.current = camera;
      startCamera();
    }, 0);

    loadSummary();
    const timer = window.setInterval(loadSummary, 15000);

    return () => {
      disposed = true;
      mountedRef.current = false;
      window.clearTimeout(kickoff);
      window.clearInterval(timer);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      const camera = cameraRef.current;
      const starting = startTaskRef.current;
      cameraRef.current = null;
      runningRef.current = false;
      teardownRef.current = (async () => {
        if (!camera) return;
        if (starting) await starting.catch(() => undefined);
        try {
          await camera.stop();
        } catch {
          /* Already stopped or permission denied. */
        }
        camera.clear();
      })().catch(() => undefined);
    };
  }, [loadSummary, startCamera]);

  const handleManualCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = manualCode.trim();
    if (!code || manualSubmitting) return;

    setManualSubmitting(true);
    setNotice('');
    try {
      const result = await scanVisitorPass(code, scannerId());
      setOutcome(result);
      setManualCode('');
      await loadSummary();
      setTimeout(() => {
        setOutcome(null);
      }, result.duplicate ? 1800 : 2500);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Check-in failed');
      setTimeout(() => setNotice(''), 3000);
    } finally {
      setManualSubmitting(false);
    }
  };

  const today = summary?.today;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900">
      <header className="bg-[#003A77] px-5 py-4 text-white">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <div>
            <p className="text-lg font-black tracking-wide">INDIAMET 2027</p>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/75">
              VISITOR GATE SCANNER
            </p>
          </div>
          <p className="text-xs font-semibold flex items-center">
            <span
              className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                online ? 'bg-emerald-400' : 'bg-amber-300'
              }`}
            />
            {online ? 'Online' : 'Offline'}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#002244] p-4 shadow-lg">
          <div id={regionId} className="min-h-[280px] overflow-hidden rounded-2xl bg-black" />
          {!ready && !cameraError ? (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-white/80">
              Starting camera…
            </p>
          ) : null}
          {cameraError ? (
            <div className="mt-3 text-center">
              <p className="text-sm text-amber-200">{cameraError}</p>
              <button
                type="button"
                onClick={() => startCamera()}
                className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#003A77]"
              >
                Retry camera
              </button>
            </div>
          ) : null}
          <p className="mt-4 text-center text-sm font-semibold text-white">
            {notice || (ready ? 'Ready to scan' : 'Camera unavailable')}
          </p>
          <p className="mt-1 text-center text-xs text-white/70">Point the camera at visitor pass QR</p>

          {outcome ? (
            <div className="absolute inset-3 flex flex-col items-center justify-center rounded-2xl bg-white px-6 text-center text-slate-900 shadow-2xl">
              <p className={`text-4xl ${outcome.duplicate ? 'text-amber-500' : 'text-emerald-600'}`}>
                {outcome.duplicate ? '!' : '✓'}
              </p>
              <p className="mt-2 text-xl font-black tracking-wide">
                {outcome.duplicate ? 'JUST SCANNED' : 'ACCESS ALLOWED'}
              </p>
              <p className="mt-3 text-2xl font-black uppercase text-slate-900">{outcome.visitor.name}</p>
              <p className="text-sm font-semibold text-slate-500">{outcome.visitor.company}</p>
              <p className="mt-2 text-sm font-bold text-[#003A77]">{outcome.visitor.registrationNumber}</p>
              {!outcome.duplicate ? (
                <div className="mt-3 text-sm text-slate-600">
                  <p>Today&apos;s visit: #{outcome.todayVisit}</p>
                  <p>Event visits: #{outcome.eventVisits}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">Duplicate scan within cooldown window.</p>
              )}
              <p className="mt-3 text-xs font-semibold text-slate-400">{formatClock(outcome.scannedAt)}</p>
            </div>
          ) : null}
        </div>

        {/* Manual Code Check-In Fallback */}
        <form onSubmit={handleManualCheckIn} className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Manual Pass Check-In
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="REG-IM-... or Public Code"
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-mono outline-none focus:border-[#003A77]"
            />
            <button
              type="submit"
              disabled={manualSubmitting || !manualCode.trim()}
              className="rounded-xl bg-[#003A77] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#002855] disabled:opacity-50"
            >
              {manualSubmitting ? '...' : 'Check In'}
            </button>
          </div>
        </form>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold tracking-[0.16em] text-slate-400">TODAY&apos;S GATE STATS</p>
          <div className="mt-4 grid grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-black text-[#003A77]">{today?.scans ?? 0}</p>
              <p className="text-xs text-slate-500">Scans</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#003A77]">{today?.visitors ?? 0}</p>
              <p className="text-xs text-slate-500">Visitors</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#003A77]">{today?.repeat ?? 0}</p>
              <p className="text-xs text-slate-500">Repeat</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold tracking-[0.16em] text-slate-400">RECENT SCANS</p>
          <div className="mt-3 divide-y divide-slate-100">
            {summary?.recent?.length ? (
              summary.recent.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-slate-800">✓ {scan.name}</p>
                    <p className="text-xs text-slate-400">{scan.company}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-400">{formatTime(scan.scannedAt)}</p>
                </div>
              ))
            ) : (
              <p className="py-3 text-sm text-slate-400">No scans yet today.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
