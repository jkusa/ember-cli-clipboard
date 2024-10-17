// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

import type CopyButton from './components/copy-button.gts';
import type IsClipboardSupportedHelper from './helpers/is-clipboard-supported.js';
import type ClipboardModifier from './modifiers/clipboard.ts';

// Remove this once entries have been added! 👇
export default interface Registry {
  // components
  CopyButton: typeof CopyButton;
  'copy-button': typeof CopyButton;

  // helpers
  'is-clipboard-supported': typeof IsClipboardSupportedHelper;

  // modifiers
  clipboard: typeof ClipboardModifier;
}
