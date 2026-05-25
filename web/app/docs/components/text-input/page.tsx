import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { TextInputPreview } from '@/components/docs/previews/TextInputPreview';

export const metadata: Metadata = {
  title: 'TextInput',
  description: 'Styled text input with floating label, helper text, icons, and glass variant.',
};

const props = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Floating label that animates above the field on focus.' },
  { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder text shown when the field is empty.' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Descriptive text rendered below the input.' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the input when isInvalid is true.' },
  { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Icon placed inside the left edge of the input.' },
  { name: 'rightIcon', type: 'ReactNode', default: 'undefined', description: 'Icon placed inside the right edge of the input.' },
  { name: 'leftAddon', type: 'ReactNode', default: 'undefined', description: 'Element attached to the left exterior of the input.' },
  { name: 'rightAddon', type: 'ReactNode', default: 'undefined', description: 'Element attached to the right exterior of the input.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Controls height and font size.' },
  { name: 'variant', type: "'outline' | 'filled' | 'glass' | 'underline'", default: '"outline"', description: 'Visual style of the input container.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Shorthand for variant="glass".' },
  { name: 'isRequired', type: 'boolean', default: 'false', description: 'Marks the field as required and adds an asterisk to the label.' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Disables the input and reduces opacity.' },
  { name: 'isReadOnly', type: 'boolean', default: 'false', description: 'Makes the input non-editable.' },
  { name: 'isInvalid', type: 'boolean', default: 'false', description: 'Applies error styling and shows errorText.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Shows a clear button when the input has content.' },
  { name: 'onClear', type: '() => void', default: 'undefined', description: 'Called when the clear button is tapped.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer wrapper.' },
  { name: 'inputStyle', type: 'StyleProp<TextStyle>', default: 'undefined', description: 'Style applied directly to the text input element.' },
  { name: 'containerStyle', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the inner input container.' },
];

export default function TextInputPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">TextInput</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A styled text input with animated floating labels, helper and error text, icon slots,
        addons, and a glass variant that integrates with the Liquid Glass surface system.
        Accepts all native React Native TextInput props.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { TextInput } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <TextInputPreview />

      <h2 id="signup-form" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Sign-up form
      </h2>
      <CodeBlock
        filename="SignUpScreen.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button, GlassView, Heading } from 'reactnatively';

export function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  function validate() {
    if (!email.includes('@')) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  }

  return (
    <View style={styles.root}>
      <GlassView elevation={2} borderRadius={24} style={styles.card}>
        <Heading level="h2" align="center">Create Account</Heading>
        <TextInput
          label="Full Name"
          leftIcon={<Ionicons name="person-outline" size={18} color="rgba(255,255,255,0.4)" />}
          isRequired
          autoCapitalize="words"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Ionicons name="mail-outline" size={18} color="rgba(255,255,255,0.4)" />}
          isInvalid={!!emailError}
          errorText={emailError}
          clearable
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={<Ionicons name="lock-closed-outline" size={18} color="rgba(255,255,255,0.4)" />}
          helperText="At least 8 characters"
          isRequired
        />
        <Button variant="solid" color="primary" size="lg" fullWidth onPress={validate}>
          Create Account
        </Button>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { padding: 28, gap: 16 },
});`}
        showLineNumbers
      />

      <h2 id="search-bar" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Search bar (glass variant)
      </h2>
      <CodeBlock
        filename="SearchBar.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'reactnatively';

export function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        glass
        value={value}
        onChangeText={onChangeText}
        placeholder="Search anything..."
        leftIcon={<Ionicons name="search" size={18} color="rgba(255,255,255,0.4)" />}
        clearable
        onClear={() => onChangeText('')}
        size="lg"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderRadius: 28 },
});`}
        showLineNumbers
      />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map((row) => (
              <tr key={row.name} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs whitespace-nowrap">{row.name}</td>
                <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.type}</td>
                <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.default}</td>
                <td className="px-4 py-3 text-white/50 text-xs leading-relaxed">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
