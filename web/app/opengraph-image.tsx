import { ImageResponse } from 'next/og';
import { defaultDescription, siteName } from '@/lib/seo';

export const alt = 'Reactnatively - React Native UI framework for Expo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          color: '#f8fbff',
          background:
            'radial-gradient(circle at 20% 25%, rgba(31,139,202,0.42), transparent 32%), radial-gradient(circle at 78% 26%, rgba(167,139,250,0.32), transparent 30%), linear-gradient(135deg, #070812, #101827)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
            }}
          >
            RN
          </div>
          <div style={{ fontSize: 42, fontWeight: 700 }}>{siteName}</div>
        </div>
        <div style={{ maxWidth: 880, fontSize: 68, lineHeight: 1.05, fontWeight: 760 }}>
          React Native UI framework for liquid glass apps.
        </div>
        <div style={{ maxWidth: 860, marginTop: 28, fontSize: 28, lineHeight: 1.35, color: 'rgba(248,251,255,0.72)' }}>
          {defaultDescription}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 44, fontSize: 24 }}>
          {['Expo', 'TypeScript', 'Glass UI', 'Motion', 'Design tokens'].map((item) => (
            <div
              key={item}
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.07)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
