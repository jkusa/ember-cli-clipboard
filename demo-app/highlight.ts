import { createHighlighter } from 'shiki';
import { htmlSafe } from '@ember/template';

import type { SafeString } from '@ember/template';

const THEME = 'github-dark';

const highlighter = await createHighlighter({
  themes: [THEME],
  langs: ['handlebars', 'glimmer-ts', 'shellscript'],
});

/**
 * Syntax highlights a code snippet for the demo app using Shiki and returns
 * an HTML-safe string ready to render in a template.
 */
export function highlight(code: string, lang = 'handlebars'): SafeString {
  return htmlSafe(
    highlighter.codeToHtml(code.trim(), {
      lang,
      theme: THEME,
    }),
  );
}
