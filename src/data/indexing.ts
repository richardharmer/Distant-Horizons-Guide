// Preserve existing search landing pages. Evidence quality is tracked separately
// from indexability; an untested shader is not automatically a noindex page.
// No speculative consolidation: GSC showed clicks on the former merge candidates.
export function isInstallIndexable(downloadUrl: string) {
  return downloadUrl.length > 0;
}
