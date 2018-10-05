import Component from '@ember/component';
import layout from '../templates/components/code-block';
import hljs from 'highlight.js/lib/highlight';
import handlebars from 'highlight.js/lib/languages/handlebars';

hljs.registerLanguage('handlebars', handlebars);


export default Component.extend({
  layout,

  classNames: ['container-code', 'highlight'],

  lang: 'hbs',

  didRender() {
    hljs.highlightBlock(this.$('pre code')[0]);
  }
});
