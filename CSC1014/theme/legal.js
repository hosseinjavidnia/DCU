// Shared legal notice helper
const LEGAL_HTML = `<strong>Warning:</strong> Unauthorized copying, reproduction, or distribution of these materials, 
in whole or in part, is strictly prohibited and constitutes a violation of copyright law. 
Duplication of this page or its contents for public use is illegal.`;

function applyLegalNotice(root = document) {
  const els = root.querySelectorAll('.legal-notice');
  els.forEach((el) => { el.innerHTML = LEGAL_HTML; });
}
