'use client';

import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import Grainient from './Grainient';

const PUBLIC_API_KEY = 'f2b9a58e-d2c8-427b-847c-fc54a87c6a61';
const ASSISTANT_ID = 'be61e583-de32-4df8-a04f-104f6c3a7b6e';

type OrbState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ending';

const LABELS: Record<OrbState, string> = {
  idle: 'Click to talk',
  connecting: 'Connecting…',
  listening: 'Click to end',
  speaking: 'PROXe is speaking…',
  ending: 'Ending…',
};

export default function VapiOrb() {
  const vapiRef = useRef<Vapi | null>(null);
  const [state, setState] = useState<OrbState>('idle');
  const [error, setError] = useState<string | null>(null);

  // We track speaking + active separately so transient speech-end events while
  // the call is still active drop us back to "listening" rather than "idle".
  const isActiveRef = useRef(false);

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
    };

    const handleSpeechStart = () => {
      if (isActiveRef.current) setState('speaking');
    };

    const handleSpeechEnd = () => {
      if (isActiveRef.current) setState('listening');
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
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('error', handleError);
      // Best-effort hangup if the page unmounts mid-call.
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

    // Mid-transition clicks are ignored.
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

  return (
    <div className="proxe-voice-orb-wrap">
      <button
        type="button"
        className="proxe-voice-orb"
        aria-label={LABELS[state]}
        aria-busy={isBusy}
        data-vapi-state={state}
        disabled={isBusy}
        onClick={handleClick}
      >
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
        </span>
        <span className="proxe-voice-orb-shine" aria-hidden="true" />
        <span className="proxe-voice-orb-rim" aria-hidden="true" />
      </button>
      <div className="proxe-voice-orb-label">{LABELS[state]}</div>
      {error ? (
        <div className="proxe-voice-orb-error" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
