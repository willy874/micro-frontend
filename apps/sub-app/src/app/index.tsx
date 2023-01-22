import SubAppElement from './AppElement';

if (!customElements.get('sub-app')) {
  customElements.define('sub-app', SubAppElement);
}

export { SubAppElement };
