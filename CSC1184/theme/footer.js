// Shared footer text helper
const COPYRIGHT_TEXT = "\u00a9 2025 Hossein Javidnia. All rights reserved.";

function applyFooterText(root = document) {
  const els = root.querySelectorAll('.copyright');
  els.forEach((el) => { el.textContent = COPYRIGHT_TEXT; });
}
