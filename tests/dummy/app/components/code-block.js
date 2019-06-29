import Component from '@ember/component';
import layout from '../templates/components/code-block';
import hljs from 'highlight.js/lib/highlight';
import handlebars from 'highlight.js/lib/languages/handlebars';

hljs.registerLanguage('handlebars', handlebars);

export default Component.extend({
  layout,
  classNames: ['code-block', 'highlight'],
  lang: 'htmlbars',
  didRender() {
    hljs.highlightBlock(this.element.querySelector('pre code'));
  }
});
