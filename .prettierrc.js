/** @type {import('prettier').Config} */
export default {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsonRecursiveSort: false,
  jsonSortOrder: '{"*": "lexical"}',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-sort-json'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '',
    '^#/(.*)$',
    '^#lib/(.*)$',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  importOrderCaseSensitive: false,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none'
};
