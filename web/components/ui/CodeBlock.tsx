import { cn } from '@/lib/utils';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const trimmedCode = code.trim();
  const lines = tokenize(trimmedCode, language);

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden border border-white/[0.08]',
        'bg-[#0a0a1e]/95',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          {filename && (
            <span className="truncate text-xs text-white/40 font-mono">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-xs text-white/30 font-mono uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
        <CopyButton code={trimmedCode} />
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="min-w-full p-5 text-sm leading-relaxed !bg-transparent !border-0 !rounded-none">
          <code className={`language-${language} font-mono`}>
            {showLineNumbers
              ? lines.map((lineHtml, i) => (
                  <span key={i} className="flex">
                    <span className="select-none w-8 text-white/20 text-right mr-4 shrink-0">
                      {i + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: lineHtml }} />
                  </span>
                ))
              : <span dangerouslySetInnerHTML={{ __html: lines.join('\n') }} />}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ─── Single-pass tokenizer ────────────────────────────────────────────────────
// Processes characters once. HTML-escapes content before wrapping in spans,
// so no span's class attributes can ever be matched by a later token rule.

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function span(cls: string, text: string): string {
  return `<span class="${cls}">${esc(text)}</span>`;
}

const KEYWORDS = new Set([
  'import', 'export', 'from', 'default', 'type', 'interface',
  'const', 'let', 'var', 'function', 'return', 'if', 'else',
  'true', 'false', 'null', 'undefined', 'async', 'await',
  'extends', 'implements', 'class', 'new', 'typeof', 'void',
  'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'try', 'catch', 'finally', 'throw', 'of', 'in', 'as',
  'readonly', 'static', 'public', 'private', 'protected',
  'enum', 'namespace', 'module', 'declare', 'abstract', 'override',
]);

const BUILTINS = new Set([
  'React', 'ReactNode', 'FC', 'ReactElement', 'RefObject',
  'useState', 'useEffect', 'useMemo', 'useCallback', 'useRef',
  'useContext', 'useReducer', 'useLayoutEffect', 'useId',
  'StyleSheet', 'View', 'Text', 'Pressable', 'ScrollView',
  'FlatList', 'SafeAreaView', 'Animated', 'Platform', 'Image',
  'TouchableOpacity', 'TextInput', 'Modal', 'ActivityIndicator',
]);

function tokenizeLine(line: string): string {
  let out = '';
  let i = 0;
  const len = line.length;

  while (i < len) {
    const ch = line[i];

    // Line comment
    if (ch === '/' && line[i + 1] === '/') {
      out += span('text-white/40 italic', line.slice(i));
      break;
    }

    // String: double-quote
    if (ch === '"') {
      let j = i + 1;
      while (j < len && !(line[j] === '"' && line[j - 1] !== '\\')) j++;
      out += span('text-emerald-400', line.slice(i, j + 1));
      i = j + 1;
      continue;
    }

    // String: single-quote
    if (ch === "'") {
      let j = i + 1;
      while (j < len && !(line[j] === "'" && line[j - 1] !== '\\')) j++;
      out += span('text-emerald-400', line.slice(i, j + 1));
      i = j + 1;
      continue;
    }

    // Template literal (single-line only — sufficient for docs snippets)
    if (ch === '`') {
      let j = i + 1;
      while (j < len && !(line[j] === '`' && line[j - 1] !== '\\')) j++;
      out += span('text-emerald-400', line.slice(i, j + 1));
      i = j + 1;
      continue;
    }

    // Number
    if (ch >= '0' && ch <= '9') {
      let j = i;
      while (j < len && ((line[j] >= '0' && line[j] <= '9') || line[j] === '.')) j++;
      out += span('text-orange-400', line.slice(i, j));
      i = j;
      continue;
    }

    // Identifier / keyword / component name
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < len && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (KEYWORDS.has(word)) {
        out += span('text-violet-400', word);
      } else if (BUILTINS.has(word)) {
        out += span('text-blue-400', word);
      } else if (word[0] >= 'A' && word[0] <= 'Z') {
        // PascalCase → component or type name
        out += span('text-cyan-400', word);
      } else {
        out += esc(word);
      }
      i = j;
      continue;
    }

    // Everything else — escape and emit as-is
    out += esc(ch);
    i++;
  }

  return out;
}

function tokenizeBashLine(line: string): string {
  const trimmed = line.trimStart();

  // Comment
  if (trimmed.startsWith('#')) {
    return span('text-white/40 italic', line);
  }

  let out = '';
  let i = 0;
  const len = line.length;

  while (i < len) {
    const ch = line[i];

    // Quoted string
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < len && line[j] !== ch) j++;
      out += span('text-emerald-400', line.slice(i, j + 1));
      i = j + 1;
      continue;
    }

    // Whitespace — emit as-is
    if (ch === ' ' || ch === '\t') {
      out += ch;
      i++;
      continue;
    }

    // Token (until next space)
    if (/\S/.test(ch)) {
      let j = i;
      while (j < len && /\S/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (word === '$') {
        out += span('text-white/30', word);
      } else if (['pnpm', 'npm', 'npx', 'yarn', 'bun'].includes(word)) {
        out += span('text-emerald-400', word);
      } else if (['add', 'install', 'create', 'run', 'dev', 'build', 'start'].includes(word)) {
        out += span('text-blue-400', word);
      } else if (word.startsWith('--') || (word.startsWith('-') && word.length === 2)) {
        out += span('text-white/50', word);
      } else {
        out += esc(word);
      }
      i = j;
      continue;
    }

    out += esc(ch);
    i++;
  }

  return out;
}

function tokenize(code: string, lang: string): string[] {
  const isBash = lang === 'bash' || lang === 'shell';
  return code.split('\n').map(isBash ? tokenizeBashLine : tokenizeLine);
}
