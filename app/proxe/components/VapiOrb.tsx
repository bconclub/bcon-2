'use client';

import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import Grainient from './Grainient';

const PUBLIC_API_KEY = 'f2b9a58e-d2c8-427b-847c-fc54a87c6a61';
const ASSISTANT_ID = 'be61e583-de32-4df8-a04f-104f6c3a7b6e';

type OrbState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ending';
type WaveVariant = 'user' | 'assistant';

const LABELS: Record<OrbState, string> = {
  idle: 'Click to talk',
  connecting: 'Connecting…',
  listening: 'Live',
  speaking: 'Live',
  ending: 'Ending…',
};

/* ---------- Wave overlay ----------------------------------------------------
 * SVG sine waves — 3 layered, phase-shifted bands animated each frame on rAF.
 * Amplitude rides on Vapi's `volume-level`. The `variant` switches the colour
 * palette so the same component reads as "you talking" (cool cyan/aqua) or
 * "PROXe talking" (warm magenta/pink).
 * -------------------------------------------------------------------------- */
function WaveOverlay({ volume, variant }: { volume: number; variant: WaveVariant }) {
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const path3Ref = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const volRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();

    const buildPath = (
      t: number,
      phase: number,
      freq: number,
      ampBase: number,
      ampScale: number
    ) => {
      const w = 220;
      const h = 220;
      const mid = h / 2;
      const amp = ampBase + ampScale * Math.min(1, volRef.current * 1.6);
      const segments = 64;
      let d = `M 0 ${mid}`;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * w;
        const y =
          mid +
          Math.sin((i / segments) * Math.PI * 2 * freq + t * 0.0035 + phase) * amp +
          Math.sin((i / segments) * Math.PI * 2 * freq * 1.7 + t * 0.0021 + phase) *
            (amp * 0.35);
        d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      d += ` L ${w} ${h} L 0 ${h} Z`;
      return d;
    };

    const tick = (now: number) => {
      const t = now - startRef.current;
      // EMA so volume changes don't snap.
      volRef.current = volRef.current + (volume - volRef.current) * 0.18;
      if (path1Ref.current) {
        path1Ref.current.setAttribute('d', buildPath(t, 0, 1, 4, 28));
      }
      if (path2Ref.current) {
        path2Ref.current.setAttribute('d', buildPath(t, Math.PI / 2, 1.4, 6, 22));
      }
      if (path3Ref.current) {
        path3Ref.current.setAttribute('d', buildPath(t, Math.PI, 1.8, 8, 18));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [volume]);

  // Per-variant gradient stops. Unique IDs per variant so multiple instances
  // wouldn't clash, even though only one renders at a time today.
  const stops = variant === 'user'
    ? {
        // Cool cyan / aqua — "you are talking"
        a: ['rgba(80, 220, 255, 0)', 'rgba(80, 220, 255, 0.55)', 'rgba(40, 200, 255, 0.85)'],
        b: ['rgba(120, 200, 240, 0)', 'rgba(120, 200, 240, 0.55)', 'rgba(70, 170, 230, 0.9)'],
        c: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.45)'],
      }
    : {
        // Warm magenta / pink — "PROXe is talking"
        a: ['rgba(255, 130, 220, 0)', 'rgba(255, 130, 220, 0.55)', 'rgba(255, 80, 200, 0.85)'],
        b: ['rgba(180, 140, 255, 0)', 'rgba(180, 140, 255, 0.55)', 'rgba(140, 90, 255, 0.9)'],
        c: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.45)'],
      };

  const idA = `proxeWaveGradA-${variant}`;
  const idB = `proxeWaveGradB-${variant}`;
  const idC = `proxeWaveGradC-${variant}`;

  return (
    <svg
      className="proxe-voice-orb-wave"
      data-wave-variant={variant}
      viewBox="0 0 220 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={idA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stops.a[0]} />
          <stop offset="60%" stopColor={stops.a[1]} />
          <stop offset="100%" stopColor={stops.a[2]} />
        </linearGradient>
        <linearGradient id={idB} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stops.b[0]} />
          <stop offset="60%" stopColor={stops.b[1]} />
          <stop offset="100%" stopColor={stops.b[2]} />
        </linearGradient>
        <linearGradient id={idC} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stops.c[0]} />
          <stop offset="100%" stopColor={stops.c[1]} />
        </linearGradient>
      </defs>
      <path ref={path3Ref} fill={`url(#${idB})`} opacity="0.7" />
      <path ref={path2Ref} fill={`url(#${idA})`} opacity="0.85" />
      <path ref={path1Ref} fill={`url(#${idC})`} opacity="0.55" />
    </svg>
  );
}

/* ---------- Connecting ring -------------------------------------------------
 * Single arc that fills 0→100% over ~1.2s (one-shot), then settles into a
 * steady full ring with a subtle glow pulse until call-start fires (state
 * transitions to 'listening' and this component unmounts).
 * -------------------------------------------------------------------------- */
function ConnectingRing() {
  return (
    <svg className="proxe-voice-orb-connecting" viewBox="0 0 240 240" aria-hidden="true">
      <circle
        cx="120"
        cy="120"
        r="112"
        fill="none"
        stroke="rgba(205, 252, 46, 0.18)"
        strokeWidth="3"
      />
      <circle
        className="proxe-voice-orb-connecting-arc"
        cx="120"
        cy="120"
        r="112"
        fill="none"
        stroke="#CDFC2E"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={100}
        transform="rotate(-90 120 120)"
      />
    </svg>
  );
}

export default function VapiOrb() {
  const vapiRef = useRef<Vapi | null>(null);
  const [state, setState] = useState<OrbState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  const isActiveRef = useRef(false);
  const userSpeakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the user-speaking debounce timer.
  const clearUserSpeakTimer = () => {
    if (userSpeakTimerRef.current) {
      clearTimeout(userSpeakTimerRef.current);
      userSpeakTimerRef.current = null;
    }
  };

  useEffect(() => {
    const vapi = new Vapi(PUBLIC_API_KEY);
    vapiRef.current = vapi;

    const handleCallStart = () => {
      isActiveRef.current = true;
      setState('listening');
      setError(null);
    };
    const handleCallEnd = () => {
      isActiveRef.current = false;
      setState('idle');
      setVolume(0);
      setIsUserSpeaking(false);
      clearUserSpeakTimer();
    };
    const handleSpeechStart = () => {
      // Vapi's `speech-start` is the assistant starting to speak.
      if (isActiveRef.current) setState('speaking');
    };
    const handleSpeechEnd = () => {
      if (isActiveRef.current) setState('listening');
    };
    const handleVolume = (v: number) => {
      setVolume(typeof v === 'number' ? v : 0);
    };
    /**
     * Vapi message stream — we use it to detect *user* speaking.
     * Partial user transcripts arrive while the user talks; we set
     * isUserSpeaking=true on each one and clear it 700ms after the last.
     */
    const handleMessage = (msg: unknown) => {
      const m = msg as { type?: string; role?: string };
      if (!m || typeof m !== 'object') return;
      if (m.type === 'transcript' && m.role === 'user') {
        setIsUserSpeaking(true);
        clearUserSpeakTimer();
        userSpeakTimerRef.current = setTimeout(() => setIsUserSpeaking(false), 700);
      }
    };
    const handleError = (err: unknown) => {
      console.error('[VapiOrb] error', err);
      isActiveRef.current = false;
      setError(
        typeof err === 'object' && err && 'message' in err
          ? String((err as { message?: unknown }).message ?? 'Voice call failed')
          : 'Voice call failed'
      );
      setState('idle');
      setVolume(0);
      setIsUserSpeaking(false);
      clearUserSpeakTimer();
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('volume-level', handleVolume);
    vapi.on('message', handleMessage);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('volume-level', handleVolume);
      vapi.off('message', handleMessage);
      vapi.off('error', handleError);
      clearUserSpeakTimer();
      try {
        vapi.stop();
      } catch {
        /* no-op */
      }
      vapiRef.current = null;
    };
  }, []);

  const handleClick = async () => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    if (state === 'connecting' || state === 'ending') return;

    if (isActiveRef.current) {
      setState('ending');
      try {
        vapi.stop();
      } catch (err) {
        console.error('[VapiOrb] stop failed', err);
        isActiveRef.current = false;
        setState('idle');
      }
      return;
    }

    setError(null);
    setState('connecting');
    try {
      await vapi.start(ASSISTANT_ID);
    } catch (err) {
      console.error('[VapiOrb] start failed', err);
      setError(
        typeof err === 'object' && err && 'message' in err
          ? String((err as { message?: unknown }).message ?? 'Could not start call')
          : 'Could not start call'
      );
      isActiveRef.current = false;
      setState('idle');
    }
  };

  const isBusy = state === 'connecting' || state === 'ending';
  const isLive = state === 'listening' || state === 'speaking';
  const showAssistantWave = state === 'speaking';
  const showUserWave = state === 'listening' && isUserSpeaking;

  // Dataset for CSS to differentiate cool (user) vs warm (assistant) glow.
  const speakerAttr: 'user' | 'assistant' | 'idle' =
    showAssistantWave ? 'assistant' : showUserWave ? 'user' : 'idle';

  return (
    <div className="proxe-voice-orb-wrap">
      <button
        type="button"
        className="proxe-voice-orb"
        aria-label={isLive ? 'End voice call' : 'Start voice call'}
        aria-busy={isBusy}
        data-vapi-state={state}
        data-speaker={speakerAttr}
        disabled={state === 'ending'}
        onClick={handleClick}
      >
        {state === 'connecting' ? <ConnectingRing /> : null}
        <span className="proxe-voice-orb-ring" aria-hidden="true" />
        <span className="proxe-voice-orb-inner" aria-hidden="true">
          <Grainient
            color1="#7C3AED"
            color2="#4C1D95"
            color3="#1E1B4B"
            timeSpeed={0.9}
            warpStrength={1.2}
            warpFrequency={6}
            warpSpeed={3}
            warpAmplitude={30}
            blendAngle={20}
            blendSoftness={0.2}
            rotationAmount={800}
            noiseScale={2.5}
            grainAmount={0.06}
            grainScale={3}
            grainAnimated
            contrast={1.4}
            gamma={1}
            saturation={1.1}
            zoom={0.7}
          />
          {showAssistantWave ? <WaveOverlay variant="assistant" volume={volume} /> : null}
          {showUserWave ? <WaveOverlay variant="user" volume={volume} /> : null}
        </span>
        <span className="proxe-voice-orb-shine" aria-hidden="true" />
        <span className="proxe-voice-orb-rim" aria-hidden="true" />
      </button>

      <div className="proxe-voice-orb-label" data-live={isLive}>
        {isLive ? <span className="proxe-voice-orb-livedot" aria-hidden="true" /> : null}
        <span>{LABELS[state]}</span>
      </div>

      {error ? (
        <div className="proxe-voice-orb-error" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
