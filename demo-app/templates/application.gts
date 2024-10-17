import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';

import { CopyButton, clipboard, isClipboardSupported } from '#src/index.ts';
import { highlight } from '../highlight.ts';

class Demo {
  @tracked message = '';
  @tracked messageType: 'success' | 'error' = 'success';
  @tracked showMessage = false;
  @tracked activeSection = 'getting-started';

  flash = (type: 'success' | 'error', message: string) => {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 2500);
  };

  onSuccess = () => this.flash('success', 'Copied to clipboard!');
  onError = () => this.flash('error', 'Press Ctrl/Cmd + C to copy');

  generateToken = () => {
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    this.flash('success', `Token copied: ${token}`);
    return token;
  };

  getTarget = () => document.querySelector('#dynamic-target') as Element;

  dismiss = () => {
    this.showMessage = false;
  };

  isActive = (id: string) => this.activeSection === id;

  spy = modifier((element: Element) => {
    const sections = Array.from(element.querySelectorAll('section[id]'));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  });
}

const demo = new Demo();

const installSnippet = highlight(
  `# pnpm
pnpm add @aklkv/ember-cli-clipboard

# npm
npm install @aklkv/ember-cli-clipboard

# yarn
yarn add @aklkv/ember-cli-clipboard`,
  'shellscript',
);

const gettingStartedSnippet = highlight(
  `import { CopyButton } from '@aklkv/ember-cli-clipboard';

<template>
  <CopyButton @text="text to copy" @onSuccess={{this.onSuccess}}>
    Copy
  </CopyButton>
</template>`,
  'glimmer-ts',
);

const setTextSnippet = highlight(`<CopyButton
  @text="pnpm add @aklkv/ember-cli-clipboard"
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Copy install command
</CopyButton>`);

const lazyTextSnippet = highlight(`<CopyButton
  @text={{this.generateToken}}
  @onError={{this.onError}}
>
  Generate & copy token
</CopyButton>`);

const targetSnippet = highlight(`<input id="url" type="text" value="..." />
<CopyButton
  @target="#url"
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Copy URL
</CopyButton>`);

const cutSnippet = highlight(`<textarea id="textarea">Lorem ipsum...</textarea>
<CopyButton
  @target="#textarea"
  @action="cut"
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Cut text
</CopyButton>`);

const dynamicTargetSnippet =
  highlight(`<input id="dynamic-target" type="text" value="..." />
<CopyButton
  @target={{this.getTarget}}
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Copy from resolved element
</CopyButton>`);

const delegateSnippet = highlight(`<CopyButton
  @text="scoped to this element"
  @delegateClickEvent={{false}}
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Copy (listener scoped to element)
</CopyButton>`);

const containerSnippet = highlight(`<dialog open>
  <CopyButton
    @text="copied from within a dialog"
    @container="dialog"
    @onSuccess={{this.onSuccess}}
    @onError={{this.onError}}
  >
    Copy inside dialog
  </CopyButton>
</dialog>`);

const modifierSnippet = highlight(
  `import { clipboard } from '@aklkv/ember-cli-clipboard';

<template>
  <button
    type="button"
    {{clipboard text="copied via the modifier" onSuccess=this.onSuccess}}
  >
    Copy via modifier
  </button>
</template>`,
  'glimmer-ts',
);

const supportedSnippet = highlight(`{{#if (isClipboardSupported)}}
  Clipboard is supported 🎉
{{else}}
  Clipboard is not supported 😔
{{/if}}`);

const supportedActionSnippet = highlight(`{{#if (isClipboardSupported "cut")}}
  Cut is supported
{{/if}}`);

const testSupportSnippet = highlight(
  `import {
  triggerCopySuccess,
  triggerCopyError,
} from '@aklkv/ember-cli-clipboard/test-support';

test('fires success/error actions', async function (assert) {
  await render(
    <template>
      <CopyButton class="my-btn" @text="text" @onSuccess={{this.onSuccess}} />
    </template>,
  );

  // fire the success action for a specific button
  triggerCopySuccess('.my-btn');

  // omit the selector to default to '.copy-btn'
  triggerCopyError();
});`,
  'glimmer-ts',
);

<template>
  {{pageTitle "@aklkv/ember-cli-clipboard"}}

  <header class="hero">
    <h1>@aklkv/ember-cli-clipboard</h1>
    <p class="tagline">
      A simple Ember wrapper around
      <a
        href="https://clipboardjs.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        clipboard.js
      </a>
    </p>
    <a
      class="github-link"
      href="https://github.com/aklkv/ember-cli-clipboard"
      target="_blank"
      rel="noopener noreferrer"
    >
      View on GitHub
    </a>
  </header>

  {{#if demo.showMessage}}
    <div class="alert alert-{{demo.messageType}}" role="alert">
      {{demo.message}}
      <button type="button" class="alert-close" {{on "click" demo.dismiss}}>
        &times;
      </button>
    </div>
  {{/if}}

  <nav class="toc" aria-label="Examples">
    <span class="toc-title">Examples</span>
    <ul>
      <li><a
          href="#getting-started"
          class={{if (demo.isActive "getting-started") "active"}}
        >Getting started</a></li>
      <li><a
          href="#set-text"
          class={{if (demo.isActive "set-text") "active"}}
        >Set text directly</a></li>
      <li><a
          href="#lazy-text"
          class={{if (demo.isActive "lazy-text") "active"}}
        >Lazily set text</a></li>
      <li><a href="#target" class={{if (demo.isActive "target") "active"}}>Text
          from a target</a></li>
      <li><a href="#cut" class={{if (demo.isActive "cut") "active"}}>Cut text</a></li>
      <li><a
          href="#target-fn"
          class={{if (demo.isActive "target-fn") "active"}}
        >Resolve target with a function</a></li>
      <li><a
          href="#delegate"
          class={{if (demo.isActive "delegate") "active"}}
        >Scope the click listener</a></li>
      <li><a
          href="#container"
          class={{if (demo.isActive "container") "active"}}
        >Copy within a container</a></li>
      <li><a
          href="#modifier"
          class={{if (demo.isActive "modifier") "active"}}
        >Use the modifier directly</a></li>
      <li><a
          href="#supported"
          class={{if (demo.isActive "supported") "active"}}
        >Check clipboard support</a></li>
      <li><a
          href="#testing"
          class={{if (demo.isActive "testing") "active"}}
        >Testing helpers</a></li>
    </ul>
  </nav>

  <main class="container" {{demo.spy}}>
    <section id="getting-started" class="example">
      <h2>Getting started</h2>
      <p>Install the addon with your package manager of choice.</p>
      {{installSnippet}}
      <p>Then import
        <code>CopyButton</code>
        and render it with some
        <code>@text</code>
        to copy.</p>
      {{gettingStartedSnippet}}
    </section>

    <section id="set-text" class="example">
      <h2>Set text directly</h2>
      <p>Pass a string to <code>@text</code> to copy it on click.</p>
      <CopyButton
        class="btn"
        @text="pnpm add @aklkv/ember-cli-clipboard"
        @onSuccess={{demo.onSuccess}}
        @onError={{demo.onError}}
        title="copy to clipboard"
      >
        Copy install command
      </CopyButton>
      {{setTextSnippet}}
    </section>

    <section id="lazy-text" class="example">
      <h2>Lazily set text from a function</h2>
      <p>Pass a function to
        <code>@text</code>
        to compute the value on click.</p>
      <CopyButton
        class="btn"
        @text={{demo.generateToken}}
        @onError={{demo.onError}}
        title="copy to clipboard"
      >
        Generate &amp; copy token
      </CopyButton>
      {{lazyTextSnippet}}
    </section>

    <section id="target" class="example">
      <h2>Get text from a target element</h2>
      <p>Use
        <code>@target</code>
        with a selector to copy another element's value.</p>
      <input
        id="url"
        class="input"
        type="text"
        value="https://github.com/aklkv/ember-cli-clipboard"
        readonly
      />
      <CopyButton
        class="btn"
        @target="#url"
        @onSuccess={{demo.onSuccess}}
        @onError={{demo.onError}}
      >
        Copy URL
      </CopyButton>
      {{targetSnippet}}
    </section>

    <section id="cut" class="example">
      <h2>Cut text from a target element</h2>
      <p>Set <code>@action="cut"</code> to cut instead of copy.</p>
      <textarea id="textarea" class="textarea" rows="3">Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.</textarea>
      <CopyButton
        class="btn"
        @target="#textarea"
        @action="cut"
        @onSuccess={{demo.onSuccess}}
        @onError={{demo.onError}}
      >
        Cut text
      </CopyButton>
      {{cutSnippet}}
    </section>

    <section id="target-fn" class="example">
      <h2>Resolve the target with a function</h2>
      <p>Pass a function to
        <code>@target</code>
        to resolve the element to copy from at click time.</p>
      <input
        id="dynamic-target"
        class="input"
        type="text"
        value="resolved from a function"
        readonly
      />
      <CopyButton
        class="btn"
        @target={{demo.getTarget}}
        @onSuccess={{demo.onSuccess}}
        @onError={{demo.onError}}
      >
        Copy from resolved element
      </CopyButton>
      {{dynamicTargetSnippet}}
    </section>

    <section id="delegate" class="example">
      <h2>Scope the click listener to the element</h2>
      <p>By default the listener is delegated to
        <code>document.body</code>. Set
        <code>@delegateClickEvent</code>
        to
        <code>false</code>
        to scope it to the button instead.</p>
      <CopyButton
        class="btn"
        @text="scoped to this element"
        @delegateClickEvent={{false}}
        @onSuccess={{demo.onSuccess}}
        @onError={{demo.onError}}
      >
        Copy (listener scoped to element)
      </CopyButton>
      {{delegateSnippet}}
    </section>

    <section id="container" class="example">
      <h2>Copy from within a container</h2>
      <p>Use
        <code>@container</code>
        when rendering inside a
        <code>&lt;dialog&gt;</code>
        or other element that traps focus, so the copy still works.</p>
      <dialog open class="demo-dialog">
        <CopyButton
          class="btn"
          @text="copied from within a dialog"
          @container="dialog"
          @onSuccess={{demo.onSuccess}}
          @onError={{demo.onError}}
        >
          Copy inside dialog
        </CopyButton>
      </dialog>
      {{containerSnippet}}
    </section>

    <section id="modifier" class="example">
      <h2>Use the modifier directly</h2>
      <p>Apply the
        <code>clipboard</code>
        modifier to any element when you don't need the
        <code>CopyButton</code>
        wrapper.</p>
      <button
        type="button"
        class="btn"
        {{clipboard text="copied via the modifier" onSuccess=demo.onSuccess}}
      >
        Copy via modifier
      </button>
      {{modifierSnippet}}
    </section>

    <section id="supported" class="example">
      <h2>Check if clipboard is supported</h2>
      {{#if (isClipboardSupported)}}
        <p class="supported">Clipboard is supported 🎉</p>
      {{else}}
        <p class="unsupported">Clipboard is not supported 😔</p>
      {{/if}}
      {{supportedSnippet}}
      <p>Pass an action to check support for
        <code>copy</code>
        or
        <code>cut</code>
        specifically.</p>
      {{supportedActionSnippet}}
    </section>

    <section id="testing" class="example">
      <h2>Testing with test-support helpers</h2>
      <p>The addon ships
        <code>triggerCopySuccess</code>
        and
        <code>triggerCopyError</code>
        from
        <code>@aklkv/ember-cli-clipboard/test-support</code>
        so you can fire a button's
        <code>@onSuccess</code>/<code>@onError</code>
        actions in tests without real clipboard access. Pass a CSS selector to
        target a specific button, or omit it to default to
        <code>.copy-btn</code>.</p>
      {{testSupportSnippet}}
    </section>
  </main>

  <footer class="footer">
    Maintained by
    <a
      href="https://github.com/aklkv"
      target="_blank"
      rel="noopener noreferrer"
    >
      @aklkv
    </a>
    · originally created by
    <a
      href="https://github.com/jkusa"
      target="_blank"
      rel="noopener noreferrer"
    >
      @jkusa
    </a>
  </footer>
</template>
