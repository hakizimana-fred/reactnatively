'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Layers, Eye, Code2 } from 'lucide-react';

interface GlassConfig {
  elevation: number;
  blur: number;
  tintOpacity: number;
  highlight: boolean;
  border: boolean;
  glow: boolean;
  glowColor: string;
  variant: 'surface' | 'frosted' | 'elevated';
}

const DEFAULT_CONFIG: GlassConfig = {
  elevation: 2,
  blur: 24,
  tintOpacity: 0.72,
  highlight: true,
  border: true,
  glow: false,
  glowColor: '#6366f1',
  variant: 'surface',
};

export function PlaygroundClient() {
  const [config, setConfig] = useState<GlassConfig>(DEFAULT_CONFIG);
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');

  const update = <K extends keyof GlassConfig>(key: K, value: GlassConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const tintColor = `rgba(25, 25, 40, ${config.tintOpacity})`;
  const glassStyle = {
    background: tintColor,
    backdropFilter: `blur(${config.blur}px) saturate(1.8)`,
    WebkitBackdropFilter: `blur(${config.blur}px) saturate(1.8)`,
    border: config.border ? '1px solid rgba(255,255,255,0.12)' : 'none',
    boxShadow: config.glow
      ? `0 0 40px ${config.glowColor}40, 0 8px 32px rgba(0,0,0,0.3)`
      : '0 8px 32px rgba(0,0,0,0.3)',
  };

  const codeOutput = `<GlassView
  elevation={${config.elevation}}
  variant="${config.variant}"
  highlight={${config.highlight}}
  border={${config.border}}
  blurOverride={${config.blur}}${config.glow ? `\n  glow={{ color: '${config.glowColor}', radius: 32 }}` : ''}
  borderRadius={20}
  style={{ padding: 20 }}
>
  {/* your content */}
</GlassView>`;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      {/* Controls panel */}
      <aside className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#060610]/80 backdrop-blur-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-4 h-4 text-white/40" />
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">Controls</span>
          </div>

          {/* Elevation */}
          <ControlSection title="Elevation">
            <SliderControl
              label="Level"
              value={config.elevation}
              min={0}
              max={5}
              step={1}
              onChange={(v) => update('elevation', v)}
            />
          </ControlSection>

          {/* Blur */}
          <ControlSection title="Blur">
            <SliderControl
              label="Intensity"
              value={config.blur}
              min={0}
              max={80}
              step={2}
              onChange={(v) => update('blur', v)}
              unit=""
            />
          </ControlSection>

          {/* Tint */}
          <ControlSection title="Tint">
            <SliderControl
              label="Opacity"
              value={config.tintOpacity}
              min={0.1}
              max={0.95}
              step={0.01}
              onChange={(v) => update('tintOpacity', v)}
              format={(v) => `${Math.round(v * 100)}%`}
            />
          </ControlSection>

          {/* Variant */}
          <ControlSection title="Variant">
            <div className="grid grid-cols-3 gap-2">
              {(['surface', 'frosted', 'elevated'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => update('variant', v)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                    config.variant === v
                      ? 'bg-violet-500/20 border border-violet-500/30 text-violet-300'
                      : 'bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/70'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </ControlSection>

          {/* Toggles */}
          <ControlSection title="Options">
            <div className="space-y-3">
              <Toggle
                label="Highlight shimmer"
                value={config.highlight}
                onChange={(v) => update('highlight', v)}
              />
              <Toggle
                label="Glass border"
                value={config.border}
                onChange={(v) => update('border', v)}
              />
              <Toggle
                label="Glow effect"
                value={config.glow}
                onChange={(v) => update('glow', v)}
              />
            </div>
            {config.glow && (
              <div className="mt-3">
                <label className="text-xs text-white/40 mb-2 block">Glow color</label>
                <input
                  type="color"
                  value={config.glowColor}
                  onChange={(e) => update('glowColor', e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/[0.10]"
                />
              </div>
            )}
          </ControlSection>

          {/* Reset */}
          <button
            onClick={() => setConfig(DEFAULT_CONFIG)}
            className="w-full mt-2 py-2 rounded-xl text-sm text-white/40 hover:text-white/70 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
          >
            Reset to defaults
          </button>
        </div>
      </aside>

      {/* Preview area */}
      <div className="flex-1 flex flex-col">
        {/* Tab bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.06]">
          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeView === 'preview'
                ? 'bg-white/[0.08] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeView === 'code'
                ? 'bg-white/[0.08] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#060610] to-violet-900/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.12) 0%, transparent 50%)',
          }} />

          {activeView === 'preview' ? (
            <motion.div
              className="relative z-10 w-72 rounded-[20px] overflow-hidden p-5"
              style={glassStyle}
              key={JSON.stringify(config)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Highlight */}
              {config.highlight && (
                <>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
                </>
              )}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 mb-4 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">Glass Surface</h3>
                <p className="text-white/50 text-sm mb-4">
                  Elevation {config.elevation} · Blur {config.blur}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs text-white bg-white/[0.10] border border-white/[0.15]">
                    Action
                  </button>
                  <button className="flex-1 py-2 rounded-xl text-xs text-white/60">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="relative z-10 w-full max-w-xl">
              <pre className="p-5 rounded-2xl bg-[#0a0a1e]/90 border border-white/[0.08] text-sm font-mono text-white/70 leading-relaxed overflow-x-auto">
                <code>{codeOutput}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ControlSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
  format?: (v: number) => string;
}) {
  const display = format ? format(value) : `${value}${unit}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-mono text-white/40">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, rgb(139,92,246) 0%, rgb(139,92,246) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/50">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition-colors ${value ? 'bg-violet-500' : 'bg-white/[0.10]'}`}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ left: value ? '18px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
