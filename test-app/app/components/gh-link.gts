import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface GhLinkSignature {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Args: {};
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const GhLink: TemplateOnlyComponent<GhLinkSignature> = <template>
  <div class="gh-link" ...attributes>
    <a
      class="gh-link__anchor"
      href="https://github.com/jkusa/ember-cli-clipboard"
    >
      <img class="gh-link__icon" src="github.svg" alt="github" />
      <span class="gh-link__text">View On Github</span>
    </a>
  </div>
</template>;

export default GhLink;
