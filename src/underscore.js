// This uses the same underlying logic as Rails
// But without support for known acronyms
// https://github.com/rails/rails/blob/8dab534ca81dd32c6a83ac03596a1feb7ddaaca7/activesupport/lib/active_support/inflector/methods.rb#L96
export function underscore(value) {
  return value
    .replace(/([A-Z\d]+)(?=[A-Z][a-z])|([a-z\d])(?=[A-Z])/g, (_, m1, m2) => `${m1 || m2}_`)
    .replace(/-/g, '_')
    .toLowerCase();
}
