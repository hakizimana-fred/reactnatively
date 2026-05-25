'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNTextInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  variant = 'default',
  leftIcon,
  rightIcon,
  secureTextEntry,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  variant?: 'default' | 'glass';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const hasValue = value.length > 0;
  const floated = focused || hasValue;

  const bg = variant === 'glass'
    ? 'rgba(255,255,255,0.07)'
    : 'rgba(255,255,255,0.04)';

  const border = error
    ? '1.5px solid #ef4444'
    : focused
    ? '1.5px solid rgba(124,58,237,0.7)'
    : '1.5px solid rgba(255,255,255,0.1)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 280 }}>
      <div
        style={{
          position: 'relative',
          background: bg,
          border,
          borderRadius: 14,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backdropFilter: variant === 'glass' ? 'blur(12px)' : undefined,
          opacity: disabled ? 0.45 : 1,
          transition: 'border 0.2s',
        }}
      >
        {leftIcon && (
          <span style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, display: 'flex' }}>
            {leftIcon}
          </span>
        )}
        <div style={{ flex: 1, position: 'relative', height: 36, display: 'flex', alignItems: 'flex-end' }}>
          {label && (
            <motion.span
              animate={{
                y: floated ? -10 : 0,
                scale: floated ? 0.75 : 1,
                color: focused ? 'rgba(167,139,250,1)' : 'rgba(255,255,255,0.4)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 2,
                fontSize: 14,
                fontWeight: 500,
                transformOrigin: 'left center',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </motion.span>
          )}
          <input
            type={secureTextEntry && !showPass ? 'password' : 'text'}
            value={value}
            onChange={(e) => !disabled && onChange(e.target.value)}
            onFocus={() => !disabled && setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={!label ? placeholder : undefined}
            disabled={disabled}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit',
              paddingTop: label ? 12 : 0,
            }}
          />
        </div>
        {secureTextEntry && (
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', padding: 0, flexShrink: 0, display: 'flex',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showPass ? (
                <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
              ) : (
                <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
              )}
            </svg>
          </button>
        )}
        {rightIcon && !secureTextEntry && (
          <span style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, display: 'flex' }}>
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <span style={{ color: '#f87171', fontSize: 11, paddingLeft: 14 }}>{error}</span>
      )}
    </div>
  );
}

function DefaultDemo() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <RNTextInput label="Full Name" value={name} onChange={setName} />
      <RNTextInput label="Email Address" value={email} onChange={setEmail} />
    </div>
  );
}

function ErrorDemo() {
  const [email, setEmail] = useState('invalid-email');
  return (
    <div className="w-full max-w-xs">
      <RNTextInput
        label="Email"
        value={email}
        onChange={setEmail}
        error="Please enter a valid email address."
      />
    </div>
  );
}

function GlassDemo() {
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  return (
    <div
      className="flex flex-col gap-4 w-full max-w-xs p-5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
    >
      <RNTextInput label="Username" value={user} onChange={setUser} variant="glass" />
      <RNTextInput label="Password" value={pass} onChange={setPass} variant="glass" secureTextEntry />
    </div>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Default',
    preview: <DefaultDemo />,
    filename: 'ProfileForm.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'reactnatively';

export function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.form}>
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, padding: 24 },
});`,
  },
  {
    label: 'Error State',
    preview: <ErrorDemo />,
    filename: 'LoginForm.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'reactnatively';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function validate(value: string) {
    setEmail(value);
    setError(value.includes('@') ? '' : 'Please enter a valid email address.');
  }

  return (
    <View style={styles.form}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={validate}
        error={error}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, padding: 24 },
});`,
  },
  {
    label: 'Glass Variant',
    preview: <GlassDemo />,
    filename: 'AuthCard.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GlassView, TextInput, PasswordInput, Button } from 'reactnatively';

export function AuthCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GlassView elevation={2} borderRadius={20} style={styles.card}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        variant="glass"
        autoCapitalize="none"
      />
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        variant="glass"
      />
      <Button variant="solid" color="primary" size="lg" fullWidth onPress={handleLogin}>
        Sign In
      </Button>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, gap: 14 },
});`,
  },
];

export function TextInputPreview() {
  return <ComponentPreview variants={variants} minHeight={180} />;
}
