import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Locale,
  Languages,
  LocaleNamespace,
  useTranslation,
} from '../lib/locale';

const LocalPage = ({ lang }: { lang: Languages }) => {
  const { t, changeLanguage } = useTranslation();
  changeLanguage(lang);
  return <h1>{t('test')}</h1>;
};
const local = new Locale();

beforeEach(() => {
  local.addResources(Languages.EN_US, LocaleNamespace.UI, {
    test: 'This is en.',
  });
  local.addResources(Languages.JA_JP, LocaleNamespace.UI, {
    test: 'これは日本話です',
  });
  local.addResources(Languages.ZH_CN, LocaleNamespace.UI, {
    test: '这是简体中文',
  });
  local.addResources(Languages.ZH_TW, LocaleNamespace.UI, {
    test: '這是繁體中文',
  });
});

describe('i18n', () => {
  test('inject i18n', () => {
    const { t, changeLanguage } = local.getLocale();
    changeLanguage(Languages.EN_US);
    expect(t('test')).toBe('This is en.');
    changeLanguage(Languages.JA_JP);
    expect(t('test')).toBe('これは日本話です');
    changeLanguage(Languages.ZH_CN);
    expect(t('test')).toBe('这是简体中文');
    changeLanguage(Languages.ZH_TW);
    expect(t('test')).toBe('這是繁體中文');
  });

  test('react i18n render EN_US', async () => {
    render(<LocalPage lang={Languages.EN_US} />);
    const h1 = await screen.findByRole('heading');
    expect(h1).toHaveTextContent('This is en.');
  });

  test('react i18n render JA_JP', async () => {
    render(<LocalPage lang={Languages.JA_JP} />);
    const h1 = await screen.findByRole('heading');
    expect(h1).toHaveTextContent('これは日本話です');
  });

  test('react i18n render ZH_CN', async () => {
    render(<LocalPage lang={Languages.ZH_CN} />);
    const h1 = await screen.findByRole('heading');
    expect(h1).toHaveTextContent('这是简体中文');
  });

  test('react i18n render ZH_TW', async () => {
    render(<LocalPage lang={Languages.ZH_TW} />);
    const h1 = await screen.findByRole('heading');
    expect(h1).toHaveTextContent('這是繁體中文');
  });

  test('override i18n', () => {
    const { t, changeLanguage } = local.getLocale();
    const src = { test: 'This is override en.' };
    local.addResources(Languages.EN_US, LocaleNamespace.UI, src, true);
    changeLanguage(Languages.EN_US);
    expect(t('test')).toBe('This is en.');
    local.addResources(Languages.EN_US, LocaleNamespace.UI, src, true, true);
    changeLanguage(Languages.EN_US);
    expect(t('test')).toBe('This is override en.');
  });
});
