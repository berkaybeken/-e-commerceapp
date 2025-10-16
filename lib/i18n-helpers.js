export function tCategory(t, key) {
  if (!key) return '';
  const k = String(key);
  const mapped = t(`categories.${k}`);
  return mapped && mapped !== `categories.${k}` ? mapped : k;
}
