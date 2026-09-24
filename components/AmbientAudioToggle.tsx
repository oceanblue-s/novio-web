'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Sparkles, Wind } from 'lucide-react';

export default function AmbientAudioToggle() {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);

  if (pathname === '/admin/customize') {
    return null;
  }
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Stop sound nodes
  const stopAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
      }
      setTimeout(() => {
        if (noiseNodeRef.current) {
          noiseNodeRef.current.stop();
          noiseNodeRef.current.disconnect();
          noiseNodeRef.current = null;
        }
        if (lfoRef.current) {
          lfoRef.current.stop();
          lfoRef.current.disconnect();
          lfoRef.current = null;
        }
        setIsPlaying(false);
      }, 400);
    } catch {
      setIsPlaying(false);
    }
  };

  // Synthesize gentle mountain breeze using Web Audio API
  const startAudio = async () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // 1. Create 5-second loopable pink-noise buffer
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // 2. Dual warm low-pass filters (mimics soft highland wind through leaves)
      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.value = 380;
      filter1.Q.value = 1.8;

      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.value = 650;
      filter2.Q.value = 0.8;

      // 3. LFO (Low-Frequency Oscillator) for organic breathing/wind gust swells
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12; // One slow gust every ~8 seconds
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain);
      lfoGain.connect(filter1.frequency);

      // 4. Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

      // Connect graph: Noise -> Filter1 -> Filter2 -> MasterGain -> Destination
      noise.connect(filter1);
      filter1.connect(filter2);
      filter2.connect(masterGain);
      masterGain.connect(ctx.destination);

      noise.start();
      lfo.start();

      noiseNodeRef.current = noise;
      lfoRef.current = lfo;
      gainNodeRef.current = masterGain;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <aside
      aria-label="Kontrol audio suasana dataran tinggi"
      className="fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-40 flex items-center group select-none"
    >
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Matikan suara alam Parongpong' : 'Putar suara alam Parongpong'}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${
          isPlaying
            ? 'bg-forest/90 text-softwhite border-garden ring-2 ring-garden/30 shadow-garden/20 scale-105'
            : 'bg-cream/90 hover:bg-softwhite text-charcoal border-sage/50 hover:border-garden/50 hover:shadow-xl'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Bars */}
            <div className="flex items-center gap-0.5 h-3.5 px-0.5" aria-hidden="true">
              <span className="w-1 bg-garden rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3.5" />
              <span className="w-1 bg-sage rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-2.5" />
              <span className="w-1 bg-garden rounded-full animate-[pulse_1.4s_ease-in-out_infinite_0.4s] h-3" />
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              Kabut Parongpong
            </span>
            <Volume2 className="w-3.5 h-3.5 text-sage ml-1" />
          </>
        ) : (
          <>
            <Wind className="w-3.5 h-3.5 text-garden group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-charcoal/80 group-hover:text-charcoal">
              Suara Alam Parongpong
            </span>
            <VolumeX className="w-3.5 h-3.5 text-charcoal-muted ml-0.5" />
          </>
        )}
      </button>

      {/* Floating Info Tooltip on Hover */}
      <div className="absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-charcoal/90 backdrop-blur-sm text-softwhite text-[10px] font-medium tracking-wide px-3 py-1.5 rounded-lg border border-white/10 shadow-lg whitespace-nowrap">
          {isPlaying
            ? 'Memutar audio suasana kabut & angin dataran tinggi • Klik untuk senyap'
            : 'Dengarkan suasana angin pegunungan dan kabut Parongpong'}
        </div>
      </div>
    </aside>
  );
}
