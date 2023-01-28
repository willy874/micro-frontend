import { PostProcessorModule, TOptions } from 'i18next';

const re = {
  not_string: /[^s]/,
  number: /[diefg]/,
  json: /[j]/,
  not_json: /[^j]/,
  text: /^[^\x25]+/,
  modulo: /^\x25{2}/,
  placeholder:
    /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
  key: /^([a-z_][a-z_\d]*)/i,
  key_access: /^\.([a-z_][a-z_\d]*)/i,
  index_access: /^\[(\d+)\]/,
  sign: /^[+-]/,
};

function sprintf(...argv: string[]) {
  const key = argv[0],
    cache = sprintf.cache;
  if (!(cache[key] && Object.hasOwnProperty.call(cache, key))) {
    cache[key] = sprintf.parse(key);
  }
  return sprintf.format.call(null, cache[key], argv);
}

sprintf.format = function (parse_tree: string[], argv: string[]) {
  let cursor = 1;
  const tree_length: number = parse_tree.length;
  let arg: any;
  const output = [];
  let i;
  let k;
  let match: any;
  let pad;
  let pad_character;
  let pad_length;
  let is_positive = true;
  let sign = '';
  for (i = 0; i < tree_length; i++) {
    if (typeof parse_tree[i] === 'string') {
      output[output.length] = parse_tree[i];
    } else if (Array.isArray(parse_tree[i])) {
      match = parse_tree[i]; // convenience purposes only
      if (match[2]) {
        // keyword argument
        arg = argv[cursor];
        for (k = 0; k < match[2].length; k++) {
          if (!Object.hasOwnProperty.call(arg, match[2][k])) {
            throw new Error(
              sprintf("[sprintf] property '%s' does not exist", match[2][k])
            );
          }
          arg = arg[match[2][k]];
        }
      } else if (match[1]) {
        // positional argument (explicit)
        arg = argv[match[1]];
      } else {
        // positional argument (implicit)
        arg = argv[cursor++];
      }

      if (typeof arg === 'function') {
        arg = arg();
      }

      if (
        re.not_string.test(match[8]) &&
        re.not_json.test(match[8]) &&
        typeof arg !== 'number' &&
        isNaN(arg)
      ) {
        throw new TypeError(
          sprintf('[sprintf] expecting number but found %s', get_type(arg))
        );
      }

      if (re.number.test(match[8])) {
        is_positive = arg >= 0;
      }

      switch (match[8]) {
        case 'b':
          arg = arg.toString(2);
          break;
        case 'c':
          arg = String.fromCharCode(arg);
          break;
        case 'd':
        case 'i':
          arg = parseInt(arg, 10);
          break;
        case 'j':
          arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0);
          break;
        case 'e':
          arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
          break;
        case 'f':
          arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
          break;
        case 'g':
          arg = match[7]
            ? parseFloat(arg).toPrecision(match[7])
            : parseFloat(arg);
          break;
        case 'o':
          arg = arg.toString(8);
          break;
        case 's':
          arg =
            (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
          break;
        case 'u':
          arg = arg >>> 0;
          break;
        case 'x':
          arg = arg.toString(16);
          break;
        case 'X':
          arg = arg.toString(16).toUpperCase();
          break;
      }
      if (re.json.test(match[8])) {
        output[output.length] = arg;
      } else {
        if (re.number.test(match[8]) && (!is_positive || match[3])) {
          sign = is_positive ? '+' : '-';
          arg = arg.toString().replace(re.sign, '');
        } else {
          sign = '';
        }
        pad_character = match[4]
          ? match[4] === '0'
            ? '0'
            : match[4].charAt(1)
          : ' ';
        pad_length = match[6] - (sign + arg).length;
        pad = match[6]
          ? pad_length > 0
            ? str_repeat(pad_character, pad_length)
            : ''
          : '';
        output[output.length] = match[5]
          ? sign + arg + pad
          : pad_character === '0'
          ? sign + pad + arg
          : pad + sign + arg;
      }
    }
  }
  return output.join('');
};

type SprintfCache = { [key: string]: string[] };

sprintf.cache = {} as SprintfCache;

sprintf.parse = function (fmt: string) {
  let _fmt = fmt;
  let match: any = [];
  let arg_names = 0;
  const parse_tree: string[] = [];
  while (_fmt) {
    if ((match = re.text.exec(_fmt)) !== null) {
      parse_tree[parse_tree.length] = match[0];
    } else if ((match = re.modulo.exec(_fmt)) !== null) {
      parse_tree[parse_tree.length] = '%';
    } else if ((match = re.placeholder.exec(_fmt)) !== null) {
      if (match[2]) {
        arg_names |= 1;
        const field_list: string[] = [];
        let replacement_field = match[2];
        let field_match: any = [];
        if ((field_match = re.key.exec(replacement_field)) !== null) {
          field_list[field_list.length] = field_match[1];
          while (
            (replacement_field = replacement_field.substring(
              field_match[0].length
            )) !== ''
          ) {
            if (
              (field_match = re.key_access.exec(replacement_field)) !== null
            ) {
              field_list[field_list.length] = field_match[1];
            } else if (
              (field_match = re.index_access.exec(replacement_field)) !== null
            ) {
              field_list[field_list.length] = field_match[1];
            } else {
              throw new SyntaxError(
                '[sprintf] failed to parse named argument key'
              );
            }
          }
        } else {
          throw new SyntaxError('[sprintf] failed to parse named argument key');
        }
        match[2] = field_list;
      } else {
        arg_names |= 2;
      }
      if (arg_names === 3) {
        throw new Error(
          '[sprintf] mixing positional and named placeholders is not (yet) supported'
        );
      }
      parse_tree[parse_tree.length] = match;
    } else {
      throw new SyntaxError('[sprintf] unexpected placeholder');
    }
    _fmt = _fmt.substring(match[0].length);
  }
  return parse_tree;
};

function vsprintf(fmt: string, argv: string[], _argv?: string[]) {
  _argv = (argv || []).slice(0);
  _argv.splice(0, 0, fmt);
  return sprintf(..._argv);
}

/**
 * helpers
 */
function get_type(variable: unknown) {
  return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}

function str_repeat(input: string, multiplier: number) {
  return Array(multiplier + 1).join(input);
}

type PostProcessorModuleExpansion = {
  overloadTranslationOptionHandler: (
    args: string[]
  ) => OverloadTranslationOption;
};

type OverloadTranslationOption = {
  postProcess: 'sprintf';
  sprintf: string[];
};

const i18nextSprintfPostprocessor: PostProcessorModule &
  PostProcessorModuleExpansion = {
  name: 'sprintf',
  type: 'postProcessor',
  process(value, _key, options: TOptions<OverloadTranslationOption>) {
    if (!options.sprintf) return value;

    if (Object.prototype.toString.apply(options.sprintf) === '[object Array]') {
      return vsprintf(value, options.sprintf);
    } else if (typeof options.sprintf === 'object') {
      return sprintf(value, ...options.sprintf);
    }

    return value;
  },
  overloadTranslationOptionHandler(args) {
    const values = [];

    for (let i = 1; i < args.length; i++) {
      values.push(args[i]);
    }

    return {
      postProcess: 'sprintf',
      sprintf: values,
    };
  },
};

export default i18nextSprintfPostprocessor;
