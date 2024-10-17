import Component from '@glimmer/component';
import RouteTemplate from 'ember-route-template';
import { pageTitle } from 'ember-page-title';
import { fn } from '@ember/helper';
import { v1 as uuidv1 } from 'uuid';
import { pipe } from '@nullvoxpopuli/ember-composable-helpers';
import {
  CopyButton,
  clipboard,
  isClipboardSupported,
} from 'ember-cli-clipboard';

import GhLink from 'test-app/components/gh-link';
import DocSection from 'test-app/components/doc-section';
import { CodeBlock } from 'ember-shiki';

export interface ApplicationRouteTemplateSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };

  Blocks: {
    default: [];
  };

  Element: HTMLElement;
}

class ApplicationRouteTemplate extends Component<ApplicationRouteTemplateSignature> {
  get generateToken() {
    return uuidv1();
  }

  get getTarget() {
    return `#${document.querySelector('#url-text')?.id}`;
  }

  getSuccessMessage = (type: string) => {
    return {
      type: 'success',
      message: `Success! Text ${type} to clipboard.`,
    };
  };

  getErrorMessage = (type: string) => {
    const options = {
      type: '',
      message: '',
    };

    const actionKey = type === 'cut' ? 'x' : 'c';
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      options.message = 'iOS not supported :(';
      options.type = 'warn';
    } else if (/Mac/i.test(navigator.userAgent)) {
      options.message = `Press ⌘-${actionKey} to ${type} (Safari)`;
      options.type = 'info';
    } else {
      options.message = `Press Ctrl-${actionKey} to ${type}`;
      options.type = 'info';
    }
    return options;
  };

  <template>
    {{pageTitle "ember-cli-clipboard"}}

    <header>
      <div class="application__header-image">
        <img src="clipboard.png" alt="clipboard" />
        <div class="application__install-wrapper">
          <code class="application__install-cmd">
            ember install ember-cli-clipboard
          </code>
        </div>
      </div>

      <h2>
        A simple ember wrapper around
        <a
          class="application__clipboard-link"
          href="http://zenorocha.github.io/clipboard.js"
        >
          clipboard.js
        </a>
      </h2>

      <GhLink />
    </header>

    <main>
      <DocSection @title="Set Text Directly" as |showMessage|>
        <div class="application__direct-text-example">
          <code class="application__install-cmd">
            ember install ember-cli-clipboard
          </code>

          <CopyButton
            class="application__copy-icon"
            @text="ember install ember-cli-clipboard"
            @onSuccess={{pipe (fn this.getSuccessMessage "copy") showMessage}}
            @onError={{pipe (fn this.getErrorMessage "copy") showMessage}}
            title="copy to clipboard"
          >
            <img src="clippy.svg" alt="clipboard" />
          </CopyButton>
        </div>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<CopyButton
  @text="ember install ember-cli-clipboard"
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
  title="copy to clipboard"
>
  <i class="copy"></i>
</CopyButton>'}}
        />
      </DocSection>

      <DocSection @title="Lazily Set Text From Action" as |showMessage|>
        <CopyButton
          class="application__copy-button"
          title="copy to clipboard"
          @text={{this.generateToken}}
          @onSuccess={{pipe (fn this.getSuccessMessage "copy") showMessage}}
          @onError={{pipe (fn this.getErrorMessage "copy") showMessage}}
        >
          Generate & Copy Token
        </CopyButton>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<CopyButton
  @clipboardText={{this.generateToken}}
  @success={{this.onSuccess}}
  @error={{this.onError}}
  title="copy to clipboard"
>
  Generate & Copy Token
</CopyButton>'}}
        />
      </DocSection>

      <DocSection @title="Get Text From Target Element" as |showMessage|>
        <input
          id="url"
          class="application__textfield"
          type="text"
          value="https://github.com/jkusa/ember-cli-clipboard"
        />
        <CopyButton
          class="application__copy-button"
          @target="#url"
          @onSuccess={{pipe (fn this.getSuccessMessage "copy") showMessage}}
          @onError={{pipe (fn this.getErrorMessage "copy") showMessage}}
        >
          Copy URL
        </CopyButton>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<input
  id="url"
  type="text"
  value="https://github.com/jkusa/ember-cli-clipboard"
>
<CopyButton
 @target="#url"
 @success={{this.onSuccess}}
 @error={{this.onError}}
>
  Copy URL
</CopyButton>'}}
        />
      </DocSection>

      <DocSection @title="Get Text From Dynamic Target" as |showMessage|>
        <input
          id="url-text"
          class="application__textfield"
          type="text"
          value="https://jkusa.github.io/ember-cli-clipboard"
        />
        <CopyButton
          class="application__copy-button"
          @target={{this.getTarget}}
          @onSuccess={{pipe (fn this.getSuccessMessage "copy") showMessage}}
          @onError={{pipe (fn this.getErrorMessage "copy") showMessage}}
        >
          Copy URL
        </CopyButton>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<CopyButton
  class="application__copy-button"
  @target={{this.getTarget}}
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Copy URL
</CopyButton>'}}
        />
      </DocSection>

      <DocSection @title="Cut Text From Target Element" as |showMessage|>
        <textarea id="textarea" class="application__textfield" rows="3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </textarea>
        <CopyButton
          class="application__copy-button"
          @target="#textarea"
          @action="cut"
          @onSuccess={{pipe (fn this.getSuccessMessage "cut") showMessage}}
          @onError={{pipe (fn this.getErrorMessage "cut") showMessage}}
        >
          Cut Text
        </CopyButton>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<textarea id="textarea">
  Lorem ipsum dolor sit amet, consectetur...
</textarea>
<CopyButton
 @target="#textarea"
 @action="cut"
 @success={{this.onSuccess}}
 @error={{this.onError}}
>
  Copy URL
</CopyButton>'}}
        />
      </DocSection>

      <DocSection @title="Clipboard Element Modifier" as |showMessage|>
        <button
          class="application__copy-button"
          type="button"
          {{clipboard
            text="element modifier"
            onSuccess=(pipe (fn this.getSuccessMessage "copy") showMessage)
          }}
        >
          Copy Text
        </button>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{'<button
  class="application__copy-button"
  type="button"
  {{clipboard
    text="element modifier"
    onSuccess=this.onSuccess
  }}
>
  Copy Text
</button>'}}
        />
      </DocSection>

      <DocSection @title="Check If Clipboard Is Supported">
        <p class="application__supported-text">
          {{#if (isClipboardSupported)}}
            <span>
              Clipboard
              <span class="application__is-supported">is</span>
              supported
            </span>
          {{else}}
            <span>
              Clipboard
              <span class="application__is-supported">is not</span>
              supported
            </span>
          {{/if}}
        </p>

        <CodeBlock
          @language="hbs"
          @showLineNumbers={{true}}
          @theme="github-dark"
          @code={{"{{#if (is-clipboard-supported)}}
  Clipboardis supported
{{else}}
  Clipboard is not supported
{{/if}}"}}
        />
      </DocSection>
    </main>

    <footer>
      <div class="application__profile-link">
        <a href="https://github.com/jkusa">@jkusa</a>
      </div>
    </footer>
  </template>
}

export default RouteTemplate(ApplicationRouteTemplate);
