const root = document.documentElement;
root.classList.add('demo-js');

try {
  const scheme = localStorage.getItem('hb-demo-scheme');
  if (scheme === 'light' || scheme === 'dark') root.dataset.colorScheme = scheme;
} catch {
  // Keep the default theme when storage is unavailable.
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('scheme-toggle');
  toggle.setAttribute('aria-pressed', root.dataset.colorScheme === 'dark');
  toggle.addEventListener('click', () => {
    root.dataset.colorScheme = root.dataset.colorScheme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-pressed', root.dataset.colorScheme === 'dark');
    try {
      localStorage.setItem('hb-demo-scheme', root.dataset.colorScheme);
    } catch {
      // Theme switching still works without persistence.
    }
  });
  document.getElementById('block-select').addEventListener('change', (event) => {
    location.href = event.target.value;
  });
});
