import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync('src/lib/analytics.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function setup({ blockedStorage = false, stored = null } = {}) {
  const calls = [], scripts = new Map();
  let reloads = 0;
  const window = {
    gtag: (...args) => calls.push(args),
    localStorage: {
      getItem: () => { if (blockedStorage) throw Error('blocked'); return stored; },
      setItem: (_, value) => { if (blockedStorage) throw Error('blocked'); stored = value; },
    },
    location: { reload: () => reloads++ },
  };
  const document = {
    getElementById: id => scripts.get(id),
    createElement: () => { const script = { remove: () => scripts.delete(script.id) }; return script; },
    head: { appendChild: script => {
      if (script.id === 'clarity-script') assert.equal(typeof window.clarity, 'function', 'Clarity bootstrap must precede tag execution');
      scripts.set(script.id, script);
    } },
  };
  const context = vm.createContext({ exports: {}, window, document });
  vm.runInContext(code, context);
  return { api: context.exports, calls, scripts, window, reloads: () => reloads };
}
const fresh = setup();
assert.equal(fresh.api.readConsent(), null);
fresh.api.analyticsEvent('generate_config');
assert.equal(fresh.calls.length, 0, 'No custom events before consent');
fresh.api.applyConsent('rejected');
assert.equal(fresh.scripts.size, 0, 'No analytics scripts on refusal');
assert.equal(fresh.reloads(), 0);
fresh.api.applyConsent('accepted');
fresh.api.applyConsent('accepted');
assert.equal(fresh.scripts.size, 2, 'Load each SDK once');
assert.equal(fresh.calls.filter(c => c[0] === 'config').length, 1, 'No repeated initial pageviews');
assert.equal(fresh.window.clarity.q[0][1].analytics_Storage, 'granted');
assert.equal(fresh.window.clarity.q[0][1].ad_Storage, 'denied');
fresh.api.analyticsEvent('open_shader_details', { shader: 'photon-shader' });
assert.equal(fresh.calls.at(-1)[1], 'open_shader_details');
fresh.api.applyConsent('rejected');
assert.equal(fresh.window['ga-disable-G-89V8QD3P9T'], true);
assert.equal(fresh.window.clarity.q.at(-1)[0], 'stop');
assert.equal(fresh.reloads(), 1, 'Unload SDKs on withdrawal, including in-flight scripts');
const length = fresh.calls.length;
fresh.api.analyticsEvent('generate_config');
assert.equal(fresh.calls.length, length, 'No events after withdrawal');
const stored = setup({ stored: 'accepted' });
stored.api.applyConsent(stored.api.readConsent());
assert.equal(stored.scripts.size, 2, 'Returning consent initializes both SDKs');
const blocked = setup({ blockedStorage: true });
assert.equal(blocked.api.readConsent(), null);
blocked.api.applyConsent('accepted');
blocked.api.analyticsEvent('generate_config');
assert.equal(blocked.calls.at(-1)[1], 'generate_config', 'Explicit session consent works when storage is blocked');
const invalid = setup({ stored: 'invalid' });
assert.equal(invalid.api.readConsent(), null);
console.log('Analytics checks passed: initialization order, consent, refusal, withdrawal, returning visits, duplicate config and blocked storage.');
