import { InitOptions } from 'i18next';
import { Languages, PROCESS_NAME, preserves } from '../constants';

export default {
  name: PROCESS_NAME,

  type: 'postProcessor',

  process(
    value: string,
    _path: string,
    _options: InitOptions,
    translator: { language: Languages }
  ) {
    if (translator.language === Languages.EN_US) {
      // for path: "Adding $t(certificate).Please wait."
      // the initial value is: "Adding Certificate.Please wait."
      // We want to transform to: "Adding certificate. Please wait."
      value = transformSentenceCap(value);
    }

    return value;
  },
};

/**
 * Transform english sentence capitalisation:
 * 1. transform all words which are not i18n variable to lowercase.
 * 2. transform preserved words back.
 * 3. transform first character of sentence to uppercase.
 *
 * @param text
 */
function transformSentenceCap(text: string) {
  const variableRegExp = /({{[^{}]+}})/;
  // split sentences
  const sentences = text.split('. ');
  const transformedSentences = sentences.map((sentence) => {
    sentence = sentence
      .trim()
      .split(variableRegExp) // split by i18n variable
      .map((piece) => {
        // don't do transformation if it is i18n variable
        if (variableRegExp.test(piece)) {
          return piece;
        }

        piece = piece.toLowerCase();
        piece = transformPreserveWords(piece);
        return piece;
      })
      .join('');

    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  });

  return transformedSentences.join('. ');
}

/**
 * Transform words to preserve words.
 * For example:
 * ssh => SSH
 * cdn => CDN
 *
 * @param text
 */
function transformPreserveWords(text: string) {
  return preserves.reduce((o, p) => {
    const reg = new RegExp(`\\b${p}\\b`, 'gi');
    return o.replace(reg, p);
  }, text);
}
