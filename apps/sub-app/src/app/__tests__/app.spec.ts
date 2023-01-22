import {
  getDefaultPortalContext,
  DefaultBinding,
  QUERY_BUS_TYPE,
  COMMAND_BUS_TYPE,
  EVENT_BUS_TYPE,
} from '@/slices/shared';
import SubAppElement from '../AppElement';
import { ApplicationContext } from '../contexts/application';

const TAG_NAME = 'sub-app';

beforeEach(() => {
  if (!customElements.get(TAG_NAME)) {
    customElements.define(TAG_NAME, SubAppElement);
  }
});

describe('app', () => {
  test('check app element mounted.', () => {
    const wc = document.createElement(TAG_NAME) as SubAppElement;
    document.body.append(wc);
    const SubApp = document.querySelector(TAG_NAME) as SubAppElement;
    const root = SubApp.shadowRoot;
    expect(Boolean(SubApp)).toBe(true);
    expect(Boolean(root)).toBe(true);
    expect(wc.shadowRoot === root).toBe(true);
    expect(wc.head === root?.querySelector('#head')).toBe(true);
    expect(wc.body === root?.querySelector('#body')).toBe(true);
  });
  test('application', () => {
    const app = new ApplicationContext({ isSelf: 'true' });
    const defaultPortal = app.shared.portal;
    const portal = getDefaultPortalContext();
    app.init(portal);
    expect(Boolean(app.lookup(QUERY_BUS_TYPE))).toBe(true);
    expect(Boolean(app.lookup(COMMAND_BUS_TYPE))).toBe(true);
    expect(Boolean(app.lookup(EVENT_BUS_TYPE))).toBe(true);
    expect(app.shared.portal === defaultPortal).toBe(false);
    expect(app.shared.portal === portal).toBe(true);
  });
});

describe('DefaultBinding', () => {
  const binding = new DefaultBinding();
  test('provider', () => {
    expect(binding.provider).toBe(undefined);
  });
  test('toClass', () => {
    class Test {
      test = '';
    }
    binding.toClass(Test);
    expect(binding.provider() instanceof Test).toBe(true);
  });
  test('toValue', () => {
    binding.toValue('value');
    expect(binding.provider()).toBe('value');
  });
  test('toProvider', () => {
    binding.toProvider(() => 'provider');
    expect(binding.provider()).toBe('provider');
  });
});
