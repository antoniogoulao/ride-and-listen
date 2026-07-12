import '@testing-library/jest-dom';
import i18n from './src/i18n';

beforeAll(async () => {
  await i18n.changeLanguage('en-US');
});
